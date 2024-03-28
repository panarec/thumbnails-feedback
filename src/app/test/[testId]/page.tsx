import { useRouter } from 'next/navigation';
import { FC } from 'react';
import DasboardLayout from '../../(dashboard)/layout';

interface TestPageProps {
  params: {
    testId: string;
  };
}

const TestPage: FC<TestPageProps> = ({ params }) => {
  return (
    <DasboardLayout title="Test Page">
      <div>
        <h1>Test Page</h1>
        <p>Test ID: {params.testId}</p>
      </div>
    </DasboardLayout>
  );
};

export default TestPage;
