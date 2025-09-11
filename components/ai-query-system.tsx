"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Send, Bot, User, AlertCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIQuerySystem() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your offline AI assistant powered by GPT-OSS-20B. I have access to comprehensive disaster relief information including first aid, shelter construction, emergency protocols, and safety procedures. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Simulate AI responses using pre-loaded knowledge
  const generateResponse = async (query: string): Promise<string> => {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const lowerQuery = query.toLowerCase()

    // Emergency response patterns
    if (lowerQuery.includes("burn") || lowerQuery.includes("fire")) {
      return `For burn treatment:

**Immediate Actions:**
1. Remove from heat source immediately
2. Cool the burn with cool (not cold) running water for 10-20 minutes
3. Remove jewelry/clothing before swelling occurs
4. Do NOT use ice, butter, or oils

**Assessment:**
- **First-degree:** Red, painful, no blisters
- **Second-degree:** Blisters, severe pain
- **Third-degree:** White/charred skin, may be painless

**Treatment:**
- Cover with sterile, non-adhesive bandage
- Give over-the-counter pain medication
- Keep burned area elevated if possible
- Seek medical attention for burns larger than 3 inches or on face/hands/genitals

**Warning Signs:** Infection (increased pain, fever, pus), signs of shock`
    }

    if (lowerQuery.includes("shelter") || lowerQuery.includes("housing")) {
      return `Emergency Shelter Construction:

**Immediate Priorities:**
1. Location: High ground, away from hazards
2. Insulation from ground (use debris, branches)
3. Protection from wind and precipitation
4. Ventilation to prevent carbon monoxide buildup

**Basic Lean-To Shelter:**
- Find or create a ridgepole (fallen tree, branch)
- Lean branches against ridgepole at 45° angle
- Cover with smaller branches, leaves, debris
- Create thick layer for insulation

**Materials Needed:**
- Ridgepole: 6-8 feet long, sturdy
- Support branches: Multiple, various sizes
- Covering: Leaves, pine needles, bark, tarp if available
- Ground insulation: Thick layer of dry materials

**Winter Considerations:**
- Smaller space retains heat better
- Entrance should face away from prevailing wind
- Create air gap in roof for insulation`
    }

    if (lowerQuery.includes("water") || lowerQuery.includes("purif")) {
      return `Water Purification Methods:

**Boiling (Most Reliable):**
- Bring water to rolling boil for 1 minute
- At altitudes above 6,500 feet, boil for 3 minutes
- Let cool before drinking

**Chemical Treatment:**
- Iodine tablets: Follow package instructions
- Bleach: 2 drops per quart, wait 30 minutes
- Water purification tablets: As directed

**Filtration:**
- Cloth filter removes large particles
- Sand/charcoal filter: Layer sand, charcoal, gravel
- Commercial water filters if available

**Solar Disinfection:**
- Clear plastic bottle in direct sunlight
- 6 hours full sun or 2 days partial cloud
- Water temperature should reach 122°F (50°C)

**Signs of Contamination:**
- Unusual color, smell, or taste
- Visible particles or algae
- Source near waste or chemicals`
    }

    if (lowerQuery.includes("bleeding") || lowerQuery.includes("wound")) {
      return `Bleeding Control Protocol:

**Immediate Actions:**
1. **Direct Pressure:** Apply firm, steady pressure with clean cloth
2. **Elevation:** Raise injured area above heart level if possible
3. **Pressure Points:** Apply pressure to arterial pressure points if needed

**Severe Bleeding Steps:**
1. Call for help immediately
2. Apply direct pressure with both hands
3. Do NOT remove embedded objects
4. If blood soaks through, add more layers (don't remove original)
5. Apply tourniquet only if trained and life-threatening

**Wound Assessment:**
- **Minor:** Shallow, edges close together, minimal bleeding
- **Major:** Deep, gaping, heavy bleeding, embedded objects

**Infection Prevention:**
- Clean hands before treating
- Use sterile materials when possible
- Clean wound gently with clean water
- Apply antibiotic ointment if available
- Cover with sterile bandage

**Seek Medical Attention If:**
- Bleeding won't stop after 10 minutes of direct pressure
- Wound is deep or gaping
- Signs of infection develop`
    }

    // Default response for general queries
    return `I understand you're asking about "${query}". Based on my disaster relief knowledge base, I can provide information on:

**Available Topics:**
- First Aid & Medical Emergencies
- Shelter Construction & Safety
- Water Purification & Food Safety
- Emergency Communication
- Fire Safety & Prevention
- Weather-Related Hazards
- Evacuation Procedures
- Psychological First Aid

Please ask a more specific question about any of these topics, and I'll provide detailed, actionable information. For example:
- "How do I treat a sprained ankle?"
- "What materials do I need for emergency shelter?"
- "How can I signal for rescue?"

Remember: In life-threatening emergencies, seek professional medical help immediately if available.`
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    try {
      const response = await generateResponse(input.trim())

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "I apologize, but I encountered an error processing your request. Please try rephrasing your question or ask about a different topic.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Assistant - GPT-OSS-20B
          </CardTitle>
          <CardDescription>Offline AI assistant with comprehensive disaster relief knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chat Messages */}
            <ScrollArea className="h-96 w-full border rounded-lg p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        <div className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-muted text-muted-foreground rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
                          <span className="text-sm">Processing your request...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask about first aid, shelter, emergency protocols, or any disaster relief topic..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[60px] resize-none"
                disabled={isProcessing}
              />
              <Button onClick={handleSendMessage} disabled={!input.trim() || isProcessing} className="px-4">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => setInput("How do I treat severe bleeding?")}
              >
                Bleeding Control
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => setInput("How to build emergency shelter?")}
              >
                Emergency Shelter
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => setInput("Water purification methods")}
              >
                Water Safety
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => setInput("How to signal for rescue?")}
              >
                Rescue Signals
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Model Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            AI Model Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Model Details</h4>
              <div className="space-y-1 text-sm">
                <div>Model: GPT-OSS-20B</div>
                <div>Status: Offline Ready</div>
                <div>Knowledge Base: Disaster Relief Focused</div>
                <div>Last Updated: Current Session</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Capabilities</h4>
              <div className="space-y-1 text-sm">
                <div>✓ First Aid Procedures</div>
                <div>✓ Emergency Shelter Construction</div>
                <div>✓ Safety Protocols</div>
                <div>✓ Resource Management</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
