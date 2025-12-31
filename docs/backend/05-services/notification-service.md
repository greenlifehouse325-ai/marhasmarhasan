# SMK Marhas - Notification Service

## 1. Overview

Notification service menangani:
- In-app notifications
- Real-time updates via WebSocket
- Email notifications (optional)
- Push notifications (optional)

---

## 2. Notification Schema

```sql
CREATE TABLE notifikasi (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    user_type VARCHAR(20),       -- admin, student, teacher, parent
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(50),            -- info, warning, success, error, announcement
    category VARCHAR(50),        -- system, absensi, keuangan, perpustakaan, dll
    data JSONB,                  -- Extra data (link, action, etc)
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    priority VARCHAR(20) DEFAULT 'normal',  -- low, normal, high, urgent
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifikasi_user ON notifikasi(user_id);
CREATE INDEX idx_notifikasi_unread ON notifikasi(user_id, is_read) WHERE is_read = false;
```

---

## 3. Notification Service

**`src/modules/notification/notification.service.ts`**
```typescript
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { NotificationGateway } from './notification.gateway';

export interface NotificationPayload {
  userId: string;
  userType?: 'admin' | 'student' | 'teacher' | 'parent';
  title: string;
  message?: string;
  type?: 'info' | 'warning' | 'success' | 'error' | 'announcement';
  category?: string;
  data?: any;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  expiresAt?: Date;
}

export interface BulkNotificationPayload {
  userIds: string[];
  title: string;
  message?: string;
  type?: string;
  category?: string;
  data?: any;
}

@Injectable()
export class NotificationService {
  constructor(
    private supabase: SupabaseService,
    private gateway: NotificationGateway,
  ) {}

  /**
   * Send notification to single user
   */
  async send(payload: NotificationPayload): Promise<void> {
    // Store in database
    const { data: notification, error } = await this.supabase.client
      .from('notifikasi')
      .insert({
        user_id: payload.userId,
        user_type: payload.userType,
        title: payload.title,
        message: payload.message,
        type: payload.type || 'info',
        category: payload.category,
        data: payload.data,
        priority: payload.priority || 'normal',
        expires_at: payload.expiresAt?.toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Send via WebSocket
    this.gateway.sendToUser(payload.userId, 'notification', notification);
  }

  /**
   * Send notification to multiple users
   */
  async sendBulk(payload: BulkNotificationPayload): Promise<void> {
    const notifications = payload.userIds.map(userId => ({
      user_id: userId,
      title: payload.title,
      message: payload.message,
      type: payload.type || 'info',
      category: payload.category,
      data: payload.data,
    }));

    const { error } = await this.supabase.client
      .from('notifikasi')
      .insert(notifications);

    if (error) throw error;

    // Send via WebSocket to all users
    payload.userIds.forEach(userId => {
      this.gateway.sendToUser(userId, 'notification', {
        title: payload.title,
        message: payload.message,
        type: payload.type,
      });
    });
  }

  /**
   * Send to all users with specific role
   */
  async sendToRole(role: string, payload: Omit<NotificationPayload, 'userId'>): Promise<void> {
    // Get all users with role
    const { data: users } = await this.supabase.client
      .from('admins')
      .select('id')
      .eq('role', role)
      .eq('status', 'active');

    if (!users?.length) return;

    await this.sendBulk({
      userIds: users.map(u => u.id),
      ...payload,
    });
  }

  /**
   * Broadcast to all admins
   */
  async broadcastToAdmins(payload: Omit<NotificationPayload, 'userId'>): Promise<void> {
    const { data: admins } = await this.supabase.client
      .from('admins')
      .select('id')
      .eq('status', 'active');

    if (!admins?.length) return;

    await this.sendBulk({
      userIds: admins.map(a => a.id),
      ...payload,
    });

    // Also broadcast via WebSocket
    this.gateway.broadcastAll('announcement', payload);
  }

  /**
   * Get user notifications
   */
  async getUserNotifications(userId: string, options: {
    unreadOnly?: boolean;
    limit?: number;
    page?: number;
  } = {}) {
    const { unreadOnly = false, limit = 20, page = 1 } = options;
    const offset = (page - 1) * limit;

    let query = this.supabase.client
      .from('notifikasi')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);

    if (unreadOnly) {
      query = query.eq('is_read', false);
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      data,
      meta: { total: count, page, limit },
    };
  }

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string): Promise<number> {
    const { count } = await this.supabase.client
      .from('notifikasi')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    return count || 0;
  }

  /**
   * Mark as read
   */
  async markAsRead(notificationId: string, userId: string): Promise<void> {
    await this.supabase.client
      .from('notifikasi')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', notificationId)
      .eq('user_id', userId);
  }

  /**
   * Mark all as read
   */
  async markAllAsRead(userId: string): Promise<void> {
    await this.supabase.client
      .from('notifikasi')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('is_read', false);
  }

  /**
   * Delete notification
   */
  async delete(notificationId: string, userId: string): Promise<void> {
    await this.supabase.client
      .from('notifikasi')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', userId);
  }

  /**
   * Delete old notifications
   */
  async cleanupOld(daysOld = 30): Promise<number> {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysOld);

    const { data } = await this.supabase.client
      .from('notifikasi')
      .delete()
      .lt('created_at', cutoff.toISOString())
      .select('id');

    return data?.length || 0;
  }
}
```

