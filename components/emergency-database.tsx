"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Heart, Home, Shield, AlertTriangle, Clock, Star } from "lucide-react"

interface EmergencyInfo {
  id: string
  title: string
  category: string
  priority: "critical" | "high" | "medium" | "low"
  timeToRead: string
  content: string
  steps?: string[]
  warnings?: string[]
  materials?: string[]
  tags: string[]
}

const emergencyData: EmergencyInfo[] = [
  // First Aid Information
  {
    id: "fa-001",
    title: "Severe Bleeding Control",
    category: "first-aid",
    priority: "critical",
    timeToRead: "2 min",
    content: "Immediate steps to control life-threatening bleeding and prevent shock.",
    steps: [
      "Apply direct pressure with clean cloth or bandage",
      "Elevate the injured area above heart level if possible",
      "Maintain pressure for 10-15 minutes without checking",
      "If blood soaks through, add more layers (do not remove original)",
      "Apply pressure to arterial pressure points if bleeding continues",
      "Consider tourniquet only if trained and bleeding is life-threatening",
    ],
    warnings: [
      "Do not remove embedded objects",
      "Do not use tourniquet unless properly trained",
      "Seek immediate medical attention for severe bleeding",
    ],
    materials: ["Clean cloth or bandages", "Gloves if available", "Pressure bandage"],
    tags: ["bleeding", "trauma", "emergency", "life-threatening"],
  },
  {
    id: "fa-002",
    title: "Burn Treatment Protocol",
    category: "first-aid",
    priority: "high",
    timeToRead: "3 min",
    content: "Comprehensive burn treatment for different degrees of burns.",
    steps: [
      "Remove person from heat source immediately",
      "Cool burn with cool (not cold) running water for 10-20 minutes",
      "Remove jewelry and loose clothing before swelling occurs",
      "Assess burn severity (1st, 2nd, or 3rd degree)",
      "Cover with sterile, non-adhesive bandage",
      "Give over-the-counter pain medication if conscious",
      "Keep burned area elevated if possible",
    ],
    warnings: [
      "Never use ice, butter, or oils on burns",
      "Do not break blisters",
      "Seek medical attention for burns larger than 3 inches",
    ],
    materials: ["Cool water", "Sterile bandages", "Pain medication", "Clean cloth"],
    tags: ["burns", "fire", "heat", "injury"],
  },
  {
    id: "fa-003",
    title: "Choking Emergency Response",
    category: "first-aid",
    priority: "critical",
    timeToRead: "2 min",
    content: "Life-saving techniques for conscious and unconscious choking victims.",
    steps: [
      "Assess if person can cough or speak",
      "If conscious: Encourage coughing first",
      "If unable to cough: Perform 5 back blows between shoulder blades",
      "If unsuccessful: Perform 5 abdominal thrusts (Heimlich maneuver)",
      "Alternate between back blows and abdominal thrusts",
      "If person becomes unconscious: Begin CPR",
      "Continue until object is expelled or help arrives",
    ],
    warnings: [
      "Do not perform abdominal thrusts on pregnant women or infants",
      "Check mouth for visible objects before rescue breaths",
      "Call for emergency help immediately",
    ],
    materials: ["No materials required - use hands only"],
    tags: ["choking", "airway", "heimlich", "cpr"],
  },
  {
    id: "fa-004",
    title: "Fracture Stabilization",
    category: "first-aid",
    priority: "high",
    timeToRead: "4 min",
    content: "Proper immobilization techniques for suspected fractures.",
    steps: [
      "Do not move the person unless in immediate danger",
      "Assess for open fractures (bone visible through skin)",
      "Immobilize the joint above and below the fracture",
      "Use rigid materials for splinting (boards, magazines)",
      "Pad splint with soft materials",
      "Secure splint with bandages or cloth strips",
      "Check circulation below the fracture every 15 minutes",
    ],
    warnings: [
      "Never try to realign bones",
      "Do not give food or water in case surgery is needed",
      "Watch for signs of shock",
    ],
    materials: ["Rigid splinting material", "Padding", "Bandages or cloth strips"],
    tags: ["fracture", "bone", "splint", "immobilization"],
  },

  // Shelter Information
  {
    id: "sh-001",
    title: "Emergency Lean-To Shelter",
    category: "shelter",
    priority: "high",
    timeToRead: "5 min",
    content: "Quick and effective shelter construction using natural materials.",
    steps: [
      "Find or create a ridgepole 6-8 feet long",
      "Secure one end to a tree or prop between two trees",
      "Lean support branches against ridgepole at 45-degree angle",
      "Space branches 6-12 inches apart",
      "Layer smaller branches and twigs over framework",
      "Cover with leaves, pine needles, or bark for insulation",
      "Create thick ground insulation inside shelter",
    ],
    warnings: [
      "Avoid low-lying areas prone to flooding",
      "Ensure adequate ventilation",
      "Check for hazards like dead trees or animal dens",
    ],
    materials: ["Ridgepole (6-8 ft)", "Support branches", "Covering materials (leaves, bark)", "Ground insulation"],
    tags: ["shelter", "lean-to", "survival", "construction"],
  },
  {
    id: "sh-002",
    title: "Debris Hut Construction",
    category: "shelter",
    priority: "medium",
    timeToRead: "6 min",
    content: "Insulated shelter design for cold weather survival.",
    steps: [
      "Find ridgepole slightly longer than your height",
      "Prop one end on stump or rock, other end on ground",
      "Create door frame with Y-shaped stick",
      "Lay ribbing branches along both sides of ridgepole",
      "Pile debris (leaves, pine needles) 2-3 feet thick over frame",
      "Create entrance plug from debris",
      "Line interior with dry, soft materials",
    ],
    warnings: [
      "Make interior just large enough for your body",
      "Ensure debris is dry to maintain insulation",
      "Test structural integrity before use",
    ],
    materials: ["Ridgepole", "Y-shaped door frame", "Ribbing branches", "Large amount of debris"],
    tags: ["debris hut", "insulation", "cold weather", "survival"],
  },
  {
    id: "sh-003",
    title: "Tarp Shelter Configurations",
    category: "shelter",
    priority: "medium",
    timeToRead: "4 min",
    content: "Multiple tarp setup options for different weather conditions.",
    steps: [
      "A-Frame: Tie ridgeline between two trees, drape tarp over",
      "Lean-To: Secure one edge high, stake opposite edge low",
      "Diamond Fly: Stake one corner high, three corners low",
      "Plow Point: Stake one corner low into wind, others high",
      "Secure all tie-out points with proper knots",
      "Adjust tension to prevent flapping",
      "Create drainage around shelter perimeter",
    ],
    warnings: [
      "Choose location away from dead trees",
      "Ensure proper water runoff",
      "Account for wind direction changes",
    ],
    materials: ["Tarp or plastic sheeting", "Rope or paracord", "Stakes or rocks", "Carabiners (optional)"],
    tags: ["tarp", "quick shelter", "weather protection", "versatile"],
  },

  // Emergency Protocols
  {
    id: "ep-001",
    title: "Earthquake Response Protocol",
    category: "protocols",
    priority: "critical",
    timeToRead: "3 min",
    content: "Immediate actions during and after earthquake events.",
    steps: [
      "DROP to hands and knees immediately",
      "COVER head and neck under sturdy table or against interior wall",
      "HOLD ON to shelter and protect head/neck with arms",
      "Stay in position until shaking stops completely",
      "If outdoors: Move away from buildings, trees, power lines",
      "If in vehicle: Pull over, avoid overpasses and bridges",
      "After shaking: Check for injuries and hazards",
      "Evacuate if building is damaged",
    ],
    warnings: [
      "Do not run outside during shaking",
      "Avoid doorways - they are not safer than other locations",
      "Expect aftershocks",
    ],
    materials: ["No materials required - use available cover"],
    tags: ["earthquake", "drop cover hold", "natural disaster", "safety"],
  },
  {
    id: "ep-002",
    title: "Fire Evacuation Procedure",
    category: "protocols",
    priority: "critical",
    timeToRead: "2 min",
    content: "Safe evacuation steps during fire emergencies.",
    steps: [
      'Alert others immediately - shout "FIRE!"',
      "Feel doors with back of hand before opening",
      "If door is hot: Do not open, find alternate route",
      "Stay low to avoid smoke (crawl if necessary)",
      "Use stairs, never elevators",
      "Go to predetermined meeting point",
      "Call emergency services once safely outside",
      "Do not re-enter building for any reason",
    ],
    warnings: [
      "Smoke is more dangerous than flames",
      "Never use elevators during fire",
      "Do not stop to collect belongings",
    ],
    materials: ["Flashlight (if available)", "Wet cloth for smoke protection"],
    tags: ["fire", "evacuation", "smoke", "emergency exit"],
  },
]

