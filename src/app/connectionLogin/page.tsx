"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Shield, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MotionDiv } from "@/components/ui/motion-div";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Alert from "@/components/alert/alert";
import Preloader from "@/components/ui/presloader";
import { useAppContext } from "@/hooks/context";
import { useAlert } from "@/hooks/alertHook";
import { debounceApiCall } from "@/lib/debounce";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Zod Schema for Email Validation
const emailSchema = z.object({
    memberEmail: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

// Zod Schema for OTP Validation
const otpSchema = z.object({
    otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits").regex(/^\d{6}$/, "OTP must contain only numbers"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

export default function LoginPage() {
    const { URL, setIsLogedIn } = useAppContext();
    const { alert, showAlert, hideAlert } = useAlert();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [userEmail, setUserEmail] = useState('');
    const [otpValue, setOtpValue] = useState('');
    const [resendTimer, setResendTimer] = useState(0);
    const mobile = useMediaQuery("mobile");
    const emailForm = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            memberEmail: "",
        },
    });

    const otpForm = useForm<OTPFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
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

    // Timer effect for resend OTP
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    // Email Submit Logic - Send OTP
    const handleEmailSubmit = async (formData: EmailFormData) => {
        setIsLoading(true);
        setStep('otp');
        try {
            // Call your API to send OTP
            const response = await fetch(`${URL}/api/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.memberEmail }),
            });

            if (response.ok) {
                setUserEmail(formData.memberEmail);
                setStep('otp');
                setResendTimer(30); // 30 seconds cooldown
                showAlert("OTP sent to your email successfully!", "success");
            } else {
                const errorData = await response.json();
                // showAlert(errorData.message || "Failed to send OTP", "error");
            }
        } catch (error) {
            console.error("Send OTP error", error);
            showAlert("An error occurred while sending OTP", "error");
        } finally {
            setIsLoading(false);
        }
    };

    // OTP Submit Logic - Verify and Login
    const handleOTPSubmit = async (formData: OTPFormData) => {
        setIsLoading(true);
        try {
            // First verify OTP
            const otpResponse = await fetch(`${URL}/api/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    otp: formData.otp
                }),
            });

            if (otpResponse.ok) {
                // If OTP is verified, proceed with login
                const res = await signIn("credentials", {
                    redirect: false,
                    memberEmail: userEmail,
                    memberPassword: formData.otp, // Use OTP as password for verification
                    callbackUrl: "/connections/dashboard",
                });

                if (res?.status === 200) {
                    router.replace("/connections/dashboard");
                } else {
                    showAlert("Login failed after OTP verification", "error");
                }
            } else {
                const errorData = await otpResponse.json();
                showAlert(errorData.message || "Invalid OTP", "error");
                // Clear OTP input on error
                setOtpValue('');
                otpForm.setValue('otp', '');
            }
        } catch (error) {
            setIsLogedIn(false);
            console.error("OTP verification error", error);
            showAlert("An error occurred during verification", "error");
            setOtpValue('');
            otpForm.setValue('otp', '');
        } finally {
            setIsLoading(false);
        }
    };

    // Resend OTP
    const handleResendOTP = async () => {
        if (resendTimer > 0) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${URL}/api/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail }),
            });

            if (response.ok) {
                setResendTimer(30);
                showAlert("OTP resent successfully!", "success");
            } else {
                showAlert("Failed to resend OTP", "error");
            }
        } catch (error) {
            console.error("Resend OTP error", error);
            showAlert("An error occurred while resending OTP", "error");
        } finally {
            setIsLoading(false);
        }
    };

    // Go back to email step
    const handleBackToEmail = () => {
        setStep('email');
        setUserEmail('');
        setOtpValue('');
        otpForm.setValue('otp', '');
        setResendTimer(0);
    };

    const debouncedEmailSubmit = debounceApiCall(handleEmailSubmit, 1000);
    const debouncedOTPSubmit = debounceApiCall(handleOTPSubmit, 1000);

    if (isLoading && step === 'email') return <Preloader />;

    return (
        <div className="w-full min-h-[calc(100vh-8rem)] px-6 py-4">
            <div className="flex items-center gap-3 w-[200px]">
                <Link href="/dashboard" className="flex items-center">
                    {/* Placeholder logo - replace with your actual logo */}
                    <div className="flex items-center gap-2">

                        <span className="font-semibold text-lg text-gray-800">
                            <Image
                                src="/renvoice.png"
                                alt="Logo"
                                width={mobile ? 100 : 140}
                                height={40}
                                className="object-contain"
                                priority
                            />
                        </span>
                    </div>

                    {/* Alternative: Image logo (uncomment when you have your logo) */}
                    {/* <Image
                            src="/your-logo.png"
                            alt="Logo"
                            width={mobile ? 100 : 140}
                            height={40}
                            className="object-contain"
                            priority
                        /> */}
                </Link>
            </div>
            <div className="w-full h-full flex items-center justify-center">

                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md md:border-2 border-primary/10 rounded-lg"
                >
                    <div className="w-full max-w-md">
                        <Card className="p-6 space-y-4 border border-gray-200 shadow-lg rounded-lg mx-4 sm:mx-0">
                            <CardHeader className="space-y-2 p-0">
                                <div className="relative">
                                    {step === 'otp' && (
                                        <button
                                            type="button"
                                            onClick={handleBackToEmail}
                                            className="absolute top-0 left-0 flex items-center text-primary hover:text-primary/80 transition-colors p-1 rounded-md hover:bg-primary/10"
                                            disabled={isLoading}
                                        >
                                            <ArrowLeft className="h-5 w-5" />
                                        </button>
                                    )}
                                    <div className="flex justify-center">
                                        <div className="rounded-full bg-primary/10 p-3">
                                            {step === 'email' ? (
                                                <User className="h-6 w-6 text-primary" />
                                            ) : (
                                                <Shield className="h-6 w-6 text-primary" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <CardTitle className="text-xl text-center">
                                    {step === 'email' ? 'Welcome back' : 'Verify your identity'}
                                </CardTitle>
                                <CardDescription className="text-center text-sm">
                                    {step === 'email'
                                        ? 'Enter your email to receive an OTP'
                                        : `We've sent a 6-digit code to ${userEmail}`
                                    }
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4 p-0">
                                {step === 'email' ? (
                                    <Form {...emailForm}>
                                        <form onSubmit={emailForm.handleSubmit(debouncedEmailSubmit)} className="space-y-4">
                                            <FormField
                                                control={emailForm.control}
                                                name="memberEmail"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm">Email</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                                <Input
                                                                    {...field}
                                                                    type="email"
                                                                    placeholder="name@example.com"
                                                                    className="text-sm pl-10"
                                                                    disabled={isLoading}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type="submit" className="w-full text-sm" disabled={isLoading}>
                                                {isLoading ? "Sending OTP..." : "Send OTP"}
                                            </Button>
                                        </form>
                                    </Form>
                                ) : (
                                    <Form {...otpForm}>
                                        <form onSubmit={otpForm.handleSubmit(debouncedOTPSubmit)} className="space-y-6">
                                            <FormField
                                                control={otpForm.control}
                                                name="otp"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-4">
                                                        <FormLabel className="text-sm text-center block">Enter 6-digit OTP</FormLabel>
                                                        <FormControl>
                                                            <div className="flex justify-center">
                                                                <InputOTP
                                                                    maxLength={6}
                                                                    value={otpValue}
                                                                    onChange={(value) => {
                                                                        setOtpValue(value);
                                                                        field.onChange(value);
                                                                    }}
                                                                    disabled={isLoading}
                                                                    onKeyDown={(e) => {
                                                                        // Allow only number keys and control keys (like backspace)
                                                                        if (
                                                                            !/[0-9]/.test(e.key) &&
                                                                            e.key !== "Backspace" &&
                                                                            e.key !== "ArrowLeft" &&
                                                                            e.key !== "ArrowRight" &&
                                                                            e.key !== "Tab"
                                                                        ) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onPaste={(e) => {
                                                                        const pasted = e.clipboardData.getData("text");
                                                                        if (!/^\d+$/.test(pasted)) {
                                                                            e.preventDefault(); // Block paste if it includes non-numeric
                                                                        }
                                                                    }}
                                                                >
                                                                    <InputOTPGroup className="gap-2">
                                                                        <InputOTPSlot index={0} />
                                                                        <InputOTPSlot index={1} />
                                                                        <InputOTPSlot index={2} />
                                                                        <InputOTPSlot index={3} />
                                                                        <InputOTPSlot index={4} />
                                                                        <InputOTPSlot index={5} />
                                                                    </InputOTPGroup>
                                                                </InputOTP>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="space-y-3">
                                                <Button type="submit" className="w-full text-sm" disabled={isLoading || otpValue.length !== 6}>
                                                    {isLoading ? "Verifying..." : "Verify & Login"}
                                                </Button>

                                                <div className="flex items-center justify-center text-sm">
                                                    <button
                                                        type="button"
                                                        onClick={handleResendOTP}
                                                        className="text-primary hover:text-primary/80 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
                                                        disabled={isLoading || resendTimer > 0}
                                                    >
                                                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </Form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </MotionDiv>

                {alert && <Alert alert={alert} hideAlert={hideAlert} />}
            </div>
        </div>
    );
}