"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Clock, Star, Database, MessageCircle } from "lucide-react"
import { offlineStorage } from "@/lib/offline-storage"

export function SearchView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [recentSearches] = useState([
    "severe bleeding treatment",
    "emergency shelter materials",
    "water purification tablets",
    "earthquake safety protocol",
    "burn first aid steps",
  ])

  const searchCategories = [
    { id: "all", label: "All Results", count: 575 },
    { id: "first-aid", label: "First Aid", count: 127 },
    { id: "shelter", label: "Shelter", count: 89 },
    { id: "protocols", label: "Protocols", count: 156 },
    { id: "survival", label: "Survival", count: 203 },
  ]

  const mockSearchResults = [
    {
      id: "1",
      title: "Severe Bleeding Control Protocol",
      category: "first-aid",
      excerpt:
        "Immediate steps to control life-threatening bleeding using direct pressure, elevation, and pressure points...",
      relevance: 98,
      type: "procedure",
    },
    {
      id: "2",
      title: "Emergency Tourniquet Application",
      category: "first-aid",
      excerpt: "When and how to properly apply a tourniquet for severe limb bleeding in emergency situations...",
      relevance: 95,
      type: "procedure",
    },
    {
      id: "3",
      title: "Shock Prevention and Treatment",
      category: "first-aid",
      excerpt: "Recognizing signs of shock and immediate treatment steps to prevent deterioration...",
      relevance: 87,
      type: "procedure",
    },
  ]

  const filteredResults = useMemo(() => {
    if (!searchTerm) return []
    return mockSearchResults.filter((result) => {
      const matchesSearch =
        result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = activeTab === "all" || result.category === activeTab
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, activeTab])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term) {
      offlineStorage.addRecentSearch(term)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Search Emergency Information</h1>
        <p className="text-muted-foreground mt-1">
          Find specific procedures, protocols, and guidance from our comprehensive offline database
        </p>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Database
          </CardTitle>
          <CardDescription>Search through 575+ emergency procedures and protocols</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Input */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search for procedures, symptoms, materials, or keywords..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {/* Category Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                {searchCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs">
                    {category.label}
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Recent Searches */}
            {!searchTerm && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSearch(search)}
                      className="text-xs"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchTerm && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {filteredResults.length} results for "{searchTerm}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{result.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{result.relevance}% match</Badge>
                        <Button variant="ghost" size="sm">
                          <Star className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{result.excerpt}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {result.category.replace("-", " ")}
                      </Badge>
                      <Badge variant="outline">{result.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
                <p className="text-muted-foreground">
                  Try different keywords or check the spelling of your search terms.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Search Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Search Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Effective Search Terms</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use specific symptoms: "chest pain", "difficulty breathing"</li>
                <li>• Include materials: "bandage", "splint", "tourniquet"</li>
                <li>• Search by situation: "earthquake", "fire", "flood"</li>
                <li>• Use action words: "treat", "build", "purify"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Available Categories</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• First Aid: Medical procedures and treatments</li>
                <li>• Shelter: Construction and safety guidelines</li>
                <li>• Protocols: Emergency response procedures</li>
                <li>• Survival: Resource management and safety</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Quick Access
          </CardTitle>
          <CardDescription>Frequently accessed emergency information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {[
              "CPR Instructions",
              "Heimlich Maneuver",
              "Burn Treatment",
              "Fracture Splinting",
              "Emergency Shelter",
              "Water Purification",
            ].map((item, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start bg-transparent"
                onClick={() => handleSearch(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
