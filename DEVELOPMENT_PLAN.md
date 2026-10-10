# MindfulAI Companion - 4-Part Development Plan

This document outlines the complete development roadmap for building the AI Mental Health Chatbot in a structured, iterative manner suitable for a hackathon timeline.

---

## 📋 Overview

**Total Development Timeline**: 24 hours (hackathon)  
**Approach**: Iterative development with working prototypes at each stage  
**Tech Stack**: Next.js, TypeScript, Vercel AI SDK, OpenAI GPT-4, Tailwind CSS

---

## Part 1: Foundation & Core Chat Interface ✅

**Status**: ✅ COMPLETED  
**Time Allocation**: Hours 0-6  
**Priority**: CRITICAL - Must be completed first

### What's Been Built

#### Frontend Components
- ✅ Beautiful chat interface with calming design aesthetics
- ✅ Real-time message display with typing indicators
- ✅ User and AI message differentiation with avatars
- ✅ Responsive layout (mobile + desktop)
- ✅ Quick-start conversation prompts
- ✅ Mood score visualization with color-coded progress bar
- ✅ Emergency resources footer
- ✅ Voice input button (Web Speech API integration)

#### Backend API
- ✅ `/api/chat` route for AI conversation
- ✅ Integration with OpenAI GPT-4 via Vercel AI SDK
- ✅ Streaming responses for real-time chat feel
- ✅ Basic emotion detection using keyword matching
- ✅ Crisis detection system
- ✅ Specialized system prompt for empathetic responses

#### Core Features
- ✅ Text-based conversation flow
- ✅ Real-time emotion tracking
- ✅ Crisis keyword detection
- ✅ Professional disclaimer messaging
- ✅ Gradient animations and smooth UX

### Technical Implementation

```typescript
// Emotion Detection Keywords
emotionKeywords = {
  crisis: ["suicide", "kill myself", "hurt myself", ...],
  depressed: ["depressed", "hopeless", "worthless", ...],
  anxious: ["anxious", "panic", "worried", ...],
  stressed: ["stressed", "pressure", "burned out", ...],
  // ... more categories
}
```

### Testing Checklist
- [ ] Chat interface loads correctly
- [ ] Messages send and receive properly
- [ ] Typing indicators show during AI response
- [ ] Quick prompts populate input field
- [ ] Mood bar updates based on conversation
- [ ] Crisis alerts trigger correctly
- [ ] Mobile responsive design works
- [ ] Voice button appears (browser-dependent)

---

## Part 2: AI Intelligence & Emotion Detection

**Status**: 🔄 NEXT PHASE  
**Time Allocation**: Hours 6-12  
**Priority**: HIGH - Core intelligence layer

### Goals

1. **Advanced Emotion Classification**
   - Multi-factor emotion analysis
   - Sentiment scoring beyond keywords
   - Emotion intensity measurement
   - Conversation context awareness

2. **Context-Aware AI Responses**
   - Multi-turn conversation memory
   - Personalized response adaptation
   - Follow-up question generation
   - Topic tracking and redirection

3. **Evidence-Based Coping Strategies**
   - Database of therapeutic techniques
   - Situation-specific strategy matching
   - Step-by-step guided exercises
   - Resource recommendations

### Implementation Tasks

#### 2.1 Enhanced Emotion Detection
```typescript
// Create: lib/emotion-analyzer.ts
interface EmotionAnalysis {
  primary: string;          // Main emotion
  secondary: string[];      // Additional emotions
  intensity: number;        // 0-100 scale
  context: string;          // Brief summary
  triggers: string[];       // Identified stressors
}

class EmotionAnalyzer {
  analyze(message: string, history: Message[]): EmotionAnalysis
  detectCrisisLevel(analysis: EmotionAnalysis): 'none' | 'low' | 'medium' | 'high' | 'critical'
}
```

