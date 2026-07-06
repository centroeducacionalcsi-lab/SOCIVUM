import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.partner.create({
    data: {
      name: String(form.get("name") || ""),
      document: String(form.get("document") || ""),
      type: String(form.get("type") || ""),
      contact: String(form.get("contact") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/parceiros");
}
