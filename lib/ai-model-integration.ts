"use client"

// AI Model Integration for GPT-OSS-20B
// This simulates the integration with the offline GPT-OSS-20B model

export interface AIModelConfig {
  modelName: string
  maxTokens: number
  temperature: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
}

export interface AIResponse {
  text: string
  confidence: number
  processingTime: number
  tokensUsed: number
}

class GPTOSSModel {
  private config: AIModelConfig
  private isLoaded = false
  private knowledgeBase: Map<string, string[]>

  constructor() {
    this.config = {
      modelName: "gpt-oss-20b",
      maxTokens: 2048,
      temperature: 0.7,
      topP: 0.9,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
    }

    this.knowledgeBase = new Map([
      [
        "bleeding",
        [
          "Apply direct pressure with clean cloth",
          "Elevate injured area above heart level",
          "Use pressure points if bleeding continues",
          "Do not remove embedded objects",
          "Monitor for signs of shock",
        ],
      ],
      [
        "burns",
        [
          "Remove from heat source immediately",
          "Cool with running water for 10-20 minutes",
          "Remove jewelry before swelling",
          "Cover with sterile bandage",
          "Never use ice, butter, or oils",
        ],
      ],
      [
        "shelter",
        [
          "Choose location away from hazards",
          "Insulate from ground using debris",
          "Create windbreak and roof",
          "Ensure proper ventilation",
          "Make entrance face away from wind",
        ],
      ],
      [
        "water",
        [
          "Boil water for 1 minute minimum",
          "Use water purification tablets",
          "Filter through cloth first",
          "Solar disinfection in clear bottles",
          "Avoid stagnant or contaminated sources",
        ],
      ],
      [
        "earthquake",
        [
          "Drop, Cover, and Hold On",
          "Stay away from windows and heavy objects",
          "If outdoors, move away from buildings",
          "Do not run outside during shaking",
          "Check for injuries after shaking stops",
        ],
      ],
    ])

    this.initializeModel()
  }

  private async initializeModel(): Promise<void> {
    // Simulate model loading time
    await new Promise((resolve) => setTimeout(resolve, 2000))
    this.isLoaded = true
    console.log("GPT-OSS-20B model loaded successfully")
  }

  public async generateResponse(prompt: string, context?: string): Promise<AIResponse> {
    const startTime = Date.now()

    if (!this.isLoaded) {
      throw new Error("Model not loaded yet")
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Generate response based on knowledge base
    const response = this.processPrompt(prompt, context)
    const processingTime = Date.now() - startTime

    return {
      text: response.text,
      confidence: response.confidence,
      processingTime,
      tokensUsed: Math.floor(response.text.length / 4), // Rough token estimation
    }
  }

  private processPrompt(prompt: string, context?: string): { text: string; confidence: number } {
    const lowerPrompt = prompt.toLowerCase()
    let bestMatch = ""
    let confidence = 0.5

    // Check for keyword matches in knowledge base
    for (const [keyword, instructions] of this.knowledgeBase.entries()) {
      if (lowerPrompt.includes(keyword)) {
        confidence = Math.min(0.95, confidence + 0.3)
        bestMatch = this.formatInstructions(keyword, instructions)
        break
      }
    }

    // If no specific match, provide general guidance
    if (!bestMatch) {
      bestMatch = this.generateGeneralResponse(prompt)
      confidence = 0.7
    }

    return { text: bestMatch, confidence }
  }

  private formatInstructions(topic: string, instructions: string[]): string {
    const topicTitles: Record<string, string> = {
      bleeding: "Bleeding Control",
      burns: "Burn Treatment",
      shelter: "Emergency Shelter",
      water: "Water Safety",
      earthquake: "Earthquake Response",
    }

    const title = topicTitles[topic] || topic.charAt(0).toUpperCase() + topic.slice(1)

    return `**${title} Protocol:**

**Immediate Actions:**
${instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join("\n")}

**Important Notes:**
- Follow these steps in order for best results
- Seek professional medical help when available
- Stay calm and assess the situation continuously
- Prioritize safety of yourself and others

**Remember:** These are emergency guidelines. Professional medical attention should be sought as soon as possible for serious injuries or conditions.`
  }

  private generateGeneralResponse(prompt: string): string {
    return `I understand you're asking about "${prompt}". 

**General Emergency Guidance:**

1. **Assess the Situation:** Ensure your safety first before helping others
2. **Call for Help:** If possible, contact emergency services immediately
3. **Provide Basic Care:** Use your training and available resources
4. **Monitor Continuously:** Watch for changes in condition
5. **Document:** Keep track of what happened and treatments given

**Available Information:**
I have detailed knowledge about:
- First Aid & Medical Emergencies
- Emergency Shelter Construction  
- Water Purification & Safety
- Natural Disaster Response
- Basic Survival Techniques

Please ask a more specific question about any of these topics for detailed, step-by-step guidance.

**Emergency Priority:** Life-threatening conditions require immediate professional medical attention when available.`
  }

  public getModelStatus(): {
    isLoaded: boolean
    modelName: string
    memoryUsage: string
    responseTime: string
  } {
    return {
      isLoaded: this.isLoaded,
      modelName: this.config.modelName,
      memoryUsage: "14.2 GB",
      responseTime: "~2.3s avg",
    }
  }

  public updateConfig(newConfig: Partial<AIModelConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }
}

// Export singleton instance
export const aiModel = new GPTOSSModel()

// Utility functions for AI integration
export async function queryAI(prompt: string, context?: string): Promise<AIResponse> {
  try {
    return await aiModel.generateResponse(prompt, context)
  } catch (error) {
    console.error("AI query failed:", error)
    throw new Error("AI model is currently unavailable. Please try again.")
  }
}

export function getAIStatus() {
  return aiModel.getModelStatus()
}

export function configureAI(config: Partial<AIModelConfig>) {
  aiModel.updateConfig(config)
}
