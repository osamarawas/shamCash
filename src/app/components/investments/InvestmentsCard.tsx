import React from 'react'
import { terms } from "@/app/utils/types";

interface termsProps {
  term: terms;
}

const InvestmentsCard = ({ term }: termsProps) => {
  return (
    <div className='relative terms-card dark:terms-card-dark w-3/4 mx-auto py-12 px-12 rounded-3xl my-10'>
        <ol dir='rtl' className='text-lg mb-12 list-decimal'>
      {Array.isArray(term) && term.length > 0 ? (
        term.map((term, index) => (
    
        <li key={index}>
          {term.li}
        </li>
    
      ))
    ) : (
      <p>No Terms available</p>
    )}
      </ol>  
      
      <p dir='rtl' className='text-lg font-bold mb-12'>هذه الاتفاقية توضح الشروط والأحكام المتعلقة بكيفية استخدامك لبرنامجنا، وهي ملزمة قانونيًا بين بنك شام والمستخدم. يرجى قراءة هذه الاتفاقية بعناية قبل استخدام البرنامج.</p>
      <p dir='rtl' className='text-center text-lg mb-12'>نحن نسعى لتوفير منصة أمنة وموثوقة تسمح للمستخدمين بإرسال واستلام التحويلات النقدية بكل سهولة ويسر. هدفنا هو إعطاء المستخدمين القدرة على إدارة أموالهم بكل احترافية وشفافية</p>
      <p dir='rtl' className='text-center text-lg text-primary font-bold'>شكراً لثقتكم في شام كاش، ونحن نتطلع إلى تقديم خدمة مالية استثنائية لكم.</p>
    </div>
  )
}

export default InvestmentsCard