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

// Initialize HF but use fallback for demo
const hf = process.env.HUGGINGFACE_API_KEY
  ? new HfInference(process.env.HUGGINGFACE_API_KEY)
  : null;

// Empathetic response templates based on emotion
const responseTemplates: Record<string, string[]> = {
  stressed: [
    "I hear that you're feeling stressed right now. That must be really overwhelming. Let's take a moment together - try this simple breathing exercise: breathe in for 4 counts, hold for 7, and exhale for 8. This can help calm your nervous system. What's been causing you the most stress lately?",
    "Stress can feel so heavy, and I'm glad you're reaching out. One technique that helps many people is the 5-4-3-2-1 grounding method: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste. Would you like to try that together?",
  ],
  anxious: [
    "Anxiety can feel really overwhelming, and it's brave of you to talk about it. Remember, these feelings are temporary. Try placing one hand on your heart and one on your belly, and take slow, deep breaths. Can you tell me more about what's making you anxious?",
    "I understand you're feeling anxious. That racing heart and worried mind can be exhausting. Let's ground ourselves: press your feet firmly on the floor and notice the sensation. You're safe right now. What thoughts are worrying you most?",
  ],
  sad: [
    "I'm sorry you're feeling sad. It's okay to feel this way, and your feelings are valid. Sometimes sadness needs to be acknowledged before it can pass. Is there something specific that's making you feel this way, or would you just like someone to listen?",
    "Sadness can feel so heavy. Thank you for sharing this with me. Remember that it's okay to not be okay sometimes. Would it help to talk about what's on your mind, or would you prefer some coping strategies to help you through this moment?",
  ],
  depressed: [
    "I hear you, and I want you to know that what you're feeling matters. Depression can make everything feel impossible, but you took an important step by reaching out. Have you been able to talk to a mental health professional? They can provide support tailored to your needs. In the meantime, can you try one small self-care act today - even just drinking a glass of water or stepping outside for a moment?",
    "Thank you for trusting me with how you're feeling. Depression is real and difficult, and you don't have to face it alone. If you haven't already, please consider reaching out to a therapist or counselor - they can offer more comprehensive support. Right now, let's focus on getting through this moment. What's one tiny thing that usually brings you even a small bit of comfort?",
  ],
  crisis: [
    "🚨 I'm very concerned about what you've shared. Your safety is the most important thing right now. Please reach out for immediate help:\n\n• Call 988 (Suicide & Crisis Lifeline) - available 24/7\n• Call 911 if you're in immediate danger\n• Text 'HELLO' to 741741 (Crisis Text Line)\n\nYou matter, and there are people who want to help. Can you reach out to someone you trust right now - a friend, family member, or counselor? Please don't face this alone.",
  ],
  neutral: [
    "I'm here to listen and support you. How are you feeling today? Whether you're dealing with stress, anxiety, or just need someone to talk to, I'm here for you. What's on your mind?",
    "Thank you for reaching out. I'm here to provide a safe, judgment-free space for you. What would you like to talk about today? Whether it's stress, worries, or anything else, I'm listening.",
  ],
  calm: [
    "It's wonderful that you're feeling more calm. That's a positive sign! Maintaining this sense of peace is important. Would you like to explore some techniques to help you stay grounded, or is there something else I can help you with?",
  ],
  happy: [
    "I'm so glad to hear you're feeling good! Those positive moments are important to celebrate. What's bringing you joy today? And remember, if you ever need support during tougher times, I'm here for you.",
  ],
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const emotion = detectEmotion(lastMessage.content);
    const isCrisis = isCrisisDetected(lastMessage.content);

    // Select appropriate response
    const templates = responseTemplates[emotion] || responseTemplates.neutral;
    const randomTemplate =
      templates[Math.floor(Math.random() * templates.length)];

    const aiResponse = randomTemplate + ` [EMOTION: ${emotion}]`;

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
    
    // Fallback response
    const encoder = new TextEncoder();
    const fallbackResponse = "I'm here to listen and support you. How are you feeling today? [EMOTION: neutral]";
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(fallbackResponse));
        controller.close();
      },
    });
    
    return new StreamingTextResponse(stream);
  }
}
