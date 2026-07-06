import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.materialDonation.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Doações Materiais" subtitle="Doações de itens, alimentos e equipamentos" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/doacoes-materiais" method="post">
          <div className="form-grid">
            <input name="donorName" placeholder="Doador" required />
            <input name="item" placeholder="Item" />
            <input name="quantity" placeholder="Quantidade" type="number" step="0.01" />
            <input name="unit" placeholder="Unidade" />
            <input name="date" placeholder="Data" type="date" />
            <input name="destination" placeholder="Destinação" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Doador</th><th>Item</th><th>Quantidade</th><th>Unidade</th><th>Data</th><th>Destinação</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.donorName ?? '')}</td><td>{String(item.item ?? '')}</td><td>{String(item.quantity ?? '')}</td><td>{String(item.unit ?? '')}</td><td>{String(item.date ?? '')}</td><td>{String(item.destination ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
