"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Heart,
  Home,
  Shield,
  MessageCircle,
  Database,
  Clock,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

interface DashboardViewProps {
  onSectionChange: (section: string) => void
  isOffline: boolean
}

export function DashboardView({ onSectionChange, isOffline }: DashboardViewProps) {
  const quickActions = [
    {
      title: "Medical Emergency",
      description: "First aid protocols",
      icon: Heart,
      action: () => onSectionChange("first-aid"),
      variant: "destructive" as const,
      urgent: true,
    },
    {
      title: "Find Shelter",
      description: "Emergency housing",
      icon: Home,
      action: () => onSectionChange("shelter"),
      variant: "outline" as const,
      urgent: false,
    },
    {
      title: "Ask AI Assistant",
      description: "Get instant help",
      icon: MessageCircle,
      action: () => onSectionChange("ai-assistant"),
      variant: "outline" as const,
      urgent: false,
    },
    {
      title: "Emergency Protocols",
      description: "Response procedures",
      icon: Shield,
      action: () => onSectionChange("protocols"),
      variant: "outline" as const,
      urgent: false,
    },
  ]

  const systemStats = [
    { label: "AI Model", value: "GPT-OSS-20B", status: "Ready", color: "green" },
    { label: "Database", value: "575 entries", status: "Loaded", color: "blue" },
    {
      label: "Offline Mode",
      value: isOffline ? "Active" : "Inactive",
      status: "Ready",
      color: isOffline ? "orange" : "gray",
    },
    { label: "Storage Used", value: "2.3 MB", status: "Available", color: "green" },
  ]

  const recentActivity = [
    { query: "How to treat severe burns?", time: "2 min ago", category: "First Aid" },
    { query: "Emergency shelter construction", time: "5 min ago", category: "Shelter" },
    { query: "Water purification methods", time: "8 min ago", category: "Survival" },
    { query: "Earthquake response protocol", time: "12 min ago", category: "Protocols" },
  ]

  const informationCategories = [
    { name: "First Aid Procedures", count: 127, icon: Heart, color: "red" },
    { name: "Shelter Guidelines", count: 89, icon: Home, color: "blue" },
    { name: "Emergency Protocols", count: 156, icon: Shield, color: "orange" },
    { name: "Safety Procedures", count: 203, icon: AlertTriangle, color: "yellow" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Disaster Relief Hub
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          AI-powered emergency information system - Ready for offline operation
        </p>
        <div className="mt-4 flex justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            🏆 Hackathon Project - Disaster Relief AI
          </div>
        </div>
      </div>

      {/* Emergency Alert Banner */}
      <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 animate-pulse" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 dark:text-red-200">Emergency Mode Active</h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                System is operating in offline mode with full access to emergency procedures and AI assistance.
              </p>
            </div>
            <Badge variant="destructive" className="animate-pulse">
              OFFLINE READY
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            Emergency Quick Actions
          </CardTitle>
          <CardDescription>Critical information and actions for immediate response</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  variant={action.variant}
                  className={`h-20 flex-col gap-2 ${
                    action.urgent ? "border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20" : ""
                  }`}
                  onClick={action.action}
                >
                  <Icon className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-semibold text-sm">{action.title}</div>
                    <div className="text-xs opacity-70">{action.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.value}</div>
                </div>
                <Badge variant={stat.color === "green" ? "default" : stat.color === "orange" ? "secondary" : "outline"}>
                  {stat.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.query}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Information Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Available Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {informationCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <Badge variant="outline">{category.count}</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Model Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            AI Assistant Information
          </CardTitle>
          <CardDescription>GPT-OSS-20B model ready for offline emergency assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-3">Model Capabilities</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">First Aid & Medical Procedures</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Emergency Shelter Construction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Safety Protocols & Procedures</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Resource Management</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Response Accuracy</span>
                    <span>98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Knowledge Coverage</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Offline Readiness</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