#### 2.2 Coping Strategy Database
```typescript
// Create: lib/coping-strategies.ts
interface CopingStrategy {
  id: string;
  name: string;
  category: 'breathing' | 'grounding' | 'cognitive' | 'physical' | 'social';
  difficulty: 'easy' | 'medium' | 'advanced';
  duration: number;         // minutes
  steps: string[];
  whenToUse: string[];      // emotion triggers
  evidenceLevel: string;    // research backing
}

const strategies: CopingStrategy[] = [
  {
    id: "4-7-8-breathing",
    name: "4-7-8 Breathing Technique",
    category: "breathing",
    difficulty: "easy",
    duration: 2,
    steps: [
      "Exhale completely through your mouth",
      "Close your mouth and inhale through your nose for 4 seconds",
      "Hold your breath for 7 seconds",
      "Exhale completely through your mouth for 8 seconds",
      "Repeat 3-4 times"
    ],
    whenToUse: ["anxious", "stressed", "panic"],
    evidenceLevel: "Well-established in anxiety research"
  },
  // ... 15-20 more strategies
];
```

#### 2.3 Conversation Context Management
```typescript
// Create: lib/conversation-context.ts
interface ConversationContext {
  userId: string;
  sessionId: string;
  emotionHistory: EmotionAnalysis[];
  topics: string[];
  crisisFlags: number;
  lastCheckIn: Date;
  suggestedStrategies: string[];
}
```

#### 2.4 Advanced AI Prompt Engineering
```typescript
// Update: app/api/chat/route.ts
const enhancedSystemPrompt = `
You are MindfulAI Companion, an advanced empathetic AI mental health support assistant.

EMOTION CONTEXT: ${emotionAnalysis.primary} (intensity: ${emotionAnalysis.intensity}/100)
CONVERSATION TOPICS: ${context.topics.join(", ")}
PREVIOUS STRATEGIES USED: ${context.suggestedStrategies.join(", ")}

RESPONSE GUIDELINES:
1. Acknowledge the specific emotion and its intensity
2. Validate without judgment
3. Offer ONE specific, actionable coping strategy from the database
4. Ask ONE clarifying question to deepen understanding
5. Provide hope and encouragement

AVAILABLE STRATEGIES: ${JSON.stringify(matchingStrategies)}

Format your response naturally, incorporating the strategy seamlessly.
`;
```

### New API Endpoints

```typescript
// app/api/analyze/route.ts
POST /api/analyze
// Returns detailed emotion analysis without generating response

// app/api/strategies/route.ts
GET /api/strategies?emotion=anxious&difficulty=easy
// Returns matching coping strategies

// app/api/resources/route.ts
GET /api/resources?category=crisis&location=US
// Returns professional resources and hotlines
```

### Testing Checklist
- [ ] Emotion detection accuracy >80%
- [ ] Context maintained across 5+ messages
- [ ] Strategies match user's emotional state
- [ ] Crisis escalation works correctly
- [ ] AI responses feel personalized
- [ ] No repetitive suggestions

---

## Part 3: Voice Input & Advanced Features

**Status**: ⏳ PLANNED  
**Time Allocation**: Hours 12-18  
**Priority**: MEDIUM - Enhanced UX

### Goals

1. **Voice Interaction**
   - Speech-to-text for user input
   - Text-to-speech for AI responses
   - Voice activity detection
   - Accent/language handling

2. **Mood Tracking Dashboard**
   - Historical emotion data visualization
   - Weekly/monthly mood trends
   - Pattern identification
   - Export functionality

3. **Wellness Features**
   - Guided meditation audio
   - Breathing exercise animations
   - Progressive muscle relaxation
   - Daily check-in reminders

### Implementation Tasks

#### 3.1 Voice Input Enhancement
```typescript
// Create: components/voice-input.tsx
interface VoiceInputProps {
  onTranscript: (text: string) => void;
  language?: string;
}

export function VoiceInput({ onTranscript, language = "en-US" }: VoiceInputProps) {
  // Enhanced Web Speech API implementation
  // Add noise cancellation
  // Handle interruptions
  // Show real-time transcription
}
```

