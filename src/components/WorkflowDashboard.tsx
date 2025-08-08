import { useState, useEffect } from 'react';
import { WorkflowCard } from './WorkflowCard';
import WorkflowAnalytics from './WorkflowAnalytics';
import { apiService, Workflow } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Activity, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WorkflowDashboard = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchWorkflows = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiService.getWorkflows();
      setWorkflows(data);
    } catch (error) {
      setError('Failed to fetch workflows');
      toast({
        title: "Error",
        description: "Failed to load workflows. Showing demo data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const getStatusCounts = () => {
    const counts = {
      total: workflows.length,
      active: workflows.filter(w => w.active).length,
      running: workflows.filter(w => w.status === 'running').length,
      errors: workflows.filter(w => w.status === 'error').length,
    };
    return counts;
  };

  const stats = getStatusCounts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-workflow-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading workflows...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-3 sm:p-4 rounded-lg border border-border bg-card text-center">
          <div className="text-xl sm:text-2xl font-bold text-workflow-primary-foreground">{stats.total}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">Total Workflows</div>
        </div>
        <div className="p-3 sm:p-4 rounded-lg border border-border bg-card text-center">
          <div className="text-xl sm:text-2xl font-bold text-workflow-success">{stats.active}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">Active</div>
        </div>
        <div className="p-3 sm:p-4 rounded-lg border border-border bg-card text-center">
          <div className="text-xl sm:text-2xl font-bold text-workflow-info">{stats.running}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">Running</div>
        </div>
        <div className="p-3 sm:p-4 rounded-lg border border-border bg-card text-center">
          <div className="text-xl sm:text-2xl font-bold text-workflow-danger">{stats.errors}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">Errors</div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-workflow-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Workflows</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage and monitor your n8n workflows
            </p>
          </div>
        </div>
        <Button
          onClick={fetchWorkflows}
          variant="outline"
          size="sm"
          disabled={isLoading}
          className="border-workflow-primary/20 hover:bg-workflow-primary/5 w-full sm:w-auto"
        >
          <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-3 sm:p-4 rounded-lg border border-workflow-danger/20 bg-workflow-danger/5 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-workflow-danger flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-workflow-danger-foreground">Connection Error</p>
            <p className="text-xs text-muted-foreground">
              Unable to connect to the backend. Showing demo data for testing.
            </p>
          </div>
        </div>
      )}

      {/* Workflows Grid */}
      {workflows.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <Activity className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">No Workflows Found</h3>
          <p className="text-sm text-muted-foreground px-4 sm:px-0">
            No workflows are currently available. Check your n8n instance or create new workflows.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6">
          {workflows.map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              onWorkflowUpdate={fetchWorkflows}
            />
          ))}
        </div>
      )}

      {/* Analytics Section */}
      <WorkflowAnalytics />
    </div>
  );
};