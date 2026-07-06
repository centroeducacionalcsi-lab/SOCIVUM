import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.staff.create({
    data: {
      fullName: String(form.get("fullName") || ""),
      cpf: String(form.get("cpf") || ""),
      role: String(form.get("role") || ""),
      contractType: String(form.get("contractType") || ""),
      projectName: String(form.get("projectName") || ""),
      monthlyValue: Number(form.get("monthlyValue") || 0),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/equipe");
}
