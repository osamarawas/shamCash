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
import { useTranslations } from "next-intl"; // ✅ استخدام useTranslations بدلاً من getTranslations

interface OtpAlertDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  sure: (e?: React.BaseSyntheticEvent) => Promise<void>;
  resend_otp: () => Promise<void>;
  classNameExtra: string;
  otpError: boolean;
}

export function OtpAlertDialog(props: OtpAlertDialogProps) { // ✅ إزالة async
  const [timer, setTimer] = useState(0);
  const t = useTranslations(); // ✅ استخدام useTranslations بشكل صحيح

  const handleResend = () => {
    if (timer === 0) {
      props.resend_otp();
      setTimer(60);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
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
            className="mb-3 mx-auto mt-2"
            width={60}
            height={60}
          />
          <AlertDialogTitle>{t("otpAllert.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            <p dir="auto" className="text-center  mb-4 text-foreground">
              {t("otpAllert.otpmessage")}
            </p>
            <InputOTP
              maxLength={6}
              value={props.otp}
              onChange={(value) => props.setOtp(value)}
            >
              <div className="text-center items-center mx-auto">
                <InputOTPGroup className="gap-3  !border-destructive">
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      className={`inputOtp rounded-md ${props.classNameExtra}`}
                      index={index}
                    />
                  ))}
                </InputOTPGroup>
              </div>
            </InputOTP>
            <div
              dir="auto"
              className="text-center text-sm my-3 font-medium text-foreground"
            >
              <p>
                {props.otpError ? (
                  <span className="text-error font-semibold">
                    {t("otpAllert.error")}
                  </span>
                ) : (
                  <>{t("otpAllert.rerequest")}</>
                )}
                {timer > 0 ? (
                  <span className="font-semibold">
                    {t("otpAllert.rerequest1")} {timer} {t("otpAllert.rerequest2")}
                  </span>
                ) : (
                  <span
                    className="text-primary font-semibold cursor-pointer"
                    onClick={handleResend}
                  >
                    {" "}
                    {t("otpAllert.again")}
                  </span>
                )}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter dir="auto">
          <AlertDialogCancel onClick={() => props.setOpen(false)}>
            {t("otpAllert.close")}
          </AlertDialogCancel>
          <AlertDialogAction type="submit" onClick={props.sure}>
            {t("otpAllert.Confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
