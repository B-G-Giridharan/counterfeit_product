import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, productName, brand, weight } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a counterfeit product detection AI expert. You analyze product images to determine authenticity.

Given a product image, product name, and brand, you MUST analyze the following aspects and return a JSON response:

1. **Logo Clarity & Design** - Is the logo sharp, correctly proportioned, and properly placed?
2. **Font Style & Spacing** - Are fonts correct, well-spaced, and free of spelling errors (e.g., "Samsvng", "Abibas")?
3. **Finish & Build Quality** - Are there uneven gaps, rough finishes, or loose parts?
4. **Color Consistency** - Do colors match the original brand packaging?
5. **Printing Quality** - Is the printing high-quality (original brands use professional printing)?
6. **Hologram & Security Codes** - Are there 3D security holograms or scratch-and-verify codes?
7. **Barcode/QR Validation** - Can the barcode be identified and does it look legitimate?
${weight ? `8. **Weight Test** - The listed weight is ${weight}g. Does this seem reasonable for a genuine ${brand} ${productName}?` : ""}

Also check for common counterfeit indicators:
- Slight color differences
- Low-quality printing
- Spelling mistakes
- Misaligned labels or stickers

You MUST respond with ONLY valid JSON in this exact format:
{
  "overall_score": <0-100>,
  "logo_score": <0-100>,
  "font_score": <0-100>,
  "finish_score": <0-100>,
  "color_score": <0-100>,
  "print_score": <0-100>,
  "hologram_score": <0-100>,
  "verdict": "<genuine|suspicious|counterfeit>",
  "barcode_valid": <true|false>,
  "barcode_data": null,
  "ai_analysis": "<detailed explanation of findings, what looks genuine, what looks suspicious, and recommendations>"
}`;

    const userPrompt = `Analyze this product image for authenticity:
- Product: ${productName || "Unknown"}
- Brand: ${brand || "Unknown"}
${weight ? `- Listed Weight: ${weight}g` : ""}
- Image URL: ${imageUrl}

Please provide your detailed analysis.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: userPrompt },
              { type: "image_url", image_url: { url: imageUrl } },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse JSON from response (handle markdown code blocks)
    let parsed;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      // Fallback if AI doesn't return proper JSON
      parsed = {
        overall_score: 50,
        logo_score: 50,
        font_score: 50,
        finish_score: 50,
        color_score: 50,
        print_score: 50,
        hologram_score: 50,
        verdict: "suspicious",
        barcode_valid: false,
        barcode_data: null,
        ai_analysis: content || "Unable to parse detailed analysis. The image may not have been clear enough for a definitive assessment. Please try with a clearer image.",
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-product error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
