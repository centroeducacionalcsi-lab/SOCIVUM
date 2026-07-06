import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.mobileRecord.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Mobile" subtitle="Registros de campo e aplicativo" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/mobile" method="post">
          <div className="form-grid">
            <input name="title" placeholder="Título" required />
            <input name="type" placeholder="Tipo" />
            <input name="personName" placeholder="Pessoa" />
            <input name="location" placeholder="Local" />
            <input name="date" placeholder="Data" type="date" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Título</th><th>Tipo</th><th>Pessoa</th><th>Local</th><th>Data</th><th>Observações</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.title ?? '')}</td><td>{String(item.type ?? '')}</td><td>{String(item.personName ?? '')}</td><td>{String(item.location ?? '')}</td><td>{String(item.date ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
