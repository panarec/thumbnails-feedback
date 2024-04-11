import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1P4IQGHln51fyFbEDImsjOJY',
          quantity: 1,
        },
      ],
      success_url: `${process.env.URL}/dashboard`,
      cancel_url: `${process.env.URL}/dashboard`,
      customer_email: data.email,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
  if (session && session.url) {
    return NextResponse.json({ url: session.url }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
};
