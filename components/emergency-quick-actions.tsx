"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Phone, Zap, Shield, Radio } from "lucide-react"

interface EmergencyQuickActionsProps {
  onSectionChange: (section: string) => void
}

export function EmergencyQuickActions({ onSectionChange }: EmergencyQuickActionsProps) {
  const emergencyActions = [
    {
      title: "MEDICAL EMERGENCY",
      description: "Life-threatening injuries",
      icon: Heart,
      action: () => onSectionChange("first-aid"),
      variant: "destructive" as const,
      urgent: true,
      hotkey: "M",
    },
    {
      title: "CALL FOR HELP",
      description: "Emergency contacts",
      icon: Phone,
      action: () => alert("Emergency Numbers:\n911 - General Emergency\n112 - International\nLocal Emergency Services"),
      variant: "destructive" as const,
      urgent: true,
      hotkey: "C",
    },
    {
      title: "FIND SHELTER",
      description: "Immediate protection",
      icon: Shield,
      action: () => onSectionChange("shelter"),
      variant: "secondary" as const,
      urgent: false,
      hotkey: "S",
    },
    {
      title: "SIGNAL RESCUE",
      description: "Attract attention",
      icon: Radio,
      action: () => onSectionChange("protocols"),
      variant: "secondary" as const,
      urgent: false,
      hotkey: "R",
    },
  ]

  return (
    <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
          <Zap className="w-5 h-5" />
          EMERGENCY ACTIONS
          <Badge variant="destructive" className="ml-auto">
            CRITICAL
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {emergencyActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant={action.variant}
                size="lg"
                className={`h-20 flex-col gap-2 relative ${
                  action.urgent
                    ? "border-2 border-red-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    : "hover:scale-105 transition-transform"
                }`}
                onClick={action.action}
              >
                <div className="absolute top-1 right-1 text-xs opacity-60">{action.hotkey}</div>
                <Icon className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-bold text-xs">{action.title}</div>
                  <div className="text-xs opacity-80">{action.description}</div>
                </div>
              </Button>
            )
          })}
        </div>
        <div className="mt-4 text-xs text-center text-muted-foreground">
          Press the letter keys (M, C, S, R) for quick access to emergency actions
        </div>
      </CardContent>
    </Card>
  )
}
