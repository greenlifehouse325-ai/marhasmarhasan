/**
 * Aplikasi Types
 * SMK Marhas Admin Dashboard
 */

// ============================================
// ANNOUNCEMENT TYPES
// ============================================

export interface Announcement {
    id: string;
    title: string;
    content: string;
    excerpt?: string;
    category: AnnouncementCategory;
    priority: 'low' | 'normal' | 'high' | 'urgent';
    targetAudience: TargetAudience;
    image?: string;
    attachments?: { name: string; url: string }[];
    publishedAt?: Date;
    expiresAt?: Date;
    status: 'draft' | 'published' | 'archived';
    views: number;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export type AnnouncementCategory =
    | 'academic'     // Akademik
    | 'event'        // Kegiatan
    | 'administrative' // Administrasi
    | 'holiday'      // Libur
    | 'general';     // Umum

export type TargetAudience = {
    students: boolean;
    teachers: boolean;
    parents: boolean;
    classes?: string[];
    majors?: ('PPLG' | 'TMS' | 'TKJ')[];
};

// ============================================
// NEWS TYPES
// ============================================

export interface News {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    category: NewsCategory;
    images: string[];
    author: string;
    publishedAt?: Date;
    status: 'draft' | 'published' | 'archived';
    featured: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

export type NewsCategory =
    | 'achievement'  // Prestasi
    | 'activity'     // Kegiatan
    | 'education'    // Pendidikan
    | 'sports'       // Olahraga
    | 'technology';  // Teknologi

// ============================================
// ACHIEVEMENT TYPES
// ============================================

export interface Achievement {
    id: string;
    title: string;
    description: string;
    level: 'school' | 'city' | 'province' | 'national' | 'international';
    type: 'academic' | 'sports' | 'arts' | 'technology' | 'other';
    date: Date;
    participants: { id: string; name: string; class: string }[];
    medal?: 'gold' | 'silver' | 'bronze';
    rank?: number;
    images?: string[];
    status: 'draft' | 'published';
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================
// MODERATION TYPES
// ============================================

export interface ModerationReport {
    id: string;
    contentType: 'post' | 'comment' | 'profile';
    contentId: string;
    contentPreview: string;
    reportedUserId: string;
    reportedUserName: string;
    reporterId: string;
    reporterName: string;
    reason: string;
    status: 'pending' | 'reviewed' | 'action_taken' | 'dismissed';
    action?: 'warn' | 'delete' | 'ban';
    reviewedBy?: string;
    reviewedAt?: Date;
    notes?: string;
    createdAt: Date;
}

// ============================================
// BUG REPORT TYPES
// ============================================

export interface BugReport {
    id: string;
    title: string;
    description: string;
    category: 'ui' | 'functionality' | 'performance' | 'security' | 'other';
    severity: 'low' | 'medium' | 'high' | 'critical';
    platform: 'android' | 'ios' | 'web';
    appVersion?: string;
    screenshots?: string[];
    reporterId: string;
    reporterName: string;
    status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'wont_fix';
    assignedTo?: string;
    resolution?: string;
    createdAt: Date;
    updatedAt: Date;
}
