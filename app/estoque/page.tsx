import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.stockItem.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Estoque" subtitle="Controle de materiais" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/estoque" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Produto" required />
            <input name="category" placeholder="Categoria" />
            <input name="unit" placeholder="Unidade" />
            <input name="quantity" placeholder="Quantidade" type="number" step="0.01" />
            <input name="minimum" placeholder="Estoque mínimo" type="number" step="0.01" />
            <input name="source" placeholder="Origem" />
            <input name="destination" placeholder="Destinação" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Produto</th><th>Categoria</th><th>Unidade</th><th>Quantidade</th><th>Estoque mínimo</th><th>Origem</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.name ?? '')}</td><td>{String(item.category ?? '')}</td><td>{String(item.unit ?? '')}</td><td>{String(item.quantity ?? '')}</td><td>{String(item.minimum ?? '')}</td><td>{String(item.source ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
