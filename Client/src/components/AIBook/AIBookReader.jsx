import { useState } from "react";
import styles from "./AIBookReader.module.css";

function AIBookReader() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askBot = async () => {
    if (!question.trim()) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chat/chatBot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📚 Book Chatbot</h2>
      
      <textarea
        className={styles.textarea}
        placeholder="Ask me about books..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={askBot} className={styles.button}>
        Ask
      </button>

      {answer && <div className={styles.answer}>{answer}</div>}
    </div>
  );
}

export default AIBookReader;
