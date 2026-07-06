import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.person.create({
    data: {
      type: String(form.get("type") || ""),
      fullName: String(form.get("fullName") || ""),
      cpf: String(form.get("cpf") || ""),
      phone: String(form.get("phone") || ""),
      neighborhood: String(form.get("neighborhood") || ""),
      city: String(form.get("city") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/pessoas");
}
