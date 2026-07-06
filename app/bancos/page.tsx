import { PageHeader } from "@/components/PageHeader";

export default function Bancos() {
  return (
    <>
      <PageHeader title="Bancos e Contas" subtitle="Contas bancárias, PIX, extratos e integração com conciliação bancária" />

      <div className="card">
        <h2>Conceito desta tela</h2>
        <p>
          Aqui serão cadastradas as contas bancárias da instituição e dos projetos.
          A partir delas o SOCIVUM poderá importar extratos, conciliar movimentações,
          identificar PIX, TED, boletos, tarifas e repasses vinculados aos projetos.
        </p>
      </div>

      <div className="card">
        <h2>Campos previstos</h2>
        <ul>
          <li>Banco</li>
          <li>Agência</li>
          <li>Conta</li>
          <li>Tipo de conta</li>
          <li>Titularidade</li>
          <li>CNPJ/CPF do titular</li>
          <li>Chave PIX</li>
          <li>Projeto vinculado, quando aplicável</li>
          <li>Status da conta</li>
        </ul>
      </div>
    </>
  );
}
