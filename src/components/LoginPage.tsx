
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Mail } from 'lucide-react';
import { useAuth } from './AuthProvider';

export const LoginPage = () => {
  const { login, loading } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleLogin = async (provider: string) => {
    setLoadingProvider(provider);
    await login(provider);
    setLoadingProvider(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse-slow" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <Card className="w-full max-w-md glass-card relative z-10 animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            ST
          </div>
          <div>
            <CardTitle className="text-2xl font-bold gradient-text">
              Smart Share Todo
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Collaborative task management with real-time updates
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Button
            onClick={() => handleLogin('Google')}
            disabled={loading}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            variant="outline"
          >
            {loadingProvider === 'Google' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent" />
            ) : (
              <>
                <Mail className="w-5 h-5 mr-2 text-red-500" />
                Continue with Google
              </>
            )}
          </Button>
          
          <Button
            onClick={() => handleLogin('GitHub')}
            disabled={loading}
            className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            {loadingProvider === 'GitHub' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent" />
            ) : (
              <>
                <Github className="w-5 h-5 mr-2" />
                Continue with GitHub
              </>
            )}
          </Button>
          
          <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/50">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
