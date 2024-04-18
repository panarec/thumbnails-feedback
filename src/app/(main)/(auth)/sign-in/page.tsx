import SignInForm from '@/components/form/SignInForm';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignInPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
