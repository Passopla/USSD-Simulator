# USSD Simulator

An interactive, mobile-first Progressive Web App that simulates how USSD (Unstructured Supplementary Service Data) menu systems work on real mobile handsets. Built with a faithful phone-dialer UX — all input is through a numeric keypad, screen states switch as they do on a real device.

---

## What is USSD?

USSD is a real-time session-based protocol used by mobile networks to deliver interactive menu-driven services — balance checks, airtime purchases, data bundles, transfers — all without internet access. When you dial `*123#` on a phone, a session opens between your handset and the carrier's application server. The server responds with a text menu; you reply with a number; the server traverses its menu tree and returns the next screen. The session closes when you reach a terminal node or time out.

This app simulates that full cycle, client-side, with a Telkom Mobile menu tree as the demo dataset.

---

## Live Demo

> Deploy to Vercel or Netlify — see [Deployment](#deployment) below.

---

## Features

- Full numeric keypad dial screen — type `*123#` to start, just like a real phone
- Three distinct screen states: **Idle → Viewing → Inputting** (no hybrid layouts)
- Authentic USSD menu tree traversal with back-navigation and session end
- Free-text input nodes (e.g. phone number / amount entry for airtime transfer)
- PWA installable on Android and iOS — launches full-screen from home screen
- Fully offline after first load (Workbox service worker, 12+ assets precached)
- Central design token file — change any colour, font, size, or spacing in one place
- iOS dark mode colour system throughout
- Safe-area aware layout (notch, Dynamic Island, home indicator)
- No rubber-band overscroll, no tap highlight flash, no accidental text selection

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Bundler | Vite 5 |
| PWA | vite-plugin-pwa + Workbox |
| Icon generation | sharp |
| UI font | Electrolize (Google Fonts) |
| Screen font | Electrolize (swappable via `theme.js`) |
| Styling | Inline styles driven by design tokens |
| Deployment target | Vercel / Netlify (static) |
| Runtime | Browser — no backend, no API |

---

## Architecture

### Screen State Machine

The app runs as a three-state finite state machine. Each state renders a completely different full-screen view — no split layouts.

```
┌─────────────────────────────────────────────────────────┐
│                    App State Machine                    │
│                                                         │
│   ┌──────────┐   dial *123#   ┌──────────────┐         │
│   │          │ ─────────────► │              │         │
│   │   IDLE   │                │   VIEWING    │         │
│   │          │ ◄───────────── │  (menu text) │         │
│   └──────────┘   End Call     │              │         │
│                               └──────┬───────┘         │
│                                      │ tap Reply        │
│                               ┌──────▼───────┐         │
│                               │              │         │
│                               │  INPUTTING   │         │
│                               │  (keypad)    │         │
│                               │              │         │
│                               └──────┬───────┘         │
│                                      │ press Send       │
│                               ┌──────▼───────┐         │
│                               │  navigate()  │         │
│                               │  traverses   │         │
│                               │  menu tree   │         │
│                               └──────┬───────┘         │
│                                      │                  │
│                               back to VIEWING           │
└─────────────────────────────────────────────────────────┘
```

### USSD Menu Tree (Data Structure)

The menu is a recursive tree of nodes. Each node describes one screen of content.

```
MenuNode {
  id:         string          — unique identifier
  display:    string          — text shown on screen (\n for line breaks)
  options:    MenuNode[]      — child nodes keyed by digit pressed
  key:        string          — digit that selects this node from parent
  label:      string          — short description (for parent option list)
  isEnd?:     boolean         — terminal node (no further input expected)
  isInput?:   boolean         — free-text entry node (phone number, amount)
  inputLabel? string          — label shown above keypad in input mode
}
```

Navigation:
- Digit input → `options.find(o => o.key === input)` → render child node
- `"0"` always resets to root
- `isInput` nodes capture free text and pass it to the first child
- `isEnd` nodes show result text; only Back and End Call are available

### Component Tree

```
App
└── USSDSimulator
    ├── [IDLE]      DialScreen
    │                ├── Key (×12)          — numeric keypad buttons
    │                └── Call button        — green circle, activates on input
    │
    ├── [VIEWING]   MenuView
    │                ├── Header bar         — *123# | TELKOM MOBILE
    │                ├── Screen content     — USSD text, vertically centred
    │                └── Action bar         — Back · Reply · End
    │
    └── [INPUTTING] DialScreen
                     ├── Back to menu link
                     ├── Key (×12)
                     └── Send button        — green circle, activates on input
```

### File Structure

```
USSD-Simulator/
│
├── index.html                  # Entry point — viewport, PWA meta, font import, global CSS
├── vite.config.js              # Vite + React plugin + PWA manifest + Workbox config
├── package.json
├── package-lock.json
├── generate-icons.mjs          # Generates icon-192.png / icon-512.png via sharp
├── .gitignore
│
├── public/
│   ├── fonts/
│   │   └── CirclePixels.ttf    # Local font (optional UI font)
│   └── icons/
│       ├── icon-192.png        # PWA home screen icon
│       ├── icon-192.svg
│       ├── icon-512.png        # PWA splash / store icon
│       └── icon-512.svg
│
└── src/
    ├── main.jsx                # React root mount + font CSS import
    ├── App.jsx                 # Thin wrapper — renders USSDSimulator
    ├── fonts.css               # @font-face for CirclePixels
    ├── theme.js                # ★ Central design token file (colours, fonts, spacing, layout)
    └── USSDSimulator.jsx       # All app logic and UI — state machine, menu tree, components
```

---

## Design Token System

All visual properties live in [`src/theme.js`](src/theme.js). No styles are hardcoded in components — every value references a token.

```
theme
├── colors          — bg, text hierarchy, iOS tints (green/red/blue), key buttons, header
├── font            — family (UI), familyScreen (content), sizes, weights, line height
├── spacing         — padH, padV, gap, keyGap
├── layout          — maxWidth, key/button sizes, radii, input heights
├── safe            — env(safe-area-inset-*) tokens for notch/home indicator
└── motion          — screenFade, keyPress transitions
```

To change any aspect of the UI, edit `theme.js` only. The font section includes commented-out alternatives for easy swapping:

```js
// UI font (buttons, labels, keys)
family: "'Electrolize', sans-serif",
// family: "'CirclePixels', sans-serif",
// family: "-apple-system, BlinkMacSystemFont, ...",

// Screen text font (USSD content)
familyScreen: "'Electrolize', sans-serif",
// familyScreen: "'Courier New', Courier, monospace",
```

---

## PWA Configuration

Configured in `vite.config.js` via `vite-plugin-pwa`:

| Setting | Value |
|---|---|
| `display` | `standalone` — no browser chrome when launched from home screen |
| `orientation` | `portrait` |
| `theme_color` | `#000000` |
| `background_color` | `#000000` |
| `registerType` | `autoUpdate` — silently updates service worker |
| Precached assets | All JS, CSS, HTML, PNG, SVG (12+ entries, ~170KB) |
| Google Fonts cache | CacheFirst, 1 year TTL |

**Installing on Android:** Chrome shows an "Add to Home Screen" banner automatically.  
**Installing on iOS:** Safari → Share → Add to Home Screen.

Once installed, the app opens full-screen with no browser UI, works offline, and behaves identically to a native app.

---

## Getting Started

```bash
# Clone
git clone https://github.com/Passopla/USSD-Simulator.git
cd USSD-Simulator

# Install
npm install

# Dev server (hot reload)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

> Node 18+ required.

---

## Customising the Menu Tree

The entire USSD menu is defined as a JavaScript object in `USSDSimulator.jsx` — `USSD_MENU_TREE`. To build your own service:

1. Replace the tree with your own nodes
2. Each node needs at minimum: `id`, `display`, `options[]`
3. Add `isEnd: true` to terminal nodes
4. Add `isInput: true` + `inputLabel` to free-text entry nodes
5. The `navigate()` function handles traversal automatically

No backend required — the simulator runs the full state machine in the browser.

---

## Deployment

This is a fully static build. Any static host works.

**Vercel (recommended)**
```bash
npm i -g vercel
vercel --prod
```

**Netlify**
```bash
npm run build
# Drag the dist/ folder into Netlify's deploy UI
```

HTTPS is required for the PWA service worker to activate. Both Vercel and Netlify provide this automatically.

---

## Roadmap

- [ ] Phase 4 — Deploy to Vercel with custom domain
- [ ] Configurable menu tree loaded from JSON
- [ ] Session timeout simulation (60s countdown)
- [ ] Multiple carrier themes (MTN, Vodacom, Cell C)
- [ ] Haptic feedback on keypress (Vibration API)
- [ ] Sound effects (DTMF tones on keypress)

---

## License

MIT
