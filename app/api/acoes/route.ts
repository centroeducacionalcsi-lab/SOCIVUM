import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.action.create({
    data: {
      name: String(form.get("name") || ""),
      projectName: String(form.get("projectName") || ""),
      date: String(form.get("date") || ""),
      time: String(form.get("time") || ""),
      location: String(form.get("location") || ""),
      responsible: String(form.get("responsible") || ""),
      description: String(form.get("description") || "")
    }
  });
  redirect("/acoes");
}
