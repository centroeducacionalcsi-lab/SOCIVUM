import { PageHeader } from "@/components/PageHeader";
import { priorityOptions } from "@/lib/options";

export default function Agenda() {
  return (
    <>
      <PageHeader title="Agenda e Tarefas" subtitle="Compromissos, prazos, tarefas e alertas" />
      <div className="card">
        <h2>Nova tarefa/compromisso</h2>
        <form className="form" action="/api/agenda" method="post">
          <div className="form-grid">
            <input name="title" placeholder="Título" required />
            <input name="date" type="date" />
            <input name="time" type="time" />
            <input name="responsible" placeholder="Responsável" />
            <select name="priority">
              <option value="">Prioridade</option>
              {priorityOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select name="status">
              <option>A fazer</option>
              <option>Em andamento</option>
              <option>Concluída</option>
              <option>Cancelada</option>
            </select>
          </div>
          <textarea name="notes" placeholder="Observações" />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </>
  );
}
