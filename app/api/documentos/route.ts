import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.document.create({
    data: {
      title: String(form.get("title") || ""),
      type: String(form.get("type") || ""),
      relatedTo: String(form.get("relatedTo") || ""),
      fileUrl: String(form.get("fileUrl") || ""),
      expiresAt: String(form.get("expiresAt") || ""),
      status: String(form.get("status") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/documentos");
}
