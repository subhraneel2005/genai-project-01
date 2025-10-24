# 🧩 Multi-Agent Workflow System

An AI-powered content pipeline that automates **research, content creation, and distribution** across multiple platforms.

---

## 🚀 Flow Overview

1. **🧠 Research Agent** — Searches the web for trending topics, summarizes insights, and generates clean structured reports.
2. **✍️ Social Media Agent** — Uses the research to create engaging posts for LinkedIn and Twitter/X.
3. **📢 Mod Agent** — Distributes the finalized posts to Discord, Telegram, and Gmail newsletters.

---

## 🧠 Research Agent

**Purpose:** Discover and summarize trending topics from the web.  
**Tools:**

- 🔍 **Web Search Tool** — Finds trending or relevant information.
- 🧾 **Summarizer Tool** — Condenses large text or reports into concise summaries.
- 📄 **Report Generator** — Creates structured reports (Markdown or PDF format).

---

## ✍️ Social Media Agent (Twitter/X, LinkedIn)

**Purpose:** Turn research data into social-ready content.  
**Tools:**

- 🏷️ **Title Generator** — Creates catchy titles and hooks.
- ✨ **Main Content Generator** — Writes full posts or threads.
- 📰 **Newsletter Generator** — Expands content into long-form newsletters.
- 🖼️ **Thumbnail/Image Generator** — Designs visuals for posts.
- 💬 **Post Generator** — Formats posts for both LinkedIn and Twitter.

---

## 📢 Mod Agent (Discord, Telegram, Gmail)

**Purpose:** Automate content delivery to communities and subscribers.  
**Tools:**

- 💬 **Discord Tool** — Sends daily posts to Discord groups.
- 📲 **Telegram Tool** — Shares daily posts in Telegram channels.
- ✉️ **Gmail Tool** — Sends newsletters via Gmail.

---

## 🧩 Summary

| Agent              | Purpose                           | Platforms                | Key Tools                                |
| ------------------ | --------------------------------- | ------------------------ | ---------------------------------------- |
| Research Agent     | Find & summarize trends           | Web                      | Web Search, Summarizer, Report Generator |
| Social Media Agent | Write social & newsletter content | Twitter, LinkedIn        | Title, Post, Thumbnail Generators        |
| Mod Agent          | Distribute content                | Discord, Telegram, Gmail | Posting & Newsletter Tools               |

---

### 🛠️ Tech Stack (Suggested)

- **Framework:** Next.js / Node.js
- **AI SDK:** Vercel AI SDK (`@ai-sdk/google`, `@ai-sdk/openai`)
- **Storage:** Supabase / MongoDB
- **Automation:** CRON jobs or serverless triggers

---
