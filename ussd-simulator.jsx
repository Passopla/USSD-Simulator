import { useState, useCallback, useRef, useEffect } from "react";

// ─── USSD Menu Tree Data Structure ───
// This is the core concept: a USSD system is essentially a tree of menus.
// Each node has a display text and children options.
// The session is stateful — the server tracks where you are in the tree.

const USSD_MENU_TREE = {
  id: "root",
  title: "Telkom Mobile",
  // The display text shown to the user
  display: "Welcome to Telkom Mobile\n\nSelect an option:",
  options: [
    {
      key: "1",
      label: "Buy Airtime",
      id: "buy_airtime",
      display: "Buy Airtime\n\nSelect amount:",
      options: [
        {
          key: "1",
          label: "R5",
          id: "airtime_5",
          display: "You are about to buy R5 airtime.\n\n1. Confirm\n2. Cancel",
          options: [
            { key: "1", label: "Confirm", id: "airtime_5_ok", display: "✓ R5 airtime purchased successfully!\n\nYour new balance: R23.50\n\n0. Main Menu", isEnd: true },
            { key: "2", label: "Cancel", id: "airtime_5_cancel", display: "Transaction cancelled.\n\n0. Main Menu", isEnd: true },
          ],
        },
        {
          key: "2",
          label: "R10",
          id: "airtime_10",
          display: "You are about to buy R10 airtime.\n\n1. Confirm\n2. Cancel",
          options: [
            { key: "1", label: "Confirm", id: "airtime_10_ok", display: "✓ R10 airtime purchased successfully!\n\nYour new balance: R18.50\n\n0. Main Menu", isEnd: true },
            { key: "2", label: "Cancel", id: "airtime_10_cancel", display: "Transaction cancelled.\n\n0. Main Menu", isEnd: true },
          ],
        },
        {
          key: "3",
          label: "R30",
          id: "airtime_30",
          display: "You are about to buy R30 airtime.\n\n1. Confirm\n2. Cancel",
          options: [
            { key: "1", label: "Confirm", id: "airtime_30_ok", display: "✓ R30 airtime purchased successfully!\n\nYour new balance: -R1.50\n\n0. Main Menu", isEnd: true },
            { key: "2", label: "Cancel", id: "airtime_30_cancel", display: "Transaction cancelled.\n\n0. Main Menu", isEnd: true },
          ],
        },
      ],
    },
    {
      key: "2",
      label: "Buy Data Bundles",
      id: "buy_data",
      display: "Buy Data Bundles\n\nSelect bundle:",
      options: [
        {
          key: "1",
          label: "Daily 100MB — R12",
          id: "data_daily",
          display: "Daily Bundle: 100MB for R12\nValid for 24 hours\n\n1. Confirm\n2. Cancel",
          options: [
            { key: "1", label: "Confirm", id: "data_daily_ok", display: "✓ 100MB Daily bundle activated!\n\nExpires: Tomorrow\n\n0. Main Menu", isEnd: true },
            { key: "2", label: "Cancel", id: "data_daily_cancel", display: "Transaction cancelled.\n\n0. Main Menu", isEnd: true },
          ],
        },
        {
          key: "2",
          label: "Weekly 500MB — R29",
          id: "data_weekly",
          display: "Weekly Bundle: 500MB for R29\nValid for 7 days\n\n1. Confirm\n2. Cancel",
          options: [
            { key: "1", label: "Confirm", id: "data_weekly_ok", display: "✓ 500MB Weekly bundle activated!\n\nExpires: 7 days\n\n0. Main Menu", isEnd: true },
            { key: "2", label: "Cancel", id: "data_weekly_cancel", display: "Transaction cancelled.\n\n0. Main Menu", isEnd: true },
          ],
        },
        {
          key: "3",
          label: "Monthly 1GB — R99",
          id: "data_monthly",
          display: "Monthly Bundle: 1GB for R99\nValid for 30 days\n\n1. Confirm\n2. Cancel",
          options: [
            { key: "1", label: "Confirm", id: "data_monthly_ok", display: "✓ 1GB Monthly bundle activated!\n\nExpires: 30 days\n\n0. Main Menu", isEnd: true },
            { key: "2", label: "Cancel", id: "data_monthly_cancel", display: "Transaction cancelled.\n\n0. Main Menu", isEnd: true },
          ],
        },
      ],
    },
    {
      key: "3",
      label: "Check Balance",
      id: "check_balance",
      display: "Your Balance:\n\nAirtime: R28.50\nData: 245MB (expires 15 Apr)\nSMS: 12 remaining\n\n0. Main Menu",
      isEnd: true,
      options: [],
    },
    {
      key: "4",
      label: "Transfer Airtime",
      id: "transfer",
      display: "Transfer Airtime\n\nEnter recipient number:",
      isInput: true,
      inputLabel: "Phone number",
      id: "transfer_input",
      options: [
        {
          key: "__input__",
          label: "Enter amount to transfer:",
          id: "transfer_amount",
          display: "Enter amount to transfer (Rands):",
          isInput: true,
          inputLabel: "Amount (R)",
          options: [
            {
              key: "__input__",
              label: "Confirm",
              id: "transfer_confirm",
              display: "Confirm transfer?\n\n1. Yes\n2. No",
              options: [
                { key: "1", label: "Yes", id: "transfer_ok", display: "✓ Transfer successful!\n\n0. Main Menu", isEnd: true },
                { key: "2", label: "No", id: "transfer_no", display: "Transfer cancelled.\n\n0. Main Menu", isEnd: true },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "5",
      label: "FreeMe Plans",
      id: "freeme",
      display: "FreeMe Plans\n\nSelect a plan:",
      options: [
        { key: "1", label: "FreeMe 1GB — R99/mo", id: "freeme1", display: "FreeMe 1GB\nR99/month\nIncludes: 1GB data, 50 mins\n\nDial 180 to subscribe\n\n0. Main Menu", isEnd: true },
        { key: "2", label: "FreeMe 2.5GB — R149/mo", id: "freeme2", display: "FreeMe 2.5GB\nR149/month\nIncludes: 2.5GB data, 100 mins\n\nDial 180 to subscribe\n\n0. Main Menu", isEnd: true },
        { key: "3", label: "FreeMe 5GB — R249/mo", id: "freeme3", display: "FreeMe 5GB\nR249/month\nIncludes: 5GB data, 200 mins\n\nDial 180 to subscribe\n\n0. Main Menu", isEnd: true },
      ],
    },
  ],
};

// ─── Architecture Explanation Panel ───
const ArchPanel = ({ visible, onClose }) => {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    }}>
      <div style={{
        background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: "16px",
        maxWidth: "520px", width: "100%", maxHeight: "80vh", overflow: "auto",
        padding: "28px", color: "#c8c8e0", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px",
        lineHeight: "1.7",
      }}>
        <h2 style={{ color: "#00d4aa", margin: "0 0 16px", fontSize: "16px", fontFamily: "'Space Mono', monospace" }}>
          ⚙ How USSD Works
        </h2>
        <div style={{ marginBottom: "14px" }}>
          <strong style={{ color: "#f0c040" }}>1. Session-Based Protocol</strong>
          <p style={{ margin: "4px 0 0" }}>Unlike SMS, USSD creates a real-time session between your phone and the carrier's server. The session stays open while you navigate menus (typically 60-180s timeout).</p>
        </div>
        <div style={{ marginBottom: "14px" }}>
          <strong style={{ color: "#f0c040" }}>2. Menu Tree (State Machine)</strong>
          <p style={{ margin: "4px 0 0" }}>The server stores a tree of menu nodes. Each user input ("1", "2", etc.) traverses the tree. The server tracks your position and sends back the next screen. This is essentially a finite state machine.</p>
        </div>
        <div style={{ marginBottom: "14px" }}>
          <strong style={{ color: "#f0c040" }}>3. Request / Response Cycle</strong>
          <p style={{ margin: "4px 0 0" }}>Phone → Carrier Gateway → USSD Application Server. Your input is a short string. The server looks up your session, finds the current node, matches your input to a child node, and returns the display text.</p>
        </div>
        <div style={{ marginBottom: "14px" }}>
          <strong style={{ color: "#f0c040" }}>4. Data Structure</strong>
          <p style={{ margin: "4px 0 0" }}>Each menu node contains: display text, an array of options (key → child node), and flags like isEnd (terminal screen) or isInput (free-text entry like a phone number).</p>
        </div>
        <div style={{ marginBottom: "14px" }}>
          <strong style={{ color: "#f0c040" }}>5. Building Your Own</strong>
          <p style={{ margin: "4px 0 0" }}>To build a real USSD app you'd need: a USSD gateway provider (like Africa's Talking), a web server endpoint that receives session data + user input, and your menu tree logic. The gateway handles the telecom side — your server just returns text responses.</p>
        </div>
        <button onClick={onClose} style={{
          marginTop: "8px", padding: "10px 24px", background: "#00d4aa", color: "#0a0a1a",
          border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer",
          fontFamily: "'Space Mono', monospace", fontSize: "13px",
        }}>Got it</button>
      </div>
    </div>
  );
};

// ─── Debug Panel (shows the tree traversal) ───
const DebugPanel = ({ history, currentNode }) => (
  <div style={{
    background: "#0d0d1a", border: "1px solid #1a1a3a", borderRadius: "12px",
    padding: "16px", marginTop: "16px", fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "11px", color: "#7a7a9a",
  }}>
    <div style={{ color: "#f0c040", fontWeight: 700, marginBottom: "8px", fontSize: "12px", letterSpacing: "1px" }}>
      ▸ SESSION DEBUG
    </div>
    <div style={{ marginBottom: "6px" }}>
      <span style={{ color: "#5a5a7a" }}>path: </span>
      <span style={{ color: "#00d4aa" }}>{history.map(h => h.id).join(" → ") || "root"}</span>
    </div>
    <div style={{ marginBottom: "6px" }}>
      <span style={{ color: "#5a5a7a" }}>current_node: </span>
      <span style={{ color: "#e8e8ff" }}>{currentNode.id}</span>
    </div>
    <div style={{ marginBottom: "6px" }}>
      <span style={{ color: "#5a5a7a" }}>depth: </span>
      <span style={{ color: "#e8e8ff" }}>{history.length}</span>
    </div>
    <div>
      <span style={{ color: "#5a5a7a" }}>children: </span>
      <span style={{ color: "#e8e8ff" }}>[{(currentNode.options || []).map(o => `"${o.key}"`).join(", ")}]</span>
    </div>
  </div>
);

// ─── Main App ───
export default function USSDSimulator() {
  const [currentNode, setCurrentNode] = useState(USSD_MENU_TREE);
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sessionActive, setSessionActive] = useState(false);
  const [showArch, setShowArch] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [animating, setAnimating] = useState(false);
  const inputRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [currentNode]);

  const startSession = () => {
    setSessionActive(true);
    setCurrentNode(USSD_MENU_TREE);
    setHistory([]);
    setInputValues({});
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
  };

  const endSession = () => {
    setSessionActive(false);
    setCurrentNode(USSD_MENU_TREE);
    setHistory([]);
    setInputValues({});
  };

  const navigate = useCallback((input) => {
    if (!input.trim()) return;
    const trimmed = input.trim();

    // "0" always returns to root
    if (trimmed === "0") {
      setCurrentNode(USSD_MENU_TREE);
      setHistory([]);
      setInputValue("");
      setAnimating(true);
      setTimeout(() => setAnimating(false), 300);
      return;
    }

    // If current node expects free-text input
    if (currentNode.isInput) {
      setInputValues(prev => ({ ...prev, [currentNode.id]: trimmed }));
      const nextNode = currentNode.options?.[0];
      if (nextNode) {
        setHistory(prev => [...prev, { id: currentNode.id, input: trimmed }]);
        // Inject the user's input into the display text
        let display = nextNode.display;
        if (currentNode.id === "transfer_input") {
          display = `Transfer to: ${trimmed}\n\n${nextNode.display}`;
        } else if (currentNode.id === "transfer_amount") {
          const phone = inputValues["transfer_input"] || "unknown";
          display = `Transfer R${trimmed} to ${phone}?\n\n1. Yes\n2. No`;
        }
        setCurrentNode({ ...nextNode, display });
        setInputValue("");
        setAnimating(true);
        setTimeout(() => setAnimating(false), 300);
      }
      return;
    }

    // Normal menu selection
    const selected = currentNode.options?.find(o => o.key === trimmed);
    if (selected) {
      setHistory(prev => [...prev, { id: currentNode.id, input: trimmed }]);
      setCurrentNode(selected);
      setInputValue("");
      setAnimating(true);
      setTimeout(() => setAnimating(false), 300);
    }
  }, [currentNode, inputValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(inputValue);
  };

  const goBack = () => {
    if (history.length === 0) return;
    // Rebuild the path from root
    const newHistory = history.slice(0, -1);
    let node = USSD_MENU_TREE;
    for (const step of newHistory) {
      const next = node.options?.find(o => o.key === step.input) || node.options?.[0];
      if (next) node = next;
    }
    setCurrentNode(node);
    setHistory(newHistory);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
  };

  // Build display with option numbers
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

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a0a1a 0%, #111128 50%, #0d1a2a 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "24px 16px",
      fontFamily: "'IBM Plex Mono', monospace",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <ArchPanel visible={showArch} onClose={() => setShowArch(false)} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px", maxWidth: "420px", width: "100%" }}>
        <div style={{
          fontSize: "11px", letterSpacing: "4px", color: "#5a5a8a",
          textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Space Mono', monospace",
        }}>
          Interactive Simulator
        </div>
        <h1 style={{
          fontSize: "28px", fontWeight: 700, margin: "0 0 8px",
          fontFamily: "'Space Mono', monospace",
          background: "linear-gradient(135deg, #00d4aa, #00a4ff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          USSD *123#
        </h1>
        <p style={{ color: "#6a6a9a", fontSize: "13px", margin: 0, lineHeight: "1.5" }}>
          Experience how menu-based mobile services work
        </p>
      </div>

      {/* Phone Frame */}
      <div style={{
        width: "100%", maxWidth: "340px",
        background: "#1a1a2e", borderRadius: "32px",
        border: "2px solid #2a2a4a",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        padding: "16px 12px",
        position: "relative",
      }}>
        {/* Status bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "4px 12px 12px", fontSize: "11px", color: "#6a6a8a",
        }}>
          <span>Telkom SA</span>
          <span style={{ fontSize: "10px" }}>●●●● LTE</span>
        </div>

        {/* Screen */}
        <div ref={screenRef} style={{
          background: "#0d0d1a",
          borderRadius: "16px",
          minHeight: "320px",
          padding: "20px 16px",
          display: "flex", flexDirection: "column",
          border: "1px solid #1a1a3a",
          transition: "opacity 0.3s ease",
          opacity: animating ? 0.6 : 1,
        }}>
          {!sessionActive ? (
            // Idle state — dial prompt
            <div style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "20px",
            }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "linear-gradient(135deg, #00d4aa22, #00a4ff22)",
                border: "2px solid #00d4aa44",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "28px",
              }}>
                📱
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  color: "#e8e8ff", fontSize: "18px", fontWeight: 700,
                  fontFamily: "'Space Mono', monospace", marginBottom: "4px",
                }}>*123#</div>
                <div style={{ color: "#5a5a8a", fontSize: "12px" }}>Tap dial to start a session</div>
              </div>
              <button onClick={startSession} style={{
                padding: "14px 40px", borderRadius: "50px",
                background: "linear-gradient(135deg, #00d4aa, #00a4cc)",
                color: "#0a0a1a", fontWeight: 700, fontSize: "14px",
                border: "none", cursor: "pointer",
                fontFamily: "'Space Mono', monospace",
                boxShadow: "0 4px 20px rgba(0,212,170,0.3)",
                transition: "transform 0.15s ease",
              }}
              onMouseDown={e => e.target.style.transform = "scale(0.95)"}
              onMouseUp={e => e.target.style.transform = "scale(1)"}
              >
                📞 Dial
              </button>
            </div>
          ) : (
            // Active session
            <>
              {/* Session indicator */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: "14px",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontSize: "10px", color: "#00d4aa",
                }}>
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#00d4aa", display: "inline-block",
                    animation: "pulse 2s infinite",
                  }} />
                  SESSION ACTIVE
                </div>
                <button onClick={endSession} style={{
                  fontSize: "10px", color: "#ff5a5a", background: "none",
                  border: "1px solid #ff5a5a33", borderRadius: "6px",
                  padding: "3px 8px", cursor: "pointer",
                  fontFamily: "'IBM Plex Mono', monospace",
                }}>END</button>
              </div>

              {/* USSD Screen Content */}
              <div style={{
                flex: 1, color: "#e0e0f0", fontSize: "13px",
                lineHeight: "1.8", whiteSpace: "pre-wrap",
                letterSpacing: "0.3px",
              }}>
                {buildScreen()}
              </div>

              {/* Input area */}
              <div style={{ marginTop: "16px" }}>
                {currentNode.isInput ? (
                  <div style={{ fontSize: "10px", color: "#5a5a8a", marginBottom: "4px" }}>
                    {currentNode.inputLabel || "Enter value"}:
                  </div>
                ) : null}
                <div onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); navigate(inputValue); } }}
                    placeholder={currentNode.isInput ? "Type here..." : "Enter option..."}
                    style={{
                      flex: 1, padding: "10px 14px",
                      background: "#15152a", border: "1px solid #2a2a4a",
                      borderRadius: "10px", color: "#e8e8ff",
                      fontSize: "14px", outline: "none",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  />
                  <button
                    onClick={() => navigate(inputValue)}
                    style={{
                      padding: "10px 16px",
                      background: "#00d4aa", color: "#0a0a1a",
                      border: "none", borderRadius: "10px",
                      fontWeight: 700, cursor: "pointer",
                      fontFamily: "'Space Mono', monospace", fontSize: "13px",
                    }}
                  >Send</button>
                </div>
                {history.length > 0 && (
                  <button onClick={goBack} style={{
                    marginTop: "8px", width: "100%", padding: "8px",
                    background: "transparent", border: "1px solid #2a2a4a",
                    borderRadius: "8px", color: "#5a5a8a", fontSize: "11px",
                    cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace",
                  }}>← Back</button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Home indicator */}
        <div style={{
          width: "100px", height: "4px", background: "#3a3a5a",
          borderRadius: "2px", margin: "12px auto 4px",
        }} />
      </div>

      {/* Debug Panel */}
      {sessionActive && (
        <div style={{ maxWidth: "340px", width: "100%" }}>
          <DebugPanel history={history} currentNode={currentNode} />
        </div>
      )}

      {/* How it works button */}
      <button onClick={() => setShowArch(true)} style={{
        marginTop: "20px", padding: "10px 24px",
        background: "transparent", border: "1px solid #2a2a4a",
        borderRadius: "10px", color: "#6a6a9a", fontSize: "12px",
        cursor: "pointer", fontFamily: "'Space Mono', monospace",
        transition: "border-color 0.2s",
      }}
      onMouseOver={e => e.target.style.borderColor = "#00d4aa"}
      onMouseOut={e => e.target.style.borderColor = "#2a2a4a"}
      >
        ⚙ How USSD Works
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
