import Anthropic from "@anthropic-ai/sdk";
import type { JsaRequest, JsaDocument, JsaStep } from "@/lib/types";

const SYSTEM_PROMPT = `You are an OSHA safety compliance expert specializing in residential construction Job Safety Analysis (JSA) documents. You create detailed, step-by-step hazard analyses for small subcontractors.

Your JSA documents MUST:
- Break the job into sequential task steps (5-10 steps typical)
- Identify specific hazards for EACH step
- Assign a risk rating to each step: Low, Medium, High, or Critical
- Provide specific control measures to mitigate each hazard
- List required PPE for each step
- Include correct OSHA regulation citations (29 CFR 1926.xxx for construction)
- Use plain language that field workers and foremen understand

Respond ONLY with valid JSON matching this exact schema:
{
  "title": "string - descriptive title for the JSA",
  "overallRiskLevel": "string - Low, Medium, High, or Critical",
  "steps": [
    {
      "stepNumber": 1,
      "taskStep": "string - description of this work step",
      "hazards": ["string - specific hazard"],
      "riskRating": "Low | Medium | High | Critical",
      "controlMeasures": ["string - specific control measure"],
      "ppeRequired": ["string - specific PPE item"],
      "oshaReference": "string - relevant OSHA citation e.g. 29 CFR 1926.501(b)(1)"
    }
  ],
  "generalPpe": ["string - PPE required for the entire job"],
  "emergencyProcedures": "string - emergency response procedures",
  "oshaReferences": ["string - all OSHA citations referenced in the document"]
}

Do not include any text outside the JSON object.`;

function buildUserPrompt(request: JsaRequest): string {
  let prompt = `Generate a Job Safety Analysis (JSA) for the following:

Trade: ${request.trade}
Task Description: ${request.taskDescription}`;

  if (request.workEnvironment.trim()) {
    prompt += `\nWork Environment / Site Conditions: ${request.workEnvironment}`;
  }

  if (request.projectLocation.trim()) {
    prompt += `\nProject Location: ${request.projectLocation}`;
  }

  return prompt;
}

function validateRequest(
  body: Record<string, unknown>
): JsaRequest | null {
  const { trade, taskDescription, companyName, projectLocation } = body;
  if (
    typeof trade !== "string" ||
    !trade.trim() ||
    typeof taskDescription !== "string" ||
    !taskDescription.trim()
  ) {
    return null;
  }
  return {
    trade: (trade as string).trim(),
    taskDescription: (taskDescription as string).trim(),
    workEnvironment:
      typeof body.workEnvironment === "string"
        ? body.workEnvironment.trim()
        : "",
    companyName:
      typeof companyName === "string" ? companyName.trim() : "",
    projectLocation:
      typeof projectLocation === "string" ? projectLocation.trim() : "",
  };
}

function validateSteps(steps: unknown[]): JsaStep[] {
  const validRatings = ["Low", "Medium", "High", "Critical"];
  return steps.map((step, idx) => {
    const s = step as Record<string, unknown>;
    const rating = String(s.riskRating ?? "Medium");
    return {
      stepNumber: idx + 1,
      taskStep: String(s.taskStep ?? ""),
      hazards: Array.isArray(s.hazards)
        ? s.hazards.map(String)
        : [],
      riskRating: (
        validRatings.includes(rating) ? rating : "Medium"
      ) as JsaStep["riskRating"],
      controlMeasures: Array.isArray(s.controlMeasures)
        ? s.controlMeasures.map(String)
        : [],
      ppeRequired: Array.isArray(s.ppeRequired)
        ? s.ppeRequired.map(String)
        : [],
      oshaReference: String(s.oshaReference ?? ""),
    };
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server configuration error: missing API key" },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const validated = validateRequest(body);
  if (!validated) {
    return Response.json(
      { error: "Trade and task description are required" },
      { status: 400 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 6000,
      messages: [
        {
          role: "user",
          content: buildUserPrompt(validated),
        },
      ],
      system: SYSTEM_PROMPT,
    });

    const textBlock = message.content.find(
      (block) => block.type === "text"
    );
    if (!textBlock || textBlock.type !== "text") {
      return Response.json(
        { error: "AI returned an unexpected response format" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(textBlock.text) as {
      title: string;
      overallRiskLevel: string;
      steps: unknown[];
      generalPpe: string[];
      emergencyProcedures: string;
      oshaReferences: string[];
    };

    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const document: JsaDocument = {
      title: parsed.title,
      trade: validated.trade,
      date: today,
      companyName: validated.companyName || "Your Company",
      projectLocation: validated.projectLocation || "Project Site",
      taskDescription: validated.taskDescription,
      overallRiskLevel: parsed.overallRiskLevel,
      steps: validateSteps(parsed.steps),
      generalPpe: parsed.generalPpe ?? [],
      emergencyProcedures: parsed.emergencyProcedures ?? "",
      oshaReferences: parsed.oshaReferences ?? [],
    };

    return Response.json({ document });
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Unknown error";
    console.error("JSA generation failed:", msg);
    return Response.json(
      { error: "Failed to generate JSA. Please try again." },
      { status: 500 }
    );
  }
}
