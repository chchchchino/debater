# Real-Time AI Debate Web Application

This web application allows two AI debaters to debate a subject in real time. The frontend is built with **Angular** and styled using **Bootstrap**. The backend is built with **Python FastAPI** and orchestrates the turn-based debate using a **LangGraph** workflow powered by OpenAI's `gpt-4o-mini` model.

## Features

- **Dynamic Debaters**: Set the names of any two debaters (e.g., Socrates vs Aristotle, Iron Man vs Batman).
- **Subject Definition**: Type in any topic to debate.
- **Real-Time Interactive Debate**: Watch the debate unfold turn-by-turn with realistic speech bubbles and automatic scrolling.
- **Debate Controls**: Start, pause, resume, or reset the debate at any point.
- **LangGraph Orchestration**: The entire state of the debate is passed back and forth, with the backend running a superstep to toggle speaker turns and generate replies.

---

## Directory Structure

- `client/`: Angular frontend application.
- `server/`: Python FastAPI backend server.

---

## Quick Start

### 1. Run the Backend Server

Navigate to the `server` directory and configure your environment:

```bash
cd server

# Create a .env file and add your OpenAI API Key
echo "OPENAI_API_KEY=your-openai-api-key-here" > .env

# Sync dependencies and start the server using uv
uv sync
uv run uvicorn main:app --reload --port 8000
```

The backend will run on `http://localhost:8000`.

### 2. Run the Frontend Client

Navigate to the `client` directory, install dependencies, and start the development server:

```bash
cd client

# Install npm dependencies (if not done already)
npm install

# Start the Angular development server
npm run start
```

The frontend will be available at `http://localhost:4200`. Open your browser and navigate there to start debating!
