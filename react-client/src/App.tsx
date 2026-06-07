import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

type Speaker = 'debater1' | 'debater2';

interface Message {
  sender: string;
  text: string;
}

interface DebateState {
  debater1: string;
  debater2: string;
  subject: string;
  messages: Message[];
  current_turn: Speaker;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

function App() {
  const [debater1, setDebater1] = useState('Socrates');
  const [debater2, setDebater2] = useState('Aristotle');
  const [subject, setSubject] = useState('Is technology separating us more than connecting us?');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTurn, setCurrentTurn] = useState<Speaker>('debater1');
  const [debateStarted, setDebateStarted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const previousMessageCountRef = useRef(0);

  useEffect(() => {
    if (messages.length !== previousMessageCountRef.current) {
      previousMessageCountRef.current = messages.length;
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages]);

  const nextSpeaker = useMemo(
    () => (currentTurn === 'debater1' ? debater1 : debater2),
    [currentTurn, debater1, debater2]
  );

  const resetDebate = () => {
    setMessages([]);
    setCurrentTurn('debater1');
    setDebateStarted(false);
    setErrorMessage('');
    previousMessageCountRef.current = 0;
  };

  const executeNextTurn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isGenerating) {
      return;
    }

    setIsGenerating(true);
    setErrorMessage('');
    setDebateStarted(true);

    const payload: DebateState = {
      debater1,
      debater2,
      subject,
      messages,
      current_turn: currentTurn
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/debate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Debate request failed with status ${response.status}`);
      }

      const nextState = (await response.json()) as DebateState;
      setMessages(nextState.messages);
      setCurrentTurn(nextState.current_turn);
    } catch (error) {
      console.error('Debate API Error:', error);
      setErrorMessage(
        `Could not communicate with the debate server. Please make sure the backend is running at ${API_BASE_URL} and the OpenAI API key is set.`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const isDebater1 = (senderName: string) => senderName.toLowerCase() === debater1.toLowerCase();

  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm border-bottom border-secondary">
        <div className="container py-2">
          <span className="navbar-brand d-flex align-items-center gap-2 fw-bold text-white">
            <i className="bi bi-chat-quote-fill text-warning fs-3" />
            <span>AI Debate Arena</span>
          </span>
        </div>
      </header>

      <main className="container my-4 flex-grow-1">
        {errorMessage ? (
          <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 shadow-sm mb-4" role="alert">
            <i className="bi bi-exclamation-triangle-fill fs-5" />
            <div>{errorMessage}</div>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setErrorMessage('')} />
          </div>
        ) : null}

        <div className="row g-4 h-100">
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-white border-0 pt-4 px-4 pb-2">
                <h5 className="card-title fw-bold text-dark mb-1">Debate Configuration</h5>
                <p className="text-muted small">Establish the parameters for the intellectual clash.</p>
              </div>

              <div className="card-body px-4 pb-4 pt-2">
                <form onSubmit={executeNextTurn}>
                  <div className="mb-3">
                    <label htmlFor="debater1" className="form-label fw-semibold text-secondary small">
                      Debater 1 (PRO / In Favor)
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 text-primary">
                        <i className="bi bi-person-fill" />
                      </span>
                      <input
                        type="text"
                        id="debater1"
                        name="debater1"
                        className="form-control bg-light border-start-0 ps-1 py-2 fw-medium"
                        value={debater1}
                        onChange={(event) => setDebater1(event.target.value)}
                        disabled={debateStarted || isGenerating}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="debater2" className="form-label fw-semibold text-secondary small">
                      Debater 2 (CON / Against)
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 text-success">
                        <i className="bi bi-person-fill" />
                      </span>
                      <input
                        type="text"
                        id="debater2"
                        name="debater2"
                        className="form-control bg-light border-start-0 ps-1 py-2 fw-medium"
                        value={debater2}
                        onChange={(event) => setDebater2(event.target.value)}
                        disabled={debateStarted || isGenerating}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="subject" className="form-label fw-semibold text-secondary small">
                      Subject of Debate
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 text-warning align-items-start pt-2">
                        <i className="bi bi-journal-text" />
                      </span>
                      <textarea
                        id="subject"
                        name="subject"
                        rows={3}
                        className="form-control bg-light border-start-0 ps-1 py-2 fw-medium"
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}
                        disabled={debateStarted || isGenerating}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                      disabled={isGenerating || !debater1.trim() || !debater2.trim() || !subject.trim()}
                    >
                      {!debateStarted ? <i className="bi bi-play-fill fs-4" /> : <i className="bi bi-arrow-right-short fs-4" />}
                      <span>{!debateStarted ? 'Debate' : 'Next'}</span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-lg rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                      onClick={resetDebate}
                      disabled={isGenerating || !debateStarted}
                    >
                      <i className="bi bi-arrow-counterclockwise fs-5" />
                      <span>Reset Arena</span>
                    </button>
                  </div>
                </form>
              </div>

              <div className="card-footer bg-white border-0 px-4 pb-4">
                <hr className="my-3 opacity-10" />
                <div className="d-flex align-items-center gap-2">
                  <span
                    className={`status-dot ${
                      debateStarted && !isGenerating ? 'bg-success' : isGenerating ? 'bg-warning' : 'bg-secondary'
                    }`}
                  />
                  <span className="text-secondary small fw-medium">
                    {isGenerating ? 'Formulating rebuttal...' : debateStarted ? 'Active (click Next to step)' : 'Arena Ready'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 h-100 d-flex flex-column debate-card">
              <div className="card-header bg-white border-bottom border-light py-3 px-4 d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-uppercase text-primary fw-bold tracking-wider small">Live Debate Arena</span>
                  <h5 className="fw-bold text-dark mb-0 mt-1 truncate" title={subject}>
                    {debateStarted ? subject : 'Awaiting Arguments...'}
                  </h5>
                </div>
                <div className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-semibold">
                  Turns: {messages.length}
                </div>
              </div>

              <div ref={scrollContainerRef} className="card-body bg-light p-4 overflow-y-auto flex-grow-1 debate-body">
                {messages.length === 0 ? (
                  <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-5">
                    <div className="bg-white rounded-full p-4 shadow-sm mb-4 border border-light placeholder-icon">
                      <i className="bi bi-chat-left-dots text-primary placeholder-icon-inner" />
                    </div>
                    <h5 className="fw-bold text-dark mb-2">The Stage is Set</h5>
                    <p className="text-muted small" style={{ maxWidth: '340px' }}>
                      Assign names, state a proposition, and click the <strong>Debate</strong> button to kick off the
                      debate, then click <strong>Next</strong> to step through each turn.
                    </p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-4">
                    {messages.map((msg, index) => {
                      const fromDebater1 = isDebater1(msg.sender);
                      return (
                        <div key={`${msg.sender}-${index}-${msg.text.slice(0, 20)}`} className="d-flex flex-column max-w-75">
                          <span
                            className={`small fw-bold text-secondary mb-1 d-block ${
                              fromDebater1 ? 'text-start ps-2' : 'text-end pe-2'
                            }`}
                          >
                            {msg.sender}
                            <span
                              className={`badge rounded-pill fw-semibold ms-1 ${
                                fromDebater1
                                  ? 'bg-primary-subtle text-primary border border-primary-subtle'
                                  : 'bg-success-subtle text-success border border-success-subtle'
                              }`}
                            >
                              {fromDebater1 ? 'PRO' : 'CON'}
                            </span>
                          </span>

                          <div
                            className={`p-3 shadow-sm bubble ${fromDebater1 ? 'bubble-pro' : 'bubble-con'}`}
                            style={{
                              borderRadius: fromDebater1 ? '4px 18px 18px 18px' : '18px 4px 18px 18px'
                            }}
                          >
                            <p className="mb-0 fw-medium leading-relaxed bubble-text">{msg.text}</p>
                          </div>
                        </div>
                      );
                    })}

                    {isGenerating ? (
                      <div
                        className="d-flex flex-column"
                        style={{ maxWidth: '80%', alignSelf: currentTurn === 'debater1' ? 'flex-start' : 'flex-end' }}
                      >
                        <span
                          className={`small fw-bold text-muted mb-1 d-block ${
                            currentTurn === 'debater1' ? 'text-start ps-2' : 'text-end pe-2'
                          }`}
                        >
                          {nextSpeaker} is typing...
                        </span>
                        <div
                          className="p-3 bg-white text-muted shadow-sm border border-light-subtle d-flex align-items-center gap-3 typing-bubble"
                          style={{
                            borderRadius: currentTurn === 'debater1' ? '4px 18px 18px 18px' : '18px 4px 18px 18px'
                          }}
                        >
                          <div className="spinner-grow spinner-grow-sm text-primary" role="status" />
                          <span className="small fw-semibold text-secondary">Formulating rebuttal...</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              <div className="card-footer bg-white border-top border-light py-3 px-4 d-flex justify-content-between align-items-center">
                <span className="small text-secondary fw-semibold">
                  <i className="bi bi-info-circle me-1" />
                  {debateStarted ? 'Debate in progress (click Next to step)' : 'Configure settings to start'}
                </span>
                {debateStarted && !isGenerating ? (
                  <div className="text-primary small fw-bold">
                    <i className="bi bi-arrow-right-short me-1" />
                    Next speaker: {nextSpeaker}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