#### 3.2 Text-to-Speech Output
```typescript
// Create: lib/speech-synthesis.ts
class SpeechManager {
  speak(text: string, options?: {
    voice?: string;
    rate?: number;
    pitch?: number;
  }): void
  
  pause(): void
  resume(): void
  cancel(): void
}
```

#### 3.3 Mood Tracking Dashboard
```typescript
// Create: app/dashboard/page.tsx
interface MoodEntry {
  timestamp: Date;
  emotion: string;
  intensity: number;
  notes?: string;
  triggers?: string[];
}

// Visualizations using recharts or Chart.js
- Line chart: Mood over time
- Bar chart: Emotion frequency
- Heatmap: Daily mood calendar
- Radar chart: Emotional profile
```

#### 3.4 Guided Exercises
```typescript
// Create: components/exercises/breathing-exercise.tsx
interface BreathingExercise {
  name: string;
  pattern: number[];      // [inhale, hold, exhale, hold] in seconds
  cycles: number;
  visualType: 'circle' | 'square' | 'custom';
}

// Create animated visual guides
- Expanding/contracting circle
- Color transitions
- Audio cues
- Progress tracking
```

#### 3.5 Daily Check-In System
```typescript
// Create: components/daily-checkin.tsx
interface CheckIn {
  date: Date;
  mood: number;           // 1-10 scale
  sleepQuality: number;   // 1-10 scale
  stressLevel: number;    // 1-10 scale
  gratitude: string;
  challenges: string[];
}
```

### New Pages & Components

```
app/
├── dashboard/
│   └── page.tsx              # Mood tracking dashboard
├── exercises/
│   ├── page.tsx              # Exercise library
│   ├── breathing/
│   │   └── page.tsx          # Breathing exercises
│   └── meditation/
│       └── page.tsx          # Guided meditation
└── journal/
    └── page.tsx              # Personal journaling

components/
├── exercises/
│   ├── breathing-exercise.tsx
│   ├── grounding-exercise.tsx
│   └── meditation-player.tsx
├── charts/
│   ├── mood-chart.tsx
│   ├── emotion-frequency.tsx
│   └── mood-calendar.tsx
└── voice-input.tsx
```

### Testing Checklist
- [ ] Voice input works in Chrome/Edge
- [ ] Text-to-speech has natural pacing
- [ ] Dashboard loads historical data
- [ ] Charts render correctly
- [ ] Breathing exercise animations are smooth
- [ ] Daily check-in saves properly
- [ ] Mobile voice input works

---

## Part 4: Crisis Detection & Professional Resources

**Status**: ⏳ PLANNED  
**Time Allocation**: Hours 18-24  
**Priority**: CRITICAL - Safety features

### Goals

1. **Advanced Crisis Detection**
   - Machine learning-based risk assessment
   - Multi-message pattern analysis
   - Escalation level determination
   - Real-time alert system

2. **Professional Resource Integration**
   - Crisis hotline database (by country/region)
   - Therapist finder API integration
   - Hospital/clinic locator
   - Insurance verification tools

3. **Safety Planning**
   - Personalized safety plan builder
   - Emergency contact management
   - Coping strategy quick access
   - Crisis de-escalation protocol

### Implementation Tasks

#### 4.1 Advanced Crisis Detection
```typescript
// Create: lib/crisis-detector.ts
interface CrisisAnalysis {
  riskLevel: 'none' | 'low' | 'moderate' | 'high' | 'severe';
  confidence: number;
  indicators: string[];
  recommendedAction: string;
  urgency: 'immediate' | 'within_24h' | 'within_week' | 'monitor';
}

class CrisisDetector {
  analyzeMessage(message: string, context: ConversationContext): CrisisAnalysis
  
  // Pattern detection
  detectSuicidalIdeation(messages: string[]): number
  detectSelfHarmIntent(messages: string[]): number
  detectImmediateDanger(message: string): boolean
  
  // Multi-factor scoring
  calculateRiskScore(factors: {
    suicidalIdeation: number;
    selfHarm: number;
    hopelessness: number;
    isolation: number;
    substanceUse: number;
    planSpecificity: number;
  }): number
}
```

