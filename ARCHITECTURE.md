# MindfulAI Companion - System Architecture

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Browser    │  │    Mobile    │  │   Tablet     │          │
│  │  (Desktop)   │  │   (Safari)   │  │   (Chrome)   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                  │
│         └──────────────────┴──────────────────┘                  │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────┐
│                   PRESENTATION LAYER (Next.js)                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              React Components (TypeScript)                  │ │
│  │  • ChatInterface  • VoiceInput  • MoodTracker              │ │
│  │  • EmergencyModal • ResourceFinder • Dashboard             │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                UI Component Library                         │ │
│  │  shadcn/ui (Base UI) + Tailwind CSS + Lucide Icons        │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬─────────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────┐
│                   APPLICATION LAYER (API Routes)                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  /api/chat          - Main conversation endpoint           │ │
│  │  /api/analyze       - Emotion analysis                     │ │
│  │  /api/strategies    - Coping strategy retrieval            │ │
│  │  /api/resources     - Professional resources               │ │
│  │  /api/crisis        - Crisis detection & intervention      │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬─────────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────┐
│                      BUSINESS LOGIC LAYER                        │
│  ┌────────────────────┐  ┌────────────────────┐                │
│  │ Emotion Analyzer   │  │  Crisis Detector   │                │
│  │ • Keyword matching │  │ • Risk assessment  │                │
│  │ • Sentiment score  │  │ • Severity levels  │                │
│  │ • Intensity calc   │  │ • Alert triggers   │                │
│  └────────────────────┘  └────────────────────┘                │
│  ┌────────────────────┐  ┌────────────────────┐                │
│  │ Strategy Matcher   │  │ Context Manager    │                │
│  │ • Database query   │  │ • Session tracking │                │
│  │ • Personalization  │  │ • History storage  │                │
│  └────────────────────┘  └────────────────────┘                │
└────────────────────────────┬─────────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────┐
│                       AI INTEGRATION LAYER                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Vercel AI SDK                            │ │
│  │  • streamText()  • convertToCoreMessages()                 │ │
│  │  • Real-time streaming  • Token management                 │ │
│  └─────────────────────────┬──────────────────────────────────┘ │
│                            │                                     │
│  ┌─────────────────────────▼──────────────────────────────────┐ │
│  │                  OpenAI GPT-4o API                          │ │
│  │  • Natural language understanding                           │ │
│  │  • Empathetic response generation                          │ │
│  │  • Context-aware conversations                             │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬─────────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────┐
│                        EXTERNAL SERVICES                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Web Speech  │  │  Crisis APIs │  │  Therapist   │          │
│  │     API      │  │   (988/911)  │  │   Finder     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📦 Component Architecture

### Frontend Components

```
components/
├── chat-interface.tsx          # Main conversation UI
│   ├── MessageList             # Renders message history
│   ├── MessageInput            # Input field + send button
│   ├── VoiceInputButton        # Speech recognition
│   └── MoodIndicator           # Visual mood tracker
│
├── ui/                         # shadcn/ui primitives
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── scroll-area.tsx
│   ├── avatar.tsx
│   └── badge.tsx
│
├── crisis-intervention.tsx     # Emergency modal
├── resource-card.tsx           # Professional resource display
└── exercises/                  # Guided exercises (Part 3)
    ├── breathing-exercise.tsx
    └── meditation-player.tsx
```

---

## 🔄 Data Flow

### 1. User Message Flow

```
User types/speaks message
         │
         ▼
ChatInterface component
         │
         ├─► Voice? → Web Speech API → Transcript
         │
         ▼
useChat hook (Vercel AI SDK)
         │
         ▼
POST /api/chat
         │
         ├─► Extract message content
         ├─► Detect emotion (keyword matching)
         ├─► Check for crisis keywords
         │
         ▼
streamText() with GPT-4o
         │
         ├─► System prompt (empathetic instructions)
         ├─► Conversation history (context)
         ├─► User message
         │
         ▼
OpenAI API Response (streaming)
         │
         ▼
Stream back to client
         │
         ▼
ChatInterface updates
         │
         ├─► Display message with typing effect
         ├─► Update mood score
         └─► Show crisis alert if needed
```

