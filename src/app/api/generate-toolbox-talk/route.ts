import Anthropic from "@anthropic-ai/sdk";
import type { ToolboxTalkRequest, ToolboxTalkDocument } from "@/lib/types";

const SYSTEM_PROMPT = `You are an OSHA safety compliance expert specializing in residential construction. You generate professional toolbox talk documents for small subcontractors.

Your toolbox talks MUST:
- Be specific to the trade and project described
- Include correct OSHA regulation citations (29 CFR 1926.xxx for construction)
- Use plain language that field workers understand
- Cover: topic overview, specific hazards, required PPE, safe work procedures, emergency procedures
- Be thorough but concise (workers need to review these in 10-15 minutes)

Respond ONLY with valid JSON matching this exact schema:
{
  "title": "string - descriptive title for the toolbox talk",
  "sections": [
    {
      "heading": "string - section heading",
      "content": "string - section content with line breaks as \\n"
    }
  ],
  "oshaReferences": ["string - OSHA regulation citations, e.g. 29 CFR 1926.501(b)(1)"]
}

Include these sections at minimum:
1. Topic Overview
2. Hazard Identification
3. Required PPE
4. Safe Work Procedures
5. Emergency Procedures
6. Key Reminders

Do not include any text outside the JSON object.`;

function buildUserPrompt(request: ToolboxTalkRequest): string {
  let prompt = `Generate a toolbox talk for the following:

Trade: ${request.trade}
Project Description: ${request.projectDescription}`;

  if (request.specificHazards.trim()) {
    prompt += `\nSpecific Hazards to Address: ${request.specificHazards}`;
  }

  if (request.projectLocation.trim()) {
    prompt += `\nProject Location: ${request.projectLocation}`;
  }

  return prompt;
}

function validateRequest(
  body: Record<string, unknown>
): ToolboxTalkRequest | null {
  const { trade, projectDescription, companyName, projectLocation } = body;
  if (
    typeof trade !== "string" ||
    !trade.trim() ||
    typeof projectDescription !== "string" ||
    !projectDescription.trim()
  ) {
    return null;
  }
  return {
    trade: trade.trim(),
    projectDescription: projectDescription.trim(),
    specificHazards:
      typeof body.specificHazards === "string"
        ? body.specificHazards.trim()
        : "",
    companyName:
      typeof companyName === "string" ? companyName.trim() : "",
    projectLocation:
      typeof projectLocation === "string" ? projectLocation.trim() : "",
  };
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
      { error: "Trade and project description are required" },
      { status: 400 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: buildUserPrompt(validated),
        },
      ],
      system: SYSTEM_PROMPT,
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return Response.json(
        { error: "AI returned an unexpected response format" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(textBlock.text) as {
      title: string;
      sections: { heading: string; content: string }[];
      oshaReferences: string[];
    };

    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const document: ToolboxTalkDocument = {
      title: parsed.title,
      trade: validated.trade,
      date: today,
      companyName: validated.companyName || "Your Company",
      projectLocation: validated.projectLocation || "Project Site",
      sections: parsed.sections,
      oshaReferences: parsed.oshaReferences,
    };

    return Response.json({ document });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error";
    console.error("Toolbox talk generation failed:", message);
    return Response.json(
      { error: "Failed to generate toolbox talk. Please try again." },
      { status: 500 }
    );
  }
}
