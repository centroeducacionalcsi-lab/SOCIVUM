import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";
import { projectTargetTypeOptions } from "@/lib/projectSmartOptions";

export default async function MetasProjeto() {
  const projects = await prisma.project.findMany({ orderBy: { name: "asc" } });

  return (
    <>
      <PageHeader title="Metas do Projeto" subtitle="Metas planejadas e realizado automático a partir dos dados do sistema" />

      <div className="alert">
        O realizado não deve ser digitado manualmente quando puder ser calculado pelo SOCIVUM: frequência, cadastros, atendimentos, financeiro e relatórios.
      </div>

      <div className="card">
        <h2>Nova meta</h2>
        <div className="form-grid">
          <select><option>Selecione o projeto</option>{projects.map((project) => <option key={project.id}>{project.name}</option>)}</select>
          <select><option>Tipo de meta</option>{projectTargetTypeOptions.map((item) => <option key={item}>{item}</option>)}</select>
          <input type="number" step="0.01" placeholder="Meta prevista" />
          <input placeholder="Fonte do realizado automático" />
          <input type="date" placeholder="Prazo" />
          <select><option>Ativa</option><option>Concluída</option><option>Em atraso</option><option>Cancelada</option></select>
        </div>
        <textarea placeholder="Observações" />
        <br />
        <button type="button">Salvar meta</button>
      </div>
    </>
  );
}