### 2. Emotion Detection Flow

```
User Message
     │
     ▼
detectEmotion(text)
     │
     ├─► Convert to lowercase
     ├─► Check against keyword database
     │   ├─► crisis keywords → "crisis"
     │   ├─► depressed keywords → "depressed"
     │   ├─► anxious keywords → "anxious"
     │   ├─► stressed keywords → "stressed"
     │   └─► ... more categories
     │
     ▼
Return emotion classification
     │
     ▼
Update mood score (0-100)
     │
     ├─► crisis: 10
     ├─► depressed: 20
     ├─► sad: 30
     ├─► stressed: 35
     ├─► anxious: 40
     ├─► neutral: 70
     ├─► calm: 85
     └─► happy: 90
     │
     ▼
Render colored progress bar
```

### 3. Crisis Detection Flow

```
Message received
     │
     ▼
isCrisisDetected(text)
     │
     ├─► Check for:
     │   • "suicide"
     │   • "kill myself"
     │   • "end my life"
     │   • "hurt myself"
     │   • "self-harm"
     │   • "no reason to live"
     │
     ▼
Crisis detected? → Yes
     │
     ├─► Enhance system prompt with crisis protocol
     ├─► GPT-4 prioritizes safety
     ├─► Response includes emergency resources
     │
     ▼
Frontend receives response
     │
     ├─► Detects 🚨 emoji
     ├─► Shows red alert box
     └─► Displays crisis hotline numbers
```

---

## 🧠 AI System Design

### System Prompt Architecture

```typescript
const systemPrompt = `
[ROLE DEFINITION]
You are MindfulAI Companion, a compassionate AI mental health support assistant.

[CORE RESPONSIBILITIES]
1. Listen actively and validate feelings
2. Provide evidence-based coping strategies
3. Assess emotional state through questions
4. Offer personalized support
5. Know limits and refer to professionals
6. Handle crisis situations appropriately

[COMMUNICATION STYLE]
- Warm and empathetic
- Non-judgmental
- Simple, clear language
- One question at a time
- Encouraging and hopeful

[CRISIS PROTOCOL]
IF suicidal thoughts detected:
  - Express immediate concern
  - Strongly encourage calling 988/911
  - Provide specific resources
  - Stay engaged until safety confirmed

[OUTPUT FORMAT]
- Natural conversation
- Include: [EMOTION: {emotion}] at end
- Use emojis sparingly
- Avoid medical diagnosis
`;
```

### Temperature & Token Settings

```typescript
streamText({
  model: openai("gpt-4o"),
  temperature: 0.7,        // Balance creativity & consistency
  maxTokens: 500,          // Keep responses concise
  // topP: 0.9,            // (default) Nucleus sampling
  // frequencyPenalty: 0.3 // (optional) Reduce repetition
});
```

---

## 🔒 Security & Privacy Architecture

### Current Implementation (Part 1)

```
✅ No persistent data storage
✅ Conversations stay in memory (session only)
✅ API keys in environment variables (.env.local)
✅ .env.local in .gitignore
✅ HTTPS in production (Vercel)
✅ No user authentication required
```

### Future Enhancements (Parts 2-4)

```
🔄 User authentication (optional)
🔄 End-to-end encryption for stored data
🔄 HIPAA compliance measures
🔄 Data retention policies
🔄 User data deletion requests
🔄 Audit logs for crisis interventions
```

---

## 📊 State Management

### Client State (React useState + useChat)

```typescript
// ChatInterface component state
const [isListening, setIsListening] = useState(false);
const [moodScore, setMoodScore] = useState<number | null>(null);

// Vercel AI SDK managed state
const { 
  messages,      // Conversation history
  input,         // Current input value
  isLoading,     // AI response in progress
  handleInputChange,
  handleSubmit
} = useChat({ api: '/api/chat' });
```

### Server State (API Routes)

```typescript
// Stateless - each request is independent
POST /api/chat
  Input: { messages: Message[] }
  Output: StreamingTextResponse
  
// Context passed via messages array
// No session storage on server (currently)
```

---

## 🚀 Performance Optimization

### Current Optimizations

1. **Streaming Responses**
   - Real-time token streaming via Vercel AI SDK
   - Immediate user feedback
   - Perceived performance boost

2. **Efficient Rendering**
   - React memo for message components
   - Virtual scrolling for long conversations
   - Lazy loading of heavy components

3. **Edge Functions**
   - Deployed to Vercel Edge Network
   - Low latency globally
   - Fast API responses

### Future Optimizations (Parts 2-4)

```
🔄 Message pagination (load older messages on demand)
🔄 Database indexing for quick mood lookups
🔄 CDN for static assets (exercises, audio files)
🔄 Service worker for offline support
🔄 Image optimization for resource cards
🔄 Code splitting by route
```

---

## 🔌 API Endpoints

### Current Endpoints (Part 1)

#### POST /api/chat
```typescript
Request:
{
  messages: [
    { role: "user", content: "I'm feeling anxious" },
    { role: "assistant", content: "I hear you..." }
  ]
}

Response: StreamingTextResponse
- Streams tokens in real-time
- Includes [EMOTION: anxious] tag
- Crisis alerts embedded if detected
```

### Planned Endpoints (Parts 2-4)

#### POST /api/analyze
```typescript
Request:
{
  message: string,
  history: Message[]
}

Response:
{
  emotion: {
    primary: "anxious",
    secondary: ["stressed", "worried"],
    intensity: 75,
    confidence: 0.88
  },
  triggers: ["work", "deadlines"],
  context: "User experiencing work-related anxiety"
}
```

#### GET /api/strategies
```typescript
Request:
?emotion=anxious&difficulty=easy&duration=<5

Response:
{
  strategies: [
    {
      id: "4-7-8-breathing",
      name: "4-7-8 Breathing",
      category: "breathing",
      duration: 2,
      steps: [...],
      evidenceLevel: "Well-established"
    }
  ]
}
```

#### GET /api/resources
```typescript
Request:
?type=crisis&location=US&language=en

Response:
{
  resources: [
    {
      name: "988 Suicide & Crisis Lifeline",
      phone: "988",
      availability: "24/7",
      cost: "free",
      description: "..."
    }
  ]
}
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
/* Base: Mobile (320px+) */

/* Tablet */
@media (min-width: 768px) {
  /* 2-column layouts */
  /* Larger text */
}

/* Desktop */
@media (min-width: 1024px) {
  /* 3-column layouts */
  /* Side panels */
}

/* Large Desktop */
@media (min-width: 1280px) {
  /* Max content width */
  /* Expanded features */
}
```

### Key Responsive Features

```
📱 Mobile (320-767px)
   - Single column chat
   - Full-width inputs
   - Bottom navigation
   - Collapsible mood tracker

💻 Tablet (768-1023px)
   - Side panel for resources
   - Expanded message bubbles
   - Floating action buttons

🖥️ Desktop (1024px+)
   - Persistent sidebar
   - Multi-panel layout
   - Keyboard shortcuts
   - Enhanced visualizations
```

---

## 🧪 Testing Strategy

### Unit Tests (Planned)

```typescript
// lib/emotion-analyzer.test.ts
describe('EmotionAnalyzer', () => {
  it('detects anxiety keywords', () => {
    const result = detectEmotion("I'm feeling anxious");
    expect(result).toBe("anxious");
  });
  
  it('detects crisis keywords', () => {
    const result = isCrisisDetected("I want to hurt myself");
    expect(result).toBe(true);
  });
});
```

### Integration Tests (Planned)

```typescript
// app/api/chat/route.test.ts
describe('Chat API', () => {
  it('returns streaming response', async () => {
    const response = await POST({
      json: () => ({
        messages: [{ role: "user", content: "Hello" }]
      })
    });
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('text/event-stream');
  });
});
```

### E2E Tests (Planned)

```typescript
// e2e/crisis-detection.spec.ts
import { test, expect } from '@playwright/test';

test('crisis intervention modal appears', async ({ page }) => {
  await page.goto('/');
  await page.fill('input', 'I want to end my life');
  await page.click('button[type="submit"]');
  await expect(page.locator('.crisis-alert')).toBeVisible();
});
```

