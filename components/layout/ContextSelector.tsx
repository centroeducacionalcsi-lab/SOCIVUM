export function ContextSelector() {
  return (
    <div className="context-selector">
      <select>
        <option>🌎 Centro Educacional CSI</option>
      </select>
      <select>
        <option>🏢 Todas as filiais</option>
        <option>CSI Pernambuco</option>
        <option>CSI Rio de Janeiro</option>
        <option>CSI São Paulo</option>
        <option>CSI Bahia</option>
        <option>CSI Santa Catarina</option>
        <option>CSI Rio Grande do Sul</option>
      </select>
      <select>
        <option>📍 Todas as unidades</option>
        <option>Unidade Ibura</option>
        <option>Unidade Várzea</option>
        <option>Unidade Moreno</option>
      </select>
    </div>
  );
}
