import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.STRIPE_WEBHOOK_SECRET as string;

const fullfillOrder = async (customersEmail: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email: customersEmail,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.tier === 'premium') {
      throw new Error('User already has premium tier');
    }

    if (user.tier === 'free') {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          tier: 'premium',
        },
      });
    }
    console.log('User updated to premium');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const handleCompletedCheckoutSession = async (event: any) => {
  try {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: ['line_items'],
    });

    const lineItems = sessionWithLineItems.line_items;

    if (!lineItems) {
      return;
    }

    const ordersFullfilled = await fullfillOrder(event.data.object.customer_details.email);
    return ordersFullfilled;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const POST = async (req: NextRequest) => {
  let event;
  try {
    const requestHeaders = new Headers(req.headers);
    const signature = requestHeaders.get('stripe-signature') as string;

    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: 'Webhook received' }, { status: 400 });
  }

  if (!event) {
    return NextResponse.json({ message: 'Webhook received' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSucessfull = await handleCompletedCheckoutSession(event);
      if (!checkoutSucessfull) {
        return new Response('Failed to fullfill order', { status: 500 });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ message: 'Webhook received' });
};
