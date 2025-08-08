import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import { apiService, WorkflowStatus } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2,
  RefreshCw,
  Activity,
  Hash,
  Clock,
  MessageSquare,
} from 'lucide-react';

interface StatusModalProps {
  workflowId: string;
  workflowName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const StatusModal = ({
  workflowId,
  workflowName,
  isOpen,
  onClose,
}: StatusModalProps) => {
  const [status, setStatus] = useState<WorkflowStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const result = await apiService.getWorkflowStatus(workflowId);
      setStatus(result);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch workflow status.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchStatus();
  }, [isOpen, workflowId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-workflow-info" />
            Workflow Status
          </DialogTitle>
          <DialogDescription>
            Current status for <strong>{workflowName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-workflow-primary" />
              <span className="ml-2 text-muted-foreground">Loading status...</span>
            </div>
          ) : status ? (
            <>
              {/* Status Card */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-workflow-primary/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-workflow-primary/10">
                    <Activity className="w-4 h-4 text-workflow-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Current Status</p>
                    <p className="text-sm text-muted-foreground">Real-time state</p>
                  </div>
                </div>
                <StatusBadge status={status.status} />
              </div>

              {/* Execution Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-1">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Executions</span>
                  </div>
                  <p className="text-xl font-semibold text-workflow-primary-foreground">
                    {status.executionCount ?? 0}
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Last Run</span>
                  </div>
                  <p className="text-sm text-foreground">
                    {formatDate(status.lastExecuted)}
                  </p>
                </div>
              </div>

              {/* Optional Message */}
              {status.message && (
                <div className="p-4 rounded-lg border border-workflow-info/20 bg-workflow-info/5">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-workflow-info" />
                    <span className="text-sm font-medium text-workflow-info-foreground">
                      Message
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{status.message}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No status data available.
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between pt-4 border-t border-border">
            <Button
              onClick={fetchStatus}
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="border-workflow-primary/20 hover:bg-workflow-primary/5"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={onClose} size="sm">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
