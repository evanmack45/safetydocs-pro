export type DocumentType = "toolbox-talk" | "jsa" | "sssp";

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

export interface SsspRequest {
  trade: string;
  projectDescription: string;
  projectAddress: string;
  companyName: string;
  projectStartDate: string;
  projectDuration: string;
  numberOfWorkers: string;
  specificHazards: string;
}

export interface SsspSection {
  heading: string;
  content: string;
}

export interface SsspHazardEntry {
  hazard: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  controlMeasures: string[];
  responsibleParty: string;
  oshaReference: string;
}

export interface SsspDocument {
  title: string;
  trade: string;
  date: string;
  companyName: string;
  projectAddress: string;
  projectDescription: string;
  projectStartDate: string;
  projectDuration: string;
  numberOfWorkers: string;
  sections: SsspSection[];
  hazardAssessment: SsspHazardEntry[];
  ppeMatrix: { role: string; requiredPpe: string[] }[];
  emergencyContacts: { role: string; responsibility: string }[];
  oshaReferences: string[];
}

export interface SsspGenerateResponse {
  document: SsspDocument;
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
  {
    type: "sssp",
    name: "Site-Specific Safety Plan (SSSP)",
    price: 7900,
    description:
      "Comprehensive site safety plan covering all OSHA requirements for your project",
    features: [
      "Project overview and scope",
      "Complete hazard assessment with risk ratings",
      "Emergency procedures and contacts",
      "PPE matrix by role",
      "Fall protection plan",
      "Electrical safety procedures",
      "Scaffold and excavation safety (trade-specific)",
      "Training requirements and documentation",
      "Incident reporting procedures",
      "OSHA citations throughout (29 CFR 1926)",
      "Multi-page professional PDF",
    ],
  },
];
