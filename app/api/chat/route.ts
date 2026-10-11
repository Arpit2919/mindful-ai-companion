import { StreamingTextResponse } from "ai";
import { HfInference } from "@huggingface/inference";

// Emotion detection keywords
const emotionKeywords = {
  crisis: [
    "suicide",
    "kill myself",
    "end my life",
    "want to die",
    "hurt myself",
    "self-harm",
    "no reason to live",
  ],
  depressed: [
    "depressed",
    "hopeless",
    "worthless",
    "empty",
    "numb",
    "no energy",
    "can't get out of bed",
  ],
  anxious: [
    "anxious",
    "panic",
    "worried",
    "nervous",
    "overwhelmed",
    "racing thoughts",
    "can't breathe",
  ],
  stressed: [
    "stressed",
    "pressure",
    "too much",
    "exhausted",
    "burned out",
    "can't cope",
  ],
  sad: ["sad", "crying", "upset", "disappointed", "lonely", "heartbroken"],
  calm: ["calm", "peaceful", "relaxed", "content", "okay", "better"],
  happy: ["happy", "good", "excited", "grateful", "joyful", "wonderful"],
};

function detectEmotion(text: string): string {
  const lowerText = text.toLowerCase();

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    if (keywords.some((keyword) => lowerText.includes(keyword))) {
      return emotion;
    }
  }

  return "neutral";
}

function isCrisisDetected(text: string): boolean {
  const lowerText = text.toLowerCase();
  return emotionKeywords.crisis.some((keyword) => lowerText.includes(keyword));
}

const systemPrompt = `You are MindfulAI Companion, a compassionate and empathetic AI mental health support assistant. Your role is to:

1. **Listen actively and validate feelings**: Always acknowledge the user's emotions without judgment.

2. **Provide evidence-based coping strategies**: Offer practical techniques like:
   - Deep breathing exercises (4-7-8 technique, box breathing)
   - Grounding techniques (5-4-3-2-1 method)
   - Cognitive reframing
   - Progressive muscle relaxation
   - Mindfulness exercises
   - Journaling prompts

3. **Assess emotional state**: Gently ask clarifying questions to understand their situation better.

4. **Offer personalized support**: Tailor your responses to their specific concerns (work stress, anxiety, depression, relationship issues, etc.).

5. **Know your limits**: You are NOT a replacement for professional therapy. Always:
   - Encourage seeking professional help for serious concerns
   - Provide crisis resources when needed
   - Never diagnose mental health conditions
   - Never provide medical advice

6. **Crisis Protocol**: If you detect suicidal thoughts, self-harm intentions, or immediate danger:
   - Express immediate concern and care
   - Strongly encourage calling 988 (Suicide & Crisis Lifeline) or 911
   - Provide specific crisis resources
   - Stay engaged until they confirm safety

7. **Communication style**:
   - Be warm, empathetic, and non-judgmental
   - Use simple, clear language
   - Ask one question at a time
   - Offer hope and encouragement
   - Celebrate small wins

8. **Add emotion tags**: Include [EMOTION: {emotion}] at the end of your response to help track mood (use: calm, happy, neutral, anxious, stressed, sad, depressed, crisis).

Remember: You're creating a safe, supportive space for someone who may be struggling. Your words matter.`;

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const emotion = detectEmotion(lastMessage.content);
    const isCrisis = isCrisisDetected(lastMessage.content);

    // Add crisis detection to system context if needed
    let enhancedSystemPrompt = systemPrompt;
    if (isCrisis) {
      enhancedSystemPrompt += `\n\n🚨 CRISIS DETECTED: The user may be in immediate danger. Prioritize their safety and strongly encourage them to reach out for immediate professional help.`;
    }

    // Build conversation context
    const conversationText = messages
      .map((m: any) => `${m.role}: ${m.content}`)
      .join("\n");
    
    const prompt = `${enhancedSystemPrompt}\n\n${conversationText}\nassistant:`;

    // Use text generation instead of chat completion (more reliable)
    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: prompt,
      parameters: {
        max_new_tokens: 300,
        temperature: 0.7,
        return_full_text: false,
      },
    });

    const aiResponse = response.generated_text.trim() + " [EMOTION: " + emotion + "]";

    // Return as streaming response for compatibility with useChat
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(aiResponse));
        controller.close();
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate response" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
