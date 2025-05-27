# Solara - Product List Application

This is a monorepo containing a Next.js frontend and Express.js backend application.

## Project Structure

```
.
├── client/          # Next.js frontend application
├── server/          # Express.js backend application
└── package.json     # Root package.json for managing workspaces
```

## Prerequisites

- Node.js (v18 or higher)
- npm (v7 or higher)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development servers:
```bash
npm run dev
```

This will start both the frontend and backend servers concurrently:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend
- `npm run start` - Start both frontend and backend in production mode

## Features

- Frontend built with Next.js and TypeScript
- Backend built with Express.js and TypeScript
- Product listing page with responsive design
- RESTful API endpoint for products 