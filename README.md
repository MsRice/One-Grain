## Table of contents

- [Overview](#overview)
  - [Why This Project Matters](#why-this-project-matters)
  - [Core Features](#core-features)
  - [Tech Stack](#tech-stack)
  - [Tools & Libraries](#tools--libraries)
  - [Learned New Skills](#learned-new-skills)
-[Built With](#built-with)
  - [React + Typescript + Vite](#react--typescript--vite)
  - [React Compiler](#react-compiler)
  - [Expanding the ESLint configuration](#expanding-the-eSLint-configuration)
- [Author](#author)


## Overview

🌾 One Grain — Task Manager

One Grain is a clean, modern task management application that demonstrates strong fundamentals in React, TypeScript, and state-driven UI design. The project focuses on simplicity, maintainability, and predictable state updates—core skills for building production-ready frontend applications.

### Why This Project Matters

🚀 Why This Project Matters

This project was built to showcase:

Clear component boundaries

Predictable state management

Intentional design decisions

Clean, readable TypeScript

Scalable architecture patterns

Rather than overloading features, One Grain emphasizes correctness, clarity, and extensibility.

### Core Features

🧩 Core Features

Create, update, and delete tasks

Toggle task completion

Filter tasks by status (All / Active / Completed)

Persistent state (local storage–ready)

Minimal UI focused on usability

### Tech Stack

🛠 Tech Stack

React — functional components & hooks

TypeScript — strict typing for safer state updates

Context API + Reducer — centralized task state

CSS — clean, component-scoped styling

Vite / CRA — modern dev tooling

### Tools & Libraries

🧰 Tools & Libraries

Firebase
Used for authentication and data persistence, enabling secure user-specific task management and a backend-ready architecture.

React Router DOM
Handles client-side routing and layout composition, supporting scalable navigation patterns and protected routes.

React Icons
Provides lightweight, consistent iconography to improve UI clarity without adding design complexity.

## Learned New Skills

🔐 WebAuthn & Passkey Authentication

As part of this project, I explored and implemented **passwordless authentication using WebAuthn passkeys**, extending the application beyond traditional email/password flows.

This work focused on understanding and integrating modern, security-first authentication patterns, including:

- WebAuthn registration and authentication flows (attestation and assertion)
- Public/private key–based authentication using browser authenticators
- Challenge–response validation to prevent replay attacks
- A Node/Express backend to issue challenges and verify credentials
- Firebase-compatible user and credential persistence
- Client-side WebAuthn integration using `@simplewebauthn/browser`

This addition strengthened my understanding of **authentication architecture, security boundaries, and modern identity standards**, while reinforcing the importance of clear separation between client, server, and auth responsibilities in scalable applications.

## Built With
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Author

Patrice(Rice 🍚) Maxwell 
([thegrainofrice.com](https://www.thegrainofrice.com/))
([Linkedin](https://www.linkedin.com/in/patrice-maxwell))
