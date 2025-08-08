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
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-primary">
                <Workflow className="w-5 h-5 sm:w-6 sm:h-6 text-workflow-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">n8n Workflow Manager</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Professional automation control</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/signin')}
              size="sm"
              className="bg-gradient-primary hover:bg-workflow-primary-hover text-workflow-primary-foreground text-sm px-3 sm:px-4"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
              Automate Everything with n8n
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              Take control of your workflow automation with our professional n8n management system. 
              Build, execute, and monitor complex automation workflows with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Button 
                size="lg" 
                onClick={() => navigate('/signin')}
                className="bg-gradient-primary hover:bg-workflow-primary-hover text-workflow-primary-foreground text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-workflow-primary text-workflow-primary hover:bg-workflow-primary/10 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Powerful Features for Workflow Automation
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
              Everything you need to manage and scale your automation workflows
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="mx-auto p-2 sm:p-3 rounded-lg bg-gradient-primary text-workflow-primary-foreground mb-3 sm:mb-4 w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-base sm:text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <CardDescription className="text-center text-sm sm:text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 text-center lg:text-left">
                Transform Your Business Processes
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-workflow-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-hero p-6 sm:p-8 rounded-2xl text-center">
                <div className="bg-background/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                  <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-white" />
                  <h5 className="text-lg sm:text-xl font-bold text-white mb-2">
                    Professional Dashboard
                  </h5>
                  <p className="text-sm sm:text-base text-white/80">
                    Monitor all your workflows with real-time analytics and insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to Start Automating?
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-4 sm:px-0">
            Join thousands of professionals who trust our platform for their workflow automation needs.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/signin')}
            className="bg-gradient-primary hover:bg-workflow-primary-hover text-workflow-primary-foreground text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 w-full sm:w-auto"
          >
            Start Managing Workflows
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;