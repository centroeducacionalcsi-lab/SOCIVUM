import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.aiLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Inteligência Artificial" subtitle="Assistente inteligente" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/ia" method="post">
          <div className="form-grid">
            <textarea name="question" placeholder="Pergunta" />
            <textarea name="answer" placeholder="Resposta" />
            <input name="module" placeholder="Módulo" />
            <input name="userName" placeholder="Usuário" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Pergunta</th><th>Resposta</th><th>Módulo</th><th>Usuário</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.question ?? '')}</td><td>{String(item.answer ?? '')}</td><td>{String(item.module ?? '')}</td><td>{String(item.userName ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
