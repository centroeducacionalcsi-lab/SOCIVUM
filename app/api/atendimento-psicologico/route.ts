import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.psychologicalAssistance.create({
    data: {
      personName: String(form.get("personName") || ""),
      cpf: String(form.get("cpf") || ""),
      date: String(form.get("date") || ""),
      professional: String(form.get("professional") || ""),
      status: String(form.get("status") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/atendimento-psicologico");
}
