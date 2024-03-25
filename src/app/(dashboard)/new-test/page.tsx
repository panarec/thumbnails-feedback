import TestUploadSection from '@/components/TestUploadSection';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const NewTestPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/sign-in');
  }
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <TestUploadSection />
        <TestUploadSection />
      </div>
    </div>
  );
};

export default NewTestPage;
