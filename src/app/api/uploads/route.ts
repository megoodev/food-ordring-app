import cloudinary from "@/lib/cloudinary";
import { Buffer } from "buffer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const pathName = formData.get("pathName") as string;

    if (!file || !(file instanceof File)) {
      return NextResponse.json({
        message: 'File not found or invalid type' 
      }, {
        status: 400 
      });
    }

    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");

    const uploadResponse = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64File}`,
      {
        folder: pathName,
        transformation: [
          { width: 200, height: 200, crop: "fill", gravity: "face" },
        ],
      }
    );
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Error uploading file' 
    }, {
      status: 500 
    });
  }
}