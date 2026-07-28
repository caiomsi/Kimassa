# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## What this is

**Kimassa Alimentos** — a **real client**: a company in Uberlândia (MG, Brazil) that
makes and sells **frozen pão de queijo** (pão de queijo congelado). All content is
pt-BR. It is a product **showcase + cart + WhatsApp checkout** (no payment backend),
plus a company-history section. Static HTML/CSS/JS, no build step. See the root
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

- **Blue is architecture** (header, hero, história band, footer), **warm off-white is
  the gallery** the food photography hangs in. The client's photos are warm and
  domestic while the brand is bold and institutional — the cream ground is what
  reconciles them. Don't put food photos directly on blue.
- **Red is punctuation, never a surface**: the rules, CTAs, price tags, cart badge.
- **Gold is reward**: stars, "mais pedido" badges, hover states.
- **Antonio uppercase for everything structural** (headings, prices, nav, quantities);
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
(each with `variants` = pack size + its own price), `CATEGORIES`, `WHATSAPP_NUMBER`,
and `FRETE_TEXT` (the scrolling top bar). The comment block at the top of the file is
written **for the client** — keep it in plain Portuguese and keep it accurate.

Edit that file to change products or prices. Nothing else should need touching.

## Checkout — WhatsApp only

`js/main.js` builds a pre-filled `wa.me` message (items, chosen pack, quantity, BRL
total). The cart is a slide-in drawer, persisted to `localStorage` under
`kimassa_carrinho`, keyed by product id + variant label. No MSI-Forms — WhatsApp is
the entire order flow.

Product cards are re-rendered on every filter change, so card interactions use a
single delegated listener on `document` rather than per-card handlers. Keep it that
way when adding card controls.

## Real client data — already live, don't placeholder it

From the identity manual's business card. **This is real and correct:**

- WhatsApp `5534991498777` — (34) 99149-8777
- Landline (34) 3305-0009 · `kimassa.alimentos@yahoo.com`
- Rua Pio XXI, 130 — Lagoinha, Uberlândia — MG
- Fernando Honorato, Diretor Executivo

## Still placeholder — confirm before promoting the site

- **Product names, pack sizes and prices** in `js/config.js` (marked with ⚠️)
- **Opening hours** in the JSON-LD and the contact section (assumed 8–18 / Sat 8–12)
- **Geo coordinates** in the JSON-LD are Uberlândia city centre, not the exact address
- **CEP** in the JSON-LD is `38400-000` (generic Uberlândia)
- **Instagram/Facebook** — no `sameAs` links yet, client hasn't given handles
- **The company history text** is written from plausible inference, not from Fernando.
  Get the real founding story before this counts as finished copy.
- **AI-generated product images** — see `images/README.md`

## Verifying changes

`python3 -m http.server` from inside this folder. For screenshots, note that headless
Chrome clamps its viewport to a 500px minimum, so `--window-size=390` does **not**
give a 390px layout — load the page inside a fixed-width `<iframe>` instead. Scroll
reveals (`.revelar`) stay invisible in a static full-page screenshot; pass
`--force-prefers-reduced-motion`, which the stylesheet honours by showing them.
