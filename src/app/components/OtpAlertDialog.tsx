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
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslations } from "next-intl";

interface OtpAlertDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  otp: string;
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
  setOtp: Dispatch<SetStateAction<string>>;
  sure: (e?: React.BaseSyntheticEvent) => Promise<void>;
  resend_otp: () => Promise<void>;
  classNameExtra: string;
  otpError: boolean;
}

export function OtpAlertDialog(props: OtpAlertDialogProps) {
  const t = useTranslations();

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
      hours,
      minutes,
      seconds,
    };
  };
  const handleResend = () => {
    if (props.timer === 0) {
      props.resend_otp();
      props.setTimer(props.timer);
    }
  };

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (props.timer > 0) {
      interval = setInterval(() => {
        props.setTimer((prev) => {
          const newTime = prev - 1;
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [props, props.timer]);

  const formattedTime = formatTime(props.timer);

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
          <AlertDialogTitle>{t("otpAlert.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            <p dir="auto" className="text-center  mb-4 text-foreground">
              {t("otpAlert.otpmessage")}
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
                    {t("otpAlert.error")}
                  </span>
                ) : (
                  <>{t("otpAlert.rerequest")}</>
                )}
                {props.timer > 0 ? (
                  <span className="font-semibold">
                    {t("otpAlert.resendafter")}
                    {formattedTime.hours > 0 &&
                      `${formattedTime.hours} ${t("hour")} `}
                    {formattedTime.minutes > 0 &&
                      `${formattedTime.minutes} ${t("minute")} `}
                    {formattedTime.seconds > 0 &&
                      `${formattedTime.seconds} ${t("second")}`}
                  </span>
                ) : (
                  <span
                    className="text-primary font-semibold cursor-pointer"
                    onClick={handleResend}
                  >
                  {" "}{t("otpAlert.again")}
                  </span>
                )}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter dir="auto">
          <AlertDialogCancel onClick={() => props.setOpen(false)}>
            {t("otpAlert.back")}
          </AlertDialogCancel>
          <AlertDialogAction type="submit" onClick={props.sure}>
            {t("otpAlert.Confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
