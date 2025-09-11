"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Settings,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff,
  Shield,
  AlertTriangle,
} from "lucide-react"
import { offlineStorage } from "@/lib/offline-storage"

export function SettingsView() {
  const [offlineMode, setOfflineMode] = useState(true)
  const [autoSync, setAutoSync] = useState(false)
  const [compressionEnabled, setCompressionEnabled] = useState(true)
  const [debugMode, setDebugMode] = useState(false)
  const [exportData, setExportData] = useState("")

  const handleExportData = () => {
    const data = offlineStorage.exportData()
    setExportData(data)
  }

  const handleImportData = () => {
    if (exportData) {
      const success = offlineStorage.importData(exportData)
      if (success) {
        alert("Data imported successfully!")
        setExportData("")
      } else {
        alert("Failed to import data. Please check the format.")
      }
    }
  }

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all stored data? This action cannot be undone.")) {
      offlineStorage.clearAllData()
      alert("All data cleared successfully!")
    }
  }

  const storageStats = offlineStorage.getStorageStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your disaster relief hub preferences and data management</p>
      </div>

      {/* System Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            System Configuration
          </CardTitle>
          <CardDescription>Core system settings and operational modes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Offline Mode</div>
              <div className="text-xs text-muted-foreground">Operate without internet connection using cached data</div>
            </div>
            <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Auto-Sync</div>
              <div className="text-xs text-muted-foreground">Automatically sync data when connection is available</div>
            </div>
            <Switch checked={autoSync} onCheckedChange={setAutoSync} disabled={offlineMode} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Data Compression</div>
              <div className="text-xs text-muted-foreground">Compress stored data to save space</div>
            </div>
            <Switch checked={compressionEnabled} onCheckedChange={setCompressionEnabled} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Debug Mode</div>
              <div className="text-xs text-muted-foreground">Enable detailed logging for troubleshooting</div>
            </div>
            <Switch checked={debugMode} onCheckedChange={setDebugMode} />
          </div>
        </CardContent>
      </Card>

      {/* AI Model Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            AI Model Configuration
          </CardTitle>
          <CardDescription>GPT-OSS-20B model settings and performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Model Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Model:</span>
                  <Badge variant="default">GPT-OSS-20B</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant="default">Ready</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Memory Usage:</span>
                  <span>14.2 GB</span>
                </div>
                <div className="flex justify-between">
                  <span>Response Time:</span>
                  <span>~2.3s avg</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Performance Metrics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Accuracy</span>
                    <span>98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Coverage</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Reliability</span>
                    <span>99%</span>
                  </div>
                  <Progress value={99} className="h-2" />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Restart Model
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Update Model
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Management
          </CardTitle>
          <CardDescription>Manage offline data storage and backups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Storage Statistics */}
          <div>
            <h4 className="font-semibold mb-3">Storage Statistics</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <HardDrive className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{storageStats.storageUsed}</div>
                <div className="text-sm text-muted-foreground">Storage Used</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Database className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{storageStats.queriesCount}</div>
                <div className="text-sm text-muted-foreground">Cached Queries</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Shield className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">575</div>
                <div className="text-sm text-muted-foreground">Procedures</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Data Export/Import */}
          <div>
            <h4 className="font-semibold mb-3">Data Backup & Restore</h4>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleExportData} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button onClick={handleImportData} variant="outline" disabled={!exportData}>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
                <Button onClick={handleClearData} variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Data
                </Button>
              </div>

              {exportData && (
                <div>
                  <label className="text-sm font-medium">Exported Data (JSON)</label>
                  <Textarea
                    value={exportData}
                    onChange={(e) => setExportData(e.target.value)}
                    className="mt-1 font-mono text-xs"
                    rows={8}
                    placeholder="Exported data will appear here..."
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network & Connectivity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {offlineMode ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
            Network & Connectivity
          </CardTitle>
          <CardDescription>Connection status and offline capabilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Connection Status</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${offlineMode ? "bg-red-500" : "bg-green-500"}`} />
                  <span className="text-sm">{offlineMode ? "Offline Mode Active" : "Online"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm">Local Database Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm">AI Model Loaded</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Offline Capabilities</h4>
              <div className="space-y-1 text-sm">
                <div>✓ Full AI assistance available</div>
                <div>✓ Complete procedure database</div>
                <div>✓ Search functionality</div>
                <div>✓ Data persistence</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Application</h4>
              <div className="space-y-1 text-sm">
                <div>Version: 1.0.0</div>
                <div>Build: Emergency Release</div>
                <div>Last Updated: Current Session</div>
                <div>Platform: Web Application</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Emergency Features</h4>
              <div className="space-y-1 text-sm">
                <div>✓ Offline Operation</div>
                <div>✓ AI-Powered Assistance</div>
                <div>✓ Comprehensive Database</div>
                <div>✓ Quick Response Interface</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
