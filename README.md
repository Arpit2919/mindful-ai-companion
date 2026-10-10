# MindfulAI Companion - AI Mental Health Chatbot

An empathetic AI-powered chatbot designed to provide mental health support, emotional guidance, and coping strategies for users experiencing stress, anxiety, or emotional distress.

## 🎯 Project Overview

**MindfulAI Companion** is a comprehensive mental health support system built for a hackathon that addresses the growing need for accessible, judgment-free mental health support. The application uses advanced AI to detect emotional states, provide personalized coping strategies, and connect users to professional resources when needed.

## ✨ Features

### Part 1: Foundation & Core Chat Interface ✅ (Current)
- Beautiful, empathetic chat UI with calming design
- Real-time text-based conversations
- Session management and message history
- Responsive design for mobile and desktop
- Quick-start prompts for common concerns
- Real-time mood tracking visualization

### Part 2: AI Intelligence & Emotion Detection (Next Phase)
- Advanced emotion classification (stress, anxiety, depression, calm, happy)
- Context-aware response generation using GPT-4
- Crisis detection and escalation protocols
- Evidence-based coping strategies database
- Personalized conversation flow

### Part 3: Voice Input & Advanced Features (Planned)
- Speech-to-text for voice input
- Text-to-speech for responses
- Mood tracking dashboard with historical data
- Daily check-in system
- Guided meditation and breathing exercises
- Journaling feature

### Part 4: Crisis Detection & Professional Resources (Planned)
- Advanced crisis keyword detection
- Severity scoring algorithm
- Emergency hotline integration (988, 911)
- Local therapist finder
- Safety planning tools
- Professional referral system

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Frontend (Next.js + React)              │
│  • Chat Interface  • Voice Input  • Mood Dashboard      │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│            Backend API (Next.js API Routes)              │
│  • Session Management  • Request Handling               │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│              AI Processing Layer (Vercel AI SDK)         │
│  • Emotion Detection  • Intent Classification           │
│  • Response Generation (GPT-4)  • Crisis Detection      │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Groq API key ([Get one FREE here](https://console.groq.com/keys)) - No credit card required!

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mindful-ai-companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GROQ_API_KEY=your-groq-api-key-here
   ```
   
   Get your FREE Groq API key at: https://console.groq.com/keys

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Base UI)
- **AI/ML**: 
  - Vercel AI SDK
  - OpenAI GPT-4
- **Voice**: Web Speech API
- **Icons**: Lucide React

## 📁 Project Structure

```
mindful-ai-companion/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # AI chat endpoint with emotion detection
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── ui/                       # shadcn/ui components
│   └── chat-interface.tsx        # Main chat component
├── lib/
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── .env.local                    # Environment variables (create this)
└── README.md                     # This file
```

## 🧠 How It Works

### Emotion Detection System

The chatbot analyzes user messages for emotional keywords and classifies them into categories:

- **Crisis**: Immediate danger signals (suicide, self-harm)
- **Depressed**: Feelings of hopelessness, worthlessness
- **Anxious**: Panic, worry, racing thoughts
- **Stressed**: Pressure, burnout, exhaustion
- **Sad**: General sadness, loneliness
- **Calm**: Peaceful, relaxed states
- **Happy**: Positive emotions

### Crisis Protocol

When crisis keywords are detected:
1. 🚨 Immediate alert displayed to user
2. Strong encouragement to call 988 or 911
3. AI response prioritizes safety
4. Emergency resources prominently shown

### AI Response Generation

The system uses GPT-4 with a specialized prompt that:
- Validates and acknowledges user emotions
- Provides evidence-based coping strategies
- Offers personalized support
- Knows its limitations as a support tool (not therapy)
- Maintains warm, empathetic communication

## 🎨 Design Philosophy

- **Calming aesthetics**: Soft gradients, soothing colors
- **Accessibility first**: High contrast, clear typography
- **Mobile responsive**: Works seamlessly on all devices
- **Non-judgmental**: Safe space for vulnerable conversations
- **Professional disclaimer**: Clear about not replacing therapy

## 🔐 Privacy & Ethics

- **No data storage**: Conversations are not persisted (can be added in Part 3)
- **Transparent limitations**: Clear that this is not professional therapy
- **Crisis escalation**: Always directs to professional help when needed
- **Ethical AI use**: Designed to support, not replace, human care

## 📊 Future Enhancements

### Short-term (Hackathon)
- [ ] Complete Parts 2-4 (see Features section)
- [ ] Add mood tracking charts
- [ ] Implement voice input/output
- [ ] Create resource library

### Long-term (Post-Hackathon)
- [ ] User authentication and profiles
- [ ] Encrypted conversation history
- [ ] Integration with therapist networks
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Group support features

## 🤝 Contributing

This is a hackathon project, but contributions are welcome! Please ensure any changes:
- Maintain the empathetic, supportive tone
- Follow accessibility best practices
- Include appropriate crisis safeguards
- Respect user privacy

## ⚠️ Disclaimer

**MindfulAI Companion is a supportive tool and NOT a substitute for professional mental health care.**

If you or someone you know is in crisis:
- **US**: Call or text 988 (Suicide & Crisis Lifeline)
- **US Emergency**: Call 911
- **International**: Visit [findahelpline.com](https://findahelpline.com)

This application is designed to provide supportive conversations and coping strategies, but it cannot replace licensed mental health professionals.

## 📝 License

MIT License - feel free to use this project for learning and hackathons.

## 👥 Team

Built with ❤️ for mental health awareness.

---

**Remember**: It's okay to not be okay. Help is always available. 💙
