import { NextResponse } from "next/server";
import { ensureAdminApi } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";
import { uploadToImgBB } from "@/lib/imgbb";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const MAX_FILE_SIZE_BYTES = 32 * 1024 * 1024;

export async function POST(request) {
  try {
    const session = await ensureAdminApi(request);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Image hosting is not configured" }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get("image") || formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Only JPEG, PNG, or WebP images are allowed" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: "Images must be 32 MB or smaller" }, { status: 400 });
    }

    const originalName = file.name || "upload.bin";
    const extension = originalName.includes(".") ? `.${originalName.split(".").pop()}`.toLowerCase() : "";
    if (extension && !ALLOWED_EXTENSIONS.includes(extension)) {
      return NextResponse.json({ error: "Only JPEG, PNG, or WebP images are allowed" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    const sanitizedName = originalName.replace(/[^a-z0-9.\-]/gi, "_") || "upload";

    const payload = await uploadToImgBB({
      apiKey,
      base64Image,
      fileName: sanitizedName,
    });

    const ip = await getClientIp(request);
    await recordAudit("upload.image", {
      actor: session.email || session.sub || "admin",
      entity: "Upload",
      entityId: payload.id,
      ip,
      metadata: {
        originalName,
        size: file.size,
        type: file.type,
        hostedUrl: payload.url,
      },
    });

    return NextResponse.json({
      url: payload.url,
      deleteUrl: payload.deleteUrl,
      id: payload.id,
    });
  } catch (error) {
    console.error("POST /api/upload failed", error);
    return NextResponse.json({ error: "Unable to upload image" }, { status: 500 });
  }
}
