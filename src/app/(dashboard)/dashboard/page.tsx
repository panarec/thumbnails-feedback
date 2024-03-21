import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/sign-in');
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default DashboardPage;
