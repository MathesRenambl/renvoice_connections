"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus, Building } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MotionDiv } from "@/components/ui/motion-div";
import Alert from "@/components/alert/alert";
import Preloader from "@/components/ui/presloader";
import { useAppContext } from "@/hooks/context";
import { useAlert } from "@/hooks/alertHook";
import { debounceApiCall } from "@/lib/debounce";

//  Zod Schema for Validation
const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]*$/, "First name can only contain letters and spaces"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]*$/, "Last name can only contain letters and spaces"),
  memberEmail: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  organizationName: z
    .string()
    .min(1, "Organization name is required")
    .min(2, "Organization name must be at least 2 characters"),
  memberPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number")
    .regex(/^\S*$/, "Password cannot contain whitespace"),
  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
}).refine((data) => data.memberPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { URL } = useAppContext();
  const { alert, showAlert, hideAlert } = useAlert();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      memberEmail: "",
      organizationName: "",
      memberPassword: "",
      confirmPassword: "",
    },
  });

  // Auto redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session?.accessToken) {
        router.push("/register");
      }
    };
    //checkSession();

    return () => setIsLoading(false);
  }, []);

  //  Signup Submit Logic
  const handleSubmit = async (formData: SignupFormData) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...signupData } = formData;
       const apiData = {
      email: signupData.memberEmail,          
      name: signupData.organizationName,      
      firstName: signupData.firstName,         
      lastName: signupData.lastName,
      password: signupData.memberPassword     
    };
    
      
      const response = await fetch(`${URL}/organization/registerOrganization`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

    //   if (response.ok) {
    //     showAlert("Registration successful! Please check your email to verify your account.", "success");
    //     // Optionally redirect to login page after a delay
    //     setTimeout(() => {
    //       router.push("/connections/login");
    //     }, 3000);
    //   } else {
    //     showAlert(result.message || "Registration failed. Please try again.", "error");
    //   }
      
    if (response.ok) {
      showAlert("Registration successful! Please check your email to verify your account.", "success");
      // Optionally redirect to login page after a delay
      setTimeout(() => {
        router.push("/connectionLogin");
      }, 3000);
    } else {
      showAlert(result.Error || result.message || "Registration failed. Please try again.", "error");
    }

      setIsLoading(false);
    } catch (error) {
      console.error("Signup error", error);
      showAlert("An error occurred during registration. Please try again.", "error");
      setIsLoading(false);
    }
  };

  const debouncedSubmit = debounceApiCall(handleSubmit, 1000);

  if (isLoading) return <Preloader />;

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="p-4 border border-gray-200 shadow-lg rounded-lg">
          <CardHeader className="space-y-1 p-0 pb-4 text-center">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-primary/10 p-2">
                <UserPlus className="h-5 w-5 text-primary" />
              </div>
            </div>
            <CardTitle className="text-lg">Create Account</CardTitle>
            <CardDescription className="text-xs">
              Sign up to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(debouncedSubmit)} className="space-y-3">
                {/* Name fields in one row */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="John"
                            className="text-xs h-8"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Doe"
                            className="text-xs h-8"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email and Organization in one row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="memberEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="name@example.com"
                            className="text-xs h-8"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">Organization</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type="text"
                              placeholder="Company Name"
                              className="text-xs h-8 pl-8"
                              disabled={isLoading}
                            />
                            <Building className="h-3 w-3 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Password fields in one row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="memberPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="text-xs h-8 pr-8"
                              disabled={isLoading}
                            />
                            {field.value.length > 0 && (
                              <button
                                type="button"
                                tabIndex={-1}
                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                              >
                                {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              </button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="text-xs h-8 pr-8"
                              disabled={isLoading}
                            />
                            {field.value.length > 0 && (
                              <button
                                type="button"
                                tabIndex={-1}
                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                              >
                                {showConfirmPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              </button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full text-xs h-9 mt-4" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </Form>

            <div className="text-center text-xs text-gray-600 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={() => router.push("/connectionLogin")}
              >
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>

      {alert && <Alert alert={alert} hideAlert={hideAlert} />}
    </div>
  );
}