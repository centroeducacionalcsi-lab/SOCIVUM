import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.beneficiary.create({
    data: {
      fullName: String(form.get("fullName") || ""),
      cpf: String(form.get("cpf") || ""),
      status: String(form.get("status") || ""),
      projectName: String(form.get("projectName") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/beneficiarios");
}
