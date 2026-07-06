import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.financialDonation.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Doações Financeiras" subtitle="Doações em dinheiro, PIX e transferência" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/doacoes-financeiras" method="post">
          <div className="form-grid">
            <input name="donorName" placeholder="Doador" required />
            <input name="amount" placeholder="Valor" type="number" step="0.01" />
            <input name="date" placeholder="Data" type="date" />
            <input name="method" placeholder="Forma" />
            <input name="destination" placeholder="Destinação" />
            <input name="projectName" placeholder="Projeto" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Doador</th><th>Valor</th><th>Data</th><th>Forma</th><th>Destinação</th><th>Projeto</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.donorName ?? '')}</td><td>{String(item.amount ?? '')}</td><td>{String(item.date ?? '')}</td><td>{String(item.method ?? '')}</td><td>{String(item.destination ?? '')}</td><td>{String(item.projectName ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
