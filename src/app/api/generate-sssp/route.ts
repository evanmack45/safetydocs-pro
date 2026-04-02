import Anthropic from "@anthropic-ai/sdk";
import type {
  SsspRequest,
  SsspDocument,
  SsspHazardEntry,
} from "@/lib/types";

const SYSTEM_PROMPT = `You are an OSHA safety compliance expert specializing in residential construction Site-Specific Safety Plans (SSSP). You create comprehensive safety plans for small subcontractors working on residential projects.

Your SSSP documents MUST include ALL of the following sections:

1. PROJECT OVERVIEW - Scope, location, duration, personnel count
2. SAFETY POLICY STATEMENT - Company commitment to safety
3. ROLES AND RESPONSIBILITIES - Safety officer, foreman, workers
4. HAZARD ASSESSMENT - Detailed hazard analysis with risk levels and controls
5. FALL PROTECTION PLAN - Specific to the trade and project (29 CFR 1926.501-503)
6. ELECTRICAL SAFETY - Lockout/tagout, GFCIs, cord management (29 CFR 1926.400-449)
7. SCAFFOLD SAFETY - If applicable to the trade (29 CFR 1926.450-454)
8. EXCAVATION SAFETY - If applicable to the trade (29 CFR 1926.650-652)
9. PPE REQUIREMENTS - Matrix by role and task
10. EMERGENCY PROCEDURES - First aid, evacuation routes, emergency contacts
11. TRAINING REQUIREMENTS - Required certifications, toolbox talks, orientation
12. INCIDENT REPORTING - How to report injuries, near-misses, property damage
13. HAZARD COMMUNICATION - SDS access, chemical labeling (29 CFR 1926.59)
14. FIRE PREVENTION - Extinguisher locations, hot work permits (29 CFR 1926.150-159)

If a section (e.g., scaffold, excavation) does not apply to the trade, include a brief note explaining it is not applicable and why.

Use correct OSHA regulation citations (29 CFR 1926.xxx for construction). Use plain language that field workers and foremen understand. Be thorough -- this is a premium document that must withstand OSHA inspector review.

Respond ONLY with valid JSON matching this exact schema:
{
  "title": "string - descriptive title for the SSSP",
  "sections": [
    {
      "heading": "string - section heading",
      "content": "string - detailed section content with line breaks as \\n"
    }
  ],
  "hazardAssessment": [
    {
      "hazard": "string - specific hazard",
      "riskLevel": "Low | Medium | High | Critical",
      "controlMeasures": ["string - specific control measure"],
      "responsibleParty": "string - who is responsible",
      "oshaReference": "string - relevant OSHA citation"
    }
  ],
  "ppeMatrix": [
    {
      "role": "string - worker role",
      "requiredPpe": ["string - PPE item"]
    }
  ],
  "emergencyContacts": [
    {
      "role": "string - emergency role (e.g., Site Safety Officer)",
      "responsibility": "string - what they handle"
    }
  ],
  "oshaReferences": ["string - all OSHA citations referenced in the document"]
}

Do not include any text outside the JSON object.`;

function buildUserPrompt(request: SsspRequest): string {
  let prompt = `Generate a Site-Specific Safety Plan (SSSP) for the following project:

Trade: ${request.trade}
Project Description: ${request.projectDescription}
Project Address: ${request.projectAddress}`;

  if (request.projectStartDate.trim()) {
    prompt += `\nProject Start Date: ${request.projectStartDate}`;
  }
  if (request.projectDuration.trim()) {
    prompt += `\nEstimated Duration: ${request.projectDuration}`;
  }
  if (request.numberOfWorkers.trim()) {
    prompt += `\nNumber of Workers on Site: ${request.numberOfWorkers}`;
  }
  if (request.specificHazards.trim()) {
    prompt += `\nSpecific Known Hazards: ${request.specificHazards}`;
  }

  return prompt;
}

function validateRequest(
  body: Record<string, unknown>
): SsspRequest | null {
  const { trade, projectDescription, projectAddress } = body;
  if (
    typeof trade !== "string" ||
    !trade.trim() ||
    typeof projectDescription !== "string" ||
    !projectDescription.trim() ||
    typeof projectAddress !== "string" ||
    !projectAddress.trim()
  ) {
    return null;
  }
  return {
    trade: (trade as string).trim(),
    projectDescription: (projectDescription as string).trim(),
    projectAddress: (projectAddress as string).trim(),
    companyName:
      typeof body.companyName === "string"
        ? body.companyName.trim()
        : "",
    projectStartDate:
      typeof body.projectStartDate === "string"
        ? body.projectStartDate.trim()
        : "",
    projectDuration:
      typeof body.projectDuration === "string"
        ? body.projectDuration.trim()
        : "",
    numberOfWorkers:
      typeof body.numberOfWorkers === "string"
        ? body.numberOfWorkers.trim()
        : "",
    specificHazards:
      typeof body.specificHazards === "string"
        ? body.specificHazards.trim()
        : "",
  };
}

function validateHazardEntries(
  entries: unknown[]
): SsspHazardEntry[] {
  const validRatings = ["Low", "Medium", "High", "Critical"];
  return entries.map((entry) => {
    const e = entry as Record<string, unknown>;
    const rating = String(e.riskLevel ?? "Medium");
    return {
      hazard: String(e.hazard ?? ""),
      riskLevel: (
        validRatings.includes(rating) ? rating : "Medium"
      ) as SsspHazardEntry["riskLevel"],
      controlMeasures: Array.isArray(e.controlMeasures)
        ? e.controlMeasures.map(String)
        : [],
      responsibleParty: String(e.responsibleParty ?? "Site Foreman"),
      oshaReference: String(e.oshaReference ?? ""),
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
      {
        error:
          "Trade, project description, and project address are required",
      },
      { status: 400 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
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
      sections: { heading: string; content: string }[];
      hazardAssessment: unknown[];
      ppeMatrix: { role: string; requiredPpe: string[] }[];
      emergencyContacts: {
        role: string;
        responsibility: string;
      }[];
      oshaReferences: string[];
    };

    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const document: SsspDocument = {
      title: parsed.title,
      trade: validated.trade,
      date: today,
      companyName: validated.companyName || "Your Company",
      projectAddress: validated.projectAddress,
      projectDescription: validated.projectDescription,
      projectStartDate: validated.projectStartDate || "TBD",
      projectDuration: validated.projectDuration || "TBD",
      numberOfWorkers: validated.numberOfWorkers || "TBD",
      sections: parsed.sections ?? [],
      hazardAssessment: validateHazardEntries(
        parsed.hazardAssessment ?? []
      ),
      ppeMatrix: parsed.ppeMatrix ?? [],
      emergencyContacts: parsed.emergencyContacts ?? [],
      oshaReferences: parsed.oshaReferences ?? [],
    };

    return Response.json({ document });
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Unknown error";
    console.error("SSSP generation failed:", msg);
    return Response.json(
      {
        error:
          "Failed to generate Site-Specific Safety Plan. Please try again.",
      },
      { status: 500 }
    );
  }
}
