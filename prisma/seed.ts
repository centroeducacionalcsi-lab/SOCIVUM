import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.person.upsert({
    where: { cpf: "00000000001" },
    update: {},
    create: { type: "Beneficiário", fullName: "Maria da Silva", cpf: "00000000001", phone: "81999990001", neighborhood: "Ibura", city: "Recife", state: "PE", incomeSource: "Bolsa Família" }
  });

  await prisma.project.create({
    data: { name: "Projeto Piloto SOCIVUM", source: "Recursos próprios", budget: 10000, received: 2000, status: "Em execução", description: "Projeto inicial para demonstração." }
  });

  await prisma.financeEntry.createMany({
    data: [
      { type: "Receita", description: "Doação inicial", amount: 2000, status: "Recebido", bankAccount: "Conta teste", paymentMethod: "PIX" },
      { type: "Despesa", description: "Material de escritório", amount: 350, status: "Pago", bankAccount: "Conta teste", paymentMethod: "PIX" }
    ]
  });
}

main().finally(() => prisma.$disconnect());
