// ─────────────────────────────────────────────
//  USSD Simulator — Central Design Config
//  Edit this file to control all visual aspects
// ─────────────────────────────────────────────

export const theme = {

  // ── Colours — iOS Dark Mode ───────────────────
  colors: {
    // Backgrounds (iOS dark layering)
    bg:             "#000000",   // system background
    bgSecondary:    "#1C1C1E",   // secondary grouped background
    bgTertiary:     "#2C2C2E",   // tertiary fill
    bgInput:        "#1C1C1E",   // input field

    // Text (iOS semantic)
    text:           "#FFFFFF",   // label
    textSecondary:  "#EBEBF5CC", // secondary label (~80% white)
    textTertiary:   "#EBEBF599", // tertiary label (~60% white)
    textQuaternary: "#EBEBF54D", // placeholder (~30% white)

    // Separator
    border:         "#38383A",   // opaque separator
    borderSubtle:   "#2C2C2E",

    // iOS tints
    green:          "#30D158",   // call / confirm (iOS green)
    greenDim:       "#1A3D22",   // green glow/ring
    red:            "#FF453A",   // end call / cancel
    redDim:         "#3D1A1A",
    blue:           "#0A84FF",   // iOS blue tint (links, active)

    // Dialer key button
    keyBg:          "#2C2C2E",   // number key background
    keyBgPressed:   "#3A3A3C",   // number key pressed state
    keyText:        "#FFFFFF",
    keySubText:     "#8E8E93",   // letters below digits

    // Input area
    inputBg:        "#1C1C1E",
    inputBorder:    "#38383A",

    // Session header
    headerBorder:   "#38383A",
    headerCode:     "#30D158",   // *123# shown in green
  },

  // ── Typography ───────────────────────────────
  font: {
    // ── UI font — buttons, labels, headers, dialer keys ──────────────────
    // Active:
    family:       "'CirclePixels', sans-serif",
    // Alternatives (uncomment one, comment out the active line above):
    // family: "'CirclePixels', sans-serif",            // pixel / retro
    // family: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",  // iOS system
    // family: "'Helvetica Neue', Arial, sans-serif",   // neutral sans
    // ─────────────────────────────────────────────────────────────────────

    // ── Screen text font — USSD menu content only ─────────────────────────
    // Active:
    familyScreen: "'Electrolize', sans-serif",
    // Alternatives (uncomment one, comment out the active line above):
    // familyScreen: "'Courier New', Courier, monospace",   // classic telco mono
    // familyScreen: "'CirclePixels', monospace",           // pixel / retro
    // familyScreen: "'SF Mono', 'Fira Code', monospace",   // modern mono
    // familyScreen: "inherit",                             // same as UI font
    // ─────────────────────────────────────────────────────────────────────
    sizeDisplay:  "40px",   // dialed number display
    sizeBody:     "17px",   // menu text (iOS body)
    sizeSubhead:  "15px",   // subhead
    sizeFootnote: "13px",   // footnote / button labels
    sizeCaption:  "11px",   // tiny caps
    sizeKey:      "28px",   // dialer digit
    sizeKeySub:   "10px",   // dialer letter sub-label
    lineHeight:   "1.7",
    weight:       "400",
    weightMed:    "500",
    weightSemi:   "600",
    weightBold:   "700",
  },

  // ── Spacing ──────────────────────────────────
  spacing: {
    padH:         "20px",
    padV:         "24px",
    gap:          "12px",
    keyGap:       "14px",   // gap between dialer keys
  },

  // ── Layout ───────────────────────────────────
  layout: {
    maxWidth:     "390px",   // iPhone 14 width
    keySize:      "74px",    // dialer key diameter
    callBtnSize:  "74px",    // call button diameter
    inputHeight:  "50px",    // text input field height
    inputFrameH:  "20px",    // dial screen value display area height
    btnHeight:    "50px",
    btnHeightSm:  "44px",
    btnRadius:    "14px",    // iOS rounded
    inputRadius:  "12px",
  },

  // ── Safe areas (notch / home indicator) ─────
  // env() values are resolved by the browser at runtime.
  // Fallbacks apply on devices with no notch.
  safe: {
    top:    "env(safe-area-inset-top,    16px)",
    bottom: "env(safe-area-inset-bottom, 24px)",
    left:   "env(safe-area-inset-left,   0px)",
    right:  "env(safe-area-inset-right,  0px)",
  },

  // ── Motion ───────────────────────────────────
  motion: {
    screenFade:   "opacity 0.15s ease",
    keyPress:     "background 0.06s ease, transform 0.06s ease",
  },
};
