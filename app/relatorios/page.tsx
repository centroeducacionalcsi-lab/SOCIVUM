import { PageHeader } from "@/components/PageHeader";
import { reportTypes } from "@/lib/options";

export default function Relatorios() {
  return (
    <>
      <PageHeader title="Relatórios" subtitle="Central de emissão de relatórios padronizados" />
      <div className="alert">
        Relatórios não devem ser preenchidos manualmente. O usuário escolhe o tipo, os filtros e o SOCIVUM gera o relatório.
      </div>
      <div className="card">
        <h2>Gerar relatório</h2>
        <div className="form-grid">
          <select>
            <option>Selecione o relatório</option>
            {reportTypes.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input type="date" />
          <input type="date" />
          <select>
            <option>Todos os projetos</option>
            <option>Projeto específico</option>
            <option>Institucional</option>
          </select>
          <select>
            <option>PDF</option>
            <option>Excel</option>
            <option>CSV</option>
          </select>
        </div>
        <br />
        <button type="button">Gerar relatório</button>
      </div>
      <div className="grid grid-3">
        {reportTypes.map((item) => (
          <div className="card" key={item}>
            <h3>{item}</h3>
            <p className="small">Relatório padronizado para análise, prestação de contas e gestão.</p>
          </div>
        ))}
      </div>
    </>
  );
}
