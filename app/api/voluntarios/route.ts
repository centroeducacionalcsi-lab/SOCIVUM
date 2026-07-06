import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.volunteer.create({
    data: {
      fullName: String(form.get("fullName") || ""),
      cpf: String(form.get("cpf") || ""),
      skills: String(form.get("skills") || ""),
      availability: String(form.get("availability") || ""),
      hours: Number(form.get("hours") || 0),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/voluntarios");
}
