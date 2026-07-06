import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.socialAssistance.create({
    data: {
      personName: String(form.get("personName") || ""),
      cpf: String(form.get("cpf") || ""),
      date: String(form.get("date") || ""),
      professional: String(form.get("professional") || ""),
      demand: String(form.get("demand") || ""),
      referral: String(form.get("referral") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/atendimento-social");
}
