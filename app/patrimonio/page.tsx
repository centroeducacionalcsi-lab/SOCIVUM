import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.asset.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Patrimônio" subtitle="Bens permanentes" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/patrimonio" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Bem" required />
            <input name="code" placeholder="Patrimônio" />
            <input name="category" placeholder="Categoria" />
            <input name="location" placeholder="Local" />
            <input name="responsible" placeholder="Responsável" />
            <input name="value" placeholder="Valor" type="number" step="0.01" />
            <input name="status" placeholder="Status" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Bem</th><th>Patrimônio</th><th>Categoria</th><th>Local</th><th>Responsável</th><th>Valor</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.name ?? '')}</td><td>{String(item.code ?? '')}</td><td>{String(item.category ?? '')}</td><td>{String(item.location ?? '')}</td><td>{String(item.responsible ?? '')}</td><td>{String(item.value ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
