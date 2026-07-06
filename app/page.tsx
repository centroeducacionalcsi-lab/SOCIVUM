import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Dashboard() {
  const pessoas = await prisma.person.count();
const familias = await prisma.family.count();
const beneficiarios = await prisma.beneficiary.count();
const voluntarios = await prisma.volunteer.count();
const equipe = await prisma.staff.count();
const doadores = await prisma.donor.count();
const parceiros = await prisma.partner.count();
const projetos = await prisma.project.count();
const acoes = await prisma.action.count();
const oficinas = await prisma.workshop.count();
const frequencia = await prisma.attendance.count();
const atendimento_social = await prisma.socialAssistance.count();
  const receitas = await prisma.financeEntry.findMany({ where: { type: { contains: "Receita" } } });
  const despesas = await prisma.financeEntry.findMany({ where: { type: { contains: "Despesa" } } });
  const totalReceitas = receitas.reduce((s, e) => s + e.amount, 0);
  const totalDespesas = despesas.reduce((s, e) => s + e.amount, 0);

  return (
    <>
      <PageHeader title="Dashboard SOCIVUM" subtitle="Preview completo para desenvolvedor testar e evoluir" />
      <div className="alert">
        Esta é uma versão de desenvolvimento. Não usar com dados reais antes de autenticação, LGPD, backup, segurança, HTTPS e homologação.
      </div>
      <section className="grid grid-4">
        <div className="card"><div className="metric">{pessoas}</div><div className="label">Pessoas</div></div>
<div className="card"><div className="metric">{familias}</div><div className="label">Famílias</div></div>
<div className="card"><div className="metric">{beneficiarios}</div><div className="label">Beneficiários</div></div>
<div className="card"><div className="metric">{voluntarios}</div><div className="label">Voluntários</div></div>
<div className="card"><div className="metric">{equipe}</div><div className="label">Equipe e Prestadores</div></div>
<div className="card"><div className="metric">{doadores}</div><div className="label">Doadores</div></div>
<div className="card"><div className="metric">{parceiros}</div><div className="label">Parceiros e Fornecedores</div></div>
<div className="card"><div className="metric">{projetos}</div><div className="label">Projetos</div></div>
<div className="card"><div className="metric">{acoes}</div><div className="label">Ações e Eventos</div></div>
<div className="card"><div className="metric">{oficinas}</div><div className="label">Oficinas e Turmas</div></div>
<div className="card"><div className="metric">{frequencia}</div><div className="label">Frequência</div></div>
<div className="card"><div className="metric">{atendimento_social}</div><div className="label">Atendimento Social</div></div>
      </section>
      <section className="grid grid-3">
        <div className="card"><div className="metric">R$ {totalReceitas.toLocaleString("pt-BR")}</div><div className="label">Receitas</div></div>
        <div className="card"><div className="metric">R$ {totalDespesas.toLocaleString("pt-BR")}</div><div className="label">Despesas</div></div>
        <div className="card"><div className="metric">R$ {(totalReceitas-totalDespesas).toLocaleString("pt-BR")}</div><div className="label">Saldo</div></div>
      </section>
      <div className="card">
        <h2>Escopo implementado nesta prévia</h2>
        <p>Foram estruturados 35 módulos com páginas, formulários, APIs e banco de dados inicial. A empresa desenvolvedora deverá revisar, testar, adaptar, proteger e transformar este preview em produto de produção.</p>
      </div>
    </>
  );
}
