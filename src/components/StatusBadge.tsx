import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'running' | 'waiting' | 'error' | 'success' | 'unknown';
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'running':
        return 'bg-workflow-info text-workflow-info-foreground animate-pulse-subtle';
      case 'success':
        return 'bg-workflow-success text-workflow-success-foreground';
      case 'error':
        return 'bg-workflow-danger text-workflow-danger-foreground';
      case 'waiting':
        return 'bg-workflow-warning text-workflow-warning-foreground';
      default:
        return 'bg-workflow-neutral text-workflow-neutral-foreground';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'running':
        return 'Running';
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'waiting':
        return 'Waiting';
      default:
        return 'Unknown';
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200",
        getStatusStyles(),
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
      {getStatusText()}
    </span>
  );
};