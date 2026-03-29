# 🎨 CollaboDraw

Welcome to **CollaboDraw**! A high-performance, real-time collaborative whiteboard application built for seamless teamwork and brainstorming.

This repository is a **Monorepo** (powered by Turborepo) that houses the complete ecosystem including the frontend client, backend HTTP API, real-time WebSocket server, and shared database packages.

---

## ✨ Key Features

* **Real-Time Sync:** Draw with multiple users simultaneously with near-zero latency.
* **Room-Based Architecture:** Create secure rooms with unique IDs to collaborate with specific people.
* **Persistent Storage:** All drawings and user data are securely stored using Neon Postgres.
* **Scalable Setup:** Built on a monorepo for maximum code reusability and lightning-fast development.

---

## 🛠️ Tech Stack

* **Frontend:** [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
* **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
* **Real-Time:** [WebSockets (ws)](https://github.com/websockets/ws)
* **Database & ORM:** [PostgreSQL (Neon DB)](https://neon.tech/), [Prisma](https://www.prisma.io/)
* **Monorepo Tooling:** [Turborepo](https://turbo.build/), [pnpm](https://pnpm.io/)

---

## 📁 Repository Structure

* `apps/client`: Next.js frontend application.
* `apps/http-server`: HTTP API for auth, room management, and data retrieval.
* `apps/ws-server`: WebSocket server for real-time canvas stroke synchronization.
* `packages/db`: Shared Prisma schema and database client.
* `packages/common`: Shared TypeScript types and configuration.

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have **Node.js** and **pnpm** installed.

### 2. Installation
Clone the repo and install dependencies:
```bash
pnpm install
