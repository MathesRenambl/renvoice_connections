# 📞 Renvoice AI - AI Agents with Telephonic Interface & Agentic Workflows

Renvoice AI is a Next.js application for building and deploying AI agents powered by telephonic interactions and advanced agentic workflows. The project provides a comprehensive platform for creating, configuring, and monitoring AI agents that can interact with users via phone calls.

## ✨ Features

### 1. 📱 AI Agents via Telephonic Interface  
Enable users to create and configure AI agents that interact via phone numbers with various built-in roles and utilities.

#### Examples of Telephonic Agents:
- 📅 Appointment Booking Bot  
- 💬 Conversational AI with RAG  
- 👩‍💼 Personal Assistant  
- 🧑‍🤝‍🧑 AI Friend  
- 📰 News Summarizer  
- ❓ GK Question Bot  
- 🧑‍🏫 English Speaking Tutor  
- ➕ Custom User-Defined Agent

### 2. ⚙️ Agentic Workflow Editor  
A visual editor for building logic and behavior of agents using node-based flows (like n8n or React Flow).

### 3. 📊 Analytics Dashboard  
Track and monitor your AI agents' performance and engagement through interactive visualizations.

## 🖥️ Screens & Pages

| Page              | Description                                                  |
|-------------------|--------------------------------------------------------------|
| 🚀 Landing Page    | Overview of product with animations and CTA                 |
| 📝 Waitlist Page   | Early access email collector with form                      |
| 🔐 Login Page      | Secure login via email/password or phone OTP                |
| 📋 Agent List Page | View all created agents with edit/test/delete options       |
| 🧠 Agent Editor    | Create/update agent details and config                      |
| 🔄 Workflow Editor | Drag & drop agentic flow builder per agent                  |
| 📊 Analytics Page  | Dashboard with usage metrics and engagement insights        |

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router)
- **UI**: TailwindCSS + ShadCN UI + Lucide Icons  
- **Animations**: Framer Motion  
- **Workflow Editor**: React Flow  
- **Charts**: Recharts  

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   ├── (dashboard)/
│   │   ├── agents/
│   │   ├── workflow/
│   │   └── analytics/
│   └── (landing)/
│       └── waitlist/
├── components/
│   ├── ui/
│   ├── agents/
│   ├── workflow/
│   └── analytics/
└── lib/
    └── utils/
```

## 🧭 Future Additions

- Voice activity detection for call context tracking  
- Live chat preview for AI agent behavior  
- Analytics dashboard enhancements (export, filters)  
- Public agent sharing and clone functionality  
- Team access for managing agents
