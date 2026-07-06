import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.donor.create({
    data: {
      name: String(form.get("name") || ""),
      document: String(form.get("document") || ""),
      contact: String(form.get("contact") || ""),
      preference: String(form.get("preference") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/doadores");
}
