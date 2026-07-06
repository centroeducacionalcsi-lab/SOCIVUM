import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.workshop.create({
    data: {
      name: String(form.get("name") || ""),
      projectName: String(form.get("projectName") || ""),
      instructor: String(form.get("instructor") || ""),
      workload: String(form.get("workload") || ""),
      period: String(form.get("period") || ""),
      vacancies: Number(form.get("vacancies") || 0),
      location: String(form.get("location") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/oficinas");
}
