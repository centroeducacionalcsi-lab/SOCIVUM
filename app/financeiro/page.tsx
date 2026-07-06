import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.financeEntry.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Financeiro" subtitle="Receitas, despesas e fluxo de caixa" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/financeiro" method="post">
          <div className="form-grid">
            <input name="type" placeholder="Tipo: Receita/Despesa" />
            <input name="description" placeholder="Descrição" required />
            <input name="amount" placeholder="Valor" type="number" step="0.01" />
            <input name="dueDate" placeholder="Vencimento" type="date" />
            <input name="paidDate" placeholder="Pagamento" type="date" />
            <input name="status" placeholder="Status" />
            <input name="category" placeholder="Categoria/Rubrica" />
            <input name="projectName" placeholder="Projeto" />
            <input name="source" placeholder="Fonte" />
            <input name="bankAccount" placeholder="Conta bancária" />
            <input name="paymentMethod" placeholder="Forma" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Tipo: Receita/Despesa</th><th>Descrição</th><th>Valor</th><th>Vencimento</th><th>Pagamento</th><th>Status</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.type ?? '')}</td><td>{String(item.description ?? '')}</td><td>{String(item.amount ?? '')}</td><td>{String(item.dueDate ?? '')}</td><td>{String(item.paidDate ?? '')}</td><td>{String(item.status ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
