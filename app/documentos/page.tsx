import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.document.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Documentos" subtitle="Central de arquivos" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/documentos" method="post">
          <div className="form-grid">
            <input name="title" placeholder="Título" required />
            <input name="type" placeholder="Tipo" />
            <input name="relatedTo" placeholder="Relacionado a" />
            <input name="fileUrl" placeholder="Link/arquivo" />
            <input name="expiresAt" placeholder="Validade" type="date" />
            <input name="status" placeholder="Status" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Título</th><th>Tipo</th><th>Relacionado a</th><th>Link/arquivo</th><th>Validade</th><th>Status</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.title ?? '')}</td><td>{String(item.type ?? '')}</td><td>{String(item.relatedTo ?? '')}</td><td>{String(item.fileUrl ?? '')}</td><td>{String(item.expiresAt ?? '')}</td><td>{String(item.status ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
