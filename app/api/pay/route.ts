import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const { mode, email } = await req.json();

    // Определяем цену в зависимости от тарифа
    const priceId =
      mode === "pro"
        ? process.env.STRIPE_PRICE_PRO // $19.99
        : process.env.STRIPE_PRICE_QUICK; // $9.99

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is not configured" },
        { status: 400 }
      );
    }

    // Создаём checkout-сессию
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email || undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?mode=${mode}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("Stripe error:", err.message);
    return NextResponse.json({ error: "Stripe session error" }, { status: 500 });
  }
}
