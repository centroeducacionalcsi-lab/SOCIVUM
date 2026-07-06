import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.donor.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Doadores" subtitle="Gestão de doadores" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/doadores" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Nome/Razão social" required />
            <input name="document" placeholder="CPF/CNPJ" />
            <input name="contact" placeholder="Contato" />
            <input name="preference" placeholder="Preferência" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Nome/Razão social</th><th>CPF/CNPJ</th><th>Contato</th><th>Preferência</th><th>Observações</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.name ?? '')}</td><td>{String(item.document ?? '')}</td><td>{String(item.contact ?? '')}</td><td>{String(item.preference ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
