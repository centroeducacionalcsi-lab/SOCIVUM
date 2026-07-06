import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.accountability.create({
    data: {
      projectName: String(form.get("projectName") || ""),
      period: String(form.get("period") || ""),
      status: String(form.get("status") || ""),
      pending: String(form.get("pending") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/prestacao-contas");
}
