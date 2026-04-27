# Hetal Patil — Portfolio

A modern, dark-themed personal portfolio built with React, Tailwind CSS, and shadcn/ui, featuring a serverless contact form powered by Resend.

## ✨ Features

- Hero with animated code card & live "available" status
- About, Skills, Experience timeline, Featured Projects
- Education & Certifications
- Functional contact form (Vercel Serverless + Resend)
- Fully responsive, dark emerald/teal aesthetic
- Smooth scrolling, entrance animations, and polished micro-interactions

## 🛠️ Tech Stack

- **Frontend:** React 19, Tailwind CSS, shadcn/ui, lucide-react
- **Serverless:** Vercel Functions (Node.js)
- **Email:** [Resend](https://resend.com)

---

## 🚀 Deploy to Vercel (2 minutes)

### 1. Push this code to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/<your-username>/portfolio.git
git branch -M main
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **Root Directory:** select `frontend`
4. Framework Preset: **Create React App** (auto-detected)
5. Leave build/install commands as default (vercel.json handles it)

### 3. Add Environment Variables

In Vercel → Project Settings → Environment Variables, add:

| Variable              | Value                                         |
| --------------------- | --------------------------------------------- |
| `RESEND_API_KEY`      | your Resend API key (`re_...`)                |
| `CONTACT_TO_EMAIL`    | `hetalpatil149@gmail.com`                     |
| `CONTACT_FROM_EMAIL`  | `onboarding@resend.dev` (Resend default)      |
| `REACT_APP_BACKEND_URL` | *(leave empty)* — uses relative `/api`      |

### 4. Click **Deploy** 🎉

Vercel will build the React app and deploy the `/api/contact.js` serverless function automatically.

Your portfolio will be live at `https://<your-project>.vercel.app`.

---

## 🔐 Getting a Resend API Key (free, 1 minute)

1. Sign up at [resend.com](https://resend.com/signup)
2. Dashboard → **API Keys** → **Create API Key**
3. Copy the key (starts with `re_...`) and paste it into Vercel env vars

Free tier: 3,000 emails/month, 100/day — more than enough for a portfolio.

---

## 📝 Customising the Content

All portfolio content is in **`src/mock.js`** — edit `personalInfo`, `stats`, `skills`, `experience`, `projects`, `education`, `certifications`, and `languages` to make it your own.

---

## 🧪 Local Development

```bash
cd frontend
yarn install
yarn start
```

Visit `http://localhost:3000`.

Note: the contact form needs the Vercel dev environment to exercise the serverless function locally. Install Vercel CLI and run:

```bash
npm i -g vercel
vercel dev
```

---

## 📂 Project Structure

```
frontend/
├── api/
│   └── contact.js         # Vercel serverless function for contact form
├── src/
│   ├── components/        # Header, Hero, About, Skills, Projects, etc.
│   ├── pages/
│   │   └── Portfolio.jsx
│   ├── mock.js           # All portfolio data here
│   ├── App.js
│   └── index.css         # Theme + fonts
├── vercel.json           # Vercel build config
└── package.json
```

---

## 📜 License

MIT — feel free to fork and adapt.

---

Built with ❤️ by **Hetal Patil**
