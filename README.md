🎨 CollaboDraw
Welcome to CollaboDraw! A high-performance, real-time collaborative whiteboard application built for seamless teamwork and brainstorming.

This repository is structured as a Monorepo (powered by Turborepo). It efficiently houses our frontend client, backend HTTP API, real-time WebSocket server, and shared database packages all under one unified workspace.

✨ Key Features
Real-Time Collaboration: Draw and interact with multiple users simultaneously with near-zero latency.

Room Management: Easily create, share, and join secure drawing rooms.

Scalable Architecture: Built on a monorepo setup for maximum code reusability and isolated deployments.

Cloud Database: Reliable and fast data storage using Neon serverless Postgres.

🛠️ Tech Stack
Frontend: Next.js, React, Tailwind CSS, Canvas API

Backend: Node.js, Express.js

Real-Time: WebSockets (ws)

Database & ORM: PostgreSQL (Neon DB), Prisma

Tooling: Turborepo, TypeScript, pnpm

📁 Repository Structure
apps/client: The Next.js frontend application.

apps/http-server: Node.js REST API for authentication and room management.

apps/ws-server: Real-time WebSocket server for syncing canvas strokes.

packages/db: Shared Prisma database schema and client.

packages/common: Shared TypeScript configurations and utilities.
