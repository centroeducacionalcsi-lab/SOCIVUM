import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.purchase.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Compras" subtitle="Solicitações, cotações e aquisições" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/compras" method="post">
          <div className="form-grid">
            <input name="description" placeholder="Descrição" required />
            <input name="requester" placeholder="Solicitante" />
            <input name="supplier" placeholder="Fornecedor" />
            <input name="projectName" placeholder="Projeto" />
            <input name="amount" placeholder="Valor" type="number" step="0.01" />
            <input name="status" placeholder="Status" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Descrição</th><th>Solicitante</th><th>Fornecedor</th><th>Projeto</th><th>Valor</th><th>Status</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.description ?? '')}</td><td>{String(item.requester ?? '')}</td><td>{String(item.supplier ?? '')}</td><td>{String(item.projectName ?? '')}</td><td>{String(item.amount ?? '')}</td><td>{String(item.status ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
