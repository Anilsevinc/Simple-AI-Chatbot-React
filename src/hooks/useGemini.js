import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export function useGemini() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendMessage(text) {
    const trimmed = text?.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(trimmed);
      const response = result.response;
      const reply = response.text();

      setMessages((prev) => [...prev, { role: 'model', text: reply }]);
    } catch (err) {
      const errMsg = err.message || 'Bir hata oluştu.';
      setError(errMsg);
      setMessages((prev) => [...prev, { role: 'model', text: `Hata: ${errMsg}` }]);
    } finally {
      setLoading(false);
    }
  }

  return { messages, loading, error, sendMessage };
}
