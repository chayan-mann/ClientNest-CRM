"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for campaigns
const mockCampaigns = [
  {
    id: "1",
    name: "High Spenders Re-engagement",
    rules: [
      { field: "totalSpend", operator: ">", value: 10000 },
      { field: "lastOrderDate", operator: "<", value: "2024-01-01" },
    ],
    ruleOperator: "AND",
    createdAt: new Date("2024-04-15"),
    stats: {
      audienceSize: 1250,
      messagesSent: 1230,
      messagesFailed: 20,
    },
  },
  {
    id: "2",
    name: "New Product Announcement",
    rules: [
      { field: "totalSpend", operator: ">", value: 5000 },
      { field: "category", operator: "=", value: "Electronics" },
    ],
    ruleOperator: "AND",
    createdAt: new Date("2024-04-10"),
    stats: {
      audienceSize: 850,
      messagesSent: 842,
      messagesFailed: 8,
    },
  },
  {
    id: "3",
    name: "Dormant Customers",
    rules: [{ field: "lastOrderDate", operator: "<", value: "2023-10-01" }],
    ruleOperator: "AND",
    createdAt: new Date("2024-04-05"),
    stats: {
      audienceSize: 320,
      messagesSent: 315,
      messagesFailed: 5,
    },
  },
  {
    id: "4",
    name: "Loyalty Program Invitation",
    rules: [
      { field: "orderCount", operator: ">", value: 5 },
      { field: "loyaltyMember", operator: "=", value: false },
    ],
    ruleOperator: "AND",
    createdAt: new Date("2024-04-01"),
    stats: {
      audienceSize: 450,
      messagesSent: 445,
      messagesFailed: 5,
    },
  },
  {
    id: "5",
    name: "Seasonal Sale Promotion",
    rules: [
      { field: "category", operator: "=", value: "Apparel" },
      { field: "lastOrderDate", operator: ">", value: "2024-01-01" },
    ],
    ruleOperator: "OR",
    createdAt: new Date("2024-03-25"),
    stats: {
      audienceSize: 1800,
      messagesSent: 1780,
      messagesFailed: 20,
    },
  },
  {
    id: "6",
    name: "Cart Abandonment Recovery",
    rules: [
      { field: "abandonedCart", operator: "=", value: true },
      { field: "cartValue", operator: ">", value: 1000 },
    ],
    ruleOperator: "AND",
    createdAt: new Date("2024-03-20"),
    stats: {
      audienceSize: 210,
      messagesSent: 205,
      messagesFailed: 5,
    },
  },
]

export function CampaignList({ limit } = {}) {
  const [campaigns] = useState(limit ? mockCampaigns.slice(0, limit) : mockCampaigns)

  const formatRules = (campaign) => {
    return campaign.rules
      .map((rule) => {
        return `${rule.field} ${rule.operator} ${rule.value}`
      })
      .join(` ${campaign.ruleOperator} `)
  }

  return (
    <div className="space-y-4">
      {limit ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <CardTitle>{campaign.name}</CardTitle>
                <CardDescription>Created on {format(campaign.createdAt, "MMM d, yyyy")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    <Badge variant="outline">{campaign.ruleOperator}</Badge> {formatRules(campaign)}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-sm font-medium">{campaign.stats.audienceSize}</p>
                      <p className="text-xs text-muted-foreground">Audience</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{campaign.stats.messagesSent}</p>
                      <p className="text-xs text-muted-foreground">Sent</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{campaign.stats.messagesFailed}</p>
                      <p className="text-xs text-muted-foreground">Failed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/dashboard/campaigns/${campaign.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Rules</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Failed</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <div className="max-w-[300px] truncate">
                        <Badge variant="outline" className="mr-1">
                          {campaign.ruleOperator}
                        </Badge>
                        {formatRules(campaign)}
                      </div>
                    </TableCell>
                    <TableCell>{format(campaign.createdAt, "MMM d, yyyy")}</TableCell>
                    <TableCell>{campaign.stats.audienceSize}</TableCell>
                    <TableCell>{campaign.stats.messagesSent}</TableCell>
                    <TableCell>{campaign.stats.messagesFailed}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/dashboard/campaigns/${campaign.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