---

## 4. WebSocket Gateway

**`src/modules/notification/notification.gateway.ts`**
```typescript
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
  namespace: '/notifications',
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, Set<string>>(); // userId -> socketIds

  constructor(private jwt: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      // Extract token from query or auth header
      const token = client.handshake.auth?.token || 
                    client.handshake.query?.token as string;

      if (!token) {
        client.disconnect();
        return;
      }

      // Verify JWT
      const payload = this.jwt.verify(token);
      const userId = payload.sub;

      // Store socket mapping
      client.data.userId = userId;
      if (!this.userSockets.has(userId)) {
        this.userSockets.set(userId, new Set());
      }
      this.userSockets.get(userId).add(client.id);

      // Join user room
      client.join(`user:${userId}`);
      client.join(`role:${payload.role}`);

      console.log(`Client connected: ${client.id} (User: ${userId})`);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (userId) {
      this.userSockets.get(userId)?.delete(client.id);
      if (this.userSockets.get(userId)?.size === 0) {
        this.userSockets.delete(userId);
      }
    }
    console.log(`Client disconnected: ${client.id}`);
  }

  /**
   * Send to specific user
   */
  sendToUser(userId: string, event: string, data: any) {
    this.server.to(`user:${userId}`).emit(event, data);
  }

  /**
   * Send to users with specific role
   */
  sendToRole(role: string, event: string, data: any) {
    this.server.to(`role:${role}`).emit(event, data);
  }

  /**
   * Broadcast to all connected clients
   */
  broadcastAll(event: string, data: any) {
    this.server.emit(event, data);
  }

  /**
   * Check if user is online
   */
  isUserOnline(userId: string): boolean {
    return this.userSockets.has(userId);
  }

  /**
   * Get online users count
   */
  getOnlineCount(): number {
    return this.userSockets.size;
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket) {
    client.emit('pong', { timestamp: Date.now() });
  }
}
```

---

## 5. Notification Controller

**`src/modules/notification/notification.controller.ts`**
```typescript
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  async getNotifications(
    @CurrentUser() user: any,
    @Query('unreadOnly') unreadOnly?: boolean,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.notificationService.getUserNotifications(user.id, {
      unreadOnly,
      page,
      limit,
    });
  }

  @Get('unread-count')
  async getUnreadCount(@CurrentUser() user: any) {
    const count = await this.notificationService.getUnreadCount(user.id);
    return { count };
  }

  @Put(':id/read')
  async markAsRead(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    await this.notificationService.markAsRead(id, user.id);
    return { success: true };
  }

  @Put('read-all')
  async markAllAsRead(@CurrentUser() user: any) {
    await this.notificationService.markAllAsRead(user.id);
    return { success: true };
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    await this.notificationService.delete(id, user.id);
    return { success: true };
  }
}
```

---

## 6. Usage Examples

### Send SPP Reminder
```typescript
// When SPP is due
await this.notification.send({
  userId: orangtuaId,
  userType: 'parent',
  title: 'Pengingat SPP',
  message: `SPP bulan Januari untuk ${siswaName} sudah jatuh tempo`,
  type: 'warning',
  category: 'keuangan',
  data: { link: `/keuangan/spp/${siswaId}` },
});
```

### Send Absensi Alert
```typescript
// When student is absent
await this.notification.send({
  userId: orangtuaId,
  title: 'Notifikasi Absensi',
  message: `${siswaName} tidak hadir di sekolah hari ini`,
  type: 'warning',
  category: 'absensi',
});
```

### Broadcast Announcement
```typescript
await this.notification.broadcastToAdmins({
  title: 'Pengumuman Baru',
  message: 'Ada pengumuman penting dari Kepala Sekolah',
  type: 'announcement',
  data: { link: '/pengumuman/123' },
});
```

---

## 7. Frontend Integration

```typescript
// Connect to WebSocket
const socket = io(`${API_URL}/notifications`, {
  auth: { token: accessToken },
});

socket.on('connect', () => {
  console.log('Connected to notifications');
});

socket.on('notification', (data) => {
  // Show toast or update notification badge
  showToast(data.title, data.message);
  incrementBadge();
});

socket.on('announcement', (data) => {
  // Show announcement modal
  showAnnouncement(data);
});
```

---

## Related Documentation

- [Frontend Integration](../06-integration/realtime.md)
- [WebSocket Setup](../06-integration/websocket.md)
