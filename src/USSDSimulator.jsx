import { useState, useCallback } from "react";
import { theme } from "./theme.js";

const { colors: C, font: F, spacing: S, layout: L, motion: M, safe: SA } = theme;

// ─── USSD Menu Tree ───────────────────────────────────────────────────────────
const USSD_MENU_TREE = {
  id: "root",
  display: "Welcome to Telkom Mobile\n\nSelect an option:",
  options: [
    {
      key: "1", label: "Buy Airtime", id: "buy_airtime",
      display: "Buy Airtime\n\nSelect amount:",
      options: [
        {
          key: "1", label: "R5", id: "airtime_5",
          display: "You are about to buy R5 airtime.\n\n1. Confirm\n2. Cancel",
          options: [
            { key: "1", label: "Confirm", id: "airtime_5_ok",     display: "R5 airtime purchased.\n\nNew balance: R23.50\n\n0. Main Menu", isEnd: true },
            { key: "2", label: "Cancel",  id: "airtime_5_cancel", display: "Transaction cancelled.\n\n0. Main Menu", isEnd: true },
          ],
        },
        {
          key: "2", label: "R10", id: "airtime_10",
          display: "You are about to buy R10 airtime.\n\n1. Confirm\n2. Cancel",
          options: [
            { key: "1", label: "Confirm", id: "airtime_10_ok",     display: "R10 airtime purchased.\n\nNew balance: R18.50\n\n0. Main Menu", isEnd: true },
            { key: "2", label: "Cancel",  id: "airtime_10_cancel", display: "Transaction cancelled.\n\n0. Main Menu", isEnd: true },
          ],
        },
        {
          key: "3", label: "R30", id: "airtime_30",
          display: "You are about to buy R30 airtime.\n\n1. Confirm\n2. Cancel",
          options: [
            { key: "1", label: "Confirm", id: "airtime_30_ok",     display: "R30 airtime purchased.\n\nNew balance: -R1.50\n\n0. Main Menu", isEnd: true },
            { key: "2", label: "Cancel",  id: "airtime_30_cancel", display: "Transaction cancelled.\n\n0. Main Menu", isEnd: true },
          ],
        },
      ],
    },
    {
      key: "2", label: "Buy Data Bundles", id: "buy_data",
      display: "Buy Data Bundles\n\nSelect bundle:",
      options: [
        {
          key: "1", label: "Daily 100MB - R12", id: "data_daily",
          display: "Daily Bundle: 100MB for R12\nValid for 24 hours\n\n1. Confirm\n2. Cancel",
          options: [
            { key: "1", label: "Confirm", id: "data_daily_ok",     display: "100MB Daily bundle activated.\n\nExpires: Tomorrow\n\n0. Main Menu", isEnd: true },
            { key: "2", label: "Cancel",  id: "data_daily_cancel", display: "Transaction cancelled.\n\n0. Main Menu", isEnd: true },
          ],
        },
        {
          key: "2", label: "Weekly 500MB - R29", id: "data_weekly",
          display: "Weekly Bundle: 500MB for R29\nValid for 7 days\n\n1. Confirm\n2. Cancel",
          options: [
            { key: "1", label: "Confirm", id: "data_weekly_ok",     display: "500MB Weekly bundle activated.\n\nExpires: 7 days\n\n0. Main Menu", isEnd: true },
            { key: "2", label: "Cancel",  id: "data_weekly_cancel", display: "Transaction cancelled.\n\n0. Main Menu", isEnd: true },
          ],
        },
        {
          key: "3", label: "Monthly 1GB - R99", id: "data_monthly",
          display: "Monthly Bundle: 1GB for R99\nValid for 30 days\n\n1. Confirm\n2. Cancel",
          options: [
            { key: "1", label: "Confirm", id: "data_monthly_ok",     display: "1GB Monthly bundle activated.\n\nExpires: 30 days\n\n0. Main Menu", isEnd: true },
            { key: "2", label: "Cancel",  id: "data_monthly_cancel", display: "Transaction cancelled.\n\n0. Main Menu", isEnd: true },
          ],
        },
      ],
    },
    {
      key: "3", label: "Check Balance", id: "check_balance",
      display: "Your Balance:\n\nAirtime: R28.50\nData: 245MB (expires 15 Apr)\nSMS: 12 remaining\n\n0. Main Menu",
      isEnd: true, options: [],
    },
    {
      key: "4", label: "Transfer Airtime", id: "transfer_input",
      display: "Transfer Airtime\n\nEnter recipient number:",
      isInput: true, inputLabel: "Recipient number",
      options: [
        {
          key: "__input__", label: "Enter amount", id: "transfer_amount",
          display: "Enter amount to transfer (Rands):",
          isInput: true, inputLabel: "Amount (R)",
          options: [
            {
              key: "__input__", label: "Confirm", id: "transfer_confirm",
              display: "Confirm transfer?\n\n1. Yes\n2. No",
              options: [
                { key: "1", label: "Yes", id: "transfer_ok", display: "Transfer successful.\n\n0. Main Menu", isEnd: true },
                { key: "2", label: "No",  id: "transfer_no", display: "Transfer cancelled.\n\n0. Main Menu", isEnd: true },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "5", label: "FreeMe Plans", id: "freeme",
      display: "FreeMe Plans\n\nSelect a plan:",
      options: [
        { key: "1", label: "FreeMe 1GB - R99/mo",    id: "freeme1", display: "FreeMe 1GB\nR99/month\nIncludes: 1GB data, 50 mins\n\nDial *180# to subscribe\n\n0. Main Menu", isEnd: true },
        { key: "2", label: "FreeMe 2.5GB - R149/mo", id: "freeme2", display: "FreeMe 2.5GB\nR149/month\nIncludes: 2.5GB data, 100 mins\n\nDial *180# to subscribe\n\n0. Main Menu", isEnd: true },
        { key: "3", label: "FreeMe 5GB - R249/mo",   id: "freeme3", display: "FreeMe 5GB\nR249/month\nIncludes: 5GB data, 200 mins\n\nDial *180# to subscribe\n\n0. Main Menu", isEnd: true },
      ],
    },
  ],
};

// ─── App screens ──────────────────────────────────────────────────────────────
// idle        → home dial screen
// viewing     → USSD menu text is shown
// inputting   → dial screen used for reply input
const SCREEN = { IDLE: "idle", VIEWING: "viewing", INPUTTING: "inputting" };

// ─── Keypad keys ─────────────────────────────────────────────────────────────
const KEYS = [
  { digit: "1", sub: "" },    { digit: "2", sub: "ABC" }, { digit: "3", sub: "DEF" },
  { digit: "4", sub: "GHI" }, { digit: "5", sub: "JKL" }, { digit: "6", sub: "MNO" },
  { digit: "7", sub: "PQRS"}, { digit: "8", sub: "TUV" }, { digit: "9", sub: "WXYZ"},
  { digit: "*", sub: "" },    { digit: "0", sub: "+" },   { digit: "#", sub: "" },
];

// ─── Single key button ────────────────────────────────────────────────────────
function Key({ digit, sub, onPress }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => { setPressed(false); onPress(digit); }}
      onPointerLeave={() => setPressed(false)}
      style={{
        width: L.keySize, height: L.keySize, borderRadius: "50%",
        background: pressed ? C.keyBgPressed : C.keyBg,
        border: "none", cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1px",
        transform: pressed ? "scale(0.91)" : "scale(1)",
        transition: M.keyPress,
        WebkitTapHighlightColor: "transparent", userSelect: "none",
      }}
    >
      <span style={{ color: C.keyText, fontSize: F.sizeKey, fontFamily: F.family, fontWeight: F.weightMed, lineHeight: 1 }}>
        {digit}
      </span>
      {sub && (
        <span style={{ color: C.keySubText, fontSize: F.sizeKeySub, fontFamily: F.family, fontWeight: F.weightSemi, letterSpacing: "1.5px", lineHeight: 1 }}>
          {sub}
        </span>
      )}
    </button>
  );
}

// ─── Dial / Input Screen ─────────────────────────────────────────────────────
// Shared between IDLE (dialling *123#) and INPUTTING (replying to USSD menu).
// placeholder  — greyed hint when nothing typed yet
// actionLabel  — "call" | "send"
// onAction     — called when action button pressed (only if value is non-empty)
// onBack       — back arrow shown during session input (null = hidden)
function DialScreen({ value, onChange, placeholder, actionLabel, onAction, onBack }) {
  const [actionPressed, setActionPressed] = useState(false);

  const actionBtn = (
    <button
      onPointerDown={() => setActionPressed(true)}
      onPointerUp={() => { setActionPressed(false); if (value) onAction(); }}
      onPointerLeave={() => setActionPressed(false)}
      style={{
        width: L.callBtnSize, height: L.callBtnSize, borderRadius: "50%",
        background: actionLabel === "send" ? C.green : C.green,
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: actionPressed ? "scale(0.91)" : "scale(1)",
        transition: M.keyPress,
        opacity: value ? 1 : 0.35,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {actionLabel === "call" ? (
        // Phone icon
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M5.5 4C5.5 4 8 4 9.5 7.5C11 11 9.5 12.5 10.5 13.5C11.5 14.5 14.5 17.5 15.5 18.5C16.5 19.5 18 18 21.5 19.5C25 21 25 23.5 25 23.5C25 23.5 24 26 21 26C15 26 3 14 3 8C3 5 5.5 4 5.5 4Z" fill="white"/>
        </svg>
      ) : (
        // Send arrow
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );

  return (
    <div style={{
      width: "100%", maxWidth: L.maxWidth, minHeight: "100dvh",
      background: C.bg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "space-between",
      paddingTop: SA.top,
      paddingBottom: SA.bottom,
    }}>

      {/* Top area: carrier (idle) or back link (inputting) */}
      <div style={{ textAlign: "center", paddingTop: "12px", width: "100%", padding: `12px ${S.padH} 0` }}>
        {onBack ? (
          <button onClick={onBack} style={{
            background: "none", border: "none", cursor: "pointer",
            color: C.blue, fontFamily: F.family, fontSize: F.sizeSubhead,
            display: "flex", alignItems: "center", gap: "4px", padding: 0,
          }}>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M8 2L2 8L8 14" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to menu
          </button>
        ) : (
          <div>
            <div style={{ fontSize: F.sizeSubhead, fontWeight: F.weightSemi, color: C.text, fontFamily: F.family }}>
              Telkom Mobile
            </div>
            <div style={{ fontSize: F.sizeCaption, color: C.textTertiary, fontFamily: F.family, marginTop: "3px" }}>
              LTE
            </div>
          </div>
        )}
      </div>

      {/* Value display */}
      <div style={{
        minHeight: L.inputFrameH, display: "flex", alignItems: "center", justifyContent: "center",
        padding: `0 ${S.padH}`, width: "100%",
      }}>
        <span style={{
          fontSize: value.length > 8 ? "28px" : F.sizeDisplay,
          fontWeight: F.weightMed,
          color: value ? C.text : C.textQuaternary,
          fontFamily: F.family,
          letterSpacing: value ? "4px" : "0",
          transition: "font-size 0.1s ease",
        }}>
          {value || placeholder}
        </span>
      </div>

      {/* Keypad */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: S.keyGap }}>
        {/* 3×4 grid */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(3, ${L.keySize})`, gap: S.keyGap }}>
          {KEYS.map(({ digit, sub }) => (
            <Key key={digit} digit={digit} sub={sub} onPress={(d) => onChange(prev => prev + d)} />
          ))}
        </div>

        {/* Bottom row: backspace | action | spacer */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(3, ${L.keySize})`, gap: S.keyGap, alignItems: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {value.length > 0 && (
              <button
                onClick={() => onChange(prev => prev.slice(0, -1))}
                style={{
                  width: L.keySize, height: L.keySize, borderRadius: "50%",
                  background: "transparent", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                  <path d="M9 1H23C24.1 1 25 1.9 25 3V17C25 18.1 24.1 19 23 19H9L1 10L9 1Z" stroke={C.textSecondary} strokeWidth="1.5" fill="none"/>
                  <path d="M18 6.5L12 13.5M12 6.5L18 13.5" stroke={C.textSecondary} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>{actionBtn}</div>
          <div />
        </div>
      </div>
    </div>
  );
}

// ─── Menu View ────────────────────────────────────────────────────────────────
// Shows the USSD response text with Reply and End Call buttons.
function MenuView({ text, fading, onReply, onBack, onEnd, hasHistory }) {
  const [replyPressed, setReplyPressed] = useState(false);
  const [endPressed,   setEndPressed]   = useState(false);

  return (
    <div style={{
      width: "100%", maxWidth: L.maxWidth, minHeight: "100dvh",
      background: C.bg, display: "flex", flexDirection: "column",
    }}>

      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: `16px ${S.padH} 14px`,
        borderBottom: `1px solid ${C.headerBorder}`,
        flexShrink: 0,
      }}>
        <span style={{ color: C.headerCode, fontSize: F.sizeSubhead, fontFamily: F.familyScreen, fontWeight: F.weightBold, letterSpacing: "2px" }}>
          *123#
        </span>
        <span style={{ fontSize: F.sizeCaption, color: C.textTertiary, fontFamily: F.family, fontWeight: F.weightMed, letterSpacing: "1px" }}>
          TELKOM MOBILE
        </span>
      </div>

      {/* USSD content — vertically centred */}
      <div style={{
        flex: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: `${S.padV} ${S.padH}`,
        opacity: fading ? 0 : 1,
        transition: M.screenFade,
        overflowY: "auto",
      }}>
        <div style={{
          color: C.text, fontSize: F.sizeBody,
          fontFamily: F.familyScreen, lineHeight: F.lineHeight,
          whiteSpace: "pre-wrap", width: "100%", textAlign: "center",
        }}>
          {text}
        </div>
      </div>

      {/* Action bar */}
      <div style={{
        padding: `${S.gap} ${S.padH} max(${S.gap}, ${SA.bottom})`,
        borderTop: `1px solid ${C.borderSubtle}`,
        background: C.bgSecondary,
        display: "flex", gap: S.gap, flexShrink: 0,
      }}>
        {hasHistory && (
          <button
            onClick={onBack}
            style={{
              flex: 1, height: L.btnHeightSm,
              background: C.bgTertiary, color: C.text,
              border: "none", borderRadius: L.btnRadius,
              fontFamily: F.family, fontSize: F.sizeFootnote, fontWeight: F.weightMed,
              cursor: "pointer",
            }}
          >
            Back
          </button>
        )}

        <button
          onPointerDown={() => setReplyPressed(true)}
          onPointerUp={() => { setReplyPressed(false); onReply(); }}
          onPointerLeave={() => setReplyPressed(false)}
          style={{
            flex: 2, height: L.btnHeightSm,
            background: C.green, color: "#000",
            border: "none", borderRadius: L.btnRadius,
            fontFamily: F.family, fontSize: F.sizeFootnote, fontWeight: F.weightBold,
            cursor: "pointer",
            transform: replyPressed ? "scale(0.97)" : "scale(1)",
            transition: M.keyPress,
          }}
        >
          Reply
        </button>

        <button
          onPointerDown={() => setEndPressed(true)}
          onPointerUp={() => { setEndPressed(false); onEnd(); }}
          onPointerLeave={() => setEndPressed(false)}
          style={{
            flex: 1, height: L.btnHeightSm,
            background: C.redDim, color: C.red,
            border: "none", borderRadius: L.btnRadius,
            fontFamily: F.family, fontSize: F.sizeFootnote, fontWeight: F.weightMed,
            cursor: "pointer",
            transform: endPressed ? "scale(0.97)" : "scale(1)",
            transition: M.keyPress,
          }}
        >
          End
        </button>
      </div>

    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function USSDSimulator() {
  const [screen, setScreen]               = useState(SCREEN.IDLE);
  const [currentNode, setCurrentNode]     = useState(USSD_MENU_TREE);
  const [history, setHistory]             = useState([]);
  const [dialValue, setDialValue]         = useState("");
  const [inputValue, setInputValue]       = useState("");
  const [inputValues, setInputValues]     = useState({});
  const [fading, setFading]               = useState(false);

  const flash = (fn) => {
    setFading(true);
    setTimeout(() => { fn(); setFading(false); }, 120);
  };

  const startSession = () => {
    setDialValue("");
    flash(() => {
      setScreen(SCREEN.VIEWING);
      setCurrentNode(USSD_MENU_TREE);
      setHistory([]);
      setInputValues({});
    });
  };

  const endSession = () => {
    setScreen(SCREEN.IDLE);
    setCurrentNode(USSD_MENU_TREE);
    setHistory([]);
    setInputValues({});
    setDialValue("");
    setInputValue("");
  };

  const openInput = () => {
    setInputValue("");
    setScreen(SCREEN.INPUTTING);
  };

  const navigate = useCallback((input) => {
    if (!input.trim()) return;
    const trimmed = input.trim();

    if (trimmed === "0") {
      flash(() => { setCurrentNode(USSD_MENU_TREE); setHistory([]); });
      setScreen(SCREEN.VIEWING);
      setInputValue("");
      return;
    }

    if (currentNode.isInput) {
      setInputValues(prev => ({ ...prev, [currentNode.id]: trimmed }));
      const nextNode = currentNode.options?.[0];
      if (nextNode) {
        let display = nextNode.display;
        if (currentNode.id === "transfer_input") {
          display = `Transfer to: ${trimmed}\n\n${nextNode.display}`;
        } else if (currentNode.id === "transfer_amount") {
          const phone = inputValues["transfer_input"] || "unknown";
          display = `Transfer R${trimmed} to ${phone}?\n\n1. Yes\n2. No`;
        }
        setHistory(prev => [...prev, { id: currentNode.id, input: trimmed }]);
        flash(() => setCurrentNode({ ...nextNode, display }));
        setScreen(SCREEN.VIEWING);
        setInputValue("");
      }
      return;
    }

    const selected = currentNode.options?.find(o => o.key === trimmed);
    if (selected) {
      setHistory(prev => [...prev, { id: currentNode.id, input: trimmed }]);
      flash(() => setCurrentNode(selected));
      setScreen(SCREEN.VIEWING);
      setInputValue("");
    }
  }, [currentNode, inputValues]);

  const goBack = () => {
    if (history.length === 0) return;
    const newHistory = history.slice(0, -1);
    let node = USSD_MENU_TREE;
    for (const step of newHistory) {
      const next = node.options?.find(o => o.key === step.input) || node.options?.[0];
      if (next) node = next;
    }
    flash(() => { setCurrentNode(node); setHistory(newHistory); });
    setInputValue("");
  };

  const buildScreen = () => {
    let text = currentNode.display || "";
    if (!currentNode.isEnd && !currentNode.isInput && currentNode.options?.length > 0) {
      text += "\n" + currentNode.options.map(o => `${o.key}. ${o.label}`).join("\n");
    }
    if (history.length > 0 && !currentNode.isEnd) {
      text += "\n\n0. Main Menu";
    }
    return text;
  };

  const wrap = (child) => (
    <div style={{ minHeight: "100dvh", background: C.bg, display: "flex", justifyContent: "center" }}>
      {child}
    </div>
  );

  // ── IDLE: home dial screen ────────────────────────────────────────────────
  if (screen === SCREEN.IDLE) {
    return wrap(
      <DialScreen
        value={dialValue}
        onChange={setDialValue}
        placeholder="Dial *123#"
        actionLabel="call"
        onAction={startSession}
        onBack={null}
      />
    );
  }

  // ── INPUTTING: reply dial screen ──────────────────────────────────────────
  if (screen === SCREEN.INPUTTING) {
    return wrap(
      <DialScreen
        value={inputValue}
        onChange={setInputValue}
        placeholder="Input option..."
        actionLabel="send"
        onAction={() => navigate(inputValue)}
        onBack={() => setScreen(SCREEN.VIEWING)}
      />
    );
  }

  // ── VIEWING: USSD menu text ───────────────────────────────────────────────
  return wrap(
    <MenuView
      text={buildScreen()}
      fading={fading}
      onReply={openInput}
      onBack={goBack}
      onEnd={endSession}
      hasHistory={history.length > 0}
    />
  );
}
