import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.legalAssistance.create({
    data: {
      personName: String(form.get("personName") || ""),
      cpf: String(form.get("cpf") || ""),
      date: String(form.get("date") || ""),
      area: String(form.get("area") || ""),
      status: String(form.get("status") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/atendimento-juridico");
}
