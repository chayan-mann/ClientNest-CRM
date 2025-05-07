"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RuleBuilder } from "@/components/rule-builder"
import { VisualRuleBuilder } from "@/components/visual-rule-builder"

export default function RuleBuilderPage() {
  const [rules, setRules] = useState([])
  const [ruleOperator, setRuleOperator] = useState("AND")

  const formatRules = () => {
    if (rules.length === 0) return "No rules defined"

    return rules
      .map((rule) => {
        return `${rule.field} ${rule.operator} ${rule.value}`
      })
      .join(` ${ruleOperator} `)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Rule Builder</h2>
        <p className="text-muted-foreground">Create and test customer segmentation rules</p>
      </div>

      <Tabs defaultValue="standard">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="standard">Standard Rule Builder</TabsTrigger>
          <TabsTrigger value="visual">Visual Rule Builder</TabsTrigger>
        </TabsList>
        <TabsContent value="standard">
          <Card>
            <CardHeader>
              <CardTitle>Standard Rule Builder</CardTitle>
              <CardDescription>Create rules using a form-based interface</CardDescription>
            </CardHeader>
            <CardContent>
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
            <CardHeader>
              <CardTitle>Visual Rule Builder</CardTitle>
              <CardDescription>Create rules using a drag-and-drop interface</CardDescription>
            </CardHeader>
            <CardContent>
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

      {rules.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Rule Preview</CardTitle>
            <CardDescription>This is how your rule will be interpreted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-4">
              <pre className="whitespace-pre-wrap text-sm">{formatRules()}</pre>
            </div>
            <div className="mt-4 flex justify-end">
              <Button>Test Rule</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
