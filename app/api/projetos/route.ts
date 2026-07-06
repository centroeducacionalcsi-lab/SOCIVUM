import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function getAll(form: FormData, name: string) {
  return form.getAll(name).map((item) => String(item)).filter(Boolean);
}

export async function POST(request: Request) {
  const form = await request.formData();

  const extraData = {
    code: String(form.get("code") || ""),
    area: String(form.get("area") || ""),
    funder: String(form.get("funder") || ""),
    publicNotice: String(form.get("publicNotice") || ""),
    financeStatus: String(form.get("financeStatus") || ""),
    branch: String(form.get("branch") || ""),
    unit: String(form.get("unit") || ""),
    otherUnits: String(form.get("otherUnits") || ""),
    territory: String(form.get("territory") || ""),
    city: String(form.get("city") || ""),
    state: String(form.get("state") || ""),
    executed: String(form.get("executed") || "0"),
    adminFee: String(form.get("adminFee") || ""),
    costCenterMode: String(form.get("costCenterMode") || ""),
    costCenter: String(form.get("costCenter") || ""),
    bankAccount: String(form.get("bankAccount") || ""),
    budgetLines: String(form.get("budgetLines") || ""),
    financeNotes: String(form.get("financeNotes") || ""),
    executionMonths: String(form.get("executionMonths") || ""),
    captureDeadline: String(form.get("captureDeadline") || ""),
    schedulePhases: getAll(form, "schedulePhases"),
    audiences: getAll(form, "audiences"),
    targetType1: String(form.get("targetType1") || ""),
    targetValue1: String(form.get("targetValue1") || ""),
    targetType2: String(form.get("targetType2") || ""),
    targetValue2: String(form.get("targetValue2") || ""),
    targetType3: String(form.get("targetType3") || ""),
    targetValue3: String(form.get("targetValue3") || ""),
    coordinator: String(form.get("coordinator") || ""),
    technicalResponsible: String(form.get("technicalResponsible") || ""),
    financialResponsible: String(form.get("financialResponsible") || ""),
    accountabilityResponsible: String(form.get("accountabilityResponsible") || ""),
    teamForecast: String(form.get("teamForecast") || ""),
    workshopsForecast: String(form.get("workshopsForecast") || ""),
    classesForecast: String(form.get("classesForecast") || ""),
    actionsForecast: String(form.get("actionsForecast") || ""),
    workloadForecast: String(form.get("workloadForecast") || ""),
    frequencyRule: String(form.get("frequencyRule") || ""),
    attendanceRule: String(form.get("attendanceRule") || ""),
    accountabilityPeriod: String(form.get("accountabilityPeriod") || ""),
    documentFolder: String(form.get("documentFolder") || ""),
    requiredDocuments: String(form.get("requiredDocuments") || ""),
    reportDeadline: String(form.get("reportDeadline") || ""),
    accountabilityNotes: String(form.get("accountabilityNotes") || "")
  };

  await prisma.project.create({
    data: {
      name: String(form.get("name") || ""),
      source: String(form.get("source") || ""),
      budget: Number(form.get("budget") || 0),
      received: Number(form.get("received") || 0),
      status: String(form.get("status") || "Em elaboração"),
      startDate: String(form.get("startDate") || ""),
      endDate: String(form.get("endDate") || ""),
      description: String(form.get("description") || ""),
      objectives: String(form.get("objectives") || ""),
      notes: JSON.stringify(extraData, null, 2)
    }
  });

  redirect("/projetos");
}
