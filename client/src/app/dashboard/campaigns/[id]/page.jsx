"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Send, AlertTriangle, CheckCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

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
    customers: [
      { id: "c1", name: "John Doe", email: "john@example.com", status: "delivered" },
      { id: "c2", name: "Jane Smith", email: "jane@example.com", status: "delivered" },
      { id: "c3", name: "Bob Johnson", email: "bob@example.com", status: "failed" },
      { id: "c4", name: "Alice Brown", email: "alice@example.com", status: "delivered" },
      { id: "c5", name: "Charlie Wilson", email: "charlie@example.com", status: "delivered" },
    ],
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
    customers: [
      { id: "c6", name: "David Lee", email: "david@example.com", status: "delivered" },
      { id: "c7", name: "Emma Davis", email: "emma@example.com", status: "delivered" },
      { id: "c8", name: "Frank Miller", email: "frank@example.com", status: "failed" },
      { id: "c9", name: "Grace Taylor", email: "grace@example.com", status: "delivered" },
      { id: "c10", name: "Henry Wilson", email: "henry@example.com", status: "delivered" },
    ],
  },
];

export default function CampaignDetailsPage({ params }) {
  const router = useRouter();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch campaign details
    setTimeout(() => {
      const foundCampaign = mockCampaigns.find((c) => c.id === params.id);
      setCampaign(foundCampaign || null);
      setLoading(false);
    }, 500);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Loading campaign details...</div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Campaign not found</div>
          <p className="text-muted-foreground">The campaign you're looking for doesn't exist or has been deleted.</p>
          <Button className="mt-4" onClick={() => router.push("/dashboard/campaigns")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
          </Button>
        </div>
      </div>
    );
  }

  const formatRules = () => {
    return campaign.rules
      .map((rule) => {
        return `${rule.field} ${rule.operator} ${rule.value}`;
      })
      .join(` ${campaign.ruleOperator} `);
  };

  const deliveryRate = Math.round((campaign.stats.messagesSent / campaign.stats.audienceSize) * 100);
  const failureRate = Math.round((campaign.stats.messagesFailed / campaign.stats.audienceSize) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" className="-ml-3 mb-1" onClick={() => router.push("/dashboard/campaigns")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">{campaign.name}</h2>
          <p className="text-muted-foreground">Created on {format(campaign.createdAt, "MMMM d, yyyy")}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audience Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.audienceSize}</div>
            <p className="text-xs text-muted-foreground">Total customers targeted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.messagesSent}</div>
            <div className="mt-2">
              <Progress value={deliveryRate} className="h-2" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{deliveryRate}% delivery rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Deliveries</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.messagesFailed}</div>
            <div className="mt-2">
              <Progress value={failureRate} className="h-2" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{failureRate}% failure rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Rules</CardTitle>
          <CardDescription>Segmentation rules used to target customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-muted p-4">
            <Badge variant="outline" className="mb-2">
              {campaign.ruleOperator}
            </Badge>
            <div className="space-y-2">
              {campaign.rules.map((rule, index) => (
                <div key={index} className="rounded-md bg-background p-3">
                  <span className="font-medium">{rule.field}</span> <span>{rule.operator}</span>{" "}
                  <span>{rule.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Status</CardTitle>
          <CardDescription>Individual customer message delivery status</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({campaign.customers.length})</TabsTrigger>
              <TabsTrigger value="delivered">
                Delivered ({campaign.customers.filter((c) => c.status === "delivered").length})
              </TabsTrigger>
              <TabsTrigger value="failed">
                Failed ({campaign.customers.filter((c) => c.status === "failed").length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaign.customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        {customer.status === "delivered" ? (
                          <div className="flex items-center">
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            <span>Delivered</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                            <span>Failed</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="delivered" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaign.customers
                    .filter((customer) => customer.status === "delivered")
                    .map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            <span>Delivered</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="failed" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaign.customers
                    .filter((customer) => customer.status === "failed")
                    .map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                            <span>Failed</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}