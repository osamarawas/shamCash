import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import icon from "@/assets/icon/alertDialog.svg";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface AlertDialogDemoProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  sure: (e?: React.BaseSyntheticEvent) => Promise<void>;
  resend_otp: () => Promise<void>;
}

export function AlertDialogDemo(props: AlertDialogDemoProps) {
  const [timer, setTimer] = useState(0);

  const handleResend = () => {
    console.log("ahamd");
    if (timer === 0) {
      props.resend_otp();
      setTimer(5); // مدة المؤقت بالثواني
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      console.log(timer);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <AlertDialog open={props.open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <Image
            src={icon.src}
            alt=""
            className="mb-3 mx-auto mt-6"
            width={60}
            height={60}
          />
          <AlertDialogTitle className="text-center inputTitle">
            رمز التأكيد
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p dir="auto" className="text-center mb-6">
              أدخل رمز التحقق المرسل إلى بريدك الإلكتروني لإكمال العملية.
            </p>
            <InputOTP
              maxLength={6}
              value={props.otp}
              onChange={(value) => props.setOtp(value)}
            >
              <div className="text-center items-center mx-auto">
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot className="inputOtp rounded-md" index={0} />
                  <InputOTPSlot className="inputOtp rounded-md" index={1} />
                  <InputOTPSlot className="inputOtp rounded-md" index={2} />
                  <InputOTPSlot className="inputOtp rounded-md" index={3} />
                  <InputOTPSlot className="inputOtp rounded-md" index={4} />
                  <InputOTPSlot className="inputOtp rounded-md" index={5} />
                </InputOTPGroup>
              </div>
            </InputOTP>
            <div dir="auto" className="text-center text-sm my-6">
              <p>
                إذا لم تستلم الرمز، يمكنك طلب{" "}
                {timer > 0 ? (
                  <span className="text-gray-500 font-semibold">
                    يمكنك إعادة الإرسال بعد {timer} ثانية.
                  </span>
                ) : (
                  <span
                    className="text-primary font-semibold cursor-pointer"
                    onClick={handleResend}
                  >
                    إرساله مرة أخرى.
                  </span>
                )}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="">
          <AlertDialogFooter dir="auto" className="mb-6">
            <AlertDialogCancel
              className="text-gray-600 bg-gray-200 font-semibold"
              onClick={() => props.setOpen(false)}
            >
              إغلاق
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              onClick={props.sure}
              className="text-white"
            >
              تأكيد
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
