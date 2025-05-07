"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { RuleBuilder } from "@/components/rule-builder"
import { VisualRuleBuilder } from "@/components/visual-rule-builder"

export default function NewCampaignPage() {
  const router = useRouter()
  const [campaignName, setCampaignName] = useState("")
  const [rules, setRules] = useState([])
  const [ruleOperator, setRuleOperator] = useState("AND")
  const [audienceSize, setAudienceSize] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateCampaign = async () => {
    if (!campaignName) {
      toast.error("Missing information", {
        description: "Please provide a campaign name",
      })
      return
    }

    if (rules.length === 0) {
      toast.error("Missing rules", {
        description: "Please add at least one rule to your campaign",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast.success("Campaign created", {
        description: "Your campaign has been created successfully",
      })
      setIsLoading(false)
      router.push("/dashboard/campaigns")
    }, 1500)
  }

  const fetchAudienceSize = async () => {
    if (rules.length === 0) {
      toast.error("Missing rules", {
        description: "Please add at least one rule to preview audience size",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call to get audience size
    setTimeout(() => {
      // Random number between 100 and 2000
      const size = Math.floor(Math.random() * 1900) + 100
      setAudienceSize(size)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Create New Campaign</h2>
        <p className="text-muted-foreground">Define your target audience and create a new marketing campaign</p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="campaign-name">Campaign Name</Label>
          <Input
            id="campaign-name"
            placeholder="Enter campaign name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
        </div>

        <Tabs defaultValue="standard">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">Standard Rule Builder</TabsTrigger>
            <TabsTrigger value="visual">Visual Rule Builder</TabsTrigger>
          </TabsList>
          <TabsContent value="standard">
            <Card>
              <CardContent className="pt-6">
                <RuleBuilder
                  rules={rules}
                  setRules={setRules}
                  ruleOperator={ruleOperator}
                  setRuleOperator={setRuleOperator}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="visual">
            <Card>
              <CardContent className="pt-6">
                <VisualRuleBuilder
                  rules={rules}
                  setRules={setRules}
                  ruleOperator={ruleOperator}
                  setRuleOperator={setRuleOperator}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="outline" onClick={fetchAudienceSize} disabled={isLoading || rules.length === 0}>
            Preview Audience Size
          </Button>

          {audienceSize !== null && (
            <div className="text-sm">
              <span className="font-medium">Estimated audience size:</span>{" "}
              <span className="text-primary">{audienceSize.toLocaleString()} customers</span>
            </div>
          )}
        </div>

        <Button onClick={handleCreateCampaign} disabled={isLoading || !campaignName || rules.length === 0}>
          Create Campaign
        </Button>
      </div>
    </div>
  )
}