---

## 🔍 Monitoring & Observability

### Metrics to Track (Future)

```typescript
// Performance metrics
- API response time (p50, p95, p99)
- Streaming latency
- Client-side rendering time
- Time to first message

// Usage metrics
- Daily active users
- Average session duration
- Messages per session
- Emotion distribution

// Safety metrics
- Crisis detections per day
- False positive rate
- Emergency resource clicks
- Professional referrals made
```

### Error Tracking

```typescript
// Sentry integration (planned)
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});

// Track specific errors
- API failures
- AI timeout
- Voice input errors
- Crisis detection failures
```

---

## 🌐 Deployment Architecture

### Vercel Platform

```
┌─────────────────────────────────────────┐
│          Vercel Edge Network            │
│  ┌───────────────────────────────────┐  │
│  │     Global CDN (Static Assets)    │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │   Edge Functions (API Routes)     │  │
│  │   • Low latency worldwide         │  │
│  │   • Automatic scaling             │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         OpenAI API                       │
│  • GPT-4o endpoint                       │
│  • US East / US West regions            │
└─────────────────────────────────────────┘
```

### Environment Variables

```bash
# Production (.env.production)
OPENAI_API_KEY=sk-...
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://mindfulai.vercel.app

# Development (.env.local)
OPENAI_API_KEY=sk-...
NODE_ENV=development
```

---

## 🔄 Future Architecture (Parts 2-4)

### Database Layer (Part 3)

```
┌─────────────────────────────────────────┐
│         Vercel Postgres / Supabase      │
│  ┌───────────────────────────────────┐  │
│  │  Users Table                      │  │
│  │  • id, email, created_at          │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Conversations Table              │  │
│  │  • id, user_id, messages, date    │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Mood_Entries Table               │  │
│  │  • id, user_id, score, emotion    │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Safety_Plans Table               │  │
│  │  • id, user_id, plan_data         │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Authentication Layer (Part 3)

```
┌─────────────────────────────────────────┐
│         Clerk / NextAuth.js             │
│  • Email/password                       │
│  • OAuth (Google, Apple)                │
│  • Anonymous sessions                   │
│  • JWT tokens                           │
└─────────────────────────────────────────┘
```

### Background Jobs (Part 4)

```
┌─────────────────────────────────────────┐
│         Vercel Cron Jobs                │
│  ┌───────────────────────────────────┐  │
│  │  Daily check-in reminders         │  │
│  │  • Send at 9am user timezone      │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Weekly mood report generation    │  │
│  │  • Analyze patterns               │  │
│  │  • Email summary                  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## 📚 Technology Stack Summary

### Core Technologies
- **Framework**: Next.js 15 (App Router, RSC)
- **Language**: TypeScript 5+
- **Runtime**: Node.js 18+
- **Package Manager**: npm

### Frontend
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Component Library**: shadcn/ui (Base UI)
- **Icons**: Lucide React
- **Animations**: Framer Motion (planned)

### Backend
- **API**: Next.js API Routes
- **AI SDK**: Vercel AI SDK
- **LLM**: OpenAI GPT-4o
- **Streaming**: Server-Sent Events (SSE)

### Future Additions
- **Database**: Vercel Postgres / Supabase
- **Auth**: Clerk / NextAuth.js
- **Charts**: Recharts / Chart.js
- **State**: Zustand / React Query
- **Testing**: Vitest + Playwright

---

## 🎯 Architectural Principles

### 1. **User Safety First**
- Crisis detection cannot be disabled
- Multiple failsafes for emergency situations
- Clear escalation protocols

### 2. **Privacy by Design**
- Minimal data collection
- No tracking without consent
- Encrypted communications
- User controls data

### 3. **Scalability**
- Stateless API design
- Edge function deployment
- Efficient database queries
- CDN for static assets

### 4. **Accessibility**
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast modes

### 5. **Maintainability**
- Modular component architecture
- Clear separation of concerns
- Type safety with TypeScript
- Comprehensive documentation

---

This architecture is designed to scale from a hackathon prototype to a production-ready mental health support platform while maintaining safety, privacy, and performance. 💙
