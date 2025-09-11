"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  Home,
  Shield,
  MessageCircle,
  Search,
  Settings,
  Download,
  Upload,
  Database,
  Wifi,
  WifiOff,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Clock,
  Star,
} from "lucide-react"

interface NavigationSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isOffline: boolean
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function NavigationSidebar({
  activeSection,
  onSectionChange,
  isOffline,
  isCollapsed,
  onToggleCollapse,
}: NavigationSidebarProps) {
  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Shield,
      description: "Overview and quick actions",
    },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      icon: MessageCircle,
      description: "GPT-OSS-20B powered help",
    },
    {
      id: "first-aid",
      label: "First Aid",
      icon: Heart,
      description: "Medical emergency procedures",
      badge: "127",
    },
    {
      id: "shelter",
      label: "Shelter",
      icon: Home,
      description: "Emergency housing guides",
      badge: "89",
    },
    {
      id: "protocols",
      label: "Protocols",
      icon: AlertTriangle,
      description: "Emergency response procedures",
      badge: "156",
    },
    {
      id: "search",
      label: "Search",
      icon: Search,
      description: "Find specific information",
    },
  ]

  const utilityItems = [
    {
      id: "favorites",
      label: "Favorites",
      icon: Star,
      description: "Saved procedures",
    },
    {
      id: "history",
      label: "History",
      icon: Clock,
      description: "Recent queries",
    },
    {
      id: "offline-data",
      label: "Offline Data",
      icon: Database,
      description: "Manage local storage",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description: "App configuration",
    },
  ]

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 border-r bg-card flex flex-col h-full`}
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Relief Hub</h2>
                <p className="text-xs text-muted-foreground">AI-Powered</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={onToggleCollapse}>
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="mt-3">
            <Badge variant={isOffline ? "destructive" : "default"} className="flex items-center gap-1 w-fit">
              {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
              {isOffline ? "Offline Mode" : "Online"}
            </Badge>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-1">
          {/* Main Navigation */}
          <div className="space-y-1">
            {!isCollapsed && <p className="px-2 text-xs font-medium text-muted-foreground mb-2">MAIN</p>}
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start ${isCollapsed ? "px-2" : "px-3"} h-10`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="ml-2 flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant="outline" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              )
            })}
          </div>

          <Separator className="my-4" />

          {/* Utility Navigation */}
          <div className="space-y-1">
            {!isCollapsed && <p className="px-2 text-xs font-medium text-muted-foreground mb-2">TOOLS</p>}
            {utilityItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start ${isCollapsed ? "px-2" : "px-3"} h-10`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-2 flex-1 text-left">{item.label}</span>}
                </Button>
              )
            })}
          </div>
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      {!isCollapsed && (
        <div className="p-4 border-t space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            <Upload className="w-4 h-4 mr-2" />
            Import Data
          </Button>
        </div>
      )}
    </div>
  )
}
