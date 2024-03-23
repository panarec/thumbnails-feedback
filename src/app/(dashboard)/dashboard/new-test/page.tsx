import { InputFile } from '@/components/InputFile';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const NewTestPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/sign-in');
  }
  return (
    <div className="grid grid-cols-3">
      <div>
        <InputFile />
      </div>
    </div>
  );
};

export default NewTestPage;
