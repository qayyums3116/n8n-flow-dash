import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { StatusBadge } from './StatusBadge';
import { StatusModal } from './StatusModal';
import { useToast } from '@/hooks/use-toast';
import { apiService, Workflow } from '@/services/apiService';
import { Play, BarChart3, Clock } from 'lucide-react';

interface WorkflowCardProps {
  workflow: Workflow;
  onWorkflowUpdate: () => void;
}

export const WorkflowCard = ({ workflow, onWorkflowUpdate }: WorkflowCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const { toast } = useToast();

  const handleToggleActive = async () => {
    setIsLoading(true);
    try {
      if (workflow.active) {
        await apiService.deactivateWorkflow(workflow.id);
        toast({
          title: "Workflow Deactivated",
          description: `${workflow.name} has been deactivated.`,
        });
      } else {
        await apiService.activateWorkflow(workflow.id);
        toast({
          title: "Workflow Activated",
          description: `${workflow.name} has been activated.`,
        });
      }
      onWorkflowUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update workflow status.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      <Card className="border-border bg-card/70 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 shadow-workflow">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0 w-full sm:w-auto">
              <div className="flex items-center gap-3 mb-2">
                <StatusBadge status={workflow.active ? 'success' : 'unknown'} />
                <CardTitle className="text-base sm:text-lg text-foreground truncate">
                  {workflow.name}
                </CardTitle>
              </div>
              {workflow.description && (
                <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                  {workflow.description}
                </CardDescription>
              )}
            </div>
            
            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <div className="text-xs text-muted-foreground sm:hidden">
                ID: {workflow.id}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground hidden sm:block">
                  ID: {workflow.id}
                </div>
                <Switch
                  checked={workflow.active}
                  onCheckedChange={handleToggleActive}
                  disabled={isLoading}
                  className="data-[state=checked]:bg-workflow-success"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Last executed:</span>
                <span className="sm:hidden">Last:</span>
                <span>{workflow.lastExecuted ? formatDate(workflow.lastExecuted) : 'Never'}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                onClick={handleExecute}
                disabled={isLoading}
                size="sm"
                className="bg-gradient-primary hover:bg-workflow-primary-hover text-workflow-primary-foreground flex-1 sm:flex-none"
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Execute</span>
                <span className="sm:hidden">Run</span>
              </Button>
              
              <Button
                onClick={() => setShowStatusModal(true)}
                variant="outline"
                size="sm"
                className="border-workflow-info/30 text-workflow-info hover:bg-workflow-info/10 flex-1 sm:flex-none"
              >
                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Status</span>
                <span className="sm:hidden">Info</span>
              </Button>
            </div>
          </div>
        </CardContent>
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