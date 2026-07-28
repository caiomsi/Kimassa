/*
  ═══════════════════════════════════════════════════════════════
  CONFIGURAÇÃO DA LOJA — KIMASSA ALIMENTOS
  ═══════════════════════════════════════════════════════════════

  Este é o ÚNICO arquivo que você precisa editar para atualizar o site:
  o WhatsApp, a faixa de aviso do topo e a lista de produtos com preços.
  Não precisa de planilha nem de programador — é só mexer aqui embaixo.

  Depois de editar, salve o arquivo e envie para o site. Pronto.

  ───────────────────────────────────────────────────────────────
  1) WHATSAPP
  ───────────────────────────────────────────────────────────────
  Número com código do país (55) + DDD + número, só dígitos.
  Ex.: (34) 99149-8777  →  '5534991498777'

  ───────────────────────────────────────────────────────────────
  2) CADA PRODUTO
  ───────────────────────────────────────────────────────────────
    id          apelido curto e único, sem espaços (ex.: 'tradicional')
    name        nome que aparece no site
    category    uma das chaves de CATEGORIES abaixo
    description frase curta e apetitosa
    image       arquivo da foto dentro de images/
    featured    true = aparece na vitrine "Mais pedidos" do topo
    variants    embalagens à venda, cada uma com seu preço.
                O cliente escolhe a embalagem antes de colocar no carrinho.
                Use ponto nos centavos (46.90), nunca vírgula.

  Para tirar um produto do ar, apague o bloco { ... } dele inteiro.
  Para adicionar, copie um bloco { ... } inteiro e mude os dados.
  ═══════════════════════════════════════════════════════════════
*/

// WhatsApp real da Kimassa — (34) 99149-8777
const WHATSAPP_NUMBER = '5534991498777'

// Faixa que passa no topo do site (deixe '' para esconder)
const FRETE_TEXT =
  'ENTREGA EM UBERLÂNDIA E REGIÃO • CHEGA CONGELADO NA SUA PORTA • PEÇA PELO WHATSAPP'

// Categorias da loja (chave interna : nome que aparece)
const CATEGORIES = {
  tradicional: 'Tradicional',
  recheados: 'Recheados',
  especiais: 'Sabores especiais',
  foodservice: 'Food service',
}

/*  ⚠️ PRODUTOS E PREÇOS DE DEMONSTRAÇÃO
    Confirme nomes, embalagens e valores com a Kimassa antes de divulgar o site. */
const PRODUCTS = [
  {
    id: 'tradicional',
    name: 'Pão de Queijo Tradicional',
    category: 'tradicional',
    description:
      'A receita mineira de sempre, com queijo meia-cura de verdade. Casca crocante, miolo puxa-puxa. Do congelador ao forno em 20 minutos.',
    image: 'images/pao-de-queijo-dourado.jpg',
    featured: true,
    variants: [
      { label: '400 g (~20 un.)', price: 21.9 },
      { label: '1 kg (~50 un.)', price: 46.9 },
      { label: '2,5 kg (~125 un.)', price: 108.9 },
    ],
  },
  {
    id: 'coquetel',
    name: 'Pão de Queijo Coquetel',
    category: 'tradicional',
    description:
      'A versão miniatura, do tamanho de uma bolinha de gude. Perfeito para café da manhã, festa e mesa de bufê.',
    image: 'images/pao-de-queijo-porcao.jpg',
    featured: true,
    variants: [
      { label: '400 g (~40 un.)', price: 22.9 },
      { label: '1 kg (~100 un.)', price: 48.9 },
    ],
  },
  {
    id: 'coalho',
    name: 'Pão de Queijo de Coalho',
    category: 'tradicional',
    description:
      'Feito com queijo coalho: mais firme, mais salgado, com aquele sabor marcante do Nordeste encontrando Minas.',
    image: 'images/pao-de-queijo-assado-mesa.jpg',
    featured: false,
    variants: [
      { label: '400 g (~20 un.)', price: 24.9 },
      { label: '1 kg (~50 un.)', price: 52.9 },
    ],
  },
  {
    id: 'catupiry',
    name: 'Recheado de Catupiry',
    category: 'recheados',
    description:
      'Massa tradicional com o recheio cremoso que derrete na hora que você morde. O campeão de pedidos entre os recheados.',
    image: 'images/pao-de-queijo-com-cafe.jpg',
    featured: true,
    variants: [
      { label: '400 g (~12 un.)', price: 27.9 },
      { label: '1 kg (~30 un.)', price: 59.9 },
    ],
  },
  {
    id: 'calabresa',
    name: 'Recheado de Calabresa',
    category: 'recheados',
    description:
      'Calabresa defumada picada na massa, com um toque de orégano. Vira lanche da tarde e some da bandeja.',
    image: 'images/pao-de-queijo-assadeira-forno.jpg',
    featured: false,
    variants: [
      { label: '400 g (~12 un.)', price: 27.9 },
      { label: '1 kg (~30 un.)', price: 59.9 },
    ],
  },
  {
    id: 'cheddar-bacon',
    name: 'Recheado de Cheddar com Bacon',
    category: 'recheados',
    description:
      'Cheddar cremoso e bacon crocante dentro da nossa massa. Para quem gosta de pão de queijo com personalidade.',
    image: 'images/pao-de-queijo-bandeja-cafe.jpg',
    featured: false,
    variants: [
      { label: '400 g (~12 un.)', price: 29.9 },
      { label: '1 kg (~30 un.)', price: 64.9 },
    ],
  },
  {
    id: 'sem-lactose',
    name: 'Pão de Queijo Sem Lactose',
    category: 'especiais',
    description:
      'Mesma casquinha, mesmo miolo, sem lactose. Feito em produção separada para quem tem restrição.',
    image: 'images/pao-de-queijo-varanda-sol.jpg',
    featured: false,
    variants: [
      { label: '400 g (~20 un.)', price: 27.9 },
      { label: '1 kg (~50 un.)', price: 58.9 },
    ],
  },
  {
    id: 'balde-foodservice',
    name: 'Balde Food Service 5 kg',
    category: 'foodservice',
    description:
      'Embalagem grande para padaria, cafeteria, lanchonete e buffet. Melhor custo por unidade e entrega programada.',
    image: 'images/embalagem-kimassa-congelado.jpg',
    featured: false,
    variants: [
      { label: '5 kg tradicional (~250 un.)', price: 199.9 },
      { label: '5 kg coquetel (~500 un.)', price: 209.9 },
    ],
  },
]
