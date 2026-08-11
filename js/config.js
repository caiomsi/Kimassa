/*
  ═══════════════════════════════════════════════════════════════
  CONFIGURAÇÃO DA LOJA — KIMASSA VAREJO
  ═══════════════════════════════════════════════════════════════

  Este é o ÚNICO arquivo que você precisa editar para atualizar o site:
  o WhatsApp, a faixa de aviso do topo e a lista de produtos.
  Não precisa de planilha nem de programador — é só mexer aqui embaixo.

  Depois de editar, salve o arquivo e envie para o site. Pronto.

  ───────────────────────────────────────────────────────────────
  1) WHATSAPP
  ───────────────────────────────────────────────────────────────
  Número com código do país (55) + DDD + número, só dígitos.
  Ex.: (34) 99968-0441  →  '5534999680441'

  ───────────────────────────────────────────────────────────────
  2) CADA PRODUTO
  ───────────────────────────────────────────────────────────────
    id          apelido curto e único, sem espaços (ex.: 'tradicional')
    name        nome que aparece no site
    category    uma das chaves de CATEGORIES abaixo
    description frase curta e apetitosa
    image       arquivo da foto dentro de images/
    featured    true = aparece na vitrine "Mais pedidos" do topo
    opcoes      sabores/versões desse produto, em lista de textos.
                O cliente escolhe um antes de colocar no pedido.
                Se o produto tem versão única, é só apagar a linha.

  ⚠️ O SITE NÃO MOSTRA PREÇOS. O cliente monta o pedido e pede
     orçamento pelo WhatsApp. Se um dia quiser mostrar preços,
     me avise que eu ligo isso de volta.

  Para tirar um produto do ar, apague o bloco { ... } dele inteiro.
  Para adicionar, copie um bloco { ... } inteiro e mude os dados.
  ═══════════════════════════════════════════════════════════════
*/

// WhatsApp da Kimassa Varejo — (34) 99968-0441
const WHATSAPP_NUMBER = '5534999680441'

// Faixa que passa no topo do site (deixe '' para esconder)
const FRETE_TEXT =
  'ENTREGA EM UBERLÂNDIA E REGIÃO • CONSULTE O PREÇO DA ENTREGA • PEÇA PELO WHATSAPP'

// Categorias da loja (chave interna : nome que aparece)
const CATEGORIES = {
  tradicional: 'Tradicional',
  temperados: 'Temperados',
  recheados: 'Recheados',
  broas: 'Broas',
}

const PRODUCTS = [
  {
    id: 'tradicional',
    name: 'Pão de Queijo Tradicional',
    category: 'tradicional',
    description:
      'A receita mineira de sempre, com queijo de verdade. Casca crocante, miolo puxa-puxa. Do congelador ao forno em 20 minutos.',
    image: 'images/pao-de-queijo-dourado.jpg',
    featured: true,
  },
  {
    id: 'provolito',
    name: 'Provolito',
    category: 'tradicional',
    description:
      'O sabor marcante do provolone numa bolinha assada. Vai bem no café, na cerveja e na mesa de petisco.',
    image: 'images/pao-de-queijo-porcao.jpg',
    featured: true,
  },
  {
    id: 'temperado',
    name: 'Pão de Queijo Temperado',
    category: 'temperados',
    description:
      'A mesma massa, com tempero na medida. Escolha entre o tempero da casa e a calabresa.',
    image: 'images/pao-de-queijo-assado-mesa.jpg',
    featured: true,
    opcoes: ['Tempero da casa', 'Calabresa'],
  },
  {
    id: 'recheado',
    name: 'Pão de Queijo Recheado',
    category: 'recheados',
    description:
      'Massa tradicional com recheio generoso, que derrete na hora que você morde. Cinco recheios para escolher.',
    image: 'images/pao-de-queijo-com-cafe.jpg',
    featured: true,
    opcoes: [
      'Pernil',
      'Presunto e mussarela',
      'Goiabada',
      'Frango',
      'Requeijão',
    ],
  },
  {
    id: 'broa',
    name: 'Broa',
    category: 'broas',
    description:
      'Broa de verdade, macia e dourada. Tem a doce, a doce com erva-doce e a temperada.',
    image: 'images/broa.jpg',
    featured: false,
    opcoes: ['Doce', 'Doce com erva-doce', 'Temperada'],
  },
]
