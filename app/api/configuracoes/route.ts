import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.auditLog.create({
    data: {
      action: String(form.get("action") || ""),
      userName: String(form.get("userName") || ""),
      module: String(form.get("module") || ""),
      ip: String(form.get("ip") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/configuracoes");
}
