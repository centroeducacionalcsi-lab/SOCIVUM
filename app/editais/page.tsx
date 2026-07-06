import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.opportunity.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Editais e Captação" subtitle="Oportunidades, prazos e captação" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/editais" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Edital/Oportunidade" required />
            <input name="organization" placeholder="Órgão" />
            <input name="deadline" placeholder="Prazo" type="date" />
            <input name="amount" placeholder="Valor" type="number" step="0.01" />
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
          <thead><tr><th>Edital/Oportunidade</th><th>Órgão</th><th>Prazo</th><th>Valor</th><th>Área</th><th>Status</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.name ?? '')}</td><td>{String(item.organization ?? '')}</td><td>{String(item.deadline ?? '')}</td><td>{String(item.amount ?? '')}</td><td>{String(item.area ?? '')}</td><td>{String(item.status ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
