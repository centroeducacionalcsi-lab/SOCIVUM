import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.materialDonation.create({
    data: {
      donorName: String(form.get("donorName") || ""),
      item: String(form.get("item") || ""),
      quantity: Number(form.get("quantity") || 0),
      unit: String(form.get("unit") || ""),
      date: String(form.get("date") || ""),
      destination: String(form.get("destination") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/doacoes-materiais");
}
