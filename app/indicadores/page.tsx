import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Indicadores() {
  const [
    pessoas,
    beneficiarios,
    projetos,
    acoes,
    atendimentosSociais,
    atendimentosPsicologicos,
    atendimentosJuridicos,
    financeiro
  ] = await Promise.all([
    prisma.person.count(),
    prisma.beneficiary.count(),
    prisma.project.count(),
    prisma.action.count(),
    prisma.socialAssistance.count(),
    prisma.psychologicalAssistance.count(),
    prisma.legalAssistance.count(),
    prisma.financeEntry.findMany()
  ]);

  const receitas = financeiro
    .filter((item) => item.type?.toLowerCase().includes("receita"))
    .reduce((total, item) => total + item.amount, 0);

  const despesas = financeiro
    .filter((item) => item.type?.toLowerCase().includes("despesa"))
    .reduce((total, item) => total + item.amount, 0);

  return (
    <>
      <PageHeader title="Indicadores e BI" subtitle="Painéis automáticos gerados a partir dos dados cadastrados" />

      <div className="alert">
        Este módulo não deve ter cadastro manual. Os indicadores são calculados automaticamente pelo SOCIVUM.
      </div>

      <section className="grid grid-4">
        <div className="card"><div className="metric">{pessoas}</div><div className="label">Pessoas cadastradas</div></div>
        <div className="card"><div className="metric">{beneficiarios}</div><div className="label">Beneficiários ativos</div></div>
        <div className="card"><div className="metric">{projetos}</div><div className="label">Projetos cadastrados</div></div>
        <div className="card"><div className="metric">{acoes}</div><div className="label">Ações e eventos</div></div>
      </section>

      <section className="grid grid-3">
        <div className="card"><div className="metric">{atendimentosSociais}</div><div className="label">Atendimentos sociais</div></div>
        <div className="card"><div className="metric">{atendimentosPsicologicos}</div><div className="label">Atendimentos psicológicos</div></div>
        <div className="card"><div className="metric">{atendimentosJuridicos}</div><div className="label">Atendimentos jurídicos</div></div>
      </section>

      <section className="grid grid-3">
        <div className="card"><div className="metric">R$ {receitas.toLocaleString("pt-BR")}</div><div className="label">Receitas</div></div>
        <div className="card"><div className="metric">R$ {despesas.toLocaleString("pt-BR")}</div><div className="label">Despesas</div></div>
        <div className="card"><div className="metric">R$ {(receitas - despesas).toLocaleString("pt-BR")}</div><div className="label">Saldo financeiro</div></div>
      </section>
    </>
  );
}
