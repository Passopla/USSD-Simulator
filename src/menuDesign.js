// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  USSD MENU DESIGN FILE
//  ─────────────────────
//  This is the only file you need to edit to change what the
//  USSD simulator displays. The engine (USSDSimulator.jsx) reads
//  everything from here.
//
//  WHAT YOU CONTROL HERE:
//    • question     — the text shown on screen for this node
//    • key          — the digit the user presses to select this option (1–9, *, #)
//    • label        — the short text shown next to the key in the option list
//    • options[]    — child nodes. Add as many as needed (1 to 9+)
//
//  NODE FLAGS (add to any node as needed):
//    isEnd: true        — terminal screen, no further input expected
//    isInput: true      — user types free text (phone number, amount, etc.)
//    inputLabel: "..."  — label shown above keypad when isInput is true
//
//  IDs are auto-generated from the tree path — do NOT add them here.
//  The engine derives: root → root_1 → root_1_2 → root_1_2_1 etc.
//
//  RULES:
//    • keys must be unique within each options[] array
//    • Use \n for line breaks inside question strings
//    • "0. Main Menu" is appended automatically — don't write it yourself
//    • isInput nodes must have exactly one child in options[]
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const MENU = {

  // ── Root node — first screen after dialling ──────────────────
  question: "Welcome to Telkom Mobile\n\nSelect an option:",
  options: [

    // ── 1: Buy Airtime ──────────────────────────────────────────
    {
      key: "1",
      label: "Buy Airtime",
      question: "Buy Airtime\n\nSelect amount:",
      options: [
        {
          key: "1",
          label: "R5",
          question: "You are about to buy R5 airtime.",
          options: [
            { key: "1", label: "Confirm", question: "R5 airtime purchased.\n\nNew balance: R23.50",  isEnd: true, options: [] },
            { key: "2", label: "Cancel",  question: "Transaction cancelled.", isEnd: true, options: [] },
          ],
        },
        {
          key: "2",
          label: "R10",
          question: "You are about to buy R10 airtime.",
          options: [
            { key: "1", label: "Confirm", question: "R10 airtime purchased.\n\nNew balance: R18.50", isEnd: true, options: [] },
            { key: "2", label: "Cancel",  question: "Transaction cancelled.", isEnd: true, options: [] },
          ],
        },
        {
          key: "3",
          label: "R30",
          question: "You are about to buy R30 airtime.",
          options: [
            { key: "1", label: "Confirm", question: "R30 airtime purchased.\n\nNew balance: -R1.50", isEnd: true, options: [] },
            { key: "2", label: "Cancel",  question: "Transaction cancelled.", isEnd: true, options: [] },
          ],
        },
      ],
    },

    // ── 2: Buy Data Bundles ─────────────────────────────────────
    {
      key: "2",
      label: "Buy Data Bundles",
      question: "Buy Data Bundles\n\nSelect bundle:",
      options: [
        {
          key: "1",
          label: "Daily 100MB - R12",
          question: "Daily Bundle: 100MB for R12\nValid for 24 hours.",
          options: [
            { key: "1", label: "Confirm", question: "100MB Daily bundle activated.\n\nExpires: Tomorrow", isEnd: true, options: [] },
            { key: "2", label: "Cancel",  question: "Transaction cancelled.", isEnd: true, options: [] },
          ],
        },
        {
          key: "2",
          label: "Weekly 500MB - R29",
          question: "Weekly Bundle: 500MB for R29\nValid for 7 days.",
          options: [
            { key: "1", label: "Confirm", question: "500MB Weekly bundle activated.\n\nExpires: 7 days", isEnd: true, options: [] },
            { key: "2", label: "Cancel",  question: "Transaction cancelled.", isEnd: true, options: [] },
          ],
        },
        {
          key: "3",
          label: "Monthly 1GB - R99",
          question: "Monthly Bundle: 1GB for R99\nValid for 30 days.",
          options: [
            { key: "1", label: "Confirm", question: "1GB Monthly bundle activated.\n\nExpires: 30 days", isEnd: true, options: [] },
            { key: "2", label: "Cancel",  question: "Transaction cancelled.", isEnd: true, options: [] },
          ],
        },
      ],
    },

    // ── 3: Check Balance (terminal) ─────────────────────────────
    {
      key: "3",
      label: "Check Balance",
      question: "Your Balance:\n\nAirtime: R28.50\nData: 245MB (expires 15 Apr)\nSMS: 12 remaining",
      isEnd: true,
      options: [],
    },

    // ── 4: Transfer Airtime (free-text input chain) ─────────────
    {
      key: "4",
      label: "Transfer Airtime",
      question: "Transfer Airtime\n\nEnter recipient number:",
      isInput: true,
      inputLabel: "Recipient number",
      options: [
        {
          key: "__input__",
          label: "Enter amount",
          question: "Enter amount to transfer (Rands):",
          isInput: true,
          inputLabel: "Amount (R)",
          options: [
            {
              key: "__input__",
              label: "Confirm transfer",
              question: "Confirm transfer?",
              options: [
                { key: "1", label: "Yes", question: "Transfer successful.", isEnd: true, options: [] },
                { key: "2", label: "No",  question: "Transfer cancelled.",  isEnd: true, options: [] },
              ],
            },
          ],
        },
      ],
    },

    // ── 5: FreeMe Plans ─────────────────────────────────────────
    {
      key: "5",
      label: "FreeMe Plans",
      question: "FreeMe Plans\n\nSelect a plan:",
      options: [
        { key: "1", label: "FreeMe 1GB - R99/mo",    question: "FreeMe 1GB\nR99/month\nIncludes: 1GB data, 50 mins\n\nDial *180# to subscribe",    isEnd: true, options: [] },
        { key: "2", label: "FreeMe 2.5GB - R149/mo", question: "FreeMe 2.5GB\nR149/month\nIncludes: 2.5GB data, 100 mins\n\nDial *180# to subscribe", isEnd: true, options: [] },
        { key: "3", label: "FreeMe 5GB - R249/mo",   question: "FreeMe 5GB\nR249/month\nIncludes: 5GB data, 200 mins\n\nDial *180# to subscribe",    isEnd: true, options: [] },
      ],
    },

    // ── Add more options here ────────────────────────────────────
    // {
    //   key: "6",
    //   label: "Your option label",
    //   question: "Your question text:",
    //   options: [
    //     { key: "1", label: "Choice A", question: "Result A", isEnd: true, options: [] },
    //     { key: "2", label: "Choice B", question: "Result B", isEnd: true, options: [] },
    //   ],
    // },

  ],
};
