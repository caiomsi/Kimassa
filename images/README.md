# Imagens — Kimassa Varejo

## Fotos reais do cliente

**Todas são reais e podem ser usadas à vontade.**

| Arquivo | Onde aparece |
|---|---|
| `loja-kimassa-uberlandia.jpg` | fachada da loja, na seção *Contato* (acima do mapa) |
| `pao-de-queijo-tradicional.jpg` | produto *Tradicional* · imagem de compartilhamento |
| `provolito.jpg` | produto *Provolito* |
| `pao-de-queijo-forno.jpg` | passo 2 do preparo (assadeira no forno) |
| `embalagem-kimassa.jpg` | pacote real, na seção *Entrega* |
| `pao-de-queijo-com-cafe.jpg` | passo 3 do preparo |
| `pao-de-queijo-recheado.jpg` | **sem uso** desde 2026-08-18 (o produto recheado saiu do catálogo) |
| `pao-de-queijo-bandeja-cafe.jpg` | **sem uso** |
| `pao-de-queijo-porcao.jpg` | **sem uso** |
| `pao-de-queijo-assado-mesa.jpg` | **sem uso** |
| `pao-de-queijo-dourado.jpg` (removido) | substituído pela foto nova do tradicional |
| `pao-de-queijo-varanda-sol.jpg` | **sem uso** (saiu com a seção Nossa história) |

O vídeo do hero (`../video/pao-de-queijo-cafe.mp4`) também é real — 9 s, vertical,
recodificado para web, sem áudio.

**Sobre o pacote:** a embalagem real traz a logo **KIMASSA ALIMENTOS**, que é a
entidade matriz. Isso está certo e não deve ser "corrigido" para Varejo.

## ⚠️ Ainda geradas por IA — trocar por fotos reais

| Arquivo | O que mostra | Foto real necessária |
|---|---|---|
| `broa.jpg` | Broinhas de fubá redondas, avulsas — algumas com erva-doce, algumas temperadas | **Prioridade alta.** As três versões (doce, doce com erva-doce, temperada) são diferentes entre si e hoje dividem uma foto de conjunto. |
| `pao-de-queijo-temperado.jpg` | Pão de queijo com cheiro-verde e calabresa, um partido ao meio | **Prioridade alta.** Foto real de cada tempero (tempero da casa e calabresa). |
| `pao-de-queijo-congelado-bandeja.jpg` | Produto cru e congelado numa assadeira | Foto do produto congelado saindo do freezer (passo 1 do preparo) |

`social-share.jpg` (1200×630) é uma composição feita aqui: logo + foto real do
tradicional. Regerar se a logo ou a foto de destaque mudarem.

### Histórico

- **2026-08-10** — quatro fotos de produto foram geradas depois de pesquisar o que
  cada item realmente é. Descobertas que valem manter: *provolito* não é pão de
  queijo comum, e *broa* aqui é **broinha de fubá** (rolinho redondo de ~30 g), não
  um bolo fatiado.
- **2026-08-18** — o cliente mandou fotos reais. Entraram tradicional, provolito,
  recheado, o pacote, a fachada da loja e a assadeira no forno; as versões geradas
  desses foram apagadas. A foto real confirmou que o **provolito é alongado**, com
  casca de queijo craquelada — a versão gerada mostrava bolinhas redondas e estava
  errada. No mesmo dia o **pão de queijo recheado saiu do catálogo** a pedido do
  cliente; a foto dele ficou guardada, sem uso.

Se a Kimassa mandar as fotos que faltam, é só trocar o arquivo mantendo o mesmo nome.

## Fotos que ainda faltam

- **Broa** e **pão de queijo temperado** de verdade (as duas ainda geradas)
- **A produção / a fábrica** — para quando a seção *Nossa história* voltar
- Fotos específicas de cada **tempero** (tempero da casa, calabresa) e de cada
  **broa** (doce, erva-doce, temperada): hoje cada produto tem uma foto só, e o card
  não troca a imagem quando o cliente escolhe outro sabor

## Convenções

- Nomes descritivos, minúsculos, com hífen — é sinal de SEO e o `alt` depende disso
- Comprimir antes de commitar (o workflow `compress-images.yml` também faz isso)
- Lado maior de 1600 px é suficiente para tudo neste site
- Cards de produto cortam em 1:1 — enquadrar pensando nisso
