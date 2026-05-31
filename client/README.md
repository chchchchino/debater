# Debate App Client

This is the Angular frontend client for the Real-Time AI Debate application. It provides a highly premium and clean interface designed with **Bootstrap 5.3** and **Bootstrap Icons** where users can configure two debaters and a topic, then watch them clash in a real-time speech bubble debate stream.

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
- **Debate Loop Control**: Start, pause, or reset the debate stage with ease.
- **Elegant Chat Simulation**: Alternating left-and-right speech bubbles, animated entries, sleek custom scrollbars, and active "typing..." feedback when the AI is formulating arguments.
- **Automated Turn Polling**: Submits the debate's entire message log back to the server, triggers a superstep in LangGraph, and waits for a brief, natural delay before starting the next turn.
