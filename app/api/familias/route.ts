import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.family.create({
    data: {
      name: String(form.get("name") || ""),
      responsibleName: String(form.get("responsibleName") || ""),
      responsibleCpf: String(form.get("responsibleCpf") || ""),
      neighborhood: String(form.get("neighborhood") || ""),
      familyIncome: Number(form.get("familyIncome") || 0),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/familias");
}
