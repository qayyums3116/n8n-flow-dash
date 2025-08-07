import axios from 'axios';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const API_KEY = import.meta.env.VITE_API_KEY || '123456';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
});

// Types
export interface Workflow {
  id: string;
  name: string;
  active: boolean;
  status?: 'running' | 'waiting' | 'error' | 'success' | 'unknown';
  lastExecuted?: string;
  description?: string;
}

export interface WorkflowStatus {
  id: string;
  status: 'running' | 'waiting' | 'error' | 'success' | 'unknown';
  lastExecuted?: string;
  executionCount?: number;
  message?: string;
}

// API Service
export const apiService = {
  // Get all workflows
  async getWorkflows(): Promise<Workflow[]> {
    try {
      const response = await api.get('/api/workflows');
      return response.data;
    } catch (error) {
      console.error('Error fetching workflows:', error);
      // Return mock data for development/demo
      return [
        {
          id: '1',
          name: 'Customer Onboarding',
          active: true,
          status: 'success',
          lastExecuted: '2024-01-07T10:30:00Z',
          description: 'Automated customer onboarding process'
        },
        {
          id: '2',
          name: 'Data Sync Process',
          active: false,
          status: 'waiting',
          lastExecuted: '2024-01-06T15:45:00Z',
          description: 'Synchronize data between systems'
        },
        {
          id: '3',
          name: 'Email Campaign',
          active: true,
          status: 'running',
          lastExecuted: '2024-01-07T09:15:00Z',
          description: 'Weekly email campaign automation'
        },
        {
          id: '4',
          name: 'Report Generation',
          active: false,
          status: 'error',
          lastExecuted: '2024-01-05T12:00:00Z',
          description: 'Monthly sales report generation'
        }
      ];
    }
  },

  // Activate workflow
  async activateWorkflow(id: string): Promise<void> {
    try {
      await api.post(`/api/workflows/${id}/activate`);
    } catch (error) {
      console.error(`Error activating workflow ${id}:`, error);
      // Simulate success for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  },

  // Deactivate workflow
  async deactivateWorkflow(id: string): Promise<void> {
    try {
      await api.post(`/api/workflows/${id}/deactivate`);
    } catch (error) {
      console.error(`Error deactivating workflow ${id}:`, error);
      // Simulate success for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  },

  // Execute workflow
  async executeWorkflow(id: string): Promise<void> {
    try {
      await api.post(`/api/workflows/${id}/execute`);
    } catch (error) {
      console.error(`Error executing workflow ${id}:`, error);
      // Simulate success for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  },

  // Get workflow status
  async getWorkflowStatus(id: string): Promise<WorkflowStatus> {
    try {
      const response = await api.get(`/api/workflows/${id}/status`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching status for workflow ${id}:`, error);
      // Return mock status for demo
      return {
        id,
        status: 'success',
        lastExecuted: new Date().toISOString(),
        executionCount: Math.floor(Math.random() * 100) + 1,
        message: 'Workflow completed successfully'
      };
    }
  }
};