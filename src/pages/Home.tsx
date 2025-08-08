import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Workflow, Zap, Shield, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Workflow Management",
      description: "Create, edit, and manage complex automation workflows with ease"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Execution",
      description: "Execute workflows instantly and monitor their status in real-time"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description: "Track performance metrics and analyze workflow efficiency"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with reliable workflow execution"
    }
  ];

  const benefits = [
    "Streamline complex business processes",
    "Reduce manual work and human error",
    "Scale automation across your organization",
    "Monitor and optimize workflow performance"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Workflow className="w-6 h-6 text-workflow-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">n8n Workflow Manager</h1>
                <p className="text-sm text-muted-foreground">Professional automation control</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/signin')}
              className="bg-gradient-primary hover:bg-workflow-primary-hover text-workflow-primary-foreground"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <h2 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
              Automate Everything with n8n
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Take control of your workflow automation with our professional n8n management system. 
              Build, execute, and monitor complex automation workflows with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/signin')}
                className="bg-gradient-primary hover:bg-workflow-primary-hover text-workflow-primary-foreground text-lg px-8 py-6"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-workflow-primary text-workflow-primary hover:bg-workflow-primary/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Powerful Features for Workflow Automation
            </h3>
            <p className="text-lg text-muted-foreground">
              Everything you need to manage and scale your automation workflows
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 rounded-lg bg-gradient-primary text-workflow-primary-foreground mb-4 w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-bold text-foreground mb-6">
                Transform Your Business Processes
              </h4>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-workflow-success flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-hero p-8 rounded-2xl text-center">
                <div className="bg-background/10 backdrop-blur-sm rounded-xl p-6">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-white" />
                  <h5 className="text-xl font-bold text-white mb-2">
                    Professional Dashboard
                  </h5>
                  <p className="text-white/80">
                    Monitor all your workflows with real-time analytics and insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Automating?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of professionals who trust our platform for their workflow automation needs.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/signin')}
            className="bg-gradient-primary hover:bg-workflow-primary-hover text-workflow-primary-foreground text-lg px-12 py-6"
          >
            Start Managing Workflows
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;