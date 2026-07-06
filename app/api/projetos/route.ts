import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();

  await prisma.project.create({
    data: {
      name: String(form.get("name") || ""),
      source: String(form.get("source") || ""),
      budget: Number(form.get("budget") || 0),
      received: Number(form.get("received") || 0),
      status: String(form.get("status") || "Em elaboração"),
      startDate: String(form.get("startDate") || ""),
      endDate: String(form.get("endDate") || ""),
      description: String(form.get("description") || ""),
      objectives: String(form.get("objectives") || "")
    }
  });

  redirect("/projetos");
}
