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
import { Loader2, RefreshCw, Activity, Hash, Clock, MessageSquare } from 'lucide-react';

interface StatusModalProps {
  workflowId: string;
  workflowName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const StatusModal = ({ workflowId, workflowName, isOpen, onClose }: StatusModalProps) => {
  const [status, setStatus] = useState<WorkflowStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const workflowStatus = await apiService.getWorkflowStatus(workflowId);
      setStatus(workflowStatus);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch workflow status.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen, workflowId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-w-[90vw] w-full mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-workflow-info" />
            Workflow Status
          </DialogTitle>
          <DialogDescription className="text-sm">
            Current status and details for <strong>{workflowName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-6 sm:py-8">
              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-workflow-primary" />
              <span className="ml-2 text-sm text-muted-foreground">Loading status...</span>
            </div>
          ) : status ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/30 border border-workflow-primary/10 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-workflow-primary/10">
                    <Activity className="w-4 h-4 text-workflow-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">Current Status</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Real-time workflow state</p>
                  </div>
                </div>
                <StatusBadge status={status.status} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Executions</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-workflow-primary-foreground">
                    {status.executionCount || 0}
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Last Run</span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground">
                    {formatDate(status.lastExecuted)}
                  </p>
                </div>
              </div>

              {status.message && (
                <div className="p-3 sm:p-4 rounded-lg border border-workflow-info/20 bg-workflow-info/5">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-workflow-info" />
                    <span className="text-sm font-medium text-workflow-info-foreground">Message</span>
                  </div>
                  <p className="text-sm text-foreground break-words">{status.message}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <p className="text-sm text-muted-foreground">No status data available</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t border-border">
            <Button
              onClick={fetchStatus}
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="border-workflow-primary/20 hover:bg-workflow-primary/5 w-full sm:w-auto"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={onClose} size="sm" className="w-full sm:w-auto">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};