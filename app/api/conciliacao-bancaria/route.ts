import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.bankReconciliation.create({
    data: {
      description: String(form.get("description") || ""),
      bankAccount: String(form.get("bankAccount") || ""),
      transactionDate: String(form.get("transactionDate") || ""),
      amount: Number(form.get("amount") || 0),
      transactionType: String(form.get("transactionType") || ""),
      status: String(form.get("status") || ""),
      linkedEntry: String(form.get("linkedEntry") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/conciliacao-bancaria");
}
