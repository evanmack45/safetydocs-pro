export type DocumentType = "toolbox-talk" | "jsa";

export interface ToolboxTalkRequest {
  trade: string;
  projectDescription: string;
  specificHazards: string;
  companyName: string;
  projectLocation: string;
}

export interface ToolboxTalkSection {
  heading: string;
  content: string;
}

export interface ToolboxTalkDocument {
  title: string;
  trade: string;
  date: string;
  companyName: string;
  projectLocation: string;
  sections: ToolboxTalkSection[];
  oshaReferences: string[];
}

export interface GenerateResponse {
  document: ToolboxTalkDocument;
}

export interface GenerateError {
  error: string;
}

export interface JsaRequest {
  trade: string;
  taskDescription: string;
  workEnvironment: string;
  companyName: string;
  projectLocation: string;
}

export interface JsaStep {
  stepNumber: number;
  taskStep: string;
  hazards: string[];
  riskRating: "Low" | "Medium" | "High" | "Critical";
  controlMeasures: string[];
  ppeRequired: string[];
  oshaReference: string;
}

export interface JsaDocument {
  title: string;
  trade: string;
  date: string;
  companyName: string;
  projectLocation: string;
  taskDescription: string;
  overallRiskLevel: string;
  steps: JsaStep[];
  generalPpe: string[];
  emergencyProcedures: string;
  oshaReferences: string[];
}

export interface JsaGenerateResponse {
  document: JsaDocument;
}

export interface DocumentPrice {
  type: DocumentType;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export const DOCUMENT_PRICES: DocumentPrice[] = [
  {
    type: "toolbox-talk",
    name: "Toolbox Talk",
    price: 2900,
    description:
      "Professional OSHA-compliant toolbox talk with regulation citations",
    features: [
      "Trade-specific safety content",
      "OSHA regulation citations (29 CFR 1926)",
      "PPE requirements",
      "Emergency procedures",
      "Print-ready PDF with signature lines",
      "Attendee sign-in fields",
    ],
  },
  {
    type: "jsa",
    name: "Job Safety Analysis (JSA)",
    price: 4900,
    description:
      "Detailed task-by-task hazard analysis with risk ratings and controls",
    features: [
      "Step-by-step task breakdown",
      "Hazard identification per step",
      "Risk rating matrix (Low/Medium/High/Critical)",
      "Control measures for each hazard",
      "PPE requirements per task step",
      "OSHA regulation citations",
      "Print-ready PDF table format",
    ],
  },
];
