import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.financeEntry.create({
    data: {
      type: String(form.get("type") || ""),
      description: String(form.get("description") || ""),
      amount: Number(form.get("amount") || 0),
      dueDate: String(form.get("dueDate") || ""),
      paidDate: String(form.get("paidDate") || ""),
      status: String(form.get("status") || ""),
      category: String(form.get("category") || ""),
      projectName: String(form.get("projectName") || ""),
      source: String(form.get("source") || ""),
      bankAccount: String(form.get("bankAccount") || ""),
      paymentMethod: String(form.get("paymentMethod") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/financeiro");
}
