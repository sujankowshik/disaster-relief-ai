"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Wifi, WifiOff, Database, Cpu, HardDrive, RefreshCw } from "lucide-react"
import { offlineStorage } from "@/lib/offline-storage"

interface StatusBarProps {
  isOffline: boolean
}

export function StatusBar({ isOffline }: StatusBarProps) {
  const [storageStats, setStorageStats] = useState({ queriesCount: 0, storageUsed: "0 KB" })
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [aiModelStatus, setAiModelStatus] = useState<"ready" | "loading" | "error">("ready")

  useEffect(() => {
    const updateStats = () => {
      const stats = offlineStorage.getStorageStats()
      setStorageStats(stats)
      setLastUpdate(new Date())
    }

    updateStats()
    const interval = setInterval(updateStats, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setLastUpdate(new Date())
    // Simulate AI model check
    setAiModelStatus("loading")
    setTimeout(() => setAiModelStatus("ready"), 1000)
  }

  return (
    <div className="border-t bg-muted/30 px-4 py-2">
      <div className="flex items-center justify-between text-xs">
        {/* Left side - Connection and AI Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
            <span className={isOffline ? "text-red-600" : "text-green-600"}>{isOffline ? "Offline" : "Online"}</span>
          </div>

          <div className="flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            <span>AI Model:</span>
            <Badge
              variant={
                aiModelStatus === "ready" ? "default" : aiModelStatus === "loading" ? "secondary" : "destructive"
              }
              className="text-xs px-1 py-0"
            >
              {aiModelStatus === "ready" ? "Ready" : aiModelStatus === "loading" ? "Loading" : "Error"}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <Database className="w-3 h-3" />
            <span>{storageStats.queriesCount} queries cached</span>
          </div>
        </div>

        {/* Center - Storage Usage */}
        <div className="flex items-center gap-2">
          <HardDrive className="w-3 h-3" />
          <span>Storage: {storageStats.storageUsed}</span>
          <Progress
            value={Math.min((Number.parseInt(storageStats.storageUsed) / 1024) * 100, 100)}
            className="w-16 h-1"
          />
        </div>

        {/* Right side - Last Update and Refresh */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            Updated: {lastUpdate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          <Button variant="ghost" size="sm" onClick={handleRefresh} className="h-6 w-6 p-0">
            <RefreshCw className={`w-3 h-3 ${aiModelStatus === "loading" ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}
