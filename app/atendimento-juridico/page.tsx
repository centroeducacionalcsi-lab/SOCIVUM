import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.legalAssistance.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Atendimento Jurídico" subtitle="Orientações e acompanhamento jurídico" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/atendimento-juridico" method="post">
          <div className="form-grid">
            <input name="personName" placeholder="Pessoa" required />
            <input name="cpf" placeholder="CPF" />
            <input name="date" placeholder="Data" type="date" />
            <input name="area" placeholder="Área" />
            <input name="status" placeholder="Status" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Pessoa</th><th>CPF</th><th>Data</th><th>Área</th><th>Status</th><th>Observações</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.personName ?? '')}</td><td>{String(item.cpf ?? '')}</td><td>{String(item.date ?? '')}</td><td>{String(item.area ?? '')}</td><td>{String(item.status ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
