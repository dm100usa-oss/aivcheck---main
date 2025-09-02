import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { mode } = await req.json();

    const priceId =
      mode === "quick"
        ? process.env.STRIPE_PRICE_QUICK
        : process.env.STRIPE_PRICE_FULL;

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID not configured" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?mode=${mode}&score=68&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
