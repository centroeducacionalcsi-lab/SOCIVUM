import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.indicator.create({
    data: {
      name: String(form.get("name") || ""),
      area: String(form.get("area") || ""),
      target: Number(form.get("target") || 0),
      achieved: Number(form.get("achieved") || 0),
      period: String(form.get("period") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/dashboards");
}
