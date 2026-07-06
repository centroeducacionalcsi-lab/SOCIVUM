import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.donorPortalRequest.create({
    data: {
      title: String(form.get("title") || ""),
      donorName: String(form.get("donorName") || ""),
      type: String(form.get("type") || ""),
      status: String(form.get("status") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/portal-doador");
}
