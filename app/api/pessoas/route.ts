import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function getAll(form: FormData, name: string) {
  return form.getAll(name).map((item) => String(item)).filter(Boolean);
}

export async function POST(request: Request) {
  const form = await request.formData();
  const roles = getAll(form, "roles");
  const cpf = String(form.get("cpf") || "").trim() || null;

  const person = await prisma.person.create({
    data: {
      type: roles.length ? roles.join(", ") : "Beneficiário",
      fullName: String(form.get("fullName") || ""),
      socialName: String(form.get("socialName") || ""),
      cpf,
      rg: String(form.get("rg") || ""),
      issuingAgency: String(form.get("issuingAgency") || ""),
      nis: String(form.get("nis") || ""),
      cns: String(form.get("cns") || ""),
      voterTitle: String(form.get("voterTitle") || ""),
      birthDate: String(form.get("birthDate") || ""),
      sex: String(form.get("sex") || ""),
      gender: String(form.get("gender") || ""),
      race: String(form.get("race") || ""),
      maritalStatus: String(form.get("maritalStatus") || ""),
      nationality: String(form.get("nationality") || ""),
      naturality: String(form.get("naturality") || ""),
      education: String(form.get("education") || ""),
      profession: String(form.get("profession") || ""),
      workStatus: String(form.get("workStatus") || ""),
      phone: String(form.get("phone") || ""),
      whatsapp: String(form.get("whatsapp") || ""),
      email: String(form.get("email") || ""),
      zipCode: String(form.get("zipCode") || ""),
      address: String(form.get("address") || ""),
      number: String(form.get("number") || ""),
      complement: String(form.get("complement") || ""),
      neighborhood: String(form.get("neighborhood") || ""),
      city: String(form.get("city") || ""),
      state: String(form.get("state") || ""),
      referencePoint: String(form.get("referencePoint") || ""),
      individualIncome: Number(form.get("individualIncome") || 0),
      familyIncome: Number(form.get("familyIncome") || 0),
      socialPrograms: getAll(form, "socialProgramsList").join(", "),
      hasDisability: String(form.get("hasDisability") || ""),
      disabilityType: String(form.get("disabilityType") || ""),
      vulnerability: String(form.get("vulnerability") || ""),
      housingStatus: String(form.get("housingStatus") || ""),
      notes: [
        String(form.get("organization") || ""),
        String(form.get("branch") || ""),
        String(form.get("unit") || ""),
        String(form.get("space") || ""),
        String(form.get("territory") || ""),
        String(form.get("addressHistory") || ""),
        "Documentos: " + getAll(form, "documentTypes").join(", "),
        "Consentimentos: " + getAll(form, "consents").join(", "),
        String(form.get("notes") || "")
      ].filter(Boolean).join(" | ")
    }
  });

  for (const projectId of getAll(form, "projectIds")) {
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    await prisma.personLink.create({ data: { personId: person.id, linkType: "Projeto", projectId, projectName: project?.name || "", role: String(form.get("projectRole") || "Beneficiário"), status: "Ativo", startDate: String(form.get("startDate") || "") } });
  }

  for (const serviceName of getAll(form, "serviceNames")) {
    await prisma.personLink.create({ data: { personId: person.id, linkType: "Atendimento", serviceName, role: "Usuário do serviço", status: "Ativo", startDate: String(form.get("startDate") || "") } });
  }

  for (const benefitType of getAll(form, "benefitTypes")) {
    await prisma.personBenefit.create({ data: { personId: person.id, benefitType, projectName: String(form.get("benefitProjectName") || ""), date: String(form.get("benefitDate") || "") } });
  }

  const familyNames = getAll(form, "familyNames");
  const familyKinships = getAll(form, "familyKinships");
  const familyCpfs = getAll(form, "familyCpfs");

  for (let i = 0; i < familyNames.length; i++) {
    if (familyNames[i]) {
      await prisma.familyRelation.create({ data: { personId: person.id, relativeName: familyNames[i], relativeCpf: familyCpfs[i] || "", kinship: familyKinships[i] || "", isResponsible: i === 0 } });
    }
  }

  redirect("/pessoas");
}
