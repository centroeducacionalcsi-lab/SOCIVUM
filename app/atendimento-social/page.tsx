import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.socialAssistance.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Atendimento Social" subtitle="Atendimentos sociais e familiares" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/atendimento-social" method="post">
          <div className="form-grid">
            <input name="personName" placeholder="Pessoa" required />
            <input name="cpf" placeholder="CPF" />
            <input name="date" placeholder="Data" type="date" />
            <input name="professional" placeholder="Profissional" />
            <textarea name="demand" placeholder="Demanda" />
            <textarea name="referral" placeholder="Encaminhamento" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Pessoa</th><th>CPF</th><th>Data</th><th>Profissional</th><th>Demanda</th><th>Encaminhamento</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.personName ?? '')}</td><td>{String(item.cpf ?? '')}</td><td>{String(item.date ?? '')}</td><td>{String(item.professional ?? '')}</td><td>{String(item.demand ?? '')}</td><td>{String(item.referral ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
