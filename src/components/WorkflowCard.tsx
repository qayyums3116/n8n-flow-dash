import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import { StatusModal } from './StatusModal';
import { useToast } from '@/hooks/use-toast';
import { apiService, Workflow } from '@/services/apiService';
import { Play, BarChart3, Clock } from 'lucide-react';
import WorkflowToggle from './WorkflowToggle';

interface WorkflowCardProps {
  workflow: Workflow;
  onWorkflowUpdate: () => void;
}

export const WorkflowCard = ({ workflow, onWorkflowUpdate }: WorkflowCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const { toast } = useToast();

  const handleExecute = async () => {
    setIsLoading(true);
    try {
      await apiService.executeWorkflow(workflow.id);
      toast({
        title: "Workflow Executed",
        description: `${workflow.name} has been executed successfully.`,
      });
      onWorkflowUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to execute workflow.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Card className="p-6 transition-all duration-300 hover:shadow-workflow-lg border-2 hover:border-workflow-primary/20 group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-workflow-primary-foreground transition-colors">
                {workflow.name}
              </h3>
              {workflow.status && <StatusBadge status={workflow.status} />}
            </div>
            {workflow.description && (
              <p className="text-sm text-muted-foreground mb-3">
                {workflow.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Last executed: {formatDate(workflow.lastExecuted)}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-sm text-muted-foreground">
              {workflow.active ? 'Active' : 'Inactive'}
            </span>
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground">Toggle</label>
              <WorkflowToggle
                id={workflow.id}
                active={workflow.active}
                name={workflow.name}
                onUpdate={onWorkflowUpdate}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Button
            onClick={handleExecute}
            disabled={isLoading || !workflow.active}
            size="sm"
            className="bg-workflow-primary hover:bg-workflow-primary-hover text-workflow-primary-foreground"
          >
            <Play className="w-4 h-4 mr-1" />
            Execute
          </Button>

          <Button
            onClick={() => setShowStatusModal(true)}
            variant="outline"
            size="sm"
            className="border-workflow-primary/20 hover:bg-workflow-primary/5"
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Status
          </Button>

          <div className="ml-auto text-xs text-muted-foreground font-medium">
            ID: {workflow.id}
          </div>
        </div>
      </Card>

      <StatusModal
        workflowId={workflow.id}
        workflowName={workflow.name}
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
      />
    </>
  );
};
