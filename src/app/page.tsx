'use client';
import { useState } from 'react';

export default function Home() {
  const [resume, setResume] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume) return alert('Kripya apna resume text dalein!');
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDesc }),
      });
      const data = await res.json();
      setResult(data.analysis || data.error);
    } catch (err) {
      setResult('Kuch gadbad hui, dobara koshish karein.');
    }
    setLoading(false);
  };

  return (
    <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>📄 AI Resume Checker</h1>
      
      <div style={{ marginTop: '20px' }}>
        <label><b>Resume Text Paste Karein:</b></label>
        <textarea
          rows={6}
          style={{ width: '100%', marginTop: '8px', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          placeholder="Paste your resume content here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <label><b>Target Job Description (Optional):</b></label>
        <textarea
          rows={4}
          style={{ width: '100%', marginTop: '8px', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          placeholder="Paste job description here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          marginTop: '20px',
          width: '100%',
          padding: '12px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Analyzing with AI...' : 'Check Resume'}
      </button>

      {result && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', whiteSpace: 'pre-wrap', color: '#111' }}>
          <h3>Review & Feedback:</h3>
          <p>{result}</p>
        </div>
      )}
    </main>
  );
}

