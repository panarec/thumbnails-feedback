import SignInForm from '@/components/form/SignInForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

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
