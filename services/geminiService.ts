
import { GoogleGenAI } from "@google/genai";
import { DocumentType } from '../types';

const generatePrompt = (documentType: DocumentType, fields: string[]): string => {
  const fieldsList = fields.map(field => {
      const propertyName = field.replace(/\s+/g, '');
      let propertyType = 'string';
      if (field.toLowerCase().includes('date') || field.toLowerCase().includes('until')) {
          propertyType = 'DateTime';
      } else if (field.toLowerCase().includes('amount')) {
          propertyType = 'decimal';
      }
      return `public ${propertyType} ${propertyName} { get; init; }`;
  }).join('\n        ');

  return `
You are an expert .NET developer specializing in backend services. Your task is to generate a complete, single-file C# service for creating a ${documentType} PDF.

**Requirements:**

1.  **Framework:** Use .NET 8.
2.  **PDF Library:** Use the \`QuestPDF\` library (version 2023.12 or newer). It's modern and has a fluent API.
3.  **File Structure:** Generate all necessary C# code in a single file for easy copying. This includes using directives, the service class, the data model (DTO), and the PDF document definition.
4.  **Namespace:** Use the namespace \`PdfGenerator.Services\`. Use file-scoped namespaces.
5.  **Data Model:** Create a public record named \`${documentType}Model\` to hold the data for the PDF. It should include the following properties:
        ${fieldsList}
        public List<LineItem> Items { get; init; } = new();
        public CompanyInfo Company { get; init; }
        public CustomerInfo Customer { get; init; }

    Also, define the \`LineItem\`, \`CompanyInfo\`, and \`CustomerInfo\` records.
    - \`LineItem\`: \`Description\` (string), \`Quantity\` (int), \`UnitPrice\` (decimal). It should have a read-only \`Total\` property.
    - \`CompanyInfo\`: \`Name\` (string), \`Address\` (string).
    - \`CustomerInfo\`: \`Name\` (string), \`Address\` (string).

6.  **Service Class:** Create a public class named \`${documentType}PdfService\`.
7.  **Service Method:** Implement a public method \`public byte[] GeneratePdf(${documentType}Model data)\` in the service class. This method should generate the PDF and return it as a byte array.
8.  **PDF Document:** Inside the service file, define a class \`${documentType}Document\` that implements \`IDocument\` from QuestPDF.
    - The document should have a professional layout:
        - **Header:** Company name, address, and document title (e.g., "INVOICE").
        - **Details Section:** Customer details, Document Number, Date, etc.
        - **Items Table:** A table listing the \`LineItem\`s with columns for Description, Quantity, Unit Price, and Total.
        - **Summary:** Subtotal, Tax (hardcoded at 10% for the example), and Grand Total.
        - **Footer:** A "Thank you" message or payment terms.
    - Use sample data within the service for demonstration if needed, but the primary generation logic must use the data model.
9.  **Code Style:**
    - Use modern C# features: file-scoped namespaces and records for DTOs.
    - Add XML comments to the public class and method explaining their purpose.
    - Ensure the code is clean, well-structured, and ready to be compiled. Ensure all required \`using\` statements are at the top of the file.

**Output Format:**
Return ONLY the C# code inside a single C# markdown block. Do not include any other text, explanation, or introductions.
  `;
};

export const generatePdfServiceCode = async (
  documentType: DocumentType,
  fields: string[]
): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
  
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = generatePrompt(documentType, fields);

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });

    return response.text;
};
