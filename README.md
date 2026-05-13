# 🚀 NotecraftZ - Exam Notes AI 

An AI-powered smart study assistant that helps students generate, organize, and access exam notes quickly and efficiently.

---

## ✨ Features

Built to help students survive exams with less panic and more productivity. 🚀

- 📚 AI-Generated Exam Notes  
  Because writing 47 pages manually is a villain origin story.

- 🔍 Smart Topic Search  
  Find notes faster than your teacher finds missing assignments.

- ⚡ Fast & Responsive UI  
  Smooth enough to make your old college portal jealous.

- 📱 Fully Responsive Design  
  Works on laptop, tablet, mobile — basically everywhere except your calculator.

- 🧠 Simplified Study Experience  
  Less confusion, more actual learning.

- 🌙 Modern Clean Interface  
  Minimal design, maximum focus, zero unnecessary chaos.

- 📂 Organized Notes Management  
  No more “final_final_REAL_notes_v2.pdf” situations.

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Backend:** Node.js, Express.js
- **AI Integration:** Gemini API
- **Database:** MongoDB
- **Payments:** Stripe
- **Authentication:** JWT
- **Deployment:** Render

---

## 📸 Preview

Screenshots were supposed to be here.

But too lazy to add screenshots.  
Open the site and see it yourself. 🚀

Trust me bro, it looks clean.

---

## 🌐 Live Demo

[Visit Live Website][(https://notecraftz-ai.onrender.com/)]

---

## ⚙️ Installation

Clone the repository before someone else becomes smarter than you:

```bash
git clone https://github.com/Darksun-Dyuti/Exam-Notes-AI.git
```

Move into the project directory:

```bash
cd Exam-Notes-AI
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 📂 Project Structure

```bash
Exam-Notes-AI/
├── client/ (Vite + React)
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images, icons, etc.
│   │   ├── components/     # UI Components
│   │   │   ├── FinalResult.jsx     # Displays generated notes
│   │   │   ├── Footer.jsx
│   │   │   ├── MermaidSetup.jsx    # Diagram rendering
│   │   │   ├── Navbar.jsx
│   │   │   ├── RechartSetUp.jsx    # Chart rendering
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── TopicForm.jsx       # Input form for generation
│   │   ├── pages/          # Full page views
│   │   │   ├── Auth.jsx            # Login/Register
│   │   │   ├── History.jsx         # Previous notes
│   │   │   ├── Home.jsx            # Dashboard/Landing
│   │   │   ├── Notes.jsx           # Note viewing page
│   │   │   ├── PaymentFailed.jsx
│   │   │   ├── PaymentSuccess.jsx
│   │   │   ├── Pricing.jsx
│   │   │   └── Profile.jsx
│   │   ├── redux/          # State management
│   │   ├── services/       # API calling logic
│   │   ├── utils/          # Helper functions
│   │   ├── App.css
│   │   ├── App.jsx         # Root component/Routes
│   │   ├── index.css       # Global styles
│   │   └── main.jsx        # Entry point
│   ├── .env                # Client environment variables
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/ (Node.js + Express)
│   ├── controllers/        # Request handlers
│   │   ├── auth.controller.js
│   │   ├── credits.controller.js
│   │   ├── generate.controller.js # AI note generation logic
│   │   ├── notes.controller.js
│   │   ├── pdf.controller.js
│   │   └── user.controller.js
│   ├── middleware/         # Auth & validation middleware
│   ├── models/             # Mongoose schemas
│   │   ├── notes.model.js
│   │   └── user.model.js
│   ├── routes/             # API endpoints
│   │   ├── auth.route.js
│   │   ├── credits.route.js
│   │   ├── genrate.route.js
│   │   ├── pdf.route.js
│   │   └── user.route.js
│   ├── services/           # External service logic
│   │   └── gemini.services.js    # Google Gemini AI integration
│   ├── utils/              # Server helpers
│   ├── .env                # Server secrets (DB URI, API Keys)
│   ├── index.js            # Main server entry
│   └── package.json
│
└── .gitignore              # Root git ignore

```

---

## 🎯 Future Improvements (bruh I'm lazy!!!)

The project is still evolving — just like students one night before exams. 📚💀

Planned upgrades coming soon:

- 🧠 AI Quiz Generation  
  Because suffering through self-made questions builds character.

- 📄 PDF Export Support  
  For people who still trust offline notes more than their internet connection.

- 🎙️ Voice-to-Notes Feature  
  Talk casually, get smart notes magically.

- 🤝 Collaborative Notes Sharing  
  Group study... but without that one friend who only says “send notes bro”.

- 🌙 Enhanced Dark Mode UI  
  To protect developer eyes during those legendary 3 AM coding sessions.

- ⚡ More AI Features  
  Because if the AI isn’t slightly overpowered, what’s the point?

---

## 🤝 Contributing

Got skills? Found a bug?  
Have a crazy feature idea at 2 AM?  

Then congratulations — you are officially overqualified to contribute here. 🚀

Fork the repo, cook some clean code, and send a PR.  
No copy-paste warriors please — we respect developers who debug first and cry later. 💀

### Contribution Ritual:

1. Fork the repository 🍴
2. Create your feature branch 🌱
3. Commit your legendary changes ⚡
4. Push like a sigma developer 🚀
5. Open a Pull Request 👑

If your code works on the first try, we might get suspicious.

---

## ⭐ Support

If you like this project, plz bro give it a ⭐ on GitHub!

---

## 💡 Inspiration & Credits

This project started with a simple idea:
“kyu nhi ho rahi padhai?” 💀

A huge amount of learning, debugging, fixing random errors, and late-night coding sessions went into making this project live.

Big thanks to:
- 🙇 YouTube creators for teaching and guiding through concepts
- 🧠 The developer community for saving lives through Stack Overflow
- ☕ My patience (barely survived)

This project was built with curiosity, caffeine, and countless “why is this not working?” moments.

---

## 📜 License

not get one till now 😭

---

Made with ❤️ & Pressure.
