# 🚀 JobFound.ai  
### AI-Powered Job Matching, Resume Parsing & Automated Job Applications

JobFound.ai is an end-to-end AI-powered job automation platform.  
It parses resumes, fetches jobs from multiple platforms, scores them using embeddings, generates custom cover letters, and even emails the top-matching jobs to users.

This project is built using the **T3 Stack**, extended with **LLM pipelines**, **cron jobs**, **job scrapers**, **vector embeddings**, and **full automation workflows**.

---

# 🧰 Tech Stack

### **Framework & Frontend**
- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS v4**
- **Client + Server Components**
- **Next Middleware**

### **Backend**
- **tRPC** (fully type-safe API)
- **Prisma ORM**
- **Supabase** (Auth + DB + Storage)
- **Cron Jobs (via API Routes / Scheduled Workers)**

### **AI / LLM**
- **LangChain** (resume parsing pipeline, job scoring workflows)
- **OpenAI SDK** (LLMs, embeddings)
- **Groq** (ultra-fast inference)
- **Vector Embeddings** (resume/job similarity scoring)
- **Custom AI templates** (emails, cover letters)

### **Job Sources**
- LinkedIn (scraping)
- Jobble
- Remotive

---

# 🌟 Features

### ✅ Smart Resume Parsing  
- Upload PDF resume  
- AI extracts:
  - Experience  
  - Skills  
  - Education  
  - Tech stack  
  - Job titles  
  - Seniority  
  - Achievements  
- Autofills onboarding form automatically  
- Uses **LangChain** for structured JSON extraction

---

### ✅ Unified Job Aggregation Engine  
- Fetch jobs from:
  - LinkedIn (scraped)
  - Jobble API
  - Remotive API  
- Normalize every job into a **standardized format**  
- Store in database via Prisma  
- Provides clean & consistent job cards

---

### ✅ AI Match Score (Embedding Similarity)  
- Resume → embedding  
- Job description → embedding  
- Cosine similarity → **Match Score (0–100)**  
- Filter by top matches / recommended / new jobs  

---

### ✅ AI-Powered Cover Letters  
- One-click generation  
- Uses resume + job description  
- Custom tone + ATS-friendly  
- Fully personalized

---

### ✅ Automated Job Application + Email Sending  
- Email top matching jobs to the user  
- Attach cover letters  
- Fully AI-generated & automated  
- Daily or triggered via user action

---

### ✅ Cron Jobs  
- Fetch new jobs every **6 hours**  
- Delete jobs older than **15 days**  
- Recompute match scores  
- Send daily match emails  

---

# 🧩 Project Architecture (High Level)


                      ┌──────────────────────────┐
                      │        Landing Page       │
                      └──────────────┬───────────┘
                                     │
                  ┌──────────────────┴──────────────────┐
                  │        Auth (Supabase)               │
                  └──────────────────┬──────────────────┘
                                     │
                     Onboarding (Resume Upload)
                                     │
                             LangChain Parser
                                     │
                            Parsed User Profile
                                     │
                               Job Fetcher
        ┌───────────────LinkedIn───────────────┐
        │                 Jooble                 │
        └──────────────Remotive────────────────┘
                                     │
                      Normalization + Storing (Prisma)
                                     │
                   Embeddings (OpenAI/Groq) Engine
                                     │
                           Match Score Ranking
                                     │
                     Dashboard UI (Next.js + tRPC)
                                     │
              Cover Letter Generator + Email Automation

---


---

# ⚙️ Environment Variables

* Connect to Supabase via connection pooling
DATABASE_URL=""

* Direct connection to the database. Used for migrations
DIRECT_URL=""

NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""

* Private (backend only)
SUPABASE_SERVICE_ROLE_KEY=""

* OPENAI_API_KEY=""
OPENAI_API_KEY=""
GROQ_API_KEY=""

JOOBLE_API_KEY=""
APIFY_TOKEN=""

* For sending emails
GMAIL_APP_PASSWORD=""


---

# 🧪 Local Development Setup

```bash
git clone https://github.com/<yourname>/jobfound-ai
cd jobfound-ai

pnpm install

# Generates Prisma Client
npx prisma generate
pnpx prisma generate

# Start dev server
npm run dev
pnpm run dev

---
# 🤝 Contributing

Fork the repo
Create a feature branch
Commit changes
Open a PR
We welcome contributions for:
New job sources
Embedding optimization
AI improvements
UI enhancements

---
# 📜 License
MIT License © 2025 Tarun Chauhan

---
# ⭐ If you like this project
Consider giving the repo a star ⭐ — it helps a lot!