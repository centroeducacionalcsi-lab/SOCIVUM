import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.communication.create({
    data: {
      title: String(form.get("title") || ""),
      channel: String(form.get("channel") || ""),
      audience: String(form.get("audience") || ""),
      message: String(form.get("message") || ""),
      status: String(form.get("status") || "")
    }
  });
  redirect("/comunicacao");
}
