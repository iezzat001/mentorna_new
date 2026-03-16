
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      } else if (isSignUp) {
        toast({
          title: "Account Created",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="
        w-full 
        max-w-md 
        border-4 
        border-foreground 
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        bg-accent-yellow
      ">
        <CardHeader className="bg-primary border-b-4 border-foreground">
          <CardTitle className="
            font-heading 
            text-2xl 
            font-black 
            uppercase 
            text-center 
            text-primary-foreground
          ">
            {isSignUp ? 'CREATE ACCOUNT' : 'ADMIN LOGIN'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] m-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="font-bold text-sm uppercase mb-2 block">
                Email
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  border-4 
                  border-foreground 
                  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                  font-semibold
                  focus:translate-x-1 
                  focus:translate-y-1 
                  focus:shadow-none 
                  transition-all
                "
                placeholder="ENTER EMAIL"
              />
            </div>
            
            <div>
              <Label className="font-bold text-sm uppercase mb-2 block">
                Password
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  border-4 
                  border-foreground 
                  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                  font-semibold
                  focus:translate-x-1 
                  focus:translate-y-1 
                  focus:shadow-none 
                  transition-all
                "
                placeholder="ENTER PASSWORD"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="
                w-full 
                bg-primary 
                border-4 
                border-foreground 
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                font-black 
                uppercase
                hover:translate-x-1 
                hover:translate-y-1 
                hover:shadow-none 
                transition-all
              "
            >
              {loading ? 'LOADING...' : (isSignUp ? 'SIGN UP' : 'SIGN IN')}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSignUp(!isSignUp)}
              className="
                w-full 
                border-4 
                border-foreground 
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                font-bold 
                uppercase
              "
            >
              {isSignUp ? 'ALREADY HAVE ACCOUNT? SIGN IN' : 'NEED ACCOUNT? SIGN UP'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
