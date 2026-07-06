import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.financialDonation.create({
    data: {
      donorName: String(form.get("donorName") || ""),
      amount: Number(form.get("amount") || 0),
      date: String(form.get("date") || ""),
      method: String(form.get("method") || ""),
      destination: String(form.get("destination") || ""),
      projectName: String(form.get("projectName") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/doacoes-financeiras");
}
