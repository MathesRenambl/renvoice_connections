"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User } from "lucide-react";

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
import {
  saveToLocalStorage,
} from "@/components/encryption/encryption";

//  Zod Schema for Validation
const loginSchema = z.object({
  memberEmail: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  memberPassword: z
    .string()
    .min(5, "Password must be at least 5 characters")
    .regex(/^\S*$/, "Password cannot contain whitespace")
    .min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { URL, setIsLogedIn } = useAppContext();
  const { alert, showAlert, hideAlert } = useAlert();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      memberEmail: "",
      memberPassword: "",
    },
  });

  // Auto redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session?.accessToken) {
        router.push("/connections/dashboard");
      }
    };
    checkSession();

    return () => setIsLoading(false);
  }, []);

  //  Login Submit Logic
  const handleSubmit = async (formData: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...formData,
        callbackUrl: "/connections/dashboard",
      });

      if (res?.status === 200) {
        const session = await getSession();
        saveToLocalStorage("orgId", session?.orgId);
        saveToLocalStorage("token", session?.accessToken);
        saveToLocalStorage("email", session?.user?.email);
        saveToLocalStorage("role", session?.role[0]);
        saveToLocalStorage("memberId", session?.memberId);
        saveToLocalStorage("orgLogo", session?.orgLogo);
        router.replace("/connections/dashboard");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        showAlert("Invalid Username or Password", "error");
      }
    } catch (error) {
      setIsLogedIn(false);
      console.error("Login error", error);
      setIsLoading(false);
    }
  };

  const debouncedSubmit = debounceApiCall(handleSubmit, 1000);

  if (isLoading) return <Preloader />;

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md md:border-2 border-primary/10 rounded-lg"
      >
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
                <form onSubmit={form.handleSubmit(debouncedSubmit)} className="space-y-4">
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
                            {field.value.length > 0 && (
                              <button
                                type="button"
                                tabIndex={-1}
                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full text-sm" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Login"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </MotionDiv>

      {alert && <Alert alert={alert} hideAlert={hideAlert} />}
    </div>
  );
}
