import React, { useState, useRef, useEffect } from "react";
import "./chat.css";

const BACKEND_BASE = "http://localhost:8000";
const FIXED_CIBIL = 782;

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      role: "agent",
      content:
        "Hello, I am FINAI – Tata Capital’s AI Loan Assistant.\nWelcome to Personal Loans.\nPlease type Hi to begin your loan journey.",
      time: timeNow(),
    },
  ]);

  const [input, setInput] = useState("");
  const [stage, setStage] = useState(0);
  const [pdfUrl, setPdfUrl] = useState(null);

  const [data, setData] = useState({
    language: "English",
    loanAmount: "",
    tenure: "",
    salary: "",
    employment: "Salaried",
    pan: "",
    score: FIXED_CIBIL,
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function timeNow() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const lower = userText.toLowerCase();

    const userMessage = {
      role: "user",
      content: userText,
      time: timeNow(),
    };

    let updated = { ...data };

    // 1) LANGUAGE SELECTION (Stage 1)
    if (stage === 1) {
      if (lower.includes("hindi")) updated.language = "Hindi";
      else if (lower.includes("telugu")) updated.language = "Telugu";
      else updated.language = "English";
    }

    // 2) ELIGIBILITY CHECK INTENT (Flow 1)
    if (
      lower.includes("eligible") &&
      (stage === 0 || stage === 1 || stage === 2)
    ) {
      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          role: "agent",
          content:
            "To check eligibility, please share your expected loan amount and your monthly income.",
          time: timeNow(),
        },
      ]);
      setStage(2);
      setInput("");
      return;
    }

    // 3) USER REQUESTS LOWER EMI OPTIONS (Flow 1 & 3)
    if (
      lower.includes("lower emi") ||
      lower.includes("emi options") ||
      lower.includes("takkuva") ||
      lower.includes("takkuva emi")
    ) {
      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          role: "agent",
          content:
            "Here are some lower EMI options.\n• 24 months → EMI approx ₹11,500\n• 36 months → EMI approx ₹8,200\n• 48 months → EMI approx ₹6,700\nYou may reply with 24 months, 36 months or 48 months.",
          time: timeNow(),
        },
      ]);
      setInput("");
      return;
    }

    // 4) GLOBAL TENURE CAPTURE (Option C)
    // Works for:
    // - "18 months ke liye"
    // - "36 months sahi rahega?"
    // - "24 months"
    const monthsMatch = userText.match(/(\d+)\s*months?/i);
    if (monthsMatch) {
      const chosen = monthsMatch[1];
      updated.tenure = chosen + " months";
    }

    // 5) STAGE-SPECIFIC DATA CAPTURE

    // Stage 2 → Loan amount (and maybe tenure if given here)
    if (stage === 2) {
      const amt = userText.match(/(\d[\d,]*)/);
      if (amt) {
        updated.loanAmount = "₹" + amt[1];
      }
      // (tenure already handled globally above if months mentioned)
    }

    // Stage 3 → Salary + Employment
    if (stage === 3) {
      const sal = userText.match(/(\d[\d,]*)/);
      if (sal) updated.salary = "₹" + sal[1];
      if (lower.includes("self")) updated.employment = "Self-employed";
      else updated.employment = "Salaried";
    }

    // Stage 4 → Only PAN
    if (stage === 4) {
      updated.pan = userText.toUpperCase().trim();
    }

    // 6) GET REPLY BASED ON CURRENT STAGE + UPDATED DATA
    const result = getReply(stage, updated, userText);

    setData(updated);
    setMessages((prev) => [...prev, userMessage, result.reply]);
    setInput("");

    if (result.nextStage !== undefined) setStage(result.nextStage);
    if (result.newPdfUrl) setPdfUrl(result.newPdfUrl);
  };

  const getReply = (currentStage, info, text) => {
    const t = timeNow();
    const lower = text.toLowerCase();

    // UNIVERSAL CLARIFICATIONS (ACTIVE IN ALL FLOWS)
    if (lower.includes("emi")) {
      return {
        reply: {
          role: "agent",
          content:
            "EMI means Equated Monthly Instalment. It is your fixed monthly repayment amount, including principal and interest.",
          time: t,
        },
        nextStage: currentStage,
      };
    }

    if (lower.includes("dpdp")) {
      return {
        reply: {
          role: "agent",
          content:
            "DPDP Act 2023 protects your personal data. FINAI logs your consent and uses your data only for this loan journey.",
          time: t,
        },
        nextStage: currentStage,
      };
    }

    if (lower.includes("cibil")) {
      return {
        reply: {
          role: "agent",
          content:
            "CIBIL score shows your credit history. A score above 750 is considered good. In this demo, your score is fixed at 782.",
          time: t,
        },
        nextStage: currentStage,
      };
    }

    if (lower.includes("processing fee")) {
      return {
        reply: {
          role: "agent",
          content:
            "Processing fee is kept zero in this demo to simplify and speed up your loan journey.",
          time: t,
        },
        nextStage: currentStage,
      };
    }

    // MAIN STAGE FLOW
    switch (currentStage) {
      case 0:
        return {
          reply: {
            role: "agent",
            content:
              "Thank you. Please choose your preferred language: English, Hindi or Other Languages.",
            time: t,
          },
          nextStage: 1,
        };

      case 1: {
        let greet = "We will continue in English.";
        if (info.language === "Hindi") greet = "Hum Hindi mein baat karenge.";
        if (info.language === "Telugu")
          greet = "Manam Telugu lo continue chestham.";

        return {
          reply: {
            role: "agent",
            content:
              greet +
              "\nHow can I help you today? You may say: I want to apply for a personal loan.",
            time: t,
          },
          nextStage: 2,
        };
      }

      // After loan amount — ask for income
      case 2:
        return {
          reply: {
            role: "agent",
            content:
              "Please tell me your monthly income and employment type (salaried or self-employed).",
            time: t,
          },
          nextStage: 3,
        };

      // After income — ask for PAN
      case 3:
        return {
          reply: {
            role: "agent",
            content: "Please enter your PAN number for verification.",
            time: t,
          },
          nextStage: 4,
        };

      // PAN validation + consent + CIBIL + eligibility
case 4: {
  const textRaw = text.trim().toLowerCase();

  // 1) If user selects EMI option here (24/36/48 months)
  const tenureMatch = textRaw.match(/(\d+)\s*months?/);
  if (tenureMatch) {
    const chosen = tenureMatch[1];
    info.tenure = chosen + " months";

    return {
      reply: {
        role: "agent",
        content:
          "Got it. Your tenure is set to " +
          info.tenure +
          ".\nNow please enter your PAN number for verification.",
        time: t,
      },
      nextStage: 4, // stay in PAN stage
    };
  }

  // 2) PAN validation
  const pan = text.toUpperCase().trim();
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

  if (!panRegex.test(pan)) {
    return {
      reply: {
        role: "agent",
        content:
          "The PAN format looks incorrect. Please enter a valid PAN such as ABCDE1234F.",
        time: t,
      },
      nextStage: 4,
    };
  }

  // 3) If PAN is valid
  info.pan = pan;
  const consentId =
    "TC-DPDP-" + Math.floor(10000 + Math.random() * 90000);

  return {
    reply: {
      role: "agent",
      content:
        "PAN verified.\n" +
        "Consent logged: " +
        consentId +
        "\nCIBIL score: " +
        FIXED_CIBIL +
        " (Good)\nYou are eligible for this loan profile.\nWould you like me to generate your sanction letter?",
      time: t,
    },
    nextStage: 5,
  };
}


      // Generate sanction letter
      case 5: {
        if (
          !lower.startsWith("yes") &&
          !lower.startsWith("haan") &&
          !lower.startsWith("avunu")
        ) {
          return {
            reply: {
              role: "agent",
              content:
                "You may ask questions about EMI, CIBIL or DPDP. When you are ready, type Yes to generate your sanction letter.",
              time: t,
            },
            nextStage: 5,
          };
        }

        // Use captured or sensible default values
        const amountNum =
          parseInt((info.loanAmount || "").replace(/[^\d]/g, "")) || 300000;

        const tenureNumRaw = info.tenure
          ? parseInt(info.tenure.replace(/[^\d]/g, ""))
          : NaN;
        const tenureNum = tenureNumRaw || 24; // If user never chose, assume 24 months
        const displayTenure = info.tenure || "24 months (illustrative)";

        // EMI calculation
        const rate = 0.135 / 12;
        const n = tenureNum;

        const emi =
          n && rate
            ? Math.round(
                (amountNum * rate * Math.pow(1 + rate, n)) /
                  (Math.pow(1 + rate, n) - 1)
              )
            : 0;

        const sanctionId = "TC_SANCTION_" + Date.now();
        const nameParam = encodeURIComponent("Customer");

        const url =
          BACKEND_BASE +
          "/generate-sanction?sanction_id=" +
          sanctionId +
          "&name=" +
          nameParam +
          "&amount=" +
          amountNum +
          "&tenure=" +
          tenureNum +
          "&emi=" +
          emi;

        return {
          reply: {
            role: "agent",
            content:
              "Your sanction letter is ready.\nLoan Amount: ₹" +
              amountNum.toLocaleString("en-IN") +
              "\nTenure: " +
              displayTenure +
              "\nInterest Rate: 13.5 percent\nApprox EMI: ₹" +
              emi.toLocaleString("en-IN") +
              "\nProcessing Fee: ₹0\nYou can download your sanction letter using the button below.",
            time: t,
          },
          nextStage: 5,
          newPdfUrl: url,
        };
      }

      default:
        return {
          reply: {
            role: "agent",
            content:
              "I am here to help you with personal loans. You can ask about eligibility, EMI, CIBIL or DPDP.",
            time: t,
          },
          nextStage: currentStage,
        };
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">FINAI Loan Agent</div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.role}`}>
            {msg.role === "agent" && <div className="avatar">AI</div>}
            <div className="bubble">
              {msg.content.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              <div className="time">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {pdfUrl && (
        <div className="download-wrapper">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
          >
            DOWNLOAD SANCTION LETTER
          </a>
        </div>
      )}

      <div className="chat-input">
        <input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="send-btn" onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
}
