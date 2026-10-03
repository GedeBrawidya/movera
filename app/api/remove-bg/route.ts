import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.REMOVE_BG_API_KEY;

    // Convert uploaded file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ---- Mode 1: Real Remove.bg API ---- //
    if (apiKey && apiKey.trim().length > 0) {
      const base64Image = buffer.toString("base64");

      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_file_b64: base64Image,
          size: "auto",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Remove.bg API Error:", errorText);

        if (response.status === 402) {
          return NextResponse.json(
            { error: "Remove.bg API credits exceeded. Please check your account." },
            { status: 402 }
          );
        }
        if (response.status === 401 || response.status === 403) {
          return NextResponse.json(
            { error: "Invalid Remove.bg API key. Please check REMOVE_BG_API_KEY in .env.local" },
            { status: 401 }
          );
        }

        return NextResponse.json(
          { error: `Background removal failed: ${errorText}` },
          { status: response.status }
        );
      }

      const resultBlob = await response.blob();
      const resultArrayBuffer = await resultBlob.arrayBuffer();
      const resultBuffer = Buffer.from(resultArrayBuffer);
      const resultBase64 = `data:image/png;base64,${resultBuffer.toString("base64")}`;

      return NextResponse.json({ result: resultBase64 });
    }

    // ---- Mode 2: Demo / Development Fallback (when no API key configured) ---- //
    // Returns original image as transparent data stream so app functions seamlessly for testing
    const base64Original = buffer.toString("base64");
    const mimeType = file.type || "image/png";
    const demoBase64 = `data:${mimeType};base64,${base64Original}`;

    return NextResponse.json({
      result: demoBase64,
      isDemoMode: true,
      message: "Demo Mode: Set REMOVE_BG_API_KEY in .env.local for production AI removal.",
    });
  } catch (error) {
    console.error("API ROUTE ERROR:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process image";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
