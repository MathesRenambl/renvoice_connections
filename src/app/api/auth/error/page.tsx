"use client";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Home, RefreshCw, Mail } from "lucide-react";
import Link from "next/link";

// Error mapping with more detailed information
const errorMap = {
  Configuration: {
    title: "Server Configuration Error",
    description: "There's a server configuration issue. Please contact support.",
    icon: AlertCircle,
    severity: "destructive" as const,
    action: "contact"
  },
  AccessDenied: {
    title: "Access Denied",
    description: "You don't have permission to access this account.",
    icon: AlertCircle,
    severity: "destructive" as const,
    action: "login"
  },
  Verification: {
    title: "Email Verification Failed",
    description: "Email verification failed or expired. Please try again.",
    icon: Mail,
    severity: "default" as const,
    action: "retry"
  },
  Default: {
    title: "Authentication Error",
    description: "An unexpected error occurred. Please try again.",
    icon: AlertCircle,
    severity: "destructive" as const,
    action: "retry"
  }
};

export default function AuthErrorPage() {
  const params = useSearchParams();
  const errorType = params.get("error") || "Default";
  const error = errorMap[errorType] || errorMap.Default;
  const IconComponent = error.icon;

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 w-screen">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <IconComponent className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {error.title}
            </CardTitle>
            <CardDescription className="text-base text-gray-600 mt-2">
              Something went wrong with your authentication
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Alert variant={error.severity} className="border-l-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm leading-relaxed">
                {error.description}
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              {error.action === "retry" && (
                <Button 
                  onClick={handleRetry}
                  className="w-full"
                  variant="default"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              )}
              
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Login
                </Link>
              </Button>

              {error.action === "contact" && (
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
              )}
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>Error Code: <span className="font-mono font-medium">{errorType}</span></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}