import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    // Get API key from environment variable
    const apiKey = process.env.REMOVE_BG_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Remove.bg API key is not configured. Please set REMOVE_BG_API_KEY in your environment variables." },
        { status: 500 }
      );
    }

    // Convert file to base64 for remove.bg API
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    // Call remove.bg API using base64
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
      console.error("Remove.bg API error:", errorText);
      
      if (response.status === 402) {
        return NextResponse.json(
          { error: "API quota exceeded. Please check your remove.bg account." },
          { status: 402 }
        );
      }
      
      return NextResponse.json(
        { error: `Failed to remove background: ${errorText}` },
        { status: response.status }
      );
    }

    // Get the result image
    const resultBlob = await response.blob();
    const resultArrayBuffer = await resultBlob.arrayBuffer();
    const resultBuffer = Buffer.from(resultArrayBuffer);
    const resultBase64 = `data:image/png;base64,${resultBuffer.toString("base64")}`;

    return NextResponse.json({ result: resultBase64 });
  } catch (error) {
    console.error("REMOVE BG ERROR:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to remove background";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
