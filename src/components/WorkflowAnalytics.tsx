import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Activity, Clock, CheckCircle } from 'lucide-react';

const WorkflowAnalytics = () => {
  // Sample data for charts
  const executionData = [
    { name: 'Mon', executions: 24, success: 22, failed: 2 },
    { name: 'Tue', executions: 32, success: 30, failed: 2 },
    { name: 'Wed', executions: 18, success: 16, failed: 2 },
    { name: 'Thu', executions: 45, success: 42, failed: 3 },
    { name: 'Fri', executions: 38, success: 35, failed: 3 },
    { name: 'Sat', executions: 15, success: 14, failed: 1 },
    { name: 'Sun', executions: 20, success: 19, failed: 1 },
  ];

  const statusData = [
    { name: 'Success', value: 138, color: 'hsl(var(--workflow-success))' },
    { name: 'Failed', value: 14, color: 'hsl(var(--workflow-danger))' },
    { name: 'Running', value: 8, color: 'hsl(var(--workflow-info))' },
  ];

  const performanceData = [
    { time: '00:00', avgTime: 2.3 },
    { time: '04:00', avgTime: 1.8 },
    { time: '08:00', avgTime: 3.2 },
    { time: '12:00', avgTime: 4.1 },
    { time: '16:00', avgTime: 3.5 },
    { time: '20:00', avgTime: 2.1 },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Execution Trends */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-workflow-info" />
            <CardTitle>Weekly Execution Trends</CardTitle>
          </div>
          <CardDescription>
            Daily workflow execution statistics for the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={executionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar 
                dataKey="success" 
                fill="hsl(var(--workflow-success))" 
                radius={[2, 2, 0, 0]}
                name="Successful"
              />
              <Bar 
                dataKey="failed" 
                fill="hsl(var(--workflow-danger))" 
                radius={[2, 2, 0, 0]}
                name="Failed"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-workflow-warning" />
            <CardTitle>Execution Status</CardTitle>
          </div>
          <CardDescription>
            Distribution of workflow execution results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {statusData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-muted-foreground">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="border-border bg-card/50 backdrop-blur-sm lg:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-workflow-info" />
            <CardTitle>Average Execution Time</CardTitle>
          </div>
          <CardDescription>
            Average workflow execution time throughout the day (in seconds)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value) => [`${value}s`, 'Avg Time']}
              />
              <Line 
                type="monotone" 
                dataKey="avgTime" 
                stroke="hsl(var(--workflow-info))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--workflow-info))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(var(--workflow-info))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowAnalytics;