import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title:
    "OSHA Requirements for Small Contractors: What You Actually Need",
  description:
    "Cut through the confusion. Here is exactly what OSHA requires from residential subcontractors with fewer than 20 employees — documentation, training, and inspections.",
  keywords: [
    "OSHA requirements small contractor",
    "OSHA compliance for contractors",
    "OSHA documentation requirements",
    "OSHA small business",
    "OSHA fines small contractor",
    "OSHA residential construction",
  ],
  alternates: {
    canonical: "https://safetydocspro.com/blog/osha-requirements-small-contractors",
  },
  openGraph: {
    title:
      "OSHA Requirements for Small Contractors: What You Actually Need",
    description:
      "Cut through the confusion. Here is exactly what OSHA requires from residential subcontractors with fewer than 20 employees.",
    type: "article",
  },
};

export default function OshaRequirements() {
  return (
    <BlogLayout
      title="OSHA Requirements for Small Contractors: What You Actually Need"
      description="Cut through the confusion. Here is exactly what OSHA requires from residential subcontractors with fewer than 20 employees."
      publishDate="2026-04-02"
      readTime="8 min"
      slug="osha-requirements-small-contractors"
    >
      <p>
        You started your contracting business to do the work you
        are good at — roofing, electrical, plumbing, HVAC. Not to
        become a safety compliance expert. But OSHA does not care
        how small your crew is. The rules apply to every employer
        with at least one employee.
      </p>
      <p>
        The good news: OSHA requirements for small residential subs
        are straightforward once you strip away the legal language.
        Here is what you actually need to have in place.
      </p>

      <h2>Do OSHA Rules Apply to My Small Business?</h2>
      <p>
        Yes. If you have <strong>one or more employees</strong>,
        you are covered by OSHA. Sole proprietors with no employees
        are the only exception.
      </p>
      <p>
        There is one break for small employers: businesses with{" "}
        <strong>10 or fewer employees</strong> are exempt from
        routine OSHA recordkeeping requirements (OSHA 300 logs).
        But you are still required to comply with every safety
        standard, report fatalities and hospitalizations, and
        respond to complaints and inspections.
      </p>
      <p>
        Do not confuse &quot;exempt from recordkeeping&quot; with
        &quot;exempt from OSHA.&quot; That misunderstanding has
        cost small contractors thousands in fines.
      </p>

      <h2>The Core Requirements (What OSHA Actually Checks)</h2>

      <h3>1. Hazard Communication (29 CFR 1926.59)</h3>
      <p>
        If your crew works with any chemicals — adhesives, solvents,
        paints, concrete sealers — you need a written hazard
        communication program. This includes:
      </p>
      <ul>
        <li>A list of hazardous chemicals on your jobsites</li>
        <li>
          Safety Data Sheets (SDS) accessible to all employees
        </li>
        <li>
          Labels on all chemical containers
        </li>
        <li>
          Training on how to read SDS and what the hazards are
        </li>
      </ul>

      <h3>2. Employee Training (29 CFR 1926.21)</h3>
      <p>
        Every employee must be trained on the hazards they will
        face and how to protect themselves. This is not a one-time
        thing — training must cover:
      </p>
      <ul>
        <li>
          Recognition of hazards specific to their work
        </li>
        <li>Proper use of PPE</li>
        <li>
          Safe operation of any equipment they use
        </li>
        <li>Emergency procedures</li>
      </ul>
      <p>
        <strong>How to document it:</strong> Toolbox talks are the
        most common method. Hold a short safety meeting before work,
        cover the day&apos;s hazards, and have everyone sign in.
        Keep these records. Read our{" "}
        <Link
          href="/blog/what-is-a-toolbox-talk"
          className="font-semibold text-blue-800 hover:underline"
        >
          guide to toolbox talks
        </Link>{" "}
        for the full breakdown.
      </p>

      <h3>3. Fall Protection (29 CFR 1926.501)</h3>
      <p>
        Falls are the leading cause of death in construction.
        OSHA requires fall protection for work at{" "}
        <strong>6 feet or above</strong> in construction. This
        means:
      </p>
      <ul>
        <li>Guardrail systems, safety net systems, or personal
          fall arrest systems</li>
        <li>
          Training on proper use of fall protection equipment
        </li>
        <li>Inspections of fall protection gear before each use</li>
      </ul>
      <p>
        For residential construction, there are alternative
        procedures in 29 CFR 1926.502(k) for work between 6 and
        15 feet — but you still need a plan and documentation.
      </p>

      <h3>4. Personal Protective Equipment (29 CFR 1926.95)</h3>
      <p>
        You must assess your jobsite for hazards and provide
        appropriate PPE. Common requirements for residential work:
      </p>
      <ul>
        <li>Hard hats (when overhead hazards exist)</li>
        <li>Safety glasses or goggles</li>
        <li>Work gloves appropriate to the task</li>
        <li>Steel-toe boots</li>
        <li>Hearing protection (when noise exceeds 85 dB)</li>
      </ul>
      <p>
        The employer pays for required PPE (with limited
        exceptions for safety-toe boots and prescription safety
        eyewear).
      </p>

      <h3>5. Electrical Safety (29 CFR 1926, Subpart K)</h3>
      <p>
        Even if you are not an electrician, your crew works around
        electricity. Key requirements:
      </p>
      <ul>
        <li>GFCI protection for all temporary power</li>
        <li>
          Proper clearance distances from power lines
        </li>
        <li>
          Lockout/tagout when working on energized circuits
        </li>
        <li>
          Damaged cords and equipment removed from service
          immediately
        </li>
      </ul>

      <h3>
        6. Scaffolding and Ladders (29 CFR 1926.450-454, 1926.1053)
      </h3>
      <p>
        If your crew uses scaffolds or ladders (and most
        residential subs do):
      </p>
      <ul>
        <li>Ladders must support 4x the intended load</li>
        <li>
          Three points of contact when climbing
        </li>
        <li>
          Scaffolds must be erected on firm, level surfaces
        </li>
        <li>
          Scaffold users must be trained by a &quot;competent
          person&quot;
        </li>
      </ul>

      <h2>What Documentation Do You Need?</h2>
      <p>
        For a small residential sub, the minimum documentation you
        should maintain:
      </p>
      <ol>
        <li>
          <strong>Toolbox talk records</strong> — Date, topic,
          attendees, signatures. Keep for 3-5 years.
        </li>
        <li>
          <strong>Training records</strong> — What training each
          employee received and when.
        </li>
        <li>
          <strong>Hazard communication program</strong> — Written
          program plus SDS binder.
        </li>
        <li>
          <strong>
            Job Safety Analyses (JSAs)
          </strong>{" "}
          — Especially for high-risk tasks. Learn how to write one
          in our{" "}
          <Link
            href="/blog/jsa-template-construction"
            className="font-semibold text-blue-800 hover:underline"
          >
            JSA template guide
          </Link>
          .
        </li>
      </ol>

      <h2>What Happens During an OSHA Inspection?</h2>
      <p>
        OSHA can inspect any jobsite without advance notice. Here
        is what to expect:
      </p>
      <ol>
        <li>
          <strong>Opening conference</strong> — The inspector shows
          credentials and explains the reason for the visit.
        </li>
        <li>
          <strong>Walkaround</strong> — They tour the jobsite,
          observe work practices, and take photos.
        </li>
        <li>
          <strong>Employee interviews</strong> — Inspectors can talk
          to your workers privately.
        </li>
        <li>
          <strong>Document review</strong> — They will ask for
          training records, toolbox talks, and your safety program.
        </li>
        <li>
          <strong>Closing conference</strong> — They discuss what
          they found and potential violations.
        </li>
      </ol>
      <p>
        If violations are found, penalties start at{" "}
        <strong>$16,131 per serious violation</strong> (2026 rates).
        Willful violations can reach <strong>$161,323</strong>.
        Repeat violations are doubled. For a 5-person roofing crew,
        one bad inspection can end the business.
      </p>

      <h2>How to Get Compliant Fast</h2>
      <p>
        You do not need a safety consultant charging $1,500 a visit.
        Start with the basics:
      </p>
      <ol>
        <li>
          Hold a{" "}
          <Link
            href="/blog/what-is-a-toolbox-talk"
            className="font-semibold text-blue-800 hover:underline"
          >
            toolbox talk
          </Link>{" "}
          every day before work.
        </li>
        <li>
          Write a{" "}
          <Link
            href="/blog/jsa-template-construction"
            className="font-semibold text-blue-800 hover:underline"
          >
            JSA
          </Link>{" "}
          for each type of work your crew does.
        </li>
        <li>Keep SDS sheets accessible on every jobsite.</li>
        <li>
          Train your crew on PPE, fall protection, and hazard
          recognition.
        </li>
        <li>Document everything and keep records for 5 years.</li>
      </ol>
      <p>
        <Link
          href="/generate"
          className="font-semibold text-blue-800 hover:underline"
        >
          SafetyDocs Pro can generate toolbox talks and JSAs in
          seconds
        </Link>{" "}
        — tailored to your specific trade, with the correct OSHA
        regulation citations built in. Instead of spending an hour
        researching what to write, you get a professional document
        ready to print and use at your morning meeting.
      </p>
      <p>
        Check our{" "}
        <Link
          href="/pricing"
          className="font-semibold text-blue-800 hover:underline"
        >
          pricing page
        </Link>{" "}
        — toolbox talks start at $29, JSAs at $49.
      </p>
    </BlogLayout>
  );
}
