# OUTLAWS — A USSD Interactive Fiction Game

A branching narrative game played entirely through a USSD interface simulation. Every choice is a number. Every screen is text. No graphics, no sound — just words on a phone screen and the weight of decisions.

Built on the USSD Simulator engine. Inspired by Lupe Fiasco's *The Cool* and the Outlaws series.

---

## The Story

**Bergville is burning.**

Tlali has taken Nolwandle — your pregnant wife. He wants cattle. All of them.

You are Bandile Khumalo. You have three paths. None of them are clean.

---

## How to Play

Dial `*123#` on the home screen to begin.

All input is through the numeric keypad — exactly as a real USSD session works on a phone. Press a number to choose. Press `0` to return to the main menu at any point.

There is no right answer. There are only consequences.

---

## The Three Acts

### ACT I — Rally the Bandits
Call the old crew. Storm Tlali's compound. Take Nolwandle by force.

But Nyakallo is inside. And Nyakallo has his own agenda.

> No matter how you attack — dawn raid, night breach, siege, negotiation — Nyakallo gets to her first. The bandits win the battle. Bandile loses everything.

### ACT II — Meet the Demand
Pay the cattle. Trust the deal. Bring Nolwandle home.

Go alone, go with backup, go with the cops. Every path reaches the same road out of Tlali's territory.

> There is a sniper on the ridge. The deal was never real. The exchange happens — then a single shot ends it. Tlali always planned to keep both.

### ACT III — The Cool (You Died)
You step outside. Someone calls your name. You turn.

The bullet hits before you hear the gun.

Three days after your funeral, the soil cracks.

> **This is the only act where Nolwandle can survive.** Death gave Bandile something the living don't have. The question is what he does with it.

---

## Endings

There are **19 endings** across the three acts.

| Act | Paths | Nolwandle Survives? |
|---|---|---|
| Rally the Bandits | 6 endings | Never |
| Meet the Demand | 7 endings | Never |
| The Cool | 6 endings (flesh) + 6 endings (ghost) | Yes — if you make it here |

**The Cool** splits into two branches:
- **Return as Flesh** — Bandile rises bodily. Rally the crew or walk to Tlali alone.
- **Return as Ghost** — No body. Only presence. Haunt Tlali, possess Sbu, or visit Nolwandle in her cell.

The ghost paths are the richest. Particularly *Visit Nolwandle → Try to untie her* — the only ending where Bandile spends the last of himself to free her and disappears completely.

---

## Architecture

This game runs on the USSD Simulator engine — a three-state finite state machine built in React.

```
IDLE (dial screen)
  └─► VIEWING (USSD text — the story)
        └─► INPUTTING (keypad — your choice)
              └─► VIEWING (next node)
```

### Content / Engine Separation

All narrative content lives in [`src/menuDesign.js`](src/menuDesign.js). The engine in [`src/USSDSimulator.jsx`](src/USSDSimulator.jsx) never needs to change for new content.

```
src/
├── menuDesign.js       ← Story content only. Edit this to change the game.
├── USSDSimulator.jsx   ← Engine. State machine, traversal, rendering.
└── theme.js            ← All visual tokens. Colors, fonts, spacing.
```

### Node Structure

```js
{
  key:        "1",              // digit pressed to reach this node
  label:      "Rally the bandits",  // short text in parent option list
  question:   "You make the calls...",  // full screen text
  options:    [ ... ],          // child nodes
  isEnd:      true,             // optional — terminal screen
  isInput:    true,             // optional — free text entry
  inputLabel: "Enter amount"    // optional — shown above keypad
}
```

Node IDs are auto-generated from tree position (`root_1_2_1`). No manual ID management required.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Bundler | Vite 5 |
| PWA | vite-plugin-pwa + Workbox |
| Styling | Inline styles — design tokens via `theme.js` |
| Font (UI) | CirclePixels (local) |
| Font (screen) | Electrolize (Google Fonts) |
| Deployment | Vercel / Netlify (static) |
| Runtime | Browser — no backend, no API |

---

## Getting Started

```bash
git clone https://github.com/Passopla/USSD-Simulator.git
cd USSD-Simulator
git checkout game
npm install
npm run dev
```

Dial `*123#` to start.

---

## Writing Your Own Game

1. Open [`src/menuDesign.js`](src/menuDesign.js)
2. Replace the `MENU` object with your own tree
3. Each node needs at minimum: `question`, `key`, `label`, `options[]`
4. Add `isEnd: true` to terminal nodes
5. The engine handles everything else — traversal, back navigation, IDs, rendering

No backend. No database. The entire game runs client-side.

---

## PWA

Install on Android: Chrome shows an "Add to Home Screen" prompt automatically.
Install on iOS: Safari → Share → Add to Home Screen.

Once installed, the app opens full-screen and works offline. It behaves identically to a native app — because the experience *is* the point.

---

## Branch Notes

This is the `game` branch. The `main` branch contains the original Telkom Mobile USSD simulator demo.

| Branch | Contents |
|---|---|
| `main` | USSD simulator with Telkom Mobile menu demo |
| `game` | OUTLAWS interactive fiction game |

---

## License

MIT
