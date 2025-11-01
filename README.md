<h1 align="center">
  <br />
  <a href="https://github.com/subhraneel2005/secure-agent-workspace">
    <img src="./logo.png" alt="Secure Agent Workspace" width="150" />
  </a>
  <br />
  Secure Agent Workspace
  <br />
</h1>

<h4 align="center">A collaborative AI-powered workspace for students and researchers — interact, summarize, and learn from academic content faster using Vercel AI SDK.</h4>

<p align="center">
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  </a>
  <a href="https://sdk.vercel.ai">
    <img src="https://img.shields.io/badge/Vercel%20AI%20SDK-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel AI SDK" />
  </a>
  <a href="https://react-hook-form.com/">
    <img src="https://img.shields.io/badge/React_Hook_Form-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Hook Form" />
  </a>
  <a href="https://zod.dev/">
    <img src="https://img.shields.io/badge/Zod-2B4A6F?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  </a>
  <a href="https://resend.com/">
    <img src="https://img.shields.io/badge/Resend-6F42C1?style=for-the-badge&logo=mailchimp&logoColor=white" alt="Resend" />
  </a>
  <a href="https://better-auth.com/">
    <img src="https://img.shields.io/badge/BetterAuth-00A6FF?style=for-the-badge" alt="BetterAuth" />
  </a>
  <a href="https://www.prisma.io/">
    <img src="https://img.shields.io/badge/Prisma-2F2F68?style=for-the-badge&logo=prisma" alt="Prisma" />
  </a>
</p>

---

<p align="center">
  <a href="#agents">Agents</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#connect">Connect</a>
</p>

---

### Screenshot
> Add a screenshot or demo GIF here (optional). Place it in `public/` and reference it like `./screenshot.png`.

---

### Agents

- **Web Search Agent** — find and index academic articles and research papers.
- **Chat with PDF Agent** — upload PDFs and have natural-language conversations over their content using vector embeddings + semantic search.
- **Chat with YouTube Lectures Agent** — extract transcripts, embed, and allow chat over lecture videos.
- **Summarizer Agent** — compress long content (papers, transcripts) into concise summaries.
- **Notes Generator Agent** — produce structured, study-ready notes from summaries or selected sections.
- **Flashcards Generator Agent** — convert notes into spaced-repetition flashcards.
- **Save Notes Tool** — export notes to Notion, Google Drive, or local file storage.

> **Note:** For fast and accurate responses the PDF & YouTube agents will use vector embeddings + semantic search (embedding store + nearest-neighbour queries) to retrieve context before calling the LLM.

---

### Tech Stack

- **Next.js** — frontend and server-side rendering  
- **Vercel AI SDK** — agent orchestration & LLM integration  
- **React Hook Form** — form handling & validation  
- **Zod** — schema validation  
- **Resend** — transactional email (OTP / verification)  
- **Better-Auth** — authentication flows  
- **Prisma** — type-safe ORM  
- **PostgreSQL** — database  
- **Vector store (TBD)** — Pinecone / Supabase Vector / self-hosted option

---

### How To Use

```bash
# Clone the repository
git clone https://github.com/subhraneel2005/secure-agent-workspace

# Change directory
cd secure-agent-workspace

# Install dependencies
npm install

# Start dev server
npm run dev