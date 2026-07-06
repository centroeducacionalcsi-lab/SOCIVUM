import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.contract.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Contratos e Convênios" subtitle="Instrumentos, contratos e parcerias" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/contratos" method="post">
          <div className="form-grid">
            <input name="title" placeholder="Título" required />
            <input name="type" placeholder="Tipo" />
            <input name="parties" placeholder="Partes" />
            <input name="amount" placeholder="Valor" type="number" step="0.01" />
            <input name="startDate" placeholder="Início" type="date" />
            <input name="endDate" placeholder="Fim" type="date" />
            <input name="status" placeholder="Status" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Título</th><th>Tipo</th><th>Partes</th><th>Valor</th><th>Início</th><th>Fim</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.title ?? '')}</td><td>{String(item.type ?? '')}</td><td>{String(item.parties ?? '')}</td><td>{String(item.amount ?? '')}</td><td>{String(item.startDate ?? '')}</td><td>{String(item.endDate ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
