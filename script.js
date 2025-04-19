let questoes =[/*
  {
    "numero": 1,
    "enunciado": "Qual movimento artístico brasileiro foi liderado por Anita Malfatti, Mário de Andrade e Oswald de Andrade?",
    "alternativas": {
      "A": "Realismo",
      "B": "Romantismo",
      "C": "Modernismo",
      "D": "Barroco",
      "E": "Cubismo"
    }
  },
  {
    "numero": 2,
    "enunciado": "A Semana de Arte Moderna, marco do Modernismo no Brasil, aconteceu em que ano?",
    "alternativas": {
      "A": "1922",
      "B": "1930",
      "C": "1910",
      "D": "1945",
      "E": "1955"
    }
  },
  {
    "numero": 3,
    "enunciado": "Qual artista é conhecido por suas esculturas em madeira representando figuras do sertão nordestino?",
    "alternativas": {
      "A": "Tarsila do Amaral",
      "B": "Vicente do Rego Monteiro",
      "C": "Cândido Portinari",
      "D": "Mestre Vitalino",
      "E": "Heitor dos Prazeres"
    }
  },
  {
    "numero": 4,
    "enunciado": "A pintura 'Abaporu', um dos ícones do modernismo brasileiro, foi criada por qual artista?",
    "alternativas": {
      "A": "Di Cavalcanti",
      "B": "Anita Malfatti",
      "C": "Tarsila do Amaral",
      "D": "Candido Portinari",
      "E": "Tomie Ohtake"
    }
  },
  {
    "numero": 5,
    "enunciado": "Qual desses movimentos influenciou a arte barroca no Brasil colonial?",
    "alternativas": {
      "A": "Expressionismo",
      "B": "Renascimento",
      "C": "Barroco Europeu",
      "D": "Futurismo",
      "E": "Cubismo"
    }
  },
  {
    "numero": 6,
    "enunciado": "Qual artista brasileiro pintou os murais do Palácio Capanema e da ONU em Nova York?",
    "alternativas": {
      "A": "Tarsila do Amaral",
      "B": "Candido Portinari",
      "C": "Di Cavalcanti",
      "D": "Rubem Valentim",
      "E": "Helio Oiticica"
    }
  },
  {
    "numero": 7,
    "enunciado": "Qual movimento artístico brasileiro propunha a valorização da cultura popular e indígena?",
    "alternativas": {
      "A": "Neoconcretismo",
      "B": "Manifesto Pau-Brasil",
      "C": "Barroco",
      "D": "Dadaísmo",
      "E": "Futurismo"
    }
  },
  {
    "numero": 8,
    "enunciado": "Hélio Oiticica foi um dos principais nomes de qual movimento artístico brasileiro?",
    "alternativas": {
      "A": "Concretismo",
      "B": "Modernismo",
      "C": "Arte Naïf",
      "D": "Tropicalismo",
      "E": "Neoconcretismo"
    }
  },
  {
    "numero": 9,
    "enunciado": "Qual arquiteto brasileiro é conhecido mundialmente por seu trabalho em Brasília?",
    "alternativas": {
      "A": "Roberto Burle Marx",
      "B": "Lúcio Costa",
      "C": "Oscar Niemeyer",
      "D": "Ruy Ohtake",
      "E": "Paulo Mendes da Rocha"
    }
  },
  {
    "numero": 10,
    "enunciado": "Qual dessas artistas é reconhecida por suas obras abstratas e seu uso expressivo de cor no Brasil contemporâneo?",
    "alternativas": {
      "A": "Adriana Varejão",
      "B": "Beatriz Milhazes",
      "C": "Lygia Clark",
      "D": "Tomie Ohtake",
      "E": "Anna Bella Geiger"
    }
  }*/
]
;

function salvarQuestao() {
  const enunciado = document.getElementById('enunciado').value;
  const A = document.getElementById('altA').value;
  const B = document.getElementById('altB').value;
  const C = document.getElementById('altC').value;
  const D = document.getElementById('altD').value;
  const E = document.getElementById('altE').value;

  if (!enunciado || !A || !B || !C || !D || !E) {
    alert('Preencha todos os campos.');
    return;
  }

  const novaQuestao = {
    numero: questoes.length + 1,
    enunciado,
    alternativas: { A, B, C, D, E }
  };

  questoes.push(novaQuestao);
  atualizarLista();

  document.getElementById('enunciado').value = '';
  document.getElementById('altA').value = '';
  document.getElementById('altB').value = '';
  document.getElementById('altC').value = '';
  document.getElementById('altD').value = '';
  document.getElementById('altE').value = '';
}

