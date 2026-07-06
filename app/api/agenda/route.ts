import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.task.create({
    data: {
      title: String(form.get("title") || ""),
      date: String(form.get("date") || ""),
      time: String(form.get("time") || ""),
      responsible: String(form.get("responsible") || ""),
      priority: String(form.get("priority") || ""),
      status: String(form.get("status") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/agenda");
}
