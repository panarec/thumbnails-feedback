import { getSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './button';

export const UpgradeButton = ({
  children,
  successUrl,
  cancelUrl,
}: {
  children: string;
  successUrl: string;
  cancelUrl: string;
}) => {
  const router = useRouter();

  const handleClick = async () => {
    const session = await getSession();
    if (!session) return;
    try {
      const stripeSessionRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email, successUrl, cancelUrl}),
      });
      const stripeSession = await stripeSessionRes.json();
      if (stripeSession.url) {
        router.push(stripeSession.url);
      }
    } catch (error) {
      console.error(error); // handle error
    }
  };

  return (
    <Button variant="default" size="sm" onClick={handleClick}>
      {children}
    </Button>
  );
};