function atualizarLista() {
  const ul = document.getElementById('listaQuestoes');
  ul.innerHTML = '';
  questoes.forEach(q => {
    const li = document.createElement('li');
    li.innerText = `Questão ${q.numero}: ${q.enunciado}`;
    ul.appendChild(li);
  });
}

function embaralharAlternativas(alternativas) {
  const letras = Object.keys(alternativas);
  const valores = Object.values(alternativas);
  const embaralhadas = valores
    .map(v => ({ v, o: Math.random() }))
    .sort((a, b) => a.o - b.o)
    .map((el, i) => [letras[i], el.v]);
  return Object.fromEntries(embaralhadas);
}

function gerarVersoesPDF() {
  for (let v = 1; v <= 3; v++) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 6;
    y += 5;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('Nome: _______________________________', 10, y);
    doc.text('Nº: ____', 100, y);
    doc.text('Série: _____', 120, y);
    doc.text('Data: ____/____/______', 145, y);

    y += 10;
    doc.setFontSize(20);
    doc.text(`Avaliação - Valor:`, 105, y, { align: 'center' });

    doc.setFontSize(11);
    y += 8;

    const espacamento = 5;
    const xColuna1 = 10;
    const xColuna2 = 105;

    const questoesVersao = questoes.map(q => ({
      numero: q.numero,
      enunciado: q.enunciado,
      alternativas: embaralharAlternativas(q.alternativas)
    }));

    for (let i = 0; i < questoesVersao.length; i += 2) {
      let yInicioLinha = y;

      const q1 = questoesVersao[i];
      let q1Texto = doc.splitTextToSize(`Quest. ${q1.numero}: ${q1.enunciado}`, 90);
      doc.text(q1Texto, xColuna1, yInicioLinha);
      yInicioLinha += q1Texto.length * espacamento;

      let altLetra = Object.keys(q1.alternativas);
      let altValor = Object.values(q1.alternativas);
      for (let j = 0; j < 5; j++) {
        doc.text(`${altLetra[j]}) ${altValor[j]}`, xColuna1 + 5, yInicioLinha);
        yInicioLinha += espacamento;
      }
      const alturaQ1 = yInicioLinha;

      yInicioLinha = y;

      if (i + 1 < questoesVersao.length) {
        const q2 = questoesVersao[i + 1];
        let q2Texto = doc.splitTextToSize(`Quest. ${q2.numero}: ${q2.enunciado}`, 90);
        doc.text(q2Texto, xColuna2, yInicioLinha);
        yInicioLinha += q2Texto.length * espacamento;

        altLetra = Object.keys(q2.alternativas);
        altValor = Object.values(q2.alternativas);
        for (let j = 0; j < 5; j++) {
          doc.text(`${altLetra[j]}) ${altValor[j]}`, xColuna2 + 5, yInicioLinha);
          yInicioLinha += espacamento;
        }
        const alturaQ2 = yInicioLinha;
        y = Math.max(alturaQ1, alturaQ2) + espacamento;
      } else {
        y = alturaQ1 + espacamento;
      }
      
        if (y > 285){
        doc.addPage();
        y = 10;
      }
        
    }

    doc.save(`prova_versao_${v}.pdf`);
  }
}

// Função nova para gerar e baixar um JSON com as questões
function baixarJSON() {
  const json = JSON.stringify(questoes, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "questoes.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function importarQuestoes() {
  const input = document.getElementById('importarJson');
  const arquivo = input.files[0];

  if (!arquivo) {
    alert('Selecione um arquivo JSON.');
    return;
  }

  const leitor = new FileReader();

  leitor.onload = function(e) {
    try {
      const conteudo = JSON.parse(e.target.result);

      if (Array.isArray(conteudo)) {
        conteudo.forEach(q => {
          if (q.enunciado && q.alternativas) {
            questoes.push({
              numero: questoes.length + 1,
              enunciado: q.enunciado,
              alternativas: q.alternativas
            });
          }
        });
        atualizarLista();
        alert('Questões importadas com sucesso!');
      } else {
        alert('O arquivo deve conter um array de questões.');
      }
    } catch (erro) {
      alert('Erro ao ler o arquivo: ' + erro.message);
    }
  };

  leitor.readAsText(arquivo);
}


// Inicializa com exemplos
atualizarLista();

