# Imagens — Kimassa Varejo

## Fotos reais do cliente

Enviadas pela Kimassa (iPhone, 3024×4032), redimensionadas para 1600 px no lado
maior e comprimidas. **Todas são reais e podem ser usadas à vontade.**

| Arquivo | Onde aparece |
|---|---|
| `pao-de-queijo-dourado.jpg` | produto *Tradicional* — a única foto de produto que é real |
| `pao-de-queijo-com-cafe.jpg` | passo 3 do preparo |
| `pao-de-queijo-bandeja-cafe.jpg` | imagem de compartilhamento (social-share) |
| `pao-de-queijo-porcao.jpg` | **sem uso** desde 2026-08-10 |
| `pao-de-queijo-assado-mesa.jpg` | **sem uso** desde 2026-08-10 |
| `pao-de-queijo-varanda-sol.jpg` | **sem uso** desde 2026-08-10 (saiu com a seção Nossa história) |

O vídeo do hero (`../video/pao-de-queijo-cafe.mp4`) também é real — 9 s, vertical,
recodificado para web, sem áudio.

## ⚠️ Imagens geradas por IA — trocar por fotos reais

Estas **não são fotos da fábrica**. Foram geradas para preencher os buracos do
catálogo até a Kimassa mandar as fotos de verdade. São ilustrativas.

| Arquivo | O que mostra | Foto real necessária |
|---|---|---|
| `embalagem-kimassa-congelado.jpg` | Embalagem stand-up azul com a logo | **Prioridade alta.** A embalagem real da Kimassa, de frente, em fundo claro. Se a arte da embalagem for diferente da imagem gerada, essa foto passa informação errada ao cliente. |
| `pao-de-queijo-congelado-bandeja.jpg` | Produto cru e congelado numa assadeira | Foto do produto congelado saindo do freezer |
| `pao-de-queijo-assadeira-forno.jpg` | Assadeira dourada saindo do forno | Foto de uma fornada real |
| `broa.jpg` | Broinhas de fubá redondas, avulsas — algumas com erva-doce, algumas temperadas com cheiro-verde | **Prioridade alta.** Foto real das broas da Kimassa. As três versões (doce, doce com erva-doce, temperada) são visualmente diferentes e hoje dividem uma foto de conjunto. |
| `provolito.jpg` | Bolinhas de provolone assadas, menores e mais douradas que pão de queijo | **Prioridade alta.** Foto real do provolito. |
| `pao-de-queijo-temperado.jpg` | Pão de queijo com cheiro-verde e calabresa visíveis, um partido ao meio | Foto real de cada tempero (tempero da casa e calabresa) |
| `pao-de-queijo-recheado.jpg` | Pão de queijo grande, um cortado mostrando recheio de carne e queijo derretido | Foto real de cada recheio (pernil, presunto e mussarela, goiabada, frango, requeijão) |

`social-share.jpg` (1200×630) é uma composição feita aqui a partir da logo + uma
foto real do cliente — não é IA, mas é montagem. Regerar se a foto de destaque mudar.

### Como estas foram feitas (2026-08-10)

As quatro fotos de produto acima foram refeitas depois de pesquisar o que cada
produto realmente é, porque as anteriores não representavam o item certo:

- **Provolito** é *biscoito de provolone* — bolinha pequena, mais escura e mais
  crocante que pão de queijo. Antes o card usava uma foto de pão de queijo comum.
- **Broa** aqui é *broinha de fubá*: rolinho redondo de ~30 g levemente achatado,
  não um bolo fatiado. A primeira versão gerada era um pão fatiado — estava errada.
- **Temperado** precisa mostrar o cheiro-verde e a calabresa na massa.
- **Recheado** precisa aparecer cortado, com o recheio à mostra.

Se a Kimassa mandar as fotos reais, é só trocar o arquivo mantendo o mesmo nome.

## Fotos que ainda faltam

- **A embalagem real**, de vários ângulos (é o que o cliente compra)
- **A fábrica / a produção** — para quando a seção *Nossa história* voltar
- Fotos específicas de cada **recheio** (pernil, presunto e mussarela, goiabada,
  frango, requeijão), de cada **tempero** (tempero da casa, calabresa) e de cada
  **broa** (doce, erva-doce, temperada): hoje cada produto tem uma foto só, e o card
  não troca a imagem quando o cliente escolhe outro sabor
- Alguma foto **horizontal**; todas as do cliente são verticais, e o card de
  produto corta em 1:1

## Convenções

- Nomes descritivos, minúsculos, com hífen — é sinal de SEO e o `alt` depende disso
- Comprimir antes de commitar (o workflow `compress-images.yml` também faz isso)
- Lado maior de 1600 px é suficiente para tudo neste site
