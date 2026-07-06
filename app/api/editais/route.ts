import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.opportunity.create({
    data: {
      name: String(form.get("name") || ""),
      organization: String(form.get("organization") || ""),
      deadline: String(form.get("deadline") || ""),
      amount: Number(form.get("amount") || 0),
      area: String(form.get("area") || ""),
      status: String(form.get("status") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/editais");
}
