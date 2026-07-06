import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Planejamento() {
  const indicadores = await prisma.indicator.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return (
    <>
      <PageHeader title="Planejamento Estratégico" subtitle="Cadastro de metas, objetivos e indicadores institucionais" />

      <div className="card">
        <h2>Nova meta estratégica</h2>
        <form className="form" action="/api/dashboards" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Indicador / meta" required />
            <input name="area" placeholder="Área: Social, Projetos, Financeiro..." />
            <input name="target" placeholder="Meta prevista" type="number" step="0.01" />
            <input name="achieved" placeholder="Realizado inicial, se houver" type="number" step="0.01" />
            <input name="period" placeholder="Período: 2026, Junho/2026..." />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar meta</button>
        </form>
      </div>

      <div className="card">
        <h2>Metas cadastradas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Indicador</th>
              <th>Área</th>
              <th>Meta</th>
              <th>Realizado</th>
              <th>Período</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {indicadores.map((item) => {
              const percent = item.target && item.target > 0 ? ((item.achieved || 0) / item.target) * 100 : 0;
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.area}</td>
                  <td>{item.target}</td>
                  <td>{item.achieved}</td>
                  <td>{item.period}</td>
                  <td>{percent.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
