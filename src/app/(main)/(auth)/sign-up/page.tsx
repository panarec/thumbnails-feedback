import SignUpForm from '@/components/form/SignUpForm';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
