# Kimassa Alimentos

Site da **Kimassa Alimentos** — pão de queijo congelado, Uberlândia (MG).
Vitrine de produtos + carrinho + fechamento de pedido pelo WhatsApp.

🔗 https://caiomsi.github.io/Kimassa/

---

## Para a Kimassa: como mexer nos produtos e preços

Você só precisa de **um arquivo**: `js/config.js`.

Lá dentro dá para mudar:

- o **número de WhatsApp** que recebe os pedidos;
- a **faixa vermelha** que passa no topo do site;
- a **lista de produtos** — nome, descrição, foto, embalagens e preços.

O próprio arquivo tem as instruções escritas em português, no começo. Não precisa
mexer em mais nada.

---

## Como rodar aqui no computador

Não tem build, não tem instalação. Abra o `index.html` no navegador, ou:

```bash
python3 -m http.server
# depois abra http://localhost:8000
```

Servir numa porta local é melhor: as fontes e o vídeo carregam do jeito certo.

## Como publicar

```bash
git add -A && git commit -m "descrição da mudança" && git push
```

O GitHub Pages publica sozinho depois do push.

---

## O que ainda falta confirmar com o cliente

Antes de divulgar o site, revisar:

- [ ] **Preços, nomes e embalagens** dos produtos em `js/config.js` — os que estão
      no ar hoje são de demonstração
- [ ] **Horário de funcionamento** (o site assume seg–sex 8h–18h, sáb 8h–12h)
- [ ] **A história da empresa** na seção *Nossa história* — o texto atual foi escrito
      por aproximação, falta a versão do Fernando
- [ ] **Fotos reais da embalagem, da fábrica e dos recheados** — hoje três imagens do
      site são geradas por IA, veja `images/README.md`
- [ ] **Instagram / Facebook** — ainda não há links
- [ ] **Coordenadas exatas** e **CEP** no JSON-LD (hoje é o centro de Uberlândia)

Já está correto e no ar: WhatsApp (34) 99149-8777, telefone (34) 3305-0009,
e-mail kimassa.alimentos@yahoo.com e o endereço na Rua Pio XXI, 130 — Lagoinha.

---

## Estrutura

```
index.html          página única, com todas as seções
404.html            página de erro
css/style.css       tokens da marca no topo, depois base e componentes
js/config.js        ← catálogo, WhatsApp e faixa do topo (é aqui que se mexe)
js/main.js          menu, filtros, carrinho e checkout no WhatsApp
logo/               logo em vetor, três versões + favicon
images/             fotos do cliente e imagens geradas (veja o README de lá)
video/              vídeo do topo, recodificado para web
```

Feito por [Caio·MSI](https://caiomsi.com).
