import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.attendance.create({
    data: {
      personName: String(form.get("personName") || ""),
      cpf: String(form.get("cpf") || ""),
      activity: String(form.get("activity") || ""),
      date: String(form.get("date") || ""),
      status: String(form.get("status") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/frequencia");
}
