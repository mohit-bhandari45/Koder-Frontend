# Koder-Frontend

A modern, cloud-based code editor and coding challenge platform built with [Next.js](https://nextjs.org), supporting 15+ programming languages, instant code execution, and a curated library of coding problems. No setup required—start coding instantly in your browser.

**Live Demo:** [https://koder-frontend.vercel.app/](https://koder-frontend.vercel.app/)


![alt text](/public/image.png)

---

## Features

- **Multi-language Support:** Write and execute code in 15+ languages including JavaScript, Python, Java, C++, TypeScript, Go, Rust, and more.
- **Instant Execution:** Fast, secure cloud-based code execution. No login required for basic usage.
- **Coding Challenges:** Practice with curated problems from beginner to advanced. Track progress and save solutions with an account.
- **Solution Library:** Access a growing library of community solutions and explanations.
- **User Profiles:** Showcase your skills, solved problems, and language stats.
- **Responsive UI:** Built with Tailwind CSS and optimized for all devices.
- **Theming:** Light and dark mode support.
- **Progress Indicators:** Smooth loading and execution feedback.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/Koder-Frontend.git
cd Koder-Frontend
```

Install dependencies:

```bash
npm install
# or
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```
.
├── app/                # Next.js app directory (pages, layouts, routing)
├── components/         # Reusable UI components
│   └── landingpage/    # Landing page feature components
├── config/             # Configuration files
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── public/             # Static assets (images, favicon, etc.)
├── templates/          # Default data and templates
├── themes/             # Theme configuration
├── types/              # TypeScript types
├── utils/              # Utility functions
├── wrappers/           # Higher-order components and wrappers
├── app/globals.css     # Global styles (Tailwind, PrimeReact, etc.)
├── next.config.ts      # Next.js configuration
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

---

## Technologies Used

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [PrimeReact](https://primereact.org/)
- **Fonts:** [Geist](https://vercel.com/font)
- **Type Checking:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** React Context API
- **Deployment:** [Vercel](https://vercel.com/)

---

## Scripts

- `dev` – Start the development server
- `build` – Build for production
- `start` – Start the production server
- `lint` – Run ESLint

---

## Contributing

Contributions are welcome! Please open issues and pull requests for new features, bug fixes, or improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## License

[MIT](LICENSE)

---

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PrimeReact](https://primereact.org/)
- [Geist Font](https://vercel.com/font)

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.