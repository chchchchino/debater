# Real-Time AI Debate Web Application

This web application allows two AI debaters to debate a subject turn by turn. The repo now includes two frontend clients that share the same backend contract and visual style:

- `client/`: Angular frontend
- `react-client/`: React frontend

Both frontends are styled with **Bootstrap** and talk to the same **Python FastAPI** backend, which orchestrates the debate using a **LangGraph** workflow powered by OpenAI's `gpt-4o-mini` model.

## Features

- **Dynamic Debaters**: Set the names of any two debaters (e.g., Socrates vs Aristotle, Iron Man vs Batman).
- **Subject Definition**: Type in any topic to debate.
- **Interactive Debate**: Watch the debate unfold turn-by-turn with realistic speech bubbles and automatic scrolling.
- **Debate Controls**: Start the debate, advance to the next turn, or reset the arena.
- **LangGraph Orchestration**: The entire state of the debate is passed back and forth, with the backend running a superstep to toggle speaker turns and generate replies.

---

## Directory Structure

- `client/`: Angular frontend application.
- `react-client/`: React frontend application.
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

### 2. Run a Frontend Client

You can use either frontend. Pick the one you want to run:

#### Angular Client

Navigate to the `client` directory, install dependencies, and start the development server:

```bash
cd client

# Install npm dependencies (if not done already)
npm install

# Start the Angular development server
npm run start
```

The Angular frontend will be available at `http://localhost:4200`.

#### React Client

Navigate to the `react-client` directory, install dependencies, and start the development server:

```bash
cd react-client

npm install
npm run start
```

The React frontend will be available at `http://localhost:5173` by default.

Both clients are configured to talk to the backend at `http://localhost:8000` by default.
