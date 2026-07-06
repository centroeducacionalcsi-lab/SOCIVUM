import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.contract.create({
    data: {
      title: String(form.get("title") || ""),
      type: String(form.get("type") || ""),
      parties: String(form.get("parties") || ""),
      amount: Number(form.get("amount") || 0),
      startDate: String(form.get("startDate") || ""),
      endDate: String(form.get("endDate") || ""),
      status: String(form.get("status") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/contratos");
}
