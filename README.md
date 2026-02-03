# CollaboDraw 🎨⚡

> **A high-performance, real-time collaborative whiteboard built for scale.**

**CollaboDraw** is a full-stack monorepo application that enables multiple users to draw, sketch, and brainstorm on a shared canvas in real-time. Completely rebuilt using **Turborepo**, it leverages **WebSockets** for instant communication and **Redis** for state management.

---

## 🚀 Features

- **Real-Time Collaboration**: Instant synchronization of drawing strokes across all connected clients using WebSockets.
- **Monorepo Architecture**: Managed with [Turborepo](https://turbo.build/) for efficient build pipelines and code sharing.
- **Scalable Backend**: Decoupled HTTP and WebSocket services for better load management.
- **Type Safety**: End-to-end TypeScript support with shared validation schemas.
- **Design System**: Modular UI components shared across the application.

---

## 🛠️ Tech Stack

- **Monorepo Tooling**: [Turborepo](https://turbo.build/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Frontend**: Next.js / React (in `apps/client`)
- **Backend**: Node.js, Express, Socket.io
- **Database & Cache**: PostgreSQL, Redis (Dockerized)
- **Validation**: Zod (Shared schemas in `packages/common`)

---

## 📂 Repository Structure

This project follows a structured monorepo pattern:

### **Apps (`/apps`)**
- **`client`**: The frontend application (Next.js) where users interact with the whiteboard.
- **`http-server`**: REST API handling authentication, room management, and persistence.
- **`ws-server`**: Dedicated WebSocket server handling real-time drawing events.

### **Packages (`/packages`)**
- **`common`**: Shared Zod schemas and TypeScript types used by both frontend and backend.
- **`backend-common`**: Shared utilities specific to backend services (e.g., JWT signing).
- **`db`**: Database configuration and Prisma ORM client.
- **`ui`**: Shared React components and design system.
- **`eslint-config`**: Shared linting configurations.
- **`typescript-config`**: Base TypeScript configurations.

---

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js** (v18 or higher)
- **pnpm** (Install via `npm i -g pnpm`)
- **Docker** (For running Redis and Postgres)

### 1. Clone the Repository
```bash
git clone [https://github.com/AkshatG-coder/SyncBoard.git](https://github.com/AkshatG-coder/SyncBoard.git)
cd SyncBoard