import { WorkflowDashboard } from '@/components/WorkflowDashboard';
import { Workflow, Settings } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Workflow className="w-6 h-6 text-workflow-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">n8n Workflow Manager</h1>
              <p className="text-sm text-muted-foreground">
                Professional workflow automation management
              </p>
            </div>
            <div className="ml-auto">
              <div className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <WorkflowDashboard />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>n8n Workflow Manager - Professional automation control</p>
            <p>Built with React & TypeScript</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
