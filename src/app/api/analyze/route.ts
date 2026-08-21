import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { resume, jobDesc } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Groq API Key set nahi hai!' }, { status: 500 });
    }

    const prompt = `Aap ek expert ATS aur Resume Reviewer ho. Is resume ko review karo aur actionable suggestions do.
    
Resume:
${resume}

${jobDesc ? `Target Job Description:\n${jobDesc}` : ''}

Format:
1. Overall Score (/100)
2. ATS Optimization Tips
3. Key Strengths
4. Weaknesses & Missing Keywords
5. Line-by-Line Improvement Suggestions`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || 'Analysis fetch karne me problem aayi.';

    return NextResponse.json({ analysis });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error: ' + error.message }, { status: 500 });
  }
}
