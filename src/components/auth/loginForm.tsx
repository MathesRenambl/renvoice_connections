'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, User } from "lucide-react";

const loginSchema = z.object({
  memberEmail: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  memberPassword: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .regex(/^\S*$/, "Password cannot contain whitespace")
    .min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (data: LoginFormData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLoading, onSubmit }) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      memberEmail: "",
      memberPassword: "",
    },
  });
  const[showPassword, setShowPassword] = React.useState(false);
  const handleSubmit = (data: LoginFormData) => {
    onSubmit(data);
  };

  return (
    <div className="w-full max-w-md">
      <Card className="p-6 space-y-4 border border-gray-200 shadow-lg rounded-lg mx-4 sm:mx-0">
        <CardHeader className="space-y-2 p-0">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <User className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center text-sm">
            Sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="memberEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="name@example.com"
                        className="text-sm"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="memberPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="**********"
                          className="text-sm pr-10"
                          disabled={isLoading}
                        />
                        {field.value.length>0&&<button
                          type="button"
                          tabIndex={-1}
                          className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>} 
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full text-sm" 
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;