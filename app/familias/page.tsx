import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.family.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Famílias" subtitle="Cadastro Familiar e Núcleo Domiciliar" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/familias" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Nome da família" required />
            <input name="responsibleName" placeholder="Responsável" />
            <input name="responsibleCpf" placeholder="CPF responsável" />
            <input name="neighborhood" placeholder="Bairro" />
            <input name="familyIncome" placeholder="Renda familiar" type="number" step="0.01" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Nome da família</th><th>Responsável</th><th>CPF responsável</th><th>Bairro</th><th>Renda familiar</th><th>Observações</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.name ?? '')}</td><td>{String(item.responsibleName ?? '')}</td><td>{String(item.responsibleCpf ?? '')}</td><td>{String(item.neighborhood ?? '')}</td><td>{String(item.familyIncome ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
