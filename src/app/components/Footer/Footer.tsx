import React from 'react';
import Image from 'next/image';
import face from "@/assets/icon/facebook.svg";
import face_h from "@/assets/icon/facebook_h.svg";
import whatsup from "@/assets/icon/whatsup.svg";
import whatsup_h from "@/assets/icon/whatsup_h.svg";
import telegram from "@/assets/icon/telegram.svg";
import telegram_h from "@/assets/icon/telegram_h.svg";
import x from "@/assets/icon/x.svg";
import x_h from "@/assets/icon/x_h.svg";




const Footer = () => {
  return (
    <footer className=' bg-footer text-center items-center py-14 px-7 min-h-96'>
        <h1 className='text-white font-bold text-2xl underLine relative w-48 text-center mx-auto mb-16'>تواصل معنا</h1>
        <p dir='rtl' className='text-white text-lg mx-auto w-3/4'>إذا كان لديك أي استفسار، ملاحظة، أو تواجه أي مشكلة، لا تتردد في التواصل معنا. فريق الدعم الخاص بنا متواجد دائمًا لتقديم المساعدة وضمان تجربة استخدام سلسة.</p>
        <div className='flex flex-wrap items-center w-1/3 mx-auto mt-12 justify-around'>
            <div className="group m-2">
                <Image 
                  src={face} 
                  alt='' 
                  height={42} 
                  width={42} 
                  className='group-hover:hidden'
                />
                <Image 
                  src={face_h} 
                  alt='' 
                  height={42} 
                  width={42} 
                  className='hidden group-hover:block cursor-pointer'
                />
            </div>
            <div className="group m-2">
                <Image 
                  src={whatsup} 
                  alt='' 
                  height={42} 
                  width={42} 
                  className='group-hover:hidden'
                />
                <Image 
                  src={whatsup_h} 
                  alt='' 
                  height={42} 
                  width={42} 
                  className='hidden group-hover:block cursor-pointer'
                />
            </div>
            <div className="group m-2">
                <Image 
                  src={telegram} 
                  alt='' 
                  height={42} 
                  width={42} 
                  className='group-hover:hidden'
                />
                <Image 
                  src={telegram_h} 
                  alt='' 
                  height={42} 
                  width={42} 
                  className='hidden group-hover:block cursor-pointer'
                />
            </div>
            <div className="group m-2">
                <Image 
                  src={x} 
                  alt='' 
                  height={42} 
                  width={42} 
                  className='group-hover:hidden'
                />
                <Image 
                  src={x_h} 
                  alt='' 
                  height={42} 
                  width={42} 
                  className='hidden group-hover:block cursor-pointer'
                />
            </div>            
        </div>
    </footer>
    )
}

export default Footer;