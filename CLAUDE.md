# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## What this is

**Kimassa Varejo** — a **real client**: a company in Uberlândia (MG, Brazil) that
makes and sells **frozen pão de queijo** (pão de queijo congelado). All content is
pt-BR. It is a product **showcase + order list + WhatsApp quote request** (no prices,
no payment backend). Static HTML/CSS/JS, no build step. See the root
`../CLAUDE.md` for shared conventions.

This replaces the earlier `Pao-da-Roca/` attempt, which used a placeholder brand name
and a design the client didn't want. **That project is superseded — don't port code or
styling from it.** Kimassa is built from the client's real visual identity.

## Structure

`index.html` and `404.html` at root, `css/style.css`, `js/config.js` (the catalog —
see below), `js/main.js`, `logo/`, `images/`, `video/`. Deployed on GitHub Pages at
`caiomsi.github.io/Kimassa` (no custom domain yet).

## Design language — "O Selo"

The client's logo is a wordmark **bracketed by double rules and crowned by three
stars**. That bracket is the site's single structural motif, not decoration: the
`.selo` component wraps every section heading, so the whole page keeps one rhythm.
Use it for new sections rather than inventing another heading treatment.

The rest follows from it:

- **Blue is architecture** (header, hero, preparo band, footer), **warm off-white is
  the gallery** the food photography hangs in. The client's photos are warm and
  domestic while the brand is bold and institutional — the cream ground is what
  reconciles them. Don't put food photos directly on blue.
- **Red is punctuation, never a surface**: the rules, CTAs, badges, cart count.
- **Gold is reward**: stars, "mais pedido" badges, hover states.
- **Antonio uppercase for everything structural** (headings, nav, quantities);
  **Lato** for all reading text. Both are specified in the client's identity manual.

Tokens live at the top of `css/style.css` — `--azul #1E4899`, `--vermelho #E4191C`,
`--ouro #FCC12D`, `--creme #FAF7F2`. **These three brand colours come from the
identity manual and are not open to adjustment.** Reuse the variables, never hardcode.

### Hero

Split layout: blue panel with the headline on the left, the client's **vertical
9:16 video** on the right, playing in its native ratio (muted/autoplay/loop/
playsinline, with a poster). It is framed rather than cropped on purpose — cropping it
to a wide banner loses the coffee pour, which is the whole shot. On ≤960px it stacks
with the video first.

## Logo assets — regenerating them

`logo/*.svg` are **real vector**, extracted from the client's brand-book PDF
(`~/Downloads/identidade_visual_kimassa.pdf`, page 2) — not traced, not raster.

- `kimassa.svg` — blue mark, for light backgrounds
- `kimassa-branco.svg` — all-white negative, for dark backgrounds
- `kimassa-azul.svg` — white wordmark + gold stars + red rules, **the one used in the
  header/hero/404** because it keeps the full brand palette
- `favicon.svg` — the big centre star on a blue rounded square (the three-star crown
  is illegible at 16px; one star is not)

To regenerate: convert page 2 with `pdftocairo -svg`, then keep only the `<path>`
elements whose geometry falls in the band for that variant, and set a tight `viewBox`.
Do **not** use `pdftocairo`'s `-x/-y/-W/-H` crop — it shifts the coordinate space
unpredictably. Mark bounds: x 145.5–451.5; y 182.5–336.75 (blue), 404.24–558.49
(negative), 634.29–788.54 (on blue).

## Catálogo — hardcoded in `js/config.js`

The whole store is driven by `js/config.js` (no spreadsheet, no CMS): `PRODUCTS`
(each with an optional `opcoes` array of flavour names), `CATEGORIES`,
`WHATSAPP_NUMBER`, and `FRETE_TEXT` (the scrolling top bar). The comment block at the
top of the file is written **for the client** — keep it in plain Portuguese and keep
it accurate.

Edit that file to change products. Nothing else should need touching.

## No prices — the site collects a list and quotes over WhatsApp

**There are no prices anywhere on this site, by client decision (2026-08-10).** The
client supplied a product lineup with no price table, and the delivery price varies by
neighbourhood and order size, so publishing anything would have been invented.

