import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.indicator.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Dashboards" subtitle="Indicadores e painéis" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/dashboards" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Indicador" required />
            <input name="area" placeholder="Área" />
            <input name="target" placeholder="Meta" type="number" step="0.01" />
            <input name="achieved" placeholder="Realizado" type="number" step="0.01" />
            <input name="period" placeholder="Período" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Indicador</th><th>Área</th><th>Meta</th><th>Realizado</th><th>Período</th><th>Observações</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.name ?? '')}</td><td>{String(item.area ?? '')}</td><td>{String(item.target ?? '')}</td><td>{String(item.achieved ?? '')}</td><td>{String(item.period ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
