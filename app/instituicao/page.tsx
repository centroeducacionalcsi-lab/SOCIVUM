import { PageHeader } from "@/components/PageHeader";
import {
  branchStatusOptions,
  spaceTypeOptions,
  territoryTypeOptions,
  unitStatusOptions,
  unitTypeOptions
} from "@/lib/orgOptions";

const cnpjOptions = [
  "CSI Matriz Recife - CNPJ 00.000.000/0001-00",
  "CSI Filial RJ - CNPJ 00.000.000/0002-00",
  "CSI Filial SP - CNPJ 00.000.000/0003-00",
  "CSI Filial BA - CNPJ 00.000.000/0004-00",
  "CSI Filial SC - CNPJ 00.000.000/0005-00",
  "CSI Filial RS - CNPJ 00.000.000/0006-00"
];

export default function Instituicao() {
  return (
    <>
      <PageHeader
        title="Estrutura Organizacional"
        subtitle="Organização, filiais, unidades, espaços e territórios de atuação"
      />

      <div className="alert">
        Toda unidade deverá ser associada ao CNPJ responsável: matriz ou filial.
      </div>

      <div className="card">
        <h2>1. Organização Matriz</h2>
        <div className="form-grid">
          <input placeholder="Razão Social" defaultValue="Centro Educacional, Cultural e Social do Ibura" />
          <input placeholder="Nome Fantasia" defaultValue="Centro Educacional CSI" />
          <input placeholder="CNPJ da Matriz" />
          <input placeholder="Data de Fundação" type="date" />
          <input placeholder="Presidente" />
          <input placeholder="E-mail institucional" />
          <input placeholder="Telefone / WhatsApp" />
          <input placeholder="Site" />
          <input placeholder="CEP" />
          <input placeholder="Endereço" />
          <input placeholder="Bairro" />
          <input placeholder="Cidade" />
          <input placeholder="UF" />
          <input placeholder="Logo da instituição (upload futuro)" />
        </div>
        <textarea placeholder="Missão, visão, valores e observações institucionais" />
      </div>

      <div className="card">
        <h2>2. Filiais</h2>
        <div className="form-grid">
          <input placeholder="Nome da Filial" />
          <input placeholder="CNPJ da Filial" />
          <input placeholder="Responsável pela filial" />
          <input placeholder="E-mail" />
          <input placeholder="Telefone" />
          <select>
            <option>Status da filial</option>
            {branchStatusOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input placeholder="CEP" />
          <input placeholder="Endereço" />
          <input placeholder="Bairro" />
          <input placeholder="Cidade" />
          <input placeholder="UF" />
          <input placeholder="Data de abertura" type="date" />
        </div>
        <button type="button">Adicionar filial</button>
      </div>

      <div className="card">
        <h2>3. Unidades de Atendimento</h2>
        <div className="form-grid">
          <input placeholder="Nome da unidade" />
          <input placeholder="Código da unidade" />
          <select>
            <option>Tipo da unidade</option>
            {unitTypeOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select>
            <option>CNPJ responsável pela unidade</option>
            {cnpjOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select>
            <option>Status da unidade</option>
            {unitStatusOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input placeholder="Responsável local" />
          <input placeholder="Coordenador" />
          <input placeholder="Assistente Social Responsável" />
          <input placeholder="Psicóloga Responsável" />
          <input placeholder="Telefone" />
          <input placeholder="E-mail" />
          <input placeholder="Horário de funcionamento" />
          <input placeholder="CEP" />
          <input placeholder="Endereço" />
          <input placeholder="Número" />
          <input placeholder="Bairro" />
          <input placeholder="Cidade" />
          <input placeholder="UF" />
        </div>
        <button type="button">Adicionar unidade</button>
      </div>

      <div className="card">
        <h2>4. Espaços internos da unidade</h2>
        <div className="form-grid">
          <select>
            <option>Unidade</option>
            <option>Unidade Ibura</option>
            <option>Unidade Várzea</option>
            <option>Unidade Moreno</option>
          </select>
          <input placeholder="Nome do espaço" />
          <select>
            <option>Tipo do espaço</option>
            {spaceTypeOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input placeholder="Capacidade" type="number" />
          <input placeholder="Responsável pelo espaço" />
          <select>
            <option>Ativo</option>
            <option>Inativo</option>
            <option>Em manutenção</option>
          </select>
        </div>
        <button type="button">Adicionar espaço</button>
      </div>

      <div className="card">
        <h2>5. Territórios de atuação</h2>
        <div className="form-grid">
          <input placeholder="Nome do território" />
          <select>
            <option>Tipo de território</option>
            {territoryTypeOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input placeholder="Cidade" />
          <input placeholder="UF" />
          <input placeholder="Unidade responsável" />
          <textarea placeholder="Observações sobre o território" />
        </div>
        <button type="button">Adicionar território</button>
      </div>
    </>
  );
}