The drawer is a *lista de pedido*, not a cart: no unit price, no total, no `brl()`
formatting. `js/main.js` builds a `wa.me` message listing items, chosen flavour and
quantity, ending with a request for the price of the items **and** the delivery.
Persisted to `localStorage` under `kimassa_pedido`, keyed by product id + flavour.

If the client later sends a price table, prices come back by adding a `preco` to each
option and restoring the total row — but don't do it speculatively.

Product cards are re-rendered on every filter change, so card interactions use a
single delegated listener on `document` rather than per-card handlers. Keep it that
way when adding card controls.

## Real client data — already live, don't placeholder it

Supplied directly by the client on 2026-08-10. **This is current and correct:**

- WhatsApp `5534999680441` — (34) 99968-0441
- `kimassavarejo@gmail.com`
- Rua Pio XXI, **152** — Lagoinha, Uberlândia — MG
- Seg–Sex 8h30–12h and 13h30–17h30 · Sáb 8h–12h

Superseded and **removed** from the site: the old (34) 99149-8777 WhatsApp, the
`kimassa.alimentos@yahoo.com` address, and no. 130. The landline (34) 3305-0009 came
from the old Kimassa Alimentos business card and was **not** in the client's new
contact block — it's dropped as unverified rather than published possibly dead.
Fernando Honorato left the page with the história section, so he's also out of the
JSON-LD (structured data has to match visible content).

## The logo sub-word was changed to VAREJO (2026-08-18)

All three lockups now read **KIMASSA / VAREJO**, matching the client's real painted
shopfront sign (see `images/loja-kimassa-uberlandia.jpg`). The earlier decision to
keep "ALIMENTOS" was reversed once that photo confirmed how the brand is actually
applied in the world. Note the **product packaging still says ALIMENTOS** — that's
the parent entity and it is correct on the bag.

The swap is pure vector: the sub-word is drawn as **outlines**, not `<text>`, because
these SVGs load through `<img>` where external fonts never resolve. Letterforms come
from **Antonio at wght 670**, chosen by matching the original lettering's stem/cap
ratio (measured 0.1466; Antonio 650 gives 0.1422, 700 gives 0.1523). They are scaled
to the measured cap height (13.570), set with the measured inter-glyph gap (10.249)
and centred on the original sub-word centre (x 295.865).

VAREJO is 86.17 wide against ALIMENTOS' 129.73, so the short red rules that flank it
were **extended inward** to keep the lockup tight. Their outer ends never moved, so
the mark's overall width is unchanged.

Script: `scratchpad/varejo.py` in the session that did it; the method is reproducible
from the numbers above. If the sub-word ever changes again, re-measure rather than
reusing these constants blindly.

## Still open — confirm before promoting the site

- **"Nossa história" is cut out entirely.** The client explicitly asked for a "como a
  Kimassa surgiu" section but hasn't written it. Rather than run invented copy on a
  real client's site, the section was removed on 2026-08-10 — put it back as soon as
  they send the text. The blue band it used to carry was moved onto *preparo* so the
  page still has a mid-page blue anchor; restoring história means deciding which
  section keeps the blue.
- **Product descriptions** in `js/config.js` are written by inference from the names.
- **"Massa própria — produzida aqui, sem terceirizar"** in the trust bar is an
  unverified claim about their operation. Confirm or cut.
- **Geo coordinates** in the JSON-LD are Uberlândia city centre, not the exact address
- **CEP** in the JSON-LD is `38400-000` (generic Uberlândia)
- **Instagram/Facebook** — no `sameAs` links yet, client hasn't given handles
- **AI-generated product images** — only *broa* and *temperado* are still generated,
  plus the two preparo step photos. Everything else is now a real client photo.
  See `images/README.md`.

Confirmed correct by the client and **not** to be softened: *transporte refrigerado*
and *assa em 20 minutos*.

## Verifying changes

`python3 -m http.server` from inside this folder. For screenshots, note that headless
Chrome clamps its viewport to a 500px minimum, so `--window-size=390` does **not**
give a 390px layout — load the page inside a fixed-width `<iframe>` instead. Scroll
reveals (`.revelar`) stay invisible in a static full-page screenshot; pass
`--force-prefers-reduced-motion`, which the stylesheet honours by showing them.
