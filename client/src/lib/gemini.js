import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with your API key
// In a production environment, this should be stored as an environment variable
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "YOUR_API_KEY")

// Function to generate campaign name suggestions based on rules
export async function generateCampaignNameSuggestions(rules, ruleOperator) {
  try {
    // Format the rules into a readable string
    const rulesText = rules
      .map((rule) => {
        const fieldName = getFieldDisplayName(rule.field)
        const value = formatRuleValue(rule.field, rule.value)
        return `${fieldName} ${rule.operator} ${value}`
      })
      .join(` ${ruleOperator} `)

    // Create a prompt for the AI
    const prompt = `
      I'm creating a marketing campaign with the following targeting rules:
      ${rulesText}

      Please suggest 3 creative and professional campaign names that reflect these targeting criteria.
      Format your response as a JSON array of strings, like this: ["Name 1", "Name 2", "Name 3"]
      Only include the JSON array in your response, nothing else.
    `

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    // Generate content
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the JSON response
    try {
      return JSON.parse(text)
    } catch (e) {
      // If parsing fails, try to extract the array from the text
      const match = text.match(/\[(.*)\]/s)
      if (match) {
        return JSON.parse(`[${match[1]}]`)
      }
      // Return a default array if all else fails
      return ["Campaign " + new Date().toLocaleDateString()]
    }
  } catch (error) {
    console.error("Error generating campaign name suggestions:", error)
    return ["Campaign " + new Date().toLocaleDateString()]
  }
}

// Function to generate a campaign summary
export async function generateCampaignSummary(campaign, logs) {
  try {
    // Format the rules into a readable string
    const rulesText = campaign.rules
      .map((rule) => {
        const fieldName = getFieldDisplayName(rule.field)
        const value = formatRuleValue(rule.field, rule.value)
        return `${fieldName} ${rule.operator} ${value}`
      })
      .join(` ${campaign.ruleOperator} `)

    // Create a prompt for the AI
    const prompt = `
      Please provide a concise 2-3 sentence summary of this marketing campaign:
      
      Campaign Name: ${campaign.name}
      Targeting Rules: ${rulesText}
      Audience Size: ${campaign.stats.audienceSize}
      Messages Sent: ${campaign.stats.messagesSent}
      Messages Failed: ${campaign.stats.messagesFailed}
      Created On: ${new Date(campaign.createdAt).toLocaleDateString()}
      
      The summary should highlight the campaign's purpose based on its targeting rules, its performance metrics, and any notable insights.
    `

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    // Generate content
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error generating campaign summary:", error)
    return "Unable to generate campaign summary at this time."
  }
}

// Helper function to get a display name for a field
function getFieldDisplayName(fieldId) {
  const fieldMap = {
    totalSpend: "Total Spend",
    lastOrderDate: "Last Order Date",
    orderCount: "Order Count",
    category: "Category",
    loyaltyMember: "Loyalty Member",
    abandonedCart: "Abandoned Cart",
    cartValue: "Cart Value",
  }

  return fieldMap[fieldId] || fieldId
}

// Helper function to format rule values based on field type
function formatRuleValue(fieldId, value) {
  // Format boolean values
  if (typeof value === "boolean") {
    return value ? "True" : "False"
  }

  // Format date values
  if (fieldId === "lastOrderDate" && typeof value === "string" && value.includes("-")) {
    return new Date(value).toLocaleDateString()
  }

  // Format currency values
  if (fieldId === "totalSpend" || fieldId === "cartValue") {
    return `$${value}`
  }

  return value
}
