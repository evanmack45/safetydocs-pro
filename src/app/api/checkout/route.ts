import { getStripe } from "@/lib/stripe";
import { DOCUMENT_PRICES } from "@/lib/types";
import type { DocumentType } from "@/lib/types";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const documentType = body.documentType as string;
  if (
    documentType !== "toolbox-talk" &&
    documentType !== "jsa" &&
    documentType !== "sssp"
  ) {
    return Response.json(
      { error: "Invalid document type" },
      { status: 400 }
    );
  }

  const priceInfo = DOCUMENT_PRICES.find(
    (p) => p.type === (documentType as DocumentType)
  );
  if (!priceInfo) {
    return Response.json(
      { error: "Unknown document type" },
      { status: 400 }
    );
  }

  const formData = body.formData as Record<string, string> | undefined;
  if (!formData) {
    return Response.json(
      { error: "Form data is required" },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripe();
    const origin =
      request.headers.get("origin") ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `SafetyDocs Pro - ${priceInfo.name}`,
              description: priceInfo.description,
            },
            unit_amount: priceInfo.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        documentType,
        formData: JSON.stringify(formData),
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel?type=${documentType}`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe checkout failed:", msg);
    return Response.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
