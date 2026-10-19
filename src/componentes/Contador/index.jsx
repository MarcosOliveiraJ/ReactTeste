import { useState } from 'react';
import './Contador.css';

export default function Contador() {
  const [contador, setContador] = useState(0);
  const [passo, setPasso] = useState(1);
  const [ultimoLoteRegistrado, setUltimoLoteRegistrado] = useState(null);

  const valorPasso = Number(passo) >= 1 && Number(passo) <= 10 ? Number(passo) : 1;

  const botaoMenosDesabilitado = contador - valorPasso < 0 || contador === 0;
  const botaoMaisDesabilitado = contador + valorPasso > 50 || contador === 50;

  function aumentar() {
    if (contador + valorPasso <= 50) {
      setContador(contador + valorPasso);
    }
  }

  function diminuir() {
    if (contador - valorPasso >= 0) {
      setContador(contador - valorPasso);
    }
  }

  function mudarPasso(e) {
    const valor = e.target.value;

    if (valor === '') {
      setPasso('');
      return;
    }

    const num = Number(valor);

    if (isNaN(num)) {
      setPasso(1);
    } else if (num < 1) {
      setPasso(1);
    } else if (num > 10) {
      setPasso(10);
    } else {
      setPasso(Math.floor(num));
    }
  }

  function aoSairDoInput() {
    if (passo === '' || Number(passo) < 1) {
      setPasso(1);
    } else if (Number(passo) > 10) {
      setPasso(10);
    } else {
      setPasso(Math.floor(Number(passo)));
    }
  }

  function finalizarLote() {
    if (contador > 0) {
      setUltimoLoteRegistrado(contador);
      setContador(0);
    }
  }

  let classeStatus = 'status-normal';
  let textoAviso = null;
  let badgeFechado = null;

  if (contador === 50) {
    classeStatus = 'status-completo';
    badgeFechado = <span className="badge-fechado">Lote Fechado</span>;
  } else if (contador >= 40) {
    classeStatus = 'status-alerta';
    textoAviso = <p className="texto-aviso">Capacidade quase atingida</p>;
  }

  return (
    <div className="card-contador">
      <h2>AutomaLog - Controle de Lotes</h2>

      <div className={`display-caixas ${classeStatus}`}>
        <span className="numero-contador">{contador}</span>
        <span className="capacidade-maxima">/ 50 caixas</span>

        {textoAviso}
        {badgeFechado}
      </div>

      <div className="campo-passo">
        <label htmlFor="input-passo">Passo:</label>
        <input
          id="input-passo"
          type="number"
          min="1"
          max="10"
          value={passo}
          onChange={mudarPasso}
          onBlur={aoSairDoInput}
        />
      </div>

      <div className="botoes-contagem">
        <button
          type="button"
          onClick={diminuir}
          disabled={botaoMenosDesabilitado}
          className="btn-menos"
        >
          -
        </button>

        <button
          type="button"
          onClick={aumentar}
          disabled={botaoMaisDesabilitado}
          className="btn-mais"
        >
          +
        </button>
      </div>

      <div className="area-zerar">
        <button
          type="button"
          onClick={finalizarLote}
          className="btn-zerar"
        >
          Finalizar Lote / Zerar
        </button>
      </div>

      <div className="registro-ultimo-lote">
        <h3>Último Lote Fechado:</h3>
        {ultimoLoteRegistrado !== null ? (
          <p className="valor-ultimo-lote">
            <strong>{ultimoLoteRegistrado}</strong> caixas
          </p>
        ) : (
          <p className="sem-lote">Nenhum lote registrado ainda</p>
        )}
      </div>
    </div>
  );
}
