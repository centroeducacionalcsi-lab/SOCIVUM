import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.bankReconciliation.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Conciliação Bancária" subtitle="Importação e conciliação de extratos" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/conciliacao-bancaria" method="post">
          <div className="form-grid">
            <input name="description" placeholder="Histórico do extrato" required />
            <input name="bankAccount" placeholder="Conta bancária" />
            <input name="transactionDate" placeholder="Data" type="date" />
            <input name="amount" placeholder="Valor" type="number" step="0.01" />
            <input name="transactionType" placeholder="Tipo" />
            <input name="status" placeholder="Status" />
            <input name="linkedEntry" placeholder="Lançamento vinculado" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Histórico do extrato</th><th>Conta bancária</th><th>Data</th><th>Valor</th><th>Tipo</th><th>Status</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.description ?? '')}</td><td>{String(item.bankAccount ?? '')}</td><td>{String(item.transactionDate ?? '')}</td><td>{String(item.amount ?? '')}</td><td>{String(item.transactionType ?? '')}</td><td>{String(item.status ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
