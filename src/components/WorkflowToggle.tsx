import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { apiService } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

interface WorkflowToggleProps {
  id: string;
  active: boolean;
  name: string;
  onUpdate: () => void;
}

const WorkflowToggle = ({ id, active, name, onUpdate }: WorkflowToggleProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (active) {
        await apiService.deactivateWorkflow(id);
        toast({
          title: 'Workflow Deactivated',
          description: `${name} has been deactivated.`,
        });
      } else {
        await apiService.activateWorkflow(id);
        toast({
          title: 'Workflow Activated',
          description: `${name} has been activated.`,
        });
      }
      onUpdate();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update workflow status.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Switch
      checked={active}
      onCheckedChange={handleToggle}
      disabled={loading}
      className="data-[state=checked]:bg-workflow-success"
    />
  );
};

export default WorkflowToggle;
