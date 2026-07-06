import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.pedagogicalAssistance.create({
    data: {
      personName: String(form.get("personName") || ""),
      cpf: String(form.get("cpf") || ""),
      school: String(form.get("school") || ""),
      grade: String(form.get("grade") || ""),
      difficulty: String(form.get("difficulty") || ""),
      evolution: String(form.get("evolution") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/atendimento-pedagogico");
}
