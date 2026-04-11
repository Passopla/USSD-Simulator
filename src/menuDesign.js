// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  USSD MENU DESIGN FILE
//  ─────────────────────
//  This is the only file you need to edit to change what the
//  USSD simulator displays. The engine (USSDSimulator.jsx) reads
//  everything from here.
//
//  WHAT YOU CONTROL HERE:
//    • question  — the text shown on screen for each node
//    • options   — the numbered choices the user can select
//    • key       — the digit that selects this option (1–9, *, #)
//    • label     — the short text shown next to the key number
//
//  NODE FLAGS (add to any node as needed):
//    isEnd: true       — terminal screen, no further input expected
//    isInput: true     — user types free text (phone number, amount, etc.)
//    inputLabel: "..."  — label shown above keypad when isInput is true
//
//  RULES:
//    • Add as many options as needed — 1 option or 7, the engine handles it
//    • Keys must be unique within a node's options array
//    • Use \n for line breaks inside question strings
//    • "0. Main Menu" is always available — the engine adds it automatically
//      on non-root screens, so you don't need to write it in the question
//    • isInput nodes must have exactly one child in options[] —
//      that child receives the user's typed value
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const MENU = {

  // ── Root node — first screen after dialling ──────────────────
  id: "root",
  question: "Welcome to Telkom Mobile\n\nSelect an option:",
  options: [

    // ── Option 1: Buy Airtime ───────────────────────────────────
    {
      key: "1",
      label: "Buy Airtime",
      id: "buy_airtime",
      question: "Buy Airtime\n\nSelect amount:",
      options: [
        {
          key: "1",
          label: "R5",
          id: "airtime_5",
          question: "You are about to buy R5 airtime.",
          options: [
            {
              key: "1",
              label: "Confirm",
              id: "airtime_5_ok",
              question: "R5 airtime purchased.\n\nNew balance: R23.50",
              isEnd: true,
              options: [],
            },
            {
              key: "2",
              label: "Cancel",
              id: "airtime_5_cancel",
              question: "Transaction cancelled.",
              isEnd: true,
              options: [],
            },
          ],
        },
        {
          key: "2",
          label: "R10",
          id: "airtime_10",
          question: "You are about to buy R10 airtime.",
          options: [
            {
              key: "1",
              label: "Confirm",
              id: "airtime_10_ok",
              question: "R10 airtime purchased.\n\nNew balance: R18.50",
              isEnd: true,
              options: [],
            },
            {
              key: "2",
              label: "Cancel",
              id: "airtime_10_cancel",
              question: "Transaction cancelled.",
              isEnd: true,
              options: [],
            },
          ],
        },
        {
          key: "3",
          label: "R30",
          id: "airtime_30",
          question: "You are about to buy R30 airtime.",
          options: [
            {
              key: "1",
              label: "Confirm",
              id: "airtime_30_ok",
              question: "R30 airtime purchased.\n\nNew balance: -R1.50",
              isEnd: true,
              options: [],
            },
            {
              key: "2",
              label: "Cancel",
              id: "airtime_30_cancel",
              question: "Transaction cancelled.",
              isEnd: true,
              options: [],
            },
          ],
        },
      ],
    },

    // ── Option 2: Buy Data Bundles ──────────────────────────────
    {
      key: "2",
      label: "Buy Data Bundles",
      id: "buy_data",
      question: "Buy Data Bundles\n\nSelect bundle:",
      options: [
        {
          key: "1",
          label: "Daily 100MB - R12",
          id: "data_daily",
          question: "Daily Bundle: 100MB for R12\nValid for 24 hours.",
          options: [
            {
              key: "1",
              label: "Confirm",
              id: "data_daily_ok",
              question: "100MB Daily bundle activated.\n\nExpires: Tomorrow",
              isEnd: true,
              options: [],
            },
            {
              key: "2",
              label: "Cancel",
              id: "data_daily_cancel",
              question: "Transaction cancelled.",
              isEnd: true,
              options: [],
            },
          ],
        },
        {
          key: "2",
          label: "Weekly 500MB - R29",
          id: "data_weekly",
          question: "Weekly Bundle: 500MB for R29\nValid for 7 days.",
          options: [
            {
              key: "1",
              label: "Confirm",
              id: "data_weekly_ok",
              question: "500MB Weekly bundle activated.\n\nExpires: 7 days",
              isEnd: true,
              options: [],
            },
            {
              key: "2",
              label: "Cancel",
              id: "data_weekly_cancel",
              question: "Transaction cancelled.",
              isEnd: true,
              options: [],
            },
          ],
        },
        {
          key: "3",
          label: "Monthly 1GB - R99",
          id: "data_monthly",
          question: "Monthly Bundle: 1GB for R99\nValid for 30 days.",
          options: [
            {
              key: "1",
              label: "Confirm",
              id: "data_monthly_ok",
              question: "1GB Monthly bundle activated.\n\nExpires: 30 days",
              isEnd: true,
              options: [],
            },
            {
              key: "2",
              label: "Cancel",
              id: "data_monthly_cancel",
              question: "Transaction cancelled.",
              isEnd: true,
              options: [],
            },
          ],
        },
      ],
    },

    // ── Option 3: Check Balance (terminal — isEnd) ──────────────
    {
      key: "3",
      label: "Check Balance",
      id: "check_balance",
      question: "Your Balance:\n\nAirtime: R28.50\nData: 245MB (expires 15 Apr)\nSMS: 12 remaining",
      isEnd: true,
      options: [],
    },

    // ── Option 4: Transfer Airtime (free-text input chain) ──────
    {
      key: "4",
      label: "Transfer Airtime",
      id: "transfer_input",
      question: "Transfer Airtime\n\nEnter recipient number:",
      isInput: true,
      inputLabel: "Recipient number",
      options: [
        {
          key: "__input__",
          label: "Enter amount",
          id: "transfer_amount",
          question: "Enter amount to transfer (Rands):",
          isInput: true,
          inputLabel: "Amount (R)",
          options: [
            {
              key: "__input__",
              label: "Confirm transfer",
              id: "transfer_confirm",
              question: "Confirm transfer?",
              options: [
                {
                  key: "1",
                  label: "Yes",
                  id: "transfer_ok",
                  question: "Transfer successful.",
                  isEnd: true,
                  options: [],
                },
                {
                  key: "2",
                  label: "No",
                  id: "transfer_no",
                  question: "Transfer cancelled.",
                  isEnd: true,
                  options: [],
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Option 5: FreeMe Plans ──────────────────────────────────
    {
      key: "5",
      label: "FreeMe Plans",
      id: "freeme",
      question: "FreeMe Plans\n\nSelect a plan:",
      options: [
        {
          key: "1",
          label: "FreeMe 1GB - R99/mo",
          id: "freeme1",
          question: "FreeMe 1GB\nR99/month\nIncludes: 1GB data, 50 mins\n\nDial *180# to subscribe",
          isEnd: true,
          options: [],
        },
        {
          key: "2",
          label: "FreeMe 2.5GB - R149/mo",
          id: "freeme2",
          question: "FreeMe 2.5GB\nR149/month\nIncludes: 2.5GB data, 100 mins\n\nDial *180# to subscribe",
          isEnd: true,
          options: [],
        },
        {
          key: "3",
          label: "FreeMe 5GB - R249/mo",
          id: "freeme3",
          question: "FreeMe 5GB\nR249/month\nIncludes: 5GB data, 200 mins\n\nDial *180# to subscribe",
          isEnd: true,
          options: [],
        },
      ],
    },

    // ── Add more root options here ──────────────────────────────
    // {
    //   key: "6",
    //   label: "Your new option",
    //   id: "new_option",
    //   question: "Your question text here:",
    //   options: [
    //     { key: "1", label: "Choice A", id: "new_a", question: "Result A", isEnd: true, options: [] },
    //     { key: "2", label: "Choice B", id: "new_b", question: "Result B", isEnd: true, options: [] },
    //   ],
    // },

  ],
};
