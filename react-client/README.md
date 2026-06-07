# Debate App React Client

This is a React frontend for the Real-Time AI Debate application. It mirrors the existing client experience with the same two-panel debate arena, turn-by-turn controls, and live speech-bubble stream while using React and Vite.

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

1. Open this directory:
   ```bash
   cd react-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Run the App

Start the local dev server:

```bash
npm run start
```

The React client will be available at `http://localhost:5173/` by default.

## Backend Connection

The app posts debate turns to `http://localhost:8000/api/debate` by default. To point it at another backend, set `VITE_API_BASE_URL` in a local `.env` file.

## Features

- Two debater configuration panel
- Subject/topic entry
- Start, next-turn, and reset controls
- Live debate transcript with animated speech bubbles
- Auto-scrolling conversation pane
