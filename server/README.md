# Debate App Server

This is the Python backend for the Real-Time AI Debate application. It uses **FastAPI** to expose a debate endpoint and **LangGraph** with OpenAI's `gpt-4o-mini` model to coordinate turn-based AI debates.

## Prerequisites

- **Python 3.10+**
- **UV** (Python package installer and resolver)

## Installation & Setup

1. **Clone/navigate** to the `server` directory.
2. **Set up environment variables**:
   Create a `.env` file in this directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   ```
3. **Install dependencies**:
   Run the following command to sync your environment and install dependencies:
   ```bash
   uv sync
   ```

## Running the Server

Start the FastAPI application in development mode:

```bash
uv run uvicorn main:app --reload --port 8000
```

The server will be available at `http://localhost:8000`. You can access the interactive API docs at `http://localhost:8000/docs`.

## API Endpoints

### `POST /api/debate`

Executes a single superstep in the debate graph. It receives the entire debate state, invokes the active debater's turn using OpenAI, updates the conversation history, and toggles the active turn to the other debater.

#### Request Body
```json
{
  "debater1": "Socrates",
  "debater2": "Aristotle",
  "subject": "Is technology separating us more than connecting us?",
  "messages": [],
  "current_turn": "debater1"
}
```

#### Response Body
```json
{
  "debater1": "Socrates",
  "debater2": "Aristotle",
  "subject": "Is technology separating us more than connecting us?",
  "messages": [
    {
      "sender": "Socrates",
      "text": "While technology claims to connect us, it often replaces authentic, soulful human interaction with superficial digital echo chambers..."
    }
  ],
  "current_turn": "debater2"
}
```