#### 4.2 Crisis Response System
```typescript
// Create: components/crisis-intervention.tsx
interface CrisisIntervention {
  level: 'severe' | 'high' | 'moderate';
  primaryAction: JSX.Element;
  secondaryActions: JSX.Element[];
  contactAttempted: boolean;
}

// Crisis overlay that blocks other interactions
function CrisisInterventionModal({ analysis }: { analysis: CrisisAnalysis }) {
  return (
    <Modal blocking priority="critical">
      <div className="crisis-container">
        <h2>We're Concerned About Your Safety</h2>
        
        {/* Immediate action buttons */}
        <button onClick={call988}>Call 988 Now</button>
        <button onClick={call911}>Call 911</button>
        <button onClick={textCrisisLine}>Text Crisis Line</button>
        
        {/* Safety check */}
        <QuestionForm>
          - Are you in a safe location?
          - Are you alone right now?
          - Do you have someone you can call?
        </QuestionForm>
        
        {/* Cannot dismiss without action */}
      </div>
    </Modal>
  );
}
```

#### 4.3 Professional Resource Database
```typescript
// Create: lib/resources-database.ts
interface MentalHealthResource {
  id: string;
  type: 'hotline' | 'therapist' | 'hospital' | 'support_group';
  name: string;
  description: string;
  phone?: string;
  website?: string;
  availability: '24/7' | 'business_hours' | 'scheduled';
  cost: 'free' | 'insurance' | 'sliding_scale' | 'paid';
  languages: string[];
  specialties: string[];
  location?: {
    country: string;
    state?: string;
    city?: string;
    address?: string;
  };
}

const crisisResources: MentalHealthResource[] = [
  {
    id: "988-suicide-lifeline",
    type: "hotline",
    name: "988 Suicide & Crisis Lifeline",
    description: "24/7 free and confidential support for people in distress",
    phone: "988",
    website: "https://988lifeline.org",
    availability: "24/7",
    cost: "free",
    languages: ["English", "Spanish"],
    specialties: ["suicide", "crisis", "emotional_distress"],
    location: { country: "US" }
  },
  // ... 50+ more resources
];
```

#### 4.4 Therapist Finder Integration
```typescript
// Create: app/api/find-therapist/route.ts
interface TherapistSearchParams {
  location: string;
  insurance?: string;
  specialty?: string[];
  availability?: string;
  maxDistance?: number;
}

// Integrate with APIs like:
- Psychology Today
- SAMHSA Treatment Locator
- BetterHelp/Talkspace
- Local insurance networks
```

#### 4.5 Safety Plan Builder
```typescript
// Create: components/safety-plan.tsx
interface SafetyPlan {
  warningSignals: string[];
  copingStrategies: string[];
  socialDistractions: string[];
  emergencyContacts: Contact[];
  professionalContacts: Contact[];
  safeEnvironment: string[];
  reasonsToLive: string[];
}

function SafetyPlanBuilder() {
  // Step-by-step wizard
  // PDF export
  // Quick access widget
  // Share with trusted contacts
}
```

#### 4.6 Real-Time Monitoring System
```typescript
// Create: lib/monitoring.ts
interface MonitoringAlert {
  userId: string;
  timestamp: Date;
  severity: string;
  message: string;
  actionTaken: string;
}

class SafetyMonitor {
  // Log all crisis detections
  logCrisisEvent(analysis: CrisisAnalysis): void
  
  // Optional: Alert designated emergency contact
  notifyEmergencyContact(userId: string, contact: Contact): void
  
  // Generate safety report
  generateReport(userId: string, timeframe: string): SafetyReport
}
```

### New Pages & Features

