# Debate App Client

This is the Angular frontend client for the Real-Time AI Debate application. It provides a clean interface designed with **Bootstrap 5.3** and **Bootstrap Icons** where users can configure two debaters and a topic, then step through a turn-based speech bubble debate stream.

## Prerequisites

- **NodeJS (v18.0.0+)**
- **npm (v9.0.0+)**

## Setup & Installation

1. Navigate to this directory:
   ```bash
   cd client
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the Angular development server:

```bash
npm run start
```

Once started, open your browser and navigate to `http://localhost:4200/`.

## Key Features

- **Interactive Configuration Form**: Set custom debater names and topic statements.
- **Debate Step Control**: Start the debate, advance to the next turn, or reset the stage.
- **Elegant Chat Simulation**: Alternating left-and-right speech bubbles, animated entries, sleek custom scrollbars, and active "typing..." feedback when the AI is formulating arguments.
- **Manual Turn Execution**: Sends the current debate state to the server once per button press, triggers a single LangGraph step, and renders the returned turn.
