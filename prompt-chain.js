// prompt-chain.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API - API key should be set as environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Step 1: Intent Interpretation
async function interpretIntent(customerQuery) {
  const prompt = `Analyze the following customer query and determine the customer's primary intent. Identify what the customer is trying to accomplish, report, or ask about. Focus on understanding the core purpose behind their message.

Customer Query: "${customerQuery}"

Provide a concise summary of the customer's intent in one sentence.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in intent interpretation:", error.message);
    throw error;
  }
}

// Step 2: Category Mapping
async function mapToCategories(intentAnalysis, customerQuery) {
  const categories = [
    "Account Opening",
    "Billing Issue",
    "Account Access",
    "Transaction Inquiry",
    "Card Services",
    "Account Statement",
    "Loan Inquiry",
    "General Information",
  ];

  const prompt = `Based on the customer's intent and original query, map this to one or more relevant categories from the following list: ${categories.join(
    ", "
  )}.

Intent: ${intentAnalysis}
Original Query: "${customerQuery}"

List up to 3 most relevant categories in order of relevance, separated by commas.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in category mapping:", error.message);
    throw error;
  }
}

// Step 3: Category Selection
async function selectCategory(
  intentAnalysis,
  suggestedCategories,
  customerQuery
) {
  const categories = [
    "Account Opening",
    "Billing Issue",
    "Account Access",
    "Transaction Inquiry",
    "Card Services",
    "Account Statement",
    "Loan Inquiry",
    "General Information",
  ];

  const prompt = `Review the customer's intent and the suggested categories, then select the single most appropriate category that best addresses the customer's needs.

Intent: ${intentAnalysis}
Suggested Categories: ${suggestedCategories}
Original Query: "${customerQuery}"

Available Categories: ${categories.join(", ")}

Select the single best matching category and briefly explain your choice in one sentence.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in category selection:", error.message);
    throw error;
  }
}

// Step 4: Detail Extraction
async function extractDetails(selectedCategory, customerQuery) {
  const prompt = `Based on the selected category and customer query, identify what specific information would be needed to properly address this request. Extract any mentioned details and note what additional information might be required.

Selected Category: ${selectedCategory}
Customer Query: "${customerQuery}"

Identify and extract:
- Any specific details mentioned in the query (dates, amounts, account types, etc.)
- Additional information that would be needed to fully resolve this issue

Format your response as a clear, structured list.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in detail extraction:", error.message);
    throw error;
  }
}

// Step 5: Response Generation
async function generateResponse(
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
- Is approximately 2-3 sentences long

Response:`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in response generation:", error.message);
    throw error;
  }
}

// Fallback simulation for when API is not available
function runFallbackChain(customerQuery) {
  const lowerQuery = customerQuery.toLowerCase();
  const results = [];

  // Step 1: Intent Interpretation (simulated)
  let intent = "get general information or assistance";
  if (
    lowerQuery.includes("cannot login") ||
    lowerQuery.includes("forgot password")
  ) {
    intent = "regain access to their online banking account";
  } else if (
    lowerQuery.includes("transaction") ||
    lowerQuery.includes("charge")
  ) {
    intent = "inquire about a specific transaction or charges on their account";
  } else if (
    lowerQuery.includes("card") ||
    lowerQuery.includes("credit") ||
    lowerQuery.includes("debit")
  ) {
    intent = "get assistance with card-related services or issues";
  } else if (lowerQuery.includes("bill") || lowerQuery.includes("payment")) {
    intent = "resolve billing issues or payment discrepancies";
  } else if (
    lowerQuery.includes("open") ||
    lowerQuery.includes("new account")
  ) {
    intent = "open a new bank account";
  } else if (lowerQuery.includes("loan") || lowerQuery.includes("mortgage")) {
    intent = "get information about loan products or applications";
  } else if (
    lowerQuery.includes("statement") ||
    lowerQuery.includes("balance")
  ) {
    intent = "access account statements or balance information";
  }
  results.push(`Customer wants to ${intent}`);

  // Step 2: Category Mapping (simulated)
  const mappings = [];
  if (lowerQuery.includes("cannot login") || lowerQuery.includes("password")) {
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
  results.push(mappings.slice(0, 3).join(", "));

  // Step 3: Category Selection (simulated)
  results.push(
    `${mappings[0]} - This category best matches the customer's primary need`
  );

  // Step 4: Detail Extraction (simulated)
  const category = mappings[0];
  let details =
    "Mentioned: general inquiry\nNeeded: account type, specific question details";
  if (category === "Transaction Inquiry") {
    details =
      "Mentioned: transaction inquiry\nNeeded: transaction date, amount, merchant name";
  } else if (category === "Account Access") {
    details =
      "Mentioned: login issues\nNeeded: username, last successful login date";
  } else if (category === "Card Services") {
    details =
      "Mentioned: card-related request\nNeeded: card type, last four digits, issue description";
  } else if (category === "Billing Issue") {
    details =
      "Mentioned: billing concern\nNeeded: bill date, amount, account number";
  }
  results.push(details);

  // Step 5: Response Generation (simulated)
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
  results.push(
    responses[category] ||
      "Thank you for contacting us. I understand your concern and will help resolve it. Could you provide some additional details about your specific situation?"
  );

  return results;
}

// Main function to run the entire prompt chain - OUTSIDE OF ANY CLASS
async function runPromptChain(customerQuery) {
  const results = [];

  try {
    // Step 1: Interpret Intent
    console.log("Step 1: Interpreting intent...");
    const intentAnalysis = await interpretIntent(customerQuery);
    results.push(intentAnalysis.trim());

    // Step 2: Map to Categories
    console.log("Step 2: Mapping to categories...");
    const categoryMapping = await mapToCategories(
      intentAnalysis,
      customerQuery
    );
    results.push(categoryMapping.trim());

    // Step 3: Select Category
    console.log("Step 3: Selecting category...");
    const categorySelection = await selectCategory(
      intentAnalysis,
      categoryMapping,
      customerQuery
    );
    results.push(categorySelection.trim());

    // Step 4: Extract Details
    console.log("Step 4: Extracting details...");
    const detailsExtraction = await extractDetails(
      categorySelection,
      customerQuery
    );
    results.push(detailsExtraction.trim());

    // Step 5: Generate Response
    console.log("Step 5: Generating response...");
    const finalResponse = await generateResponse(
      customerQuery,
      intentAnalysis,
      categorySelection,
      detailsExtraction
    );
    results.push(finalResponse.trim());

    return results;
  } catch (error) {
    console.error("Error in prompt chain:", error.message);

    // Fallback simulation if API fails
    if (
      error.message.includes("API_KEY") ||
      error.message.includes("quota") ||
      error.message.includes("403")
    ) {
      console.log(
        "API not configured or quota exceeded, using fallback simulation..."
      );
      return runFallbackChain(customerQuery);
    }

    throw new Error(`Prompt chain execution failed: ${error.message}`);
  }
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
    console.log("---");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { runPromptChain };
}

if (require.main === module) {
  if (!process.env.GEMINI_API_KEY) {
    console.log(
      "Note: GEMINI_API_KEY environment variable not set. Using fallback simulation mode."
    );
    console.log(
      "To use Gemini AI, set your API key: export GEMINI_API_KEY=your_actual_api_key_here\n"
    );
  }

  testChain().catch(console.error);
}
