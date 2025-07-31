import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Modal from "@/components/Modal/modal";
import { debounceApiCall } from "@/lib/debounce";

interface OtpModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  onVerifyOtp: (otp: string) => Promise<void>;
  onResendOtp: () => Promise<void>;
  isLoading: boolean;
}

export default function OtpModal({
  open,
  onClose,
  email,
  onVerifyOtp,
  onResendOtp,
  isLoading,
}: OtpModalProps) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(180); // 3 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (open) {
      setOtp("");
      setTimer(180);
      setCanResend(false);
    }
  }, [open]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (open && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [open, timer]);

  // Auto-submit when OTP is complete
  // useEffect(() => {
  //   if (otp.length === 6 && !isLoading) {
  //      handleVerifyOtp();
  //   console.log("Auto-submitting OTP:", otp);
  //   }
  // }, [otp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleVerifyOtp = async () => {
    if (otp.length === 6) {
      await onVerifyOtp(otp);
    }
  };

  const handleResendOtp = async () => {
    setTimer(180);
    setCanResend(false);
    setOtp("");
    await onResendOtp();
  };

  const debounceHandleVerifyOtp = debounceApiCall(handleVerifyOtp, 1000);
  const debounceHandleResendOtp = debounceApiCall(handleResendOtp, 1000);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Enter Verification Code"
      description={`We've sent a 6-digit verification code to ${email}`}
    >
      <div className="bg-white rounded-lg p-2 md:p-6 space-y-6 w-[75vw] md:w-[60vw] lg:w-fit">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Enter 6-digit code
            </Label>
            <div className="flex justify-center">
              {/* <InputOTP 
                maxLength={6} 
                value={otp} 
                onChange={(value) => setOtp(value)}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-12 text-lg border-gray-300" />
                  <InputOTPSlot index={1} className="w-12 h-12 text-lg border-gray-300" />
                  <InputOTPSlot index={2} className="w-12 h-12 text-lg border-gray-300" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="w-12 h-12 text-lg border-gray-300" />
                  <InputOTPSlot index={4} className="w-12 h-12 text-lg border-gray-300" />
                  <InputOTPSlot index={5} className="w-12 h-12 text-lg border-gray-300" />
                </InputOTPGroup>
              </InputOTP> */}
              <Input
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="number"
              />
            </div>
          </div>

          <div className="text-center space-y-3">
            {timer > 0 ? (
              <p className="text-sm text-gray-500">
                Resend code in {formatTime(timer)}
              </p>
            ) : (
              <Button
                variant="outline"
                onClick={
                  debounceHandleResendOtp
                }
                disabled={isLoading}
                className="text-sm bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {isLoading ? "Sending..." : "Resend Code"}
              </Button>
            )}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={debounceHandleVerifyOtp}
            disabled={isLoading || otp.length !== 6}
            className="flex-1 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Didn't receive the code? Check your spam folder or try resending.
          </p>
        </div>
      </div>
    </Modal>
  );
}
