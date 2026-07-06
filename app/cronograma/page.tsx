import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";
import { projectSchedulePhaseOptions } from "@/lib/projectSmartOptions";

export default async function Cronograma() {
  const projects = await prisma.project.findMany({ orderBy: { name: "asc" } });

  return (
    <>
      <PageHeader title="Cronograma" subtitle="Linha do tempo de execução por projeto" />

      <div className="card">
        <h2>Novo item de cronograma</h2>
        <div className="form-grid">
          <select><option>Selecione o projeto</option>{projects.map((project) => <option key={project.id}>{project.name}</option>)}</select>
          <select><option>Fase</option>{projectSchedulePhaseOptions.map((item) => <option key={item}>{item}</option>)}</select>
          <input type="date" placeholder="Início" />
          <input type="date" placeholder="Fim" />
          <input placeholder="Responsável" />
          <select><option>Planejado</option><option>Em andamento</option><option>Concluído</option><option>Atrasado</option></select>
        </div>
        <textarea placeholder="Descrição da etapa" />
        <br />
        <button type="button">Adicionar ao cronograma</button>
      </div>

      <div className="card">
        <h2>Visão do cronograma</h2>
        <p className="small">
          Esta tela será evoluída para um calendário/linha do tempo mostrando preparação, execução, oficinas, eventos, relatórios e prestação de contas de cada projeto.
        </p>
      </div>
    </>
  );
}
