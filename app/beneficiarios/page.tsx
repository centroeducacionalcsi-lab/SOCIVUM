import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.beneficiary.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Beneficiários" subtitle="Gestão de beneficiários" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/beneficiarios" method="post">
          <div className="form-grid">
            <input name="fullName" placeholder="Nome" required />
            <input name="cpf" placeholder="CPF" />
            <input name="status" placeholder="Status" />
            <input name="projectName" placeholder="Projeto" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Nome</th><th>CPF</th><th>Status</th><th>Projeto</th><th>Observações</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.fullName ?? '')}</td><td>{String(item.cpf ?? '')}</td><td>{String(item.status ?? '')}</td><td>{String(item.projectName ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
