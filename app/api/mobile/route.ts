import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.mobileRecord.create({
    data: {
      title: String(form.get("title") || ""),
      type: String(form.get("type") || ""),
      personName: String(form.get("personName") || ""),
      location: String(form.get("location") || ""),
      date: String(form.get("date") || ""),
      notes: String(form.get("notes") || "")
    }
  });
  redirect("/mobile");
}