```
app/
├── resources/
│   ├── page.tsx              # Resource directory
│   ├── crisis/
│   │   └── page.tsx          # Crisis resources
│   └── find-therapist/
│       └── page.tsx          # Therapist finder
├── safety-plan/
│   ├── page.tsx              # Safety plan builder
│   └── view/[id]/
│       └── page.tsx          # View saved plan
└── emergency/
    └── page.tsx              # Emergency intervention

components/
├── crisis-intervention.tsx
├── resource-card.tsx
├── therapist-finder.tsx
└── safety-plan-widget.tsx
```

### Testing Checklist
- [ ] Crisis keywords trigger intervention
- [ ] Escalation levels appropriate
- [ ] Phone numbers dial correctly
- [ ] Resource finder returns results
- [ ] Safety plan saves and loads
- [ ] Emergency contacts work
- [ ] Cannot bypass crisis modal
- [ ] False positive rate acceptable

---

## 🚀 Deployment Strategy

### Phase 1: Development (Current)
```bash
npm run dev
# Test locally on http://localhost:3000
```

### Phase 2: Staging
```bash
# Deploy to Vercel preview
vercel

# Test with:
- Real API keys
- Multiple users
- Mobile devices
- Crisis scenarios
```

### Phase 3: Production
```bash
# Deploy to production
vercel --prod

# Add:
- Custom domain
- Analytics
- Error tracking (Sentry)
- Rate limiting
- HIPAA compliance (if storing data)
```

---

## 📊 Success Metrics

### Technical Metrics
- [ ] Response time < 2 seconds
- [ ] 99.9% uptime
- [ ] Mobile responsive (100% score)
- [ ] Accessibility (WCAG AA)
- [ ] Zero security vulnerabilities

### User Experience Metrics
- [ ] Emotion detection accuracy >80%
- [ ] Crisis detection false positive <5%
- [ ] User satisfaction >4.5/5
- [ ] Average session length >5 minutes
- [ ] Return user rate >30%

### Safety Metrics
- [ ] 100% crisis intervention delivery
- [ ] <1 second crisis detection
- [ ] Professional referral tracking
- [ ] Zero missed emergencies

---

## 🔧 Technology Dependencies

### Core Stack
- Next.js 15
- TypeScript
- Tailwind CSS
- Vercel AI SDK
- OpenAI GPT-4

### Additional Libraries (Parts 2-4)
```json
{
  "dependencies": {
    "recharts": "^2.10.0",           // Charts
    "date-fns": "^3.0.0",            // Date handling
    "zustand": "^4.5.0",             // State management
    "react-hot-toast": "^2.4.1",     // Notifications
    "@tanstack/react-query": "^5.0.0", // Data fetching
    "framer-motion": "^11.0.0"       // Animations
  }
}
```

---

## ⚠️ Critical Considerations

### Legal & Ethical
- [ ] Clear disclaimer about not being therapy
- [ ] HIPAA compliance if storing data
- [ ] Informed consent for data usage
- [ ] Terms of service
- [ ] Privacy policy

### Safety Protocols
- [ ] Mandatory professional resource links
- [ ] Cannot disable crisis detection
- [ ] Logs for crisis interventions
- [ ] Emergency contact system
- [ ] Liability insurance considerations

### Limitations
- [ ] Document what AI can/cannot do
- [ ] Clear about diagnosis limitations
- [ ] Medication advice prohibited
- [ ] No guarantee of outcomes

---

## 🎓 Learning Resources

### Mental Health
- [SAMHSA](https://www.samhsa.gov/)
- [NAMI](https://www.nami.org/)
- [Crisis Text Line](https://www.crisistextline.org/)

### AI Development
- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)

### UX for Mental Health
- [Mindful Design](https://www.mindfuldesign.io/)
- [Accessible Mental Health Apps](https://www.a11yproject.com/)

---

## 🤝 Support & Contribution

For questions or contributions:
1. Review the README.md
2. Check existing issues
3. Follow code style guidelines
4. Test crisis scenarios thoroughly
5. Maintain empathetic tone

---

**Remember**: This is a support tool, not a replacement for professional mental health care. Build responsibly. 💙