interface EmergencyDatabaseProps {
  category?: string
}

export function EmergencyDatabase({ category }: EmergencyDatabaseProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredData = useMemo(() => {
    return emergencyData.filter((item) => {
      const matchesCategory = !category || item.category === category
      const matchesSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority

      return matchesCategory && matchesSearch && matchesPriority
    })
  }, [category, searchTerm, selectedPriority])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "first-aid":
        return <Heart className="w-4 h-4" />
      case "shelter":
        return <Home className="w-4 h-4" />
      case "protocols":
        return <Shield className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Emergency Information Database
          </CardTitle>
          <CardDescription>Comprehensive offline database of emergency procedures and protocols</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search procedures, symptoms, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedPriority === "all" ? "default" : "outline"}
                  onClick={() => setSelectedPriority("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={selectedPriority === "critical" ? "destructive" : "outline"}
                  onClick={() => setSelectedPriority("critical")}
                  size="sm"
                >
                  Critical
                </Button>
                <Button
                  variant={selectedPriority === "high" ? "default" : "outline"}
                  onClick={() => setSelectedPriority("high")}
                  size="sm"
                >
                  High
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Showing {filteredData.length} of {emergencyData.length} procedures
              </span>
              {category && (
                <Badge variant="outline" className="ml-2">
                  {getCategoryIcon(category)}
                  <span className="ml-1 capitalize">{category.replace("-", " ")}</span>
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Cards */}
      <div className="space-y-4">
        {filteredData.map((item) => (
          <Card key={item.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(item.category)}
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => toggleFavorite(item.id)} className="ml-auto">
                      <Star
                        className={`w-4 h-4 ${favorites.includes(item.id) ? "fill-yellow-400 text-yellow-400" : ""}`}
                      />
                    </Button>
                  </div>
                  <CardDescription>{item.content}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getPriorityColor(item.priority)}>{item.priority.toUpperCase()}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.timeToRead}
                </Badge>
                <div className="flex gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details" className="border-none">
                  <AccordionTrigger className="text-sm font-medium">View Detailed Instructions</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {item.steps && (
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Step-by-Step Instructions:</h4>
                          <ol className="list-decimal list-inside space-y-1 text-sm">
                            {item.steps.map((step, index) => (
                              <li key={index} className="text-muted-foreground">
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {item.warnings && (
                        <div>
                          <h4 className="font-semibold mb-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            Important Warnings:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {item.warnings.map((warning, index) => (
                              <li key={index} className="text-red-600">
                                {warning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.materials && (
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Required Materials:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {item.materials.map((material, index) => (
                              <li key={index} className="text-muted-foreground">
                                {material}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Related Tags:</h4>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredData.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find relevant emergency information.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
