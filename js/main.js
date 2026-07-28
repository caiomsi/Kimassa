/* ==========================================================================
   KIMASSA ALIMENTOS — comportamento do site
   Depende de js/config.js (PRODUCTS, CATEGORIES, WHATSAPP_NUMBER, FRETE_TEXT).
   Sem framework, sem build. Todo acesso ao DOM é protegido.
   ========================================================================== */
;(function () {
  'use strict'

  var CHAVE_CARRINHO = 'kimassa_carrinho'
  var $ = function (sel) { return document.querySelector(sel) }

  var carrinho = carregarCarrinho()
  var categoriaAtiva = 'todos'
  /* embalagem escolhida por produto, ex.: { tradicional: 1 } */
  var variantesEscolhidas = {}

  /* ------------------------------------------------------------- utilidades */

  function brl(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    })
  }

  function linkZap(mensagem) {
    var base = 'https://wa.me/' + WHATSAPP_NUMBER
    return mensagem ? base + '?text=' + encodeURIComponent(mensagem) : base
  }

  function carregarCarrinho() {
    try {
      var bruto = localStorage.getItem(CHAVE_CARRINHO)
      var dados = bruto ? JSON.parse(bruto) : []
      return Array.isArray(dados) ? dados : []
    } catch (e) {
      return []
    }
  }

  function salvarCarrinho() {
    try {
      localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho))
    } catch (e) {
      /* modo privado / cota cheia: o carrinho segue funcionando só nesta sessão */
    }
  }

  function acharProduto(id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].id === id) return PRODUCTS[i]
    }
    return null
  }

  var temporizadorAviso
  function avisar(texto) {
    var el = $('#aviso')
    if (!el) return
    el.textContent = texto
    el.classList.add('visivel')
    clearTimeout(temporizadorAviso)
    temporizadorAviso = setTimeout(function () {
      el.classList.remove('visivel')
    }, 2600)
  }

  /* ------------------------------------------------------------- catálogo */

  var ESTRELA =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="m12 2 3 6.5 7 1-5 4.9 1.2 7L12 18l-6.2 3.4L7 14.4l-5-4.9 7-1L12 2Z"/></svg>'

  function montarCartao(produto) {
    var indice = variantesEscolhidas[produto.id] || 0
    var variante = produto.variants[indice]

    var art = document.createElement('article')
    art.className = 'produto revelar'
    art.dataset.categoria = produto.category

    var pills = produto.variants
      .map(function (v, i) {
        return (
          '<button type="button" class="variante" data-produto="' + produto.id +
          '" data-indice="' + i + '" aria-pressed="' + (i === indice) + '">' +
          v.label + '</button>'
        )
      })
      .join('')

    art.innerHTML =
      '<div class="produto__foto">' +
        (produto.featured
          ? '<span class="produto__selo">' + ESTRELA + 'Mais pedido</span>'
          : '') +
        '<img src="' + produto.image + '" alt="' + produto.name +
        '" loading="lazy" width="600" height="450">' +
      '</div>' +
      '<div class="produto__corpo">' +
        '<span class="produto__categoria">' +
          (CATEGORIES[produto.category] || '') +
        '</span>' +
        '<h3>' + produto.name + '</h3>' +
        '<p class="produto__desc">' + produto.description + '</p>' +
        '<div class="variantes">' + pills + '</div>' +
        '<div class="produto__base">' +
          /* the selected pill above already names the pack, so the price row
             stays a single clean number */
          '<span class="preco">' + brl(variante.price) + '</span>' +
          '<button type="button" class="btn btn--primario adicionar" data-produto="' +
            produto.id + '">Adicionar</button>' +
        '</div>' +
      '</div>'

    return art
  }

  function renderizarCatalogo() {
    var grade = $('#produtos-grade')
    if (!grade) return
    grade.innerHTML = ''

    var visiveis = PRODUCTS.filter(function (p) {
      return categoriaAtiva === 'todos' || p.category === categoriaAtiva
    })

    visiveis.forEach(function (p) {
      grade.appendChild(montarCartao(p))
    })
    observarRevelacao(grade)
  }

  function renderizarDestaques() {
    var grade = $('#destaques-grade')
    if (!grade) return
    grade.innerHTML = ''
    PRODUCTS.filter(function (p) {
      return p.featured
    }).forEach(function (p) {
      grade.appendChild(montarCartao(p))
    })
    observarRevelacao(grade)
  }

  function renderizarFiltros() {
    var caixa = $('#filtros')
    if (!caixa) return

    var chaves = ['todos'].concat(Object.keys(CATEGORIES))
    caixa.innerHTML = chaves
      .map(function (chave) {
        var rotulo = chave === 'todos' ? 'Todos' : CATEGORIES[chave]
        return (
          '<button type="button" class="filtro" data-categoria="' + chave +
          '" aria-pressed="' + (chave === categoriaAtiva) + '">' + rotulo +
          '</button>'
        )
      })
      .join('')
  }

  /* Um só listener no documento cobre os cartões, que são recriados a cada
     filtro — evita religar eventos toda vez que a grade é redesenhada. */
  document.addEventListener('click', function (ev) {
    var alvo = ev.target.closest ? ev.target.closest('button') : null
    if (!alvo) return

    if (alvo.classList.contains('filtro')) {
      categoriaAtiva = alvo.dataset.categoria
      renderizarFiltros()
      renderizarCatalogo()
      return
    }

    if (alvo.classList.contains('variante')) {
      variantesEscolhidas[alvo.dataset.produto] = parseInt(alvo.dataset.indice, 10)
      renderizarDestaques()
      renderizarCatalogo()
      return
    }

    if (alvo.classList.contains('adicionar')) {
      adicionar(alvo.dataset.produto)
    }
  })

  /* ------------------------------------------------------------- carrinho */

  function adicionar(idProduto) {
    var produto = acharProduto(idProduto)
    if (!produto) return

    var indice = variantesEscolhidas[idProduto] || 0
    var variante = produto.variants[indice]
    if (!variante) return

    var existente = null
    for (var i = 0; i < carrinho.length; i++) {
      if (carrinho[i].id === idProduto && carrinho[i].variante === variante.label) {
        existente = carrinho[i]
        break
      }
    }

    if (existente) {
      existente.qtd += 1
    } else {
      carrinho.push({
        id: idProduto,
        nome: produto.name,
        variante: variante.label,
        preco: variante.price,
        imagem: produto.image,
        qtd: 1,
      })
    }

    salvarCarrinho()
    atualizarCarrinho()
    avisar(produto.name + ' adicionado ao pedido')
  }

  function mudarQtd(indice, delta) {
    var item = carrinho[indice]
    if (!item) return
    item.qtd += delta
    if (item.qtd <= 0) carrinho.splice(indice, 1)
    salvarCarrinho()
    atualizarCarrinho()
  }

  function totalCarrinho() {
    return carrinho.reduce(function (soma, item) {
      return soma + item.preco * item.qtd
    }, 0)
  }

  function atualizarCarrinho() {
    var contador = $('#carrinho-contador')
    var itens = $('#gaveta-itens')
    var base = $('#gaveta-base')
    var total = $('#gaveta-total')

    var pecas = carrinho.reduce(function (soma, item) {
      return soma + item.qtd
    }, 0)

    if (contador) {
      contador.textContent = pecas
      contador.hidden = pecas === 0
    }

    if (!itens) return

    if (carrinho.length === 0) {
      itens.innerHTML =
        '<div class="gaveta__vazio">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
          '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>' +
          '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' +
          '<p>Seu pedido está vazio.<br>Escolha um pão de queijo para começar.</p>' +
        '</div>'
      if (base) base.hidden = true
      return
    }

    itens.innerHTML = carrinho
      .map(function (item, i) {
        return (
          '<div class="item">' +
            '<img src="' + item.imagem + '" alt="" width="72" height="72">' +
            '<div>' +
              '<h3>' + item.nome + '</h3>' +
              '<span class="item__variante">' + item.variante + '</span>' +
              '<div class="item__linha">' +
                '<span class="qtd">' +
                  '<button type="button" data-acao="menos" data-i="' + i +
                    '" aria-label="Diminuir quantidade">−</button>' +
                  '<span>' + item.qtd + '</span>' +
                  '<button type="button" data-acao="mais" data-i="' + i +
                    '" aria-label="Aumentar quantidade">+</button>' +
                '</span>' +
                '<span class="item__preco">' + brl(item.preco * item.qtd) + '</span>' +
              '</div>' +
            '</div>' +
          '</div>'
        )
      })
      .join('')

    if (base) base.hidden = false
    if (total) total.textContent = brl(totalCarrinho())
  }

  var itensGaveta = $('#gaveta-itens')
  if (itensGaveta) {
    itensGaveta.addEventListener('click', function (ev) {
      var botao = ev.target.closest('button[data-acao]')
      if (!botao) return
      mudarQtd(parseInt(botao.dataset.i, 10), botao.dataset.acao === 'mais' ? 1 : -1)
    })
  }

  /* --------------------------------------------------------- gaveta aberta */

  function abrirGaveta() {
    var g = $('#gaveta')
    var o = $('#overlay')
    if (!g || !o) return
    o.hidden = false
    requestAnimationFrame(function () {
      g.classList.add('aberta')
      o.classList.add('aberto')
    })
    g.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
  }

  function fecharGaveta() {
    var g = $('#gaveta')
    var o = $('#overlay')
    if (!g || !o) return
    g.classList.remove('aberta')
    o.classList.remove('aberto')
    g.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
    setTimeout(function () {
      if (!g.classList.contains('aberta')) o.hidden = true
    }, 300)
  }

  var btnAbrir = $('#abrir-carrinho')
  if (btnAbrir) btnAbrir.addEventListener('click', abrirGaveta)

  var btnFechar = $('#fechar-carrinho')
  if (btnFechar) btnFechar.addEventListener('click', fecharGaveta)

  var overlay = $('#overlay')
  if (overlay) overlay.addEventListener('click', fecharGaveta)

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') fecharGaveta()
  })

  /* ------------------------------------------------------------- checkout */

  function mensagemPedido() {
    var linhas = ['*Pedido pelo site — Kimassa Alimentos*', '']
    carrinho.forEach(function (item) {
      linhas.push(
        '• ' + item.qtd + 'x ' + item.nome + ' (' + item.variante + ') — ' +
        brl(item.preco * item.qtd)
      )
    })
    linhas.push('')
    linhas.push('*Total: ' + brl(totalCarrinho()) + '*')
    linhas.push('')
    linhas.push('Gostaria de combinar a entrega, por favor.')
    return linhas.join('\n')
  }

  var btnFinalizar = $('#finalizar')
  if (btnFinalizar) {
    btnFinalizar.addEventListener('click', function (ev) {
      ev.preventDefault()
      if (carrinho.length === 0) {
        avisar('Seu pedido ainda está vazio')
        return
      }
      window.open(linkZap(mensagemPedido()), '_blank', 'noopener')
    })
  }

  /* Links de WhatsApp que não dependem do carrinho */
  var atalhos = [
    ['#zap-flutuante', 'Olá! Vim pelo site da Kimassa e gostaria de fazer um pedido.'],
    ['#hero-zap', 'Olá! Vim pelo site da Kimassa e gostaria de fazer um pedido.'],
    ['#contato-zap', 'Olá! Vim pelo site da Kimassa e gostaria de tirar uma dúvida.'],
    ['#contato-zap-btn', 'Olá! Vim pelo site da Kimassa e gostaria de tirar uma dúvida.'],
    ['#rodape-zap', 'Olá! Vim pelo site da Kimassa e gostaria de fazer um pedido.'],
    ['#entrega-zap', 'Olá! Gostaria de saber se vocês entregam no meu bairro em Uberlândia.'],
  ]
  atalhos.forEach(function (par) {
    var el = $(par[0])
    if (!el) return
    el.href = linkZap(par[1])
    el.target = '_blank'
    el.rel = 'noopener'
  })

  /* ------------------------------------------------------- menu / cabeçalho */

  var alternar = $('#menu-alternar')
  var nav = $('#nav')
  if (alternar && nav) {
    alternar.addEventListener('click', function () {
      var aberto = nav.classList.toggle('aberto')
      alternar.setAttribute('aria-expanded', String(aberto))
      alternar.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu')
    })
    nav.addEventListener('click', function (ev) {
      if (ev.target.tagName === 'A') {
        nav.classList.remove('aberto')
        alternar.setAttribute('aria-expanded', 'false')
      }
    })
  }

  /* ------------------------------------------------------------- revelação */

  var observador = null
  if ('IntersectionObserver' in window) {
    observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visivel')
            observador.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' }
    )
  }

  function observarRevelacao(escopo) {
    var alvos = (escopo || document).querySelectorAll('.revelar:not(.visivel)')
    for (var i = 0; i < alvos.length; i++) {
      if (observador) observador.observe(alvos[i])
      else alvos[i].classList.add('visivel')
    }
  }

  /* ------------------------------------------------------------- arranque */

  var faixa = document.querySelector('#faixa-aviso span')
  if (faixa) {
    if (FRETE_TEXT) faixa.textContent = FRETE_TEXT + '   •   ' + FRETE_TEXT
    else $('#faixa-aviso').hidden = true
  }

  var ano = $('#ano')
  if (ano) ano.textContent = new Date().getFullYear()

  renderizarFiltros()
  renderizarDestaques()
  renderizarCatalogo()
  atualizarCarrinho()
  observarRevelacao(document)
})()
