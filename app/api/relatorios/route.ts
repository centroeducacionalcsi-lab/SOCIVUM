import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.reportTemplate.create({
    data: {
      name: String(form.get("name") || ""),
      module: String(form.get("module") || ""),
      filters: String(form.get("filters") || ""),
      format: String(form.get("format") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/relatorios");
}
