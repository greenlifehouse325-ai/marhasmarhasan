/**
 * Shared Components Index
 * SMK Marhas Admin Dashboard
 * 
 * Export all shared components from one place
 */

// Modal Components
export { Modal } from './Modal';
export { ConfirmModal } from './ConfirmModal';
export { DoubleConfirmModal } from './DoubleConfirmModal';
export { default as TripleConfirmModal } from './TripleConfirmModal';

// Data Display
export { DataTable } from './DataTable';
export type { Column, DataTableProps } from './DataTable';

// Stats
export { StatWidget, StatWidgetCompact, StatWidgetLarge } from './StatWidget';

// AI
export { AIAssistant } from './AIAssistant';

// Export
export { ExportButton } from './ExportButton';

// Charts
export { ChartCard } from './ChartCard';
export { LineChart } from './LineChart';
export { BarChart } from './BarChart';
export { PieChart } from './PieChart';

// Safety
export { CooldownAction } from './CooldownAction';

// Audit
export { AuditTrail } from './AuditTrail';

// Theme
export { default as ThemeToggle } from './ThemeToggle';

// Layout
export { PageHeader } from './PageHeader';
export { DrawerPanel } from './DrawerPanel';
export { BackButton } from './BackButton';
export { EmptyState, SearchEmptyState, TableEmptyState } from './EmptyState';
export { Breadcrumb, createBreadcrumbFromPath, DEFAULT_PATH_LABELS } from './Breadcrumb';
export type { BreadcrumbItem } from './Breadcrumb';

// Form
export { FileUpload } from './FileUpload';

// Notifications
export { ToastProvider, useToast } from './Toast';
export { AlertBanner } from './AlertBanner';

// Loading States
export {
    Skeleton,
    SkeletonText,
    SkeletonAvatar,
    SkeletonCard,
    SkeletonStat,
    SkeletonTableRow,
    SkeletonTable,
    SkeletonChart,
    SkeletonPageHeader,
    SkeletonDashboard
} from './Skeleton';

// Placeholder
export { ComingSoon } from './ComingSoon';
