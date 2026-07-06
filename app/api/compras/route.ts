import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.purchase.create({
    data: {
      description: String(form.get("description") || ""),
      requester: String(form.get("requester") || ""),
      supplier: String(form.get("supplier") || ""),
      projectName: String(form.get("projectName") || ""),
      amount: Number(form.get("amount") || 0),
      status: String(form.get("status") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/compras");
}
