import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.communication.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Comunicação" subtitle="Mensagens, WhatsApp e e-mail" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/comunicacao" method="post">
          <div className="form-grid">
            <input name="title" placeholder="Título" required />
            <input name="channel" placeholder="Canal" />
            <input name="audience" placeholder="Público" />
            <textarea name="message" placeholder="Mensagem" />
            <input name="status" placeholder="Status" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Título</th><th>Canal</th><th>Público</th><th>Mensagem</th><th>Status</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.title ?? '')}</td><td>{String(item.channel ?? '')}</td><td>{String(item.audience ?? '')}</td><td>{String(item.message ?? '')}</td><td>{String(item.status ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
