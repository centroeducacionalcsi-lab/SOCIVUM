import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.asset.create({
    data: {
      name: String(form.get("name") || ""),
      code: String(form.get("code") || ""),
      category: String(form.get("category") || ""),
      location: String(form.get("location") || ""),
      responsible: String(form.get("responsible") || ""),
      value: Number(form.get("value") || 0),
      status: String(form.get("status") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/patrimonio");
}
