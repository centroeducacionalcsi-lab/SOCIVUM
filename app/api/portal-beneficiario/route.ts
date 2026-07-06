import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.beneficiaryPortalRequest.create({
    data: {
      title: String(form.get("title") || ""),
      beneficiary: String(form.get("beneficiary") || ""),
      type: String(form.get("type") || ""),
      status: String(form.get("status") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/portal-beneficiario");
}
