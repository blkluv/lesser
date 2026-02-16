<div align="center">

# LeaseLens

**AI-powered rental lease analyzer that extracts critical terms, calculates total move-in costs, and identifies risky clauses from uploaded lease documents.**

![Next.js](https://img.shields.io/badge/Next.js-333?style=flat-square) ![API Routes](https://img.shields.io/badge/API%20Routes-333?style=flat-square) ![OpenAI GPT-4](https://img.shields.io/badge/OpenAI%20GPT--4-333?style=flat-square) ![pdf-parse](https://img.shields.io/badge/pdf--parse-333?style=flat-square)
![AI Powered](https://img.shields.io/badge/AI-Powered-blueviolet?style=flat-square)
![Type](https://img.shields.io/badge/Type-Web%20App-blue?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-14%2F14-brightgreen?style=flat-square)

</div>

---

## Problem

Renters sign leases without understanding hidden fees, auto-renewal clauses, or restrictive policies because documents are dense and legalistic.

## Who Is This For?

Apartment hunters and renters reviewing lease agreements who need quick financial clarity and risk assessment.


## Inspiration

This product was inspired by real user discussions and pain points discovered on Reddit communities including r/SideProject, r/startups, r/SaaS, and r/AppIdeas.


## Features

- **Server-side PDF parsing and text extraction from scanned leases**
- **OpenAI API processing to extract rent, deposits, pet policies, and termination clauses**
- **Automated cost calculator showing true first-year expenses with all fees**

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js | Core dependency |
| API Routes | Core dependency |
| OpenAI GPT-4 | Core dependency |
| pdf-parse | Core dependency |
| Kimi K2.5 (NVIDIA) | AI/LLM integration |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/malikmuhammadsaadshafiq-dev/mvp-leaselens.git
cd mvp-leaselens
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### Core Workflows

**1. Server-side PDF parsing and text extraction from scanned leases**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

**2. OpenAI API processing to extract rent, deposits, pet policies, and termination clauses**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

**3. Automated cost calculator showing true first-year expenses with all fees**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

### AI Features

This app uses **Kimi K2.5** via NVIDIA API for intelligent processing.

To use AI features, add your NVIDIA API key:
```bash
# Create .env.local file
echo "NVIDIA_API_KEY=nvapi-your-key" > .env.local
```

Get a free API key at [build.nvidia.com](https://build.nvidia.com)


## Quality Assurance

| Test | Status |
|------|--------|
| Has state management | ✅ Pass |
| Has form/input handling | ✅ Pass |
| Has click handlers (2+) | ✅ Pass |
| Has demo data | ✅ Pass |
| Has loading states | ✅ Pass |
| Has user feedback | ✅ Pass |
| No placeholder text | ✅ Pass |
| Has CRUD operations | ✅ Pass |
| Has empty states | ✅ Pass |
| Has responsive layout | ✅ Pass |
| Has search/filter | ✅ Pass |
| Has tab navigation | ✅ Pass |
| Has data persistence | ✅ Pass |
| No dead links | ✅ Pass |

**Overall Score: 14/14**

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   └── components/       # Reusable UI components
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS config
└── tsconfig.json         # TypeScript config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — use freely for personal and commercial projects.

---

<div align="center">

**Built autonomously by [NeuraFinity MVP Factory](https://github.com/malikmuhammadsaadshafiq-dev/NeuraFinity)** — an AI-powered system that discovers real user needs and ships working software.

</div>
