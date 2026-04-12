// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  OUTLAWS — USSD GAME
//  ────────────────────
//  Inspired by the Outlaws series & Lupe Fiasco's "The Cool"
//
//  WHAT YOU CONTROL HERE:
//    • question     — the text shown on screen for this node
//    • key          — the digit the user presses to select this option
//    • label        — the short text shown next to the key in the option list
//    • options[]    — child nodes
//
//  NODE FLAGS:
//    isEnd: true        — terminal screen
//    isInput: true      — user types free text
//    inputLabel: "..."  — label shown above keypad when isInput is true
//
//  IDs are auto-generated. "0. Main Menu" is appended automatically.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const MENU = {

  // ══════════════════════════════════════════════════════════════
  //  ACT I — THE DEMAND
  // ══════════════════════════════════════════════════════════════
  question: "OUTLAWS\n\nBergville is burning.\nTlali has taken Nolwandle.\nShe is pregnant.\n\nWhat do you do?",
  options: [

    // ────────────────────────────────────────────────────────────
    //  1: RALLY THE BANDITS
    //  Bandile storms Tlali's compound. Defeats him.
    //  But Nyakallo kills Nolwandle while Tlali is in battle.
    // ────────────────────────────────────────────────────────────
    {
      key: "1",
      label: "Rally the bandits",
      question: "You make the calls.\nThe old crew answers.\n\nBergville boys. Armed. Ready.\nNo negotiations. No cattle.\nJust war.",
      options: [
        {
          key: "1",
          label: "Storm at dawn",
          question: "4AM. The compound is quiet.\n\nYour crew moves through the dark.\nTlali's guards are sleeping.\nYou have the element of surprise.",
          options: [
            {
              key: "1",
              label: "Hit them hard",
              question: "Gunfire tears through the silence.\n\nTlali's men scramble.\nYour boys are relentless.\nOne by one, the guards fall.\n\nTlali runs for the back exit.",
              options: [
                {
                  key: "1",
                  label: "Chase Tlali",
                  question: "You chase him through the veld.\n\nHe stumbles. You catch him.\nHe's on his knees.\n\n\"She's inside,\" he says.\n\"Go get her.\"",
                  options: [
                    {
                      key: "1",
                      label: "Go inside",
                      question: "You run back to the compound.\n\nThe door is open.\nThe room is empty.\nBlood on the floor.\n\nNyakallo stands in the corner.\nThe knife is still in her hand.\n\nNolwandle is gone.\n\nWhile you were chasing Tlali,\nNyakallo finished what he started.",
                      isEnd: true,
                      options: [],
                    },
                    {
                      key: "2",
                      label: "Finish Tlali first",
                      question: "You pull the trigger.\n\nTlali drops.\n\nBut when you get back inside...\nNyakallo is gone.\nNolwandle lies on the floor.\n\nShe was dead before\nyou even caught him.\n\nYou won the battle.\nYou lost everything.",
                      isEnd: true,
                      options: [],
                    },
                  ],
                },
                {
                  key: "2",
                  label: "Let him run, find Nolwandle",
                  question: "You ignore Tlali.\nNolwandle first. Always.\n\nYou kick through every door.\nThe last room.\n\nNyakallo is standing over her.\nIt's already done.\n\n\"She knew too much,\" he says.\n\nYou were too late.\nEven when you chose right.",
                  isEnd: true,
                  options: [],
                },
              ],
            },
            {
              key: "2",
              label: "Surround and negotiate",
              question: "You surround the compound.\nMegaphone. Demands.\n\nTlali laughs from inside.\n\"You brought an army\nfor one woman?\"\n\nHours pass. Tension builds.",
              options: [
                {
                  key: "1",
                  label: "Lose patience, breach",
                  question: "Enough talking.\n\nYou breach the gate.\nChaos erupts.\nSmoke. Gunfire. Screaming.\n\nWhen the dust settles,\nyou find her in the back room.\n\nNyakallo got to her\nduring the confusion.\n\nHe's gone. She's gone.\nThe siege gave him cover.",
                  isEnd: true,
                  options: [],
                },
                {
                  key: "2",
                  label: "Wait him out",
                  question: "You wait.\nAll day. Into the night.\n\nAt 2AM a single shot\nechoes from inside.\n\nNyakallo walks out,\nhands raised.\n\n\"It's over,\" he says.\n\"She's at peace now.\"\n\nYou waited too long.\nPatience killed her.",
                  isEnd: true,
                  options: [],
                },
              ],
            },
          ],
        },
        {
          key: "2",
          label: "Storm at night",
          question: "Midnight. No moon.\n\nYour boys cut the fence.\nTwo guards go down silent.\nYou're inside the perimeter.\n\nBut Nyakallo sees you coming.",
          options: [
            {
              key: "1",
              label: "Rush the main building",
              question: "You sprint for the door.\n\nNyakallo is faster.\nHe reaches Nolwandle first.\n\nBy the time you break through,\nit's over.\n\n\"Insurance,\" Nyakallo says.\n\"Tlali's orders.\nIf anyone comes, she dies.\"\n\nBut you know the truth.\nNyakallo wanted this.",
              isEnd: true,
              options: [],
            },
            {
              key: "2",
              label: "Cut the power first",
              question: "You kill the generator.\nTotal darkness.\n\nYour crew has night vision.\nThey don't.\n\nYou clear room after room.\nTlali is captured.\nHis men surrender.\n\nBut the last room...\nNyakallo had a torch.\nAnd a blade.\n\nShe didn't make it\nthrough the blackout.\n\nYou thought of everything\nexcept Nyakallo.",
              isEnd: true,
              options: [],
            },
          ],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────
    //  2: MEET THE DEMAND
    //  Sub-options: go alone, rally bandits, call cops.
    //  All paths lead to the exchange or a standoff.
    //  Nolwandle is shot on the return — long range.
    // ────────────────────────────────────────────────────────────
    {
      key: "2",
      label: "Meet the demand",
      question: "Tlali wants cattle.\nAll of them.\nEvery head you own.\n\nThe mammoth cost of\none woman's life.\n\nHow do you deliver?",
      options: [
        // ── 2.1: Go alone ──
        {
          key: "1",
          label: "Go alone",
          question: "Just you.\nA bakkie full of cattle.\nThe long road to Tlali's territory.\n\nNo backup. No weapons.\nJust a man paying\nfor his wife's life.",
          options: [
            {
              key: "1",
              label: "Offer everything",
              question: "You hand over the cattle.\nEvery last one.\n\nTlali counts them.\nSmiles.\n\n\"A man of his word.\nTake her.\"\n\nNolwandle walks out.\nShe's thin. Shaking.\nBut alive.\n\nYou hold her.\nYou turn for home.",
              options: [
                {
                  key: "1",
                  label: "Drive home",
                  question: "The bakkie rumbles\ndown the dirt road.\n\nNolwandle is next to you.\nHer hand on your arm.\n\nThen the crack.\n\nA single shot.\nLong range.\nThrough the back window.\n\nShe slumps forward.\n\nYou scream.\nYou swerve.\nYou stop.\n\nBut she is already gone.\n\nTlali took the cattle\nAND your wife.\nThe deal was never real.",
                  isEnd: true,
                  options: [],
                },
              ],
            },
            {
              key: "2",
              label: "Try to negotiate fewer",
              question: "\"Half,\" you say.\n\"Half the cattle.\"\n\nTlali doesn't blink.\n\n\"All. Or she dies tonight.\nYou have until sundown.\"\n\nYou have no leverage.\nYou never did.",
              options: [
                {
                  key: "1",
                  label: "Give them all",
                  question: "You give in.\nAll the cattle.\n\nTlali releases her.\n\nThe drive home is quiet.\nNolwandle holds your hand.\n\n3 kilometres from Bergville,\nthe shot comes.\n\nThrough the windscreen.\nShe falls.\n\nYou crash into the ditch.\n\nWhen you crawl out,\nshe's not breathing.\n\nThe sniper was waiting\nthe whole time.",
                  isEnd: true,
                  options: [],
                },
                {
                  key: "2",
                  label: "Walk away",
                  question: "You turn your back.\n\nMaybe he's bluffing.\nMaybe you can come back\nwith a better plan.\n\nYour phone rings at midnight.\n\nIt's Nyakallo.\n\n\"She's gone, Bandile.\nTlali doesn't bluff.\"\n\nYou walked away.\nShe paid the price.",
                  isEnd: true,
                  options: [],
                },
              ],
            },
          ],
        },

        // ── 2.2: Rally bandits ──
        {
          key: "2",
          label: "Rally the bandits",
          question: "You gather the cattle.\nBut you also gather the crew.\n\nDeliver the cattle up front.\nKeep the boys hidden in the hills.\n\nIf anything goes wrong,\nthey move.",
          options: [
            {
              key: "1",
              label: "Make the exchange",
              question: "The exchange happens.\nCattle for Nolwandle.\n\nTlali keeps his word.\nShe walks free.\n\nYou signal the boys to stand down.\n\nThe drive home.\nRelief. Tears. Hope.\n\nThen the rifle crack\nfrom the ridge.\n\nOne shot. Through the cab.\n\nYour boys open fire\non the hillside.\nBut the sniper is gone.\n\nAnd Nolwandle is gone too.\n\nEven with an army behind you,\nyou couldn't stop a bullet.",
              isEnd: true,
              options: [],
            },
            {
              key: "2",
              label: "Double-cross Tlali",
              question: "You hand over the cattle.\nTlali releases Nolwandle.\n\nThen you signal the boys.\n\nThey descend on the compound.\nReclaim the cattle.\nTlali's men scatter.\n\nYou drive away with\nNolwandle AND the herd.\n\nVictory.\n\nFor 4 kilometres.\n\nThe shot comes from nowhere.\nNolwandle. Head down.\nGlass everywhere.\n\nTlali had a backup plan too.\nHe always does.",
              isEnd: true,
              options: [],
            },
          ],
        },

        // ── 2.3: Call the cops ──
        {
          key: "3",
          label: "Call the cops",
          question: "You call SAPS.\nKidnapping. Hostage situation.\n\nThey arrive in numbers.\nArmoured vehicles.\nNegotiators.\n\nBut this is Bergville.\nTlali owns people here.",
          options: [
            {
              key: "1",
              label: "Let the cops handle it",
              question: "The negotiator talks to Tlali.\nHours of back and forth.\n\nTlali agrees to release her\nin exchange for safe passage.\n\nNolwandle walks out.\nThe cops escort her.\n\nEveryone exhales.\n\nThe convoy drives toward town.\n\nA shot from the treeline.\nThrough the police van window.\n\nShe was the safest\nshe'd ever been.\nIt didn't matter.\n\nTlali's sniper was patient.",
              isEnd: true,
              options: [],
            },
            {
              key: "2",
              label: "Cops are corrupt, go alone",
              question: "You see the captain\ntake a call. Step away.\nLaugh.\n\nYou know that laugh.\nTlali's money talks.\n\nYou leave the cops behind.\nGather the cattle yourself.\nDrive to Tlali alone.\n\nThe exchange happens.\nShe walks out.\n\nThe drive home.\nHer head on your shoulder.\n\nThen the crack.\nThe windscreen spiders.\nShe goes still.\n\nNo cops. No crew.\nJust you and a bullet\nthat was always coming.",
              isEnd: true,
              options: [],
            },
          ],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────
    //  3: YOU DIED — THE COOL
    //  Bandile is shot dead in Bergville.
    //  3 days after the funeral, he rises.
    //  Returns as flesh or as ghost.
    //  THE ONLY PATH WHERE NOLWANDLE CAN BE SAVED.
    // ────────────────────────────────────────────────────────────
    {
      key: "3",
      label: "You died",
      question: "You step outside.\n\nThe street is loud.\nSomeone calls your name.\nYou turn.\n\nThe bullet hits before\nyou hear the gun.\n\nBandile Khumalo.\nDead on the pavement.\nBergville doesn't even flinch.\n\n...\n\n3 days after your funeral.\nThe soil cracks.\n\nYour hand breaks through first.",
      options: [
        // ── 3.1: Return as flesh ──
        {
          key: "1",
          label: "Return as flesh",
          question: "You breathe.\n\nLungs full of dirt.\nHeart beating again.\nSkin. Bone. Blood.\n\nYou are alive.\nOr something close to it.\n\nThe streets of Bergville\ndon't know yet.\n\nNolwandle is still\nin Tlali's hands.",
          options: [
            {
              key: "1",
              label: "Rally the crew",
              question: "You walk to Sbu's shack.\n\nHe opens the door.\nHis face goes white.\n\n\"Bandile... we buried you.\nI carried your coffin.\"\n\n\"I know,\" you say.\n\"I need you to carry\nsomething else now.\"\n\nThe crew gathers.\nTerrified. But loyal.\nA dead man's army.",
              options: [
                {
                  key: "1",
                  label: "Storm Tlali's compound",
                  question: "Your crew moves on\nthe compound.\n\nTlali's guards see you first.\nThe man they killed.\nWalking. Breathing.\n\nThey drop their weapons.\nSome run. Some pray.\n\nTlali stands his ground.\n\"You're supposed to be dead.\"\n\n\"I was,\" you say.\n\"Where is my wife?\"",
                  options: [
                    {
                      key: "1",
                      label: "Find Nolwandle",
                      question: "Tlali steps aside.\n\nHe's broken.\nThe dead walking\ntook the fight out of him.\n\nNolwandle is in the back room.\nAlive. Thin. Shaking.\nBut alive.\n\nShe sees you.\n\n\"They told me you were dead.\"\n\n\"I was.\"\n\nShe touches your face.\nWarm. Real.\n\nYou carry her out.\nThe crew clears a path.\n\nNolwandle is saved.\nYou are alive.\n\nBut something followed\nyou out of that grave.\nYou can feel it.\n\nDeath is patient.\nAnd it wants you back.",
                      isEnd: true,
                      options: [],
                    },
                    {
                      key: "2",
                      label: "Kill Tlali first",
                      question: "You raise the gun.\n\nTlali laughs.\n\"You came back from the dead\njust to do this?\"\n\n\"No,\" you say.\n\"I came back for her.\nThis is just extra.\"\n\nThe shot echoes.\nTlali falls.\n\nYou find Nolwandle.\nShe's alive.\nShe's crying.\n\nYou saved her.\nBut the killing\nfollowed you back too.\n\nDeath gave you a second chance.\nYou spent it on revenge\nand rescue.\n\nBoth have a price.",
                      isEnd: true,
                      options: [],
                    },
                  ],
                },
                {
                  key: "2",
                  label: "Ambush the supply run",
                  question: "Your crew intercepts\nTlali's supply truck.\n\nYou take the food.\nThe water. The ammo.\n\nTlali's compound goes dry.\n\nAfter 3 days, he sends word:\n\"Take her. Just stop.\"\n\nNolwandle walks out\ninto the sunlight.\n\nShe sees you.\nThe man who died.\nStanding there.\n\n\"Bandile?\"\n\n\"I'm here.\"\n\nShe collapses into you.\nAlive. Both of you.\n\nBut the crew whispers.\nA man who beat death\nis not a man anymore.\n\nThey'll follow you today.\nBut tomorrow they'll fear you.",
                  isEnd: true,
                  options: [],
                },
              ],
            },
            {
              key: "2",
              label: "Go to Tlali alone",
              question: "No crew. No weapons.\nJust you.\n\nA dead man walking\nthrough Bergville at dawn.\n\nPeople stare.\nSomeone screams.\nA child points.\n\n\"That's the man\nthey buried on Saturday.\"\n\nYou walk straight\nto Tlali's gate.",
              options: [
                {
                  key: "1",
                  label: "Walk in",
                  question: "The guards freeze.\n\nYou walk past them.\nThrough the yard.\nUp the steps.\n\nTlali is eating breakfast.\n\nHe looks up.\nThe fork drops.\n\n\"How?\"\n\n\"Give me my wife.\"\n\nTlali's hands shake.\nHe's seen death before.\nBut never like this.\nNever walking. Never talking.\n\n\"Take her. Take her\nand leave.\"\n\nNolwandle is in the next room.\nAlive.\n\nYou walk out together.\nNo shots fired.\nNo blood.\n\nJust the quiet terror\nof a dead man\nwho refused to stay dead.\n\nShe holds your hand.\nIt's warm.\nFor now.",
                  isEnd: true,
                  options: [],
                },
                {
                  key: "2",
                  label: "Demand a meeting",
                  question: "You stand at the gate.\n\n\"Tell Tlali the dead\nwant to talk.\"\n\nMinutes pass.\n\nTlali comes out.\nPistol in hand.\nBut his eyes are wide.\n\n\"What are you?\"\n\n\"A husband.\nGive her back.\"\n\nHe raises the gun.\nHis hand shakes.\n\nHe fires.\nThe bullet hits your chest.\n\nYou don't fall.\n\nYou look down.\nBlood. But no pain.\n\nTlali drops the gun.\n\n\"Take her.\nTake her and go.\nDon't ever come back.\"\n\nNolwandle.\nAlive.\n\nBut that bullet hole\nin your chest\nnever closes.\n\nSome doors, once opened,\ndon't shut.",
                  isEnd: true,
                  options: [],
                },
              ],
            },
          ],
        },

        // ── 3.2: Return as ghost ──
        {
          key: "2",
          label: "Return as ghost",
          question: "You rise.\n\nBut not in flesh.\n\nYou are cold air.\nA shadow without a body.\nA whisper in Bergville.\n\nThe living can't see you.\nBut they can feel you.\n\nNolwandle is still captive.\nYou have no hands\nto hold a gun.\nNo voice to negotiate.\n\nBut you have something else.\n\nWhat will you do?",
          options: [
            // ── Haunt Tlali ──
            {
              key: "1",
              label: "Haunt Tlali",
              question: "You follow Tlali.\n\nInto his bedroom.\nInto his dreams.\n\nYou whisper his sins\nback to him\nwhile he sleeps.\n\nHis mother's voice.\nHis dead brother's face.\nYour face.\n\nEvery night.\nLouder.",
              options: [
                {
                  key: "1",
                  label: "Break his mind slowly",
                  question: "One week.\n\nTlali stops eating.\nTwo weeks.\nHe stops sleeping.\nThree weeks.\nHe talks to walls.\n\nHis men whisper.\n\"The boss is losing it.\"\n\nA month in,\nTlali opens every door\nin the compound.\n\nNolwandle.\nDisebo.\nAll the hostages.\n\n\"Go,\" he says.\n\"Before HE comes back.\"\n\nThey walk out.\nFree.\n\nNolwandle looks back.\nShe feels something\nin the cold morning air.\n\nSomething familiar.\nSomething warm\nin all that cold.\n\nShe whispers your name.\n\nYou can't answer.\nBut she knows.",
                  isEnd: true,
                  options: [],
                },
                {
                  key: "2",
                  label: "Terrorise him tonight",
                  question: "No patience.\nYou hit hard.\n\nYou slam every door\nin the compound.\nKill the lights.\nScream without a mouth.\n\nTlali shoots into the dark.\nHis men panic.\nBullets everywhere.\n\nIn the chaos,\nNolwandle runs.\n\nShe makes it to the fence.\nThrough the wire.\nInto the veld.\n\nShe's cut. Bleeding.\nBut running.\n\nYou guide her.\nA cold hand\non her shoulder.\nTurning her left\nwhen she'd go right.\n\nShe makes it to the road.\nA passing truck stops.\n\nShe's safe.\n\nYou watch the taillights\ndisappear toward Bergville.\n\nYou saved her.\nBut you can never\nride in that truck.\n\nThe living go home.\nThe dead stay.",
                  isEnd: true,
                  options: [],
                },
              ],
            },

            // ── Possess an ally ──
            {
              key: "2",
              label: "Possess an ally",
              question: "Sbu.\n\nYour closest friend.\nThe one who cried hardest\nat your funeral.\n\nYou enter him\nlike smoke through a window.\n\nHis eyes change.\nHis voice deepens.\n\nHe is you now.\nOr you are him.\nThe line is thin.",
              options: [
                {
                  key: "1",
                  label: "Use Sbu to rescue her",
                  question: "Sbu's body. Your will.\n\nYou drive to Tlali's compound.\nSbu's hands on the wheel.\nYour mind behind his eyes.\n\nYou walk in.\nTlali recognises Sbu.\n\"What do you want?\"\n\nBut it's your words\nthat come out of Sbu's mouth.\n\nYour fury.\nYour love.\nYour desperation.\n\nTlali sees something\nbehind Sbu's eyes\nthat isn't Sbu.\n\nHe lets Nolwandle go.\n\nOn the drive home,\nyou release Sbu.\n\nHe blinks.\nLooks around.\n\"What happened?\nWhy is Nolwandle here?\"\n\nHe doesn't remember.\n\nBut he'll never\nfeel quite like himself again.\n\nYou saved her.\nBut you broke your friend\nto do it.",
                  isEnd: true,
                  options: [],
                },
                {
                  key: "2",
                  label: "Fight Tlali through Sbu",
                  question: "Sbu's body.\nYour rage.\n\nYou march into\nTlali's compound.\nFists first.\n\nSbu was never a fighter.\nBut you are.\nAnd Sbu's body does\nwhat you tell it.\n\nYou beat Tlali's guards.\nYou beat Tlali.\n\nBut Sbu's body\nwasn't built for this.\n\nBroken ribs.\nShattered hand.\nInternal bleeding.\n\nYou find Nolwandle.\nYou carry her out.\nIn Sbu's arms.\n\nOutside, you let go.\n\nSbu collapses.\n\nNolwandle is free.\nSbu is in a hospital bed.\n\nHe might not walk again.\n\nYou traded one life\nfor another.\nThe arithmetic of ghosts.",
                  isEnd: true,
                  options: [],
                },
              ],
            },

            // ── Visit Nolwandle ──
            {
              key: "3",
              label: "Visit Nolwandle",
              question: "You find her.\n\nA dark room\nin Tlali's compound.\nHands tied.\nFace swollen.\n\nShe's praying.\nSaying your name.\n\nYou sit beside her.\nCold air on warm skin.\n\nShe stops praying.\n\n\"Bandile?\"\n\nShe can feel you.",
              options: [
                {
                  key: "1",
                  label: "Give her strength",
                  question: "You can't hold her.\nBut you can press\nagainst her like wind.\n\nShe closes her eyes.\nTears fall.\n\n\"I know you're here.\"\n\nSomething changes in her.\nThe fear leaves.\n\nThat night,\nwhen the guard falls asleep,\nshe unties herself.\n\nYour cold hands\nguide hers.\n\nShe moves through\nthe compound like smoke.\nLike you taught her.\n\nThrough the fence.\nAcross the veld.\nHome.\n\nNolwandle saves herself.\n\nBut she'll set\nan extra plate at dinner\nfor the rest of her life.\n\nFor the husband\nwho came back\njust long enough\nto say goodbye.",
                  isEnd: true,
                  options: [],
                },
                {
                  key: "2",
                  label: "Try to untie her",
                  question: "Your hands pass\nthrough the rope.\n\nAgain.\nAgain.\n\nYou scream without sound.\n\nShe feels the cold.\n\"Bandile, please.\"\n\nYou try harder.\nYou focus everything\nyou have left.\n\nThe rope shifts.\nBarely. A centimetre.\n\nBut enough.\nShe works the rest.\n\nShe runs.\nYou follow.\nEvery door that could\ncreak shut stays open.\nEvery guard that could\nwake stays asleep.\n\nYou spend everything\nyou have.\n\nShe reaches the road.\nShe's free.\n\nBut when she turns\nto feel for you,\nthere's nothing.\n\nYou gave every\nlast piece of yourself\nto open those doors.\n\nThe cold is gone.\nJust the warm night air.\n\nBandile is finally gone.\nBut Nolwandle is alive.\n\nSome things are\nworth disappearing for.",
                  isEnd: true,
                  options: [],
                },
              ],
            },
          ],
        },
      ],
    },

  ],
};
