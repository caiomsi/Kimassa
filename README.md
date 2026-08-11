# Kimassa Varejo

Site da **Kimassa Varejo** — pão de queijo congelado, Uberlândia (MG).
Vitrine de produtos + lista de pedido + orçamento pelo WhatsApp.

🔗 https://caiomsi.github.io/Kimassa/

---

## Para a Kimassa: como mexer nos produtos

Você só precisa de **um arquivo**: `js/config.js`.

Lá dentro dá para mudar:

- o **número de WhatsApp** que recebe os pedidos;
- a **faixa vermelha** que passa no topo do site;
- a **lista de produtos** — nome, descrição, foto e sabores.

O próprio arquivo tem as instruções escritas em português, no começo. Não precisa
mexer em mais nada.

### O site não mostra preços

Por enquanto o site não tem preço nenhum. O visitante monta a lista dele e manda
pelo WhatsApp; vocês respondem com o valor dos produtos e o preço da entrega.
Quando tiverem a tabela de preços pronta, é só avisar que a gente liga os preços
e o total de volta.

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

## O que ainda falta

- [ ] **"Como a Kimassa surgiu"** — a seção foi **tirada do ar** em 10/08/2026. Vocês
      pediram ela, mas o texto que estava lá tinha sido escrito por aproximação, e a
      gente preferiu não deixar história inventada no site de um cliente real. Mandem
      o texto de verdade que ela volta na hora.
- [ ] **Descrições dos produtos** em `js/config.js` — escritas por aproximação a
      partir dos nomes. Revisem.
- [ ] **"Massa própria — produzida aqui, sem terceirizar"** na faixa de selos:
      confirmar se está certo ou tirar.
- [ ] **Fotos reais** da embalagem, da broa, do provolito e de cada recheio — hoje
      quatro imagens do site são geradas por IA, veja `images/README.md`
- [ ] **Telefone fixo** — o (34) 3305-0009 saiu do site porque não veio na lista de
      contatos nova. Se ainda funciona, é só avisar que a gente coloca de volta.
- [ ] **Instagram / Facebook** — ainda não há links
- [ ] **Coordenadas exatas** e **CEP** no JSON-LD (hoje é o centro de Uberlândia)

Já está correto e no ar: WhatsApp (34) 99968-0441, e-mail kimassavarejo@gmail.com,
endereço na Rua Pio XXI, 152 — Lagoinha, e o horário seg–sex 8h30–12h / 13h30–17h30
e sáb 8h–12h.

---

## Estrutura

```
index.html          página única, com todas as seções
404.html            página de erro
css/style.css       tokens da marca no topo, depois base e componentes
js/config.js        ← catálogo, WhatsApp e faixa do topo (é aqui que se mexe)
js/main.js          menu, filtros, lista de pedido e orçamento no WhatsApp
logo/               logo em vetor, três versões + favicon
images/             fotos do cliente e imagens geradas (veja o README de lá)
video/              vídeo do topo, recodificado para web
```

Feito por [Caio·MSI](https://caiomsi.com).
