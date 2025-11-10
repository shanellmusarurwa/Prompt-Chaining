// prompt-chain.js

/**
 * Bank Customer Support Prompt Chain System
 * Implements a 5-step prompt chain for processing customer queries
 */

class PromptChain {
  constructor() {
    this.categories = [
      "Account Opening",
      "Billing Issue",
      "Account Access",
      "Transaction Inquiry",
      "Card Services",
      "Account Statement",
      "Loan Inquiry",
      "General Information",
    ];
  }

  // Step 1: Intent Interpretation
  async interpretIntent(customerQuery) {
    const prompt = `Analyze the following customer query and determine the customer's primary intent. Identify what the customer is trying to accomplish, report, or ask about. Focus on understanding the core purpose behind their message.

Customer Query: "${customerQuery}"

Provide a concise summary of the customer's intent.`;

    // In a real implementation, this would call an LLM API
    // For demonstration, we'll simulate the response
    const simulatedResponse = `Customer wants to ${this.simulateIntentAnalysis(
      customerQuery
    )}`;
    return simulatedResponse;
  }

  // Step 2: Category Mapping
  async mapToCategories(intentAnalysis, customerQuery) {
    const prompt = `Based on the customer's intent and original query, map this to one or more relevant categories from the following list: ${this.categories.join(
      ", "
    )}.

Intent: ${intentAnalysis}
Original Query: "${customerQuery}"

List up to 3 most relevant categories in order of relevance.`;

    const simulatedResponse = this.simulateCategoryMapping(customerQuery);
    return simulatedResponse;
  }

  // Step 3: Category Selection
  async selectCategory(intentAnalysis, suggestedCategories, customerQuery) {
    const prompt = `Review the customer's intent and the suggested categories, then select the single most appropriate category that best addresses the customer's needs.

Intent: ${intentAnalysis}
Suggested Categories: ${suggestedCategories}
Original Query: "${customerQuery}"

Available Categories: ${this.categories.join(", ")}

Select the single best matching category and briefly explain your choice.`;

    const simulatedResponse = this.simulateCategorySelection(sustomerQuery);
    return simulatedResponse;
  }

  // Step 4: Detail Extraction
  async extractDetails(selectedCategory, customerQuery) {
    const prompt = `Based on the selected category and customer query, identify what specific information would be needed to properly address this request. Extract any mentioned details and note what additional information might be required.

Selected Category: ${selectedCategory}
Customer Query: "${customerQuery}"

Identify and extract:
- Any specific details mentioned in the query (dates, amounts, account types, etc.)
- Additional information that would be needed to fully resolve this issue
- Format your response as a structured list of key-value pairs`;

    const simulatedResponse = this.simulateDetailExtraction(
      customerQuery,
      selectedCategory
    );
    return simulatedResponse;
  }

  // Step 5: Response Generation
  async generateResponse(
    customerQuery,
    intentAnalysis,
    selectedCategory,
    extractedDetails
  ) {
    const prompt = `Using all the previous analysis, generate a helpful and professional response to the customer.

Customer Query: "${customerQuery}"
Intent: ${intentAnalysis}
Selected Category: ${selectedCategory}
Extracted Details: ${extractedDetails}

Generate a concise, empathetic response that:
- Acknowledges the customer's issue
- Provides relevant assistance or next steps
- Maintains a professional and helpful tone
- Is approximately 2-3 sentences long`;

    const simulatedResponse = this.simulateResponseGeneration(
      customerQuery,
      selectedCategory
    );
    return simulatedResponse;
  }

  // Main function to run the entire prompt chain
  async runPromptChain(customerQuery) {
    const results = [];

    try {
      // Step 1: Interpret Intent
      console.log("Step 1: Interpreting intent...");
      const intentAnalysis = await this.interpretIntent(customerQuery);
      results.push(intentAnalysis);

      // Step 2: Map to Categories
      console.log("Step 2: Mapping to categories...");
      const categoryMapping = await this.mapToCategories(
        intentAnalysis,
        customerQuery
      );
      results.push(categoryMapping);

      // Step 3: Select Category
      console.log("Step 3: Selecting category...");
      const categorySelection = await this.selectCategory(
        intentAnalysis,
        categoryMapping,
        customerQuery
      );
      results.push(categorySelection);

      // Step 4: Extract Details
      console.log("Step 4: Extracting details...");
      const detailsExtraction = await this.extractDetails(
        categorySelection,
        customerQuery
      );
      results.push(detailsExtraction);

      // Step 5: Generate Response
      console.log("Step 5: Generating response...");
      const finalResponse = await this.generateResponse(
        customerQuery,
        intentAnalysis,
        categorySelection,
        detailsExtraction
      );
      results.push(finalResponse);

      return results;
    } catch (error) {
      console.error("Error in prompt chain:", error);
      throw new Error(`Prompt chain execution failed: ${error.message}`);
    }
  }

