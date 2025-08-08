import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'running' | 'waiting' | 'error' | 'success' | 'unknown';
  className?: string;
}

const STATUS_STYLES: Record<StatusBadgeProps['status'], string> = {
  running: 'bg-workflow-info text-workflow-info-foreground animate-pulse-subtle',
  success: 'bg-workflow-success text-workflow-success-foreground',
  error: 'bg-workflow-danger text-workflow-danger-foreground',
  waiting: 'bg-workflow-warning text-workflow-warning-foreground',
  unknown: 'bg-workflow-neutral text-workflow-neutral-foreground',
};

const STATUS_TEXT: Record<StatusBadgeProps['status'], string> = {
  running: 'Running',
  success: 'Success',
  error: 'Error',
  waiting: 'Waiting',
  unknown: 'Unknown',
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200',
        STATUS_STYLES[status],
        className
      )}
      aria-label={`Status: ${STATUS_TEXT[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {STATUS_TEXT[status]}
    </span>
  );
};
