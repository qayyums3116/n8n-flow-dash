import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
console.log("BASE URL:", API_BASE_URL); // ✅ Confirm actual value

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const apiService = {
  async getWorkflows(): Promise<Workflow[]> {
    try {
      const response = await api.get('/api/workflows');
      console.log('✅ Workflows fetched:', response.data); // ✅ See if it's correct
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching workflows:', error); // 🧠 This will catch CORS, 500s, network issues
      return [];
    }
  },

  async activateWorkflow(id: string): Promise<void> {
    try {
      const response = await api.post(`/api/workflows/${id}/activate`);
      console.log(`✅ Activated workflow ${id}`, response.data);
    } catch (error) {
      console.error(`❌ Error activating workflow ${id}:`, error);
    }
  },

  async deactivateWorkflow(id: string): Promise<void> {
    try {
      const response = await api.post(`/api/workflows/${id}/deactivate`);
      console.log(`✅ Deactivated workflow ${id}`, response.data);
    } catch (error) {
      console.error(`❌ Error deactivating workflow ${id}:`, error);
    }
  },

  async executeWorkflow(id: string): Promise<void> {
    try {
      const response = await api.post(`/api/workflows/${id}/execute`);
      console.log(`✅ Executed workflow ${id}`, response.data);
    } catch (error) {
      console.error(`❌ Error executing workflow ${id}:`, error);
    }
  },

  async getWorkflowStatus(id: string): Promise<WorkflowStatus> {
    try {
      const response = await api.get(`/api/workflows/${id}/status`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching status for workflow ${id}:`, error);
      return {
        id,
        status: 'unknown',
        message: 'Status not available',
      };
    }
  },
};
