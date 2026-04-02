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
