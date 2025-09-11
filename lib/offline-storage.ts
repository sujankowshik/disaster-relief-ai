"use client"

// Offline storage utilities for disaster relief data
export interface StoredQuery {
  id: string
  query: string
  response: string
  timestamp: Date
  category: string
}

export interface UserPreferences {
  favoriteTopics: string[]
  recentSearches: string[]
  offlineMode: boolean
  lastSync: Date
}

class OfflineStorage {
  private readonly QUERIES_KEY = "disaster-relief-queries"
  private readonly PREFERENCES_KEY = "disaster-relief-preferences"
  private readonly MAX_STORED_QUERIES = 100
  private readonly MAX_RECENT_SEARCHES = 20

  // Query History Management
  saveQuery(query: string, response: string, category = "general"): void {
    try {
      const queries = this.getStoredQueries()
      const newQuery: StoredQuery = {
        id: Date.now().toString(),
        query,
        response,
        timestamp: new Date(),
        category,
      }

      queries.unshift(newQuery)

      // Keep only the most recent queries
      if (queries.length > this.MAX_STORED_QUERIES) {
        queries.splice(this.MAX_STORED_QUERIES)
      }

      localStorage.setItem(this.QUERIES_KEY, JSON.stringify(queries))
    } catch (error) {
      console.warn("Failed to save query to offline storage:", error)
    }
  }

  getStoredQueries(): StoredQuery[] {
    try {
      const stored = localStorage.getItem(this.QUERIES_KEY)
      if (!stored) return []

      const queries = JSON.parse(stored)
      return queries.map((q: any) => ({
        ...q,
        timestamp: new Date(q.timestamp),
      }))
    } catch (error) {
      console.warn("Failed to retrieve stored queries:", error)
      return []
    }
  }

  searchStoredQueries(searchTerm: string): StoredQuery[] {
    const queries = this.getStoredQueries()
    const term = searchTerm.toLowerCase()

    return queries.filter(
      (query) =>
        query.query.toLowerCase().includes(term) ||
        query.response.toLowerCase().includes(term) ||
        query.category.toLowerCase().includes(term),
    )
  }

  // User Preferences Management
  savePreferences(preferences: Partial<UserPreferences>): void {
    try {
      const current = this.getPreferences()
      const updated = { ...current, ...preferences }
      localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(updated))
    } catch (error) {
      console.warn("Failed to save preferences:", error)
    }
  }

  getPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(this.PREFERENCES_KEY)
      if (!stored) {
        return {
          favoriteTopics: [],
          recentSearches: [],
          offlineMode: true,
          lastSync: new Date(),
        }
      }

      const prefs = JSON.parse(stored)
      return {
        ...prefs,
        lastSync: new Date(prefs.lastSync),
      }
    } catch (error) {
      console.warn("Failed to retrieve preferences:", error)
      return {
        favoriteTopics: [],
        recentSearches: [],
        offlineMode: true,
        lastSync: new Date(),
      }
    }
  }

  addRecentSearch(searchTerm: string): void {
    const preferences = this.getPreferences()
    const searches = preferences.recentSearches.filter((s) => s !== searchTerm)
    searches.unshift(searchTerm)

    if (searches.length > this.MAX_RECENT_SEARCHES) {
      searches.splice(this.MAX_RECENT_SEARCHES)
    }

    this.savePreferences({ recentSearches: searches })
  }

  toggleFavoriteTopic(topic: string): void {
    const preferences = this.getPreferences()
    const favorites = preferences.favoriteTopics.includes(topic)
      ? preferences.favoriteTopics.filter((t) => t !== topic)
      : [...preferences.favoriteTopics, topic]

    this.savePreferences({ favoriteTopics: favorites })
  }

  // Data Export/Import for backup
  exportData(): string {
    const queries = this.getStoredQueries()
    const preferences = this.getPreferences()

    return JSON.stringify(
      {
        queries,
        preferences,
        exportDate: new Date(),
        version: "1.0",
      },
      null,
      2,
    )
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)

      if (data.queries) {
        localStorage.setItem(this.QUERIES_KEY, JSON.stringify(data.queries))
      }

      if (data.preferences) {
        localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(data.preferences))
      }

      return true
    } catch (error) {
      console.error("Failed to import data:", error)
      return false
    }
  }

  // Storage cleanup
  clearAllData(): void {
    try {
      localStorage.removeItem(this.QUERIES_KEY)
      localStorage.removeItem(this.PREFERENCES_KEY)
    } catch (error) {
      console.warn("Failed to clear storage:", error)
    }
  }

  getStorageStats(): { queriesCount: number; storageUsed: string } {
    const queries = this.getStoredQueries()
    const totalSize = new Blob([
      localStorage.getItem(this.QUERIES_KEY) || "",
      localStorage.getItem(this.PREFERENCES_KEY) || "",
    ]).size

    return {
      queriesCount: queries.length,
      storageUsed: `${(totalSize / 1024).toFixed(1)} KB`,
    }
  }
}

export const offlineStorage = new OfflineStorage()

// Service Worker registration for true offline functionality
export function registerServiceWorker(): void {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration)
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error)
      })
  }
}

// Check if app is running offline
export function isOffline(): boolean {
  return !navigator.onLine
}

// Listen for online/offline events
export function setupOfflineListeners(callback: (isOffline: boolean) => void): () => void {
  const handleOnline = () => callback(false)
  const handleOffline = () => callback(true)

  window.addEventListener("online", handleOnline)
  window.addEventListener("offline", handleOffline)

  return () => {
    window.removeEventListener("online", handleOnline)
    window.removeEventListener("offline", handleOffline)
  }
}
