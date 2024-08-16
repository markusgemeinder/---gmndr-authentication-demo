// // /app/(auth)/forgot-password/page.js

// 'use client';

// import { useState } from 'react';
// import ScrollToTop from '@/app/components/Common/ScrollToTop';
// import { Main, Title } from '@/app/components/AuthForm/AuthFormStyles';
// import ForgotPasswordForm from '@/app/components/AuthForm/ForgotPasswordForm';

// export default function ForgotPasswordPage() {
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (email) => {
//     const response = await fetch('/api/auth/forgot-password', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email }),
//     });
//     const data = await response.json();
//     setMessage(data.message);
//   };

//   return (
//     <>
//       <ScrollToTop />
//       <Main>
//         <Title>Forgot Password</Title>
//         <ForgotPasswordForm onSubmit={handleSubmit} message={message} />
//       </Main>
//     </>
//   );
// }

// /app/(auth)/forgot-password/page.js

'use client';

import { useState } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Main, Title } from '@/app/components/AuthForm/AuthFormStyles';
import ForgotPasswordForm from '@/app/components/AuthForm/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (email) => {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <>
      <ScrollToTop />
      <Main>
        <Title>Forgot Password</Title>
        <ForgotPasswordForm onSubmit={handleSubmit} message={message} />
      </Main>
    </>
  );
}
