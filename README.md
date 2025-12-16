# FINAI – Agentic AI Loan Sales Assistant (Tata Capital | EY Techathon)

FINAI is an Agentic AI–powered web chatbot that simulates an end-to-end personal loan sales journey for a large NBFC like Tata Capital.  
It mimics a human loan sales executive by orchestrating multiple specialized AI agents to guide customers from first interaction to sanction letter generation.

This project is built as part of **EY Techathon – Challenge II (BFSI)**.

---

## 🚀 Problem Statement

Personal loan sales through digital channels suffer from low conversion rates, fragmented verification steps, and delayed approvals.  
NBFCs require a conversational, human-like digital assistant that can engage customers, verify eligibility, evaluate credit risk, and generate sanction letters within a single seamless journey.

---

## 💡 Solution Overview

FINAI introduces an **Agentic AI architecture** where a **Master Agent** coordinates multiple **Worker Agents** to complete the entire loan sales lifecycle inside a chat interface.

The solution:
- Engages customers conversationally
- Captures intent dynamically
- Performs eligibility checks instantly
- Handles KYC, underwriting, and sanction generation automatically

---

## 🧠 Agentic AI Architecture

### Master Agent (Orchestrator)
- Controls the conversation flow
- Understands customer intent
- Decides which Worker Agent to activate
- Ensures smooth stage transitions

### Worker Agents
- **Sales Agent**  
  Gathers loan requirements, explains EMI options, tenure choices, and interest rates
- **Verification Agent**  
  Validates PAN and logs DPDP consent using mock CRM data
- **Underwriting Agent**  
  Fetches mock CIBIL score, applies eligibility rules, and decides approval or rejection
- **Sanction Letter Generator**  
  Generates a professional PDF sanction letter upon successful approval

---

## 🔄 End-to-End Customer Journey

1. Customer lands on web chatbot
2. Language preference detected (English / Hinglish / Tenglish)
3. Loan intent and requirements captured
4. EMI options (24 / 36 / 48 months) suggested
5. PAN verification and DPDP consent logged
6. Credit evaluation using mock CIBIL score
7. Eligibility decision made
8. Digital sanction letter generated and downloadable

---

## 🖥️ Working Prototype

FINAI is implemented as a **web-based chatbot** with:
- Mobile-first UI (Salesforce-style chat)
- Real-time conversational flow
- Dynamic agent routing
- Instant sanction letter PDF download

The prototype demonstrates **realistic BFSI behavior** rather than a static chatbot.

---

## 🧪 Demo Scenarios Covered

- Eligibility check before applying
- EMI comparison and tenure selection
- Multilingual conversations
- PAN validation failure and retry
- Credit score explanation
- Instant approval and sanction letter generation

---

## 🛠️ Technology Stack

### Frontend
- React.js
- Custom chat UI (mobile-style)

### Backend
- FastAPI (Python)
- PDF generation using ReportLab

### AI & Logic
- Agentic AI orchestration (rule-based simulation)
- Mock CRM & Credit Bureau APIs

---

## 📊 Business Impact

- Faster loan conversion
- Reduced drop-offs
- Zero human intervention for standard cases
- Scalable digital sales channel
- Improved customer experience

---

## 📁 Repository Structure

# FINAI – Agentic AI Loan Sales Assistant (Tata Capital | EY Techathon)

FINAI is an Agentic AI–powered web chatbot that simulates an end-to-end personal loan sales journey for a large NBFC like Tata Capital.  
It mimics a human loan sales executive by orchestrating multiple specialized AI agents to guide customers from first interaction to sanction letter generation.

This project is built as part of **EY Techathon – Challenge II (BFSI)**.

---

## 🚀 Problem Statement

Personal loan sales through digital channels suffer from low conversion rates, fragmented verification steps, and delayed approvals.  
NBFCs require a conversational, human-like digital assistant that can engage customers, verify eligibility, evaluate credit risk, and generate sanction letters within a single seamless journey.

---

## 💡 Solution Overview

FINAI introduces an **Agentic AI architecture** where a **Master Agent** coordinates multiple **Worker Agents** to complete the entire loan sales lifecycle inside a chat interface.

The solution:
- Engages customers conversationally
- Captures intent dynamically
- Performs eligibility checks instantly
- Handles KYC, underwriting, and sanction generation automatically

---

## 🧠 Agentic AI Architecture

### Master Agent (Orchestrator)
- Controls the conversation flow
- Understands customer intent
- Decides which Worker Agent to activate
- Ensures smooth stage transitions

### Worker Agents
- **Sales Agent**  
  Gathers loan requirements, explains EMI options, tenure choices, and interest rates
- **Verification Agent**  
  Validates PAN and logs DPDP consent using mock CRM data
- **Underwriting Agent**  
  Fetches mock CIBIL score, applies eligibility rules, and decides approval or rejection
- **Sanction Letter Generator**  
  Generates a professional PDF sanction letter upon successful approval

---

## 🔄 End-to-End Customer Journey

1. Customer lands on web chatbot
2. Language preference detected (English / Hinglish / Tenglish)
3. Loan intent and requirements captured
4. EMI options (24 / 36 / 48 months) suggested
5. PAN verification and DPDP consent logged
6. Credit evaluation using mock CIBIL score
7. Eligibility decision made
8. Digital sanction letter generated and downloadable

---

## 🖥️ Working Prototype

FINAI is implemented as a **web-based chatbot** with:
- Mobile-first UI (Salesforce-style chat)
- Real-time conversational flow
- Dynamic agent routing
- Instant sanction letter PDF download

The prototype demonstrates **realistic BFSI behavior** rather than a static chatbot.

---

## 🧪 Demo Scenarios Covered

- Eligibility check before applying
- EMI comparison and tenure selection
- Multilingual conversations
- PAN validation failure and retry
- Credit score explanation
- Instant approval and sanction letter generation

---

## 🛠️ Technology Stack

### Frontend
- React.js
- Custom chat UI (mobile-style)

### Backend
- FastAPI (Python)
- PDF generation using ReportLab

### AI & Logic
- Agentic AI orchestration (rule-based simulation)
- Mock CRM & Credit Bureau APIs

---

## 📊 Business Impact

- Faster loan conversion
- Reduced drop-offs
- Zero human intervention for standard cases
- Scalable digital sales channel
- Improved customer experience

---

## 📁 Repository Structure

FINAI-Agentic-AI/
│
├── finai-backend/
│ ├── main.py
│ ├── generated_pdfs/
│ └── requirements.txt
│
├── src/
│ ├── components/
│ ├── App.jsx
│ └── ChatWindow.jsx
│
├── public/
├── README.md
└── package.json


---

## 🎥 Demo Video

Demo video showcasing:
- Agentic conversation flow
- EMI comparison
- PAN verification
- Sanction letter generation

(Linked in PPT submission)

---

## 🔗 Submission Links

- **Code Repository:**  
  https://github.com/FinAILoanAgent/FINAI-Agentic-AI

- **Demo Video:**  
  (Shared in final PPT)

---

## 🔮 Future Enhancements

- Live CRM integration
- Document upload for salary slips
- Risk-based dynamic pricing
- Analytics dashboard for loan funnel
- Voice-enabled conversational agent

---

## 🏁 Conclusion

FINAI demonstrates how Agentic AI can transform personal loan sales by combining conversational intelligence, compliance, and automation into a single seamless customer journey.

Built for scale. Designed for BFSI. Ready for real-world deployment.
