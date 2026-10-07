import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { track, question_title, code_submission, transcript_text, violations_count } = body;

    // Here we would typically use Supabase to save to PostgreSQL
    // And call OpenAI API to evaluate the code + transcript.
    // Simulating evaluation logic:

    const codeLengthScore = Math.min((code_submission.length / 100) * 50, 50);
    const transcriptLengthScore = Math.min((transcript_text.length / 50) * 50, 50);
    const rawScore = Math.round(codeLengthScore + transcriptLengthScore);
    const final_score = Math.max(0, rawScore);

    const integrity_score = Math.max(0, 100 - (violations_count * 15));

    const ai_feedback = `Your code is looking decent. You explained your thought process well. \n\nHowever, you had ${violations_count} focus violations which impacted your integrity score. Keep practicing!`;

    // Simulated Response
    return NextResponse.json({
      success: true,
      final_score,
      integrity_score,
      ai_feedback
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process interview submission' }, { status: 500 });
  }
}
