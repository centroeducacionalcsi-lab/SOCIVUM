import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.stockItem.create({
    data: {
      name: String(form.get("name") || ""),
      category: String(form.get("category") || ""),
      unit: String(form.get("unit") || ""),
      quantity: Number(form.get("quantity") || 0),
      minimum: Number(form.get("minimum") || 0),
      source: String(form.get("source") || ""),
      destination: String(form.get("destination") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/estoque");
}
