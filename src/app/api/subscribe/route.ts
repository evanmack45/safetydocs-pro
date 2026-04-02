import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_PATH = path.join(
  process.cwd(),
  "data",
  "subscribers.json",
);

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readSubscribers(): Promise<string[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_PATH, "utf-8");
    return JSON.parse(data) as string[];
  } catch {
    return [];
  }
}

async function writeSubscribers(subscribers: string[]): Promise<void> {
  const dir = path.dirname(SUBSCRIBERS_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    SUBSCRIBERS_PATH,
    JSON.stringify(subscribers, null, 2),
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const subscribers = await readSubscribers();

    if (subscribers.includes(email)) {
      return Response.json(
        { message: "You're already on the list!" },
        { status: 200 },
      );
    }

    subscribers.push(email);
    await writeSubscribers(subscribers);

    return Response.json(
      { message: "Thanks for signing up! We'll notify you at launch." },
      { status: 201 },
    );
  } catch {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
