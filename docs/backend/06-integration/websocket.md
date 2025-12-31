# SMK Marhas - Frontend Integration: WebSocket & Realtime

## 1. Socket.IO Setup

**`src/lib/socket.ts`**
```typescript
import { io, Socket } from 'socket.io-client';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000';

class SocketManager {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  connect(token: string): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(`${WS_URL}/notifications`, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket error:', error);
    });

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    this.socket?.on(event, callback as any);
  }

  off(event: string, callback: Function): void {
    this.listeners.get(event)?.delete(callback);
    this.socket?.off(event, callback as any);
  }

  emit(event: string, data: any): void {
    this.socket?.emit(event, data);
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const socketManager = new SocketManager();
```

---

## 2. Socket Provider

**`src/contexts/SocketContext.tsx`**
```typescript
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { socketManager } from '@/lib/socket';
import { useAuth } from './AuthContext';

interface SocketContextType {
  isConnected: boolean;
  subscribe: (event: string, callback: Function) => void;
  unsubscribe: (event: string, callback: Function) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const { user, accessToken } = useAuth();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (accessToken && user) {
      const socket = socketManager.connect(accessToken);

      socket.on('connect', () => setIsConnected(true));
      socket.on('disconnect', () => setIsConnected(false));

      return () => {
        socketManager.disconnect();
        setIsConnected(false);
      };
    }
  }, [accessToken, user]);

  const subscribe = (event: string, callback: Function) => {
    socketManager.on(event, callback);
  };

  const unsubscribe = (event: string, callback: Function) => {
    socketManager.off(event, callback);
  };

  return (
    <SocketContext.Provider value={{ isConnected, subscribe, unsubscribe }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within SocketProvider');
  return context;
}
```

---

## 3. Notification Hook

**`src/hooks/useNotifications.ts`**
```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
  data?: any;
}

export function useNotifications() {
  const { subscribe, unsubscribe } = useSocket();
  const queryClient = useQueryClient();
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await api.get('/notifications');
      return data.data;
    },
  });

  // Fetch unread count
  useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: async () => {
      const { data } = await api.get('/notifications/unread-count');
      setUnreadCount(data.count);
      return data.count;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Mark as read mutation
  const markAsRead = useMutation({
    mutationFn: (id: string) => api.put(`/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    },
  });

  // Mark all as read
  const markAllAsRead = useMutation({
    mutationFn: () => api.put('/notifications/read-all'),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      setUnreadCount(0);
    },
  });

  // Listen for new notifications
  useEffect(() => {
    const handleNotification = (notification: Notification) => {
      // Show toast
      toast[notification.type || 'info'](notification.title, {
        duration: 5000,
      });

      // Update count
      setUnreadCount(prev => prev + 1);

      // Invalidate query to refresh list
      queryClient.invalidateQueries(['notifications']);
    };

    subscribe('notification', handleNotification);

    return () => {
      unsubscribe('notification', handleNotification);
    };
  }, [subscribe, unsubscribe, queryClient]);

  return {
    notifications,
    isLoading,
    unreadCount,
    markAsRead: markAsRead.mutate,
    markAllAsRead: markAllAsRead.mutate,
  };
}
```

---

## 4. Notification Bell Component

**`src/components/shared/NotificationBell.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Notifikasi</h3>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllAsRead()}
                className="text-sm text-blue-500 hover:underline"
              >
                Tandai semua dibaca
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <p className="p-4 text-center text-gray-500">Tidak ada notifikasi</p>
            ) : (
              notifications?.map((notif: any) => (
                <div
                  key={notif.id}
                  onClick={() => {
                    markAsRead(notif.id);
                    if (notif.data?.link) {
                      window.location.href = notif.data.link;
                    }
                  }}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    !notif.isRead ? 'bg-blue-50' : ''
                  }`}
                >
                  <p className="font-medium text-sm">{notif.title}</p>
                  {notif.message && (
                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {formatDistanceToNow(new Date(notif.createdAt), {
                      addSuffix: true,
                      locale: id,
                    })}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="p-2 border-t">
            <a
              href="/notifications"
              className="block text-center text-sm text-blue-500 hover:underline"
            >
              Lihat semua notifikasi
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 5. Live Data Updates

**`src/hooks/useLiveData.ts`**
```typescript
'use client';

import { useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useQueryClient } from '@tanstack/react-query';

// Listen for data changes and invalidate queries
export function useLiveDataSync() {
  const { subscribe, unsubscribe } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleChange = (payload: { resource: string; action: string; data: any }) => {
      // Invalidate related queries
      queryClient.invalidateQueries([payload.resource]);

      // Show toast for important changes
      if (payload.action === 'create') {
        console.log(`New ${payload.resource} created`);
      }
    };

    subscribe('data_change', handleChange);

    return () => {
      unsubscribe('data_change', handleChange);
    };
  }, [subscribe, unsubscribe, queryClient]);
}
```

---

## 6. Supabase Realtime (Alternative)

```typescript
// Using Supabase directly for realtime
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Subscribe to changes
useEffect(() => {
  const channel = supabase
    .channel('pengumuman-changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'pengumuman' },
      (payload) => {
        console.log('New pengumuman:', payload.new);
        queryClient.invalidateQueries(['pengumuman']);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

---

## 7. Connection Status Indicator

```typescript
export function ConnectionStatus() {
  const { isConnected } = useSocket();

  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-2 h-2 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      <span className="text-sm text-gray-600">
        {isConnected ? 'Terhubung' : 'Terputus'}
      </span>
    </div>
  );
}
```

---

## Related Documentation

- [API Client](./api-client.md)
- [Notification Service](../05-services/notification-service.md)