  // Simulation methods for demonstration
  simulateIntentAnalysis(query) {
    const lowerQuery = query.toLowerCase();
    if (
      lowerQuery.includes("cannot login") ||
      lowerQuery.includes("forgot password")
    ) {
      return "regain access to their online banking account";
    } else if (
      lowerQuery.includes("transaction") ||
      lowerQuery.includes("charge")
    ) {
      return "inquire about a specific transaction or charges on their account";
    } else if (
      lowerQuery.includes("card") ||
      lowerQuery.includes("credit") ||
      lowerQuery.includes("debit")
    ) {
      return "get assistance with card-related services or issues";
    } else if (lowerQuery.includes("bill") || lowerQuery.includes("payment")) {
      return "resolve billing issues or payment discrepancies";
    } else if (
      lowerQuery.includes("open") ||
      lowerQuery.includes("new account")
    ) {
      return "open a new bank account";
    } else if (lowerQuery.includes("loan") || lowerQuery.includes("mortgage")) {
      return "get information about loan products or applications";
    } else if (
      lowerQuery.includes("statement") ||
      lowerQuery.includes("balance")
    ) {
      return "access account statements or balance information";
    } else {
      return "get general information or assistance";
    }
  }

  simulateCategoryMapping(query) {
    const lowerQuery = query.toLowerCase();
    const mappings = [];

    if (
      lowerQuery.includes("cannot login") ||
      lowerQuery.includes("password")
    ) {
      mappings.push("Account Access");
    }
    if (lowerQuery.includes("transaction") || lowerQuery.includes("charge")) {
      mappings.push("Transaction Inquiry");
    }
    if (lowerQuery.includes("card")) {
      mappings.push("Card Services");
    }
    if (lowerQuery.includes("bill") || lowerQuery.includes("payment")) {
      mappings.push("Billing Issue");
    }
    if (
      lowerQuery.includes("open account") ||
      lowerQuery.includes("new account")
    ) {
      mappings.push("Account Opening");
    }
    if (lowerQuery.includes("loan")) {
      mappings.push("Loan Inquiry");
    }
    if (lowerQuery.includes("statement") || lowerQuery.includes("balance")) {
      mappings.push("Account Statement");
    }

    if (mappings.length === 0) {
      mappings.push("General Information");
    }

    return mappings.slice(0, 3).join(", ");
  }

  simulateCategorySelection(query) {
    const mapping = this.simulateCategoryMapping(query);
    return mapping.split(", ")[0]; // Return the first suggested category
  }

  simulateDetailExtraction(query, category) {
    const details = [];

    if (category === "Transaction Inquiry") {
      details.push("Mentioned: transaction inquiry");
      details.push("Needed: transaction date, amount, merchant name");
    } else if (category === "Account Access") {
      details.push("Mentioned: login issues");
      details.push("Needed: username, last successful login date");
    } else if (category === "Card Services") {
      details.push("Mentioned: card-related request");
      details.push("Needed: card type, last four digits, issue description");
    } else if (category === "Billing Issue") {
      details.push("Mentioned: billing concern");
      details.push("Needed: bill date, amount, account number");
    } else {
      details.push("Mentioned: general inquiry");
      details.push("Needed: account type, specific question details");
    }

    return details.join("; ");
  }

  simulateResponseGeneration(query, category) {
    const responses = {
      "Transaction Inquiry":
        "I understand you have questions about a transaction. I can help you investigate this. Could you please provide the transaction date and amount for faster assistance?",
      "Account Access":
        "I'm sorry you're having trouble accessing your account. Let me help you regain access. Have you tried using the 'Forgot Password' feature recently?",
      "Card Services":
        "I can assist you with your card services inquiry. For security, could you confirm the type of card and the last four digits?",
      "Billing Issue":
        "I see you're concerned about a billing matter. I'll help resolve this for you. Please provide the bill date and amount in question.",
      "Account Opening":
        "Great to hear you're interested in opening an account! I can guide you through the process. What type of account are you looking to open?",
      "Loan Inquiry":
        "I can provide information about our loan products. Could you let me know what type of loan you're interested in and the approximate amount?",
      "Account Statement":
        "I can help you with your account statement inquiry. Are you looking for a specific statement period or having trouble accessing your statements?",
      "General Information":
        "Thank you for reaching out. I'm here to help with your inquiry. Could you provide a few more details so I can assist you better?",
    };

    return (
      responses[category] ||
      "Thank you for contacting us. I understand your concern and will help resolve it. Could you provide some additional details about your specific situation?"
    );
  }
}

// Main export function
async function runPromptChain(customerQuery) {
  const chain = new PromptChain();
  return await chain.runPromptChain(customerQuery);
}

// Example usage and test
async function testChain() {
  const testQueries = [
    "I can't login to my online banking account",
    "There's a suspicious charge on my card from yesterday",
    "I want to open a new savings account",
    "My recent bill payment seems incorrect",
  ];

  for (const query of testQueries) {
    console.log(`\n=== Processing: "${query}" ===`);
    const results = await runPromptChain(query);

    console.log("\nChain Results:");
    results.forEach((result, index) => {
      console.log(`Step ${index + 1}: ${result}`);
    });
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { runPromptChain, PromptChain };
}

// Run test if this file is executed directly
if (require.main === module) {
  testChain().catch(console.error);
}
