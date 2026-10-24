import Groq from "groq-sdk";

export async function POST(request) {
  try {
    const { message, history = [], catalog = [] } = await request.json();

    if (!message || !message.trim()) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const lower = message.toLowerCase();

    // 1. Direct Bag / Cart query shortcut
    if (lower.includes("bag") || lower.includes("cart") || lower.includes("saman") || lower.includes("tokri")) {
      return Response.json({
        reply: "Aap apna Bag dekhne ke liye top navigation par Bag icon click karein ya /bag page visit karein. Hamare paas easy checkout aur nationwide delivery available hai!",
        isBagQuery: true,
      });
    }

    // 2. Prepare Product Catalog snippet
    const catalogSnippet = (catalog && catalog.length > 0)
      ? catalog.slice(0, 30).map((p) => `${p.name} | Rs. ${p.price} | Category: ${p.category || 'Apparel'}`).join("\n")
      : "Stripe Crew Neck (Rs. 2000), Men's comfort slides (Rs. 999), Minimalist Sweatshirt (Rs. 2499)";

    const systemPrompt = `Aap Stowave clothing brand ke official smart shopping assistant hain.
Strict Guidelines:
1. Always communicate in courteous Roman Urdu / English (start politely with Assalam o Alaikum when appropriate).
2. NEVER use Hindi script (Devanagari) or say "Namaste".
3. Stowave offers high-quality everyday wear (Sweatshirts & apparel). In collaboration with Ezzywalk (premium comfort slides/slippers).
4. Sizing: True to fit (S, M, L, XL). Delivery: 3 to 5 business days across Pakistan. Free shipping on orders over Rs. 3,000. Easy 7-day return/exchange.
5. Keep your response concise (maximum 2-3 sentences) and engaging, because the user is reading this on an interactive animated card.
6. Available Catalog:
${catalogSnippet}
`;

    const groqApiKey = process.env.GROQ_API_KEY;
    let reply = "";

    if (groqApiKey) {
      try {
        const groq = new Groq({ apiKey: groqApiKey });
        const completion = await groq.chat.completions.create({
          model: "openai/gpt-oss-20b",
          messages: [
            { role: "system", content: systemPrompt },
            ...history.slice(-4).map((m) => ({
              role: m.role === "user" ? "user" : "assistant",
              content: m.text || m.content || "",
            })),
            { role: "user", content: message },
          ],
          temperature: 0.6,
          max_tokens: 220,
        });

        reply = completion.choices[0]?.message?.content?.trim() || "";
      } catch (groqErr) {
        console.error("Groq internal call error:", groqErr?.message || groqErr);
      }
    }

    // Fallback if Groq unavailable
    if (!reply) {
      if (lower.includes("sweatshirt") || lower.includes("hoodie") || lower.includes("price") || lower.includes("rate")) {
        reply = "Stowave par premium quality sweatshirts available hain starting from Rs. 2,000. Warm, stylish aur everyday comfort ke liye best choice hain!";
      } else if (lower.includes("ezzywalk") || lower.includes("slipper") || lower.includes("slides")) {
        reply = "Ezzywalk comfort slides Rs. 999 mein available hain with 29% OFF! Soft sole aur ergonomic daily use ke liye perfect hain.";
      } else if (lower.includes("delivery") || lower.includes("shipping") || lower.includes("return")) {
        reply = "Pakistan bhar mein 3-5 working days mein delivery hoti hai. Rs. 3,000 se zyada ke orders par delivery bilkul FREE hai!";
      } else {
        reply = "Assalam o Alaikum! Welcome to Stowave. Main aapki kya madad kar sakta hun? Sweatshirts, Ezzywalk slides ya orders ke baray mein poochiye!";
      }
    }

    // Find any product match for recommendation card
    let matchedProduct = null;
    if (catalog && catalog.length > 0) {
      matchedProduct = catalog.find((p) => {
        const pName = (p.name || "").toLowerCase();
        return (
          pName &&
          (lower.includes(pName) ||
            reply.toLowerCase().includes(pName) ||
            pName.split(" ").some((word) => word.length > 4 && lower.includes(word)))
        );
      });
    }

    return Response.json({
      reply,
      matchedProduct: matchedProduct
        ? {
            _id: matchedProduct._id,
            slug: matchedProduct.slug,
            name: matchedProduct.name,
            price: matchedProduct.price,
            imageUrl: matchedProduct.imageUrl,
            category: matchedProduct.category,
          }
        : null,
    });
  } catch (err) {
    console.error("Assistant chat route error:", err);
    return Response.json({
      reply: "Assalam o Alaikum! Stowave shopping assistant hazir hai. Aap sweatshirts aur exclusive collections ke baray mein pooch sakte hain.",
      matchedProduct: null,
    });
  }
}
