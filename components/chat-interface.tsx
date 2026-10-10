"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Mic,
  Heart,
  Sparkles,
  User,
  Bot,
  Activity,
  AlertCircle,
} from "lucide-react";
import { useChat } from "ai/react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  emotion?: string;
  timestamp?: Date;
}

export default function ChatInterface() {
  const [isListening, setIsListening] = useState(false);
  const [moodScore, setMoodScore] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      onFinish: (message) => {
        // Extract emotion from response if present
        if (message.content.includes("[EMOTION:")) {
          const emotionMatch = message.content.match(/\[EMOTION:\s*(\w+)\]/);
          if (emotionMatch) {
            const emotion = emotionMatch[1];
            updateMoodScore(emotion);
          }
        }
      },
    });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const updateMoodScore = (emotion: string) => {
    const emotionScores: Record<string, number> = {
      calm: 85,
      happy: 90,
      neutral: 70,
      anxious: 40,
      stressed: 35,
      sad: 30,
      depressed: 20,
      crisis: 10,
    };
    setMoodScore(emotionScores[emotion.toLowerCase()] || 50);
  };

  const getMoodColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    if (score >= 30) return "bg-orange-500";
    return "bg-red-500";
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleInputChange({
        target: { value: transcript },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="h-8 w-8 text-pink-500 animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MindfulAI Companion
          </h1>
          <Sparkles className="h-8 w-8 text-yellow-500" />
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Your safe space for mental wellness and support
        </p>

        {/* Mood Indicator */}
        {moodScore !== null && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <Activity className="h-5 w-5 text-gray-600" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Current Mood:
              </span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getMoodColor(moodScore)} transition-all duration-500`}
                  style={{ width: `${moodScore}%` }}
                />
              </div>
              <Badge variant="secondary">{moodScore}/100</Badge>
            </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-700">
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Bot className="h-16 w-16 mx-auto mb-4 text-blue-500" />
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Welcome! I'm here to listen.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Feel free to share what's on your mind. Whether you're feeling
                stressed, anxious, or just need someone to talk to, I'm here for
                you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {[
                  "I'm feeling stressed about work",
                  "I need help managing anxiety",
                  "I'm having trouble sleeping",
                  "I'd like some breathing exercises",
                ].map((prompt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="text-left justify-start h-auto py-3 px-4"
                    onClick={() => {
                      handleInputChange({
                        target: { value: prompt },
                      } as React.ChangeEvent<HTMLInputElement>);
                    }}
                  >
                    <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{prompt}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </Avatar>
                )}

                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content.replace(/\[EMOTION:\s*\w+\]/g, "")}
                  </p>
                  {message.role === "assistant" &&
                    message.content.includes("🚨") && (
                      <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-600 dark:text-red-400">
                          If you're in crisis, please reach out to a professional
                          immediately.
                        </p>
                      </div>
                    )}
                </div>

                {message.role === "user" && (
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </Avatar>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 items-end max-w-4xl mx-auto"
          >
            <Button
              type="button"
              size="icon"
              variant="outline"
              className={`flex-shrink-0 h-12 w-12 ${
                isListening ? "bg-red-100 border-red-500" : ""
              }`}
              onClick={handleVoiceInput}
              disabled={isLoading}
            >
              <Mic
                className={`h-5 w-5 ${
                  isListening ? "text-red-500 animate-pulse" : ""
                }`}
              />
            </Button>

            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Share what's on your mind..."
              className="flex-1 h-12 text-base"
              disabled={isLoading}
            />

            <Button
              type="submit"
              size="icon"
              className="flex-shrink-0 h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-3">
            This AI companion provides support but is not a substitute for
            professional mental health care.
          </p>
        </div>
      </Card>

      {/* Emergency Resources Footer */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold">Emergency?</span> Call{" "}
          <a
            href="tel:988"
            className="text-blue-600 hover:underline font-semibold"
          >
            988 (US)
          </a>{" "}
          or{" "}
          <a
            href="tel:911"
            className="text-red-600 hover:underline font-semibold"
          >
            911
          </a>
        </p>
      </div>
    </div>
  );
}
