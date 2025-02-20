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
import icon from "@/assets/icon/alertDialog.svg"
export function AlertDialogDemo(props) {
  return (
    <AlertDialog open={props.open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <img 
          src={icon.src} 
          alt="" 
          className="mb-3 mx-auto mt-6"
          width={60} 
          height={60}/>
          <AlertDialogTitle className="text-center inputTitle">رمز التأكيد</AlertDialogTitle>
          <AlertDialogDescription>
            <p dir="auto" className="text-center mb-6">أدخل رمز التحقق المرسل إلى بريدك الإلكتروني لإكمال    العملية.</p>
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
              <p>إذا لم تستلم الرمز، يمكنك طلب <span className="text-primary font-semibold">إرساله مرة أخرى.</span></p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="">
          <AlertDialogFooter dir="auto" className="mb-6">
            <AlertDialogCancel className="text-gray-600 bg-gray-200 font-semibold">إغلاق</AlertDialogCancel>
            <AlertDialogAction className="text-white">تأكيد</AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
