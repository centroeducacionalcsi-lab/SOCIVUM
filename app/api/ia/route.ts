import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.aiLog.create({
    data: {
      question: String(form.get("question") || ""),
      answer: String(form.get("answer") || ""),
      module: String(form.get("module") || ""),
      userName: String(form.get("userName") || "")
    }
  });
  redirect("/ia");
}
