"use client"

import { useState, useEffect } from "react"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { StatusBar } from "@/components/status-bar"
import { AIQuerySystem } from "@/components/ai-query-system"
import { EmergencyDatabase } from "@/components/emergency-database"
import { DashboardView } from "@/components/dashboard-view"
import { SearchView } from "@/components/search-view"
import { SettingsView } from "@/components/settings-view"
import { EmergencyQuickActions } from "@/components/emergency-quick-actions"
import { setupOfflineListeners } from "@/lib/offline-storage"

export default function DisasterReliefHub() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isOffline, setIsOffline] = useState(true) // Default to offline mode
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    // Set up offline/online listeners
    const cleanup = setupOfflineListeners(setIsOffline)

    // Initialize with current online status
    setIsOffline(!navigator.onLine)

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case "m":
            setActiveSection("first-aid")
            break
          case "c":
            alert("Emergency Numbers:\n911 - General Emergency\n112 - International\nLocal Emergency Services")
            break
          case "s":
            setActiveSection("shelter")
            break
          case "r":
            setActiveSection("protocols")
            break
          case "a":
            setActiveSection("ai-assistant")
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => {
      cleanup()
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardView onSectionChange={setActiveSection} isOffline={isOffline} />
      case "ai-assistant":
        return <AIQuerySystem />
      case "first-aid":
        return <EmergencyDatabase category="first-aid" />
      case "shelter":
        return <EmergencyDatabase category="shelter" />
      case "protocols":
        return <EmergencyDatabase category="protocols" />
      case "search":
        return <SearchView />
      case "settings":
        return <SettingsView />
      default:
        return <DashboardView onSectionChange={setActiveSection} isOffline={isOffline} />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="p-4 border-b">
        <EmergencyQuickActions onSectionChange={setActiveSection} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <NavigationSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOffline={isOffline}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto p-6">{renderContent()}</main>

          {/* Status Bar */}
          <StatusBar isOffline={isOffline} />
        </div>
      </div>
    </div>
  )
}
