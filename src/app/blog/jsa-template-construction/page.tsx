import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title:
    "Free JSA Template for Construction: How to Do a Job Safety Analysis | SafetyDocs Pro",
  description:
    "Step-by-step guide to writing a Job Safety Analysis (JSA) for construction work. Includes a free template and real examples for residential subcontractors.",
  keywords: [
    "JSA template construction",
    "JSA template",
    "job safety analysis",
    "job safety analysis template",
    "JSA form construction",
    "job hazard analysis construction",
    "construction safety documents",
  ],
  openGraph: {
    title:
      "Free JSA Template for Construction: How to Do a Job Safety Analysis",
    description:
      "Step-by-step guide to writing a Job Safety Analysis for construction work, with a free template you can use today.",
    type: "article",
  },
};

export default function JsaTemplate() {
  return (
    <BlogLayout
      title="Free JSA Template for Construction: How to Do a Job Safety Analysis"
      description="Step-by-step guide to writing a Job Safety Analysis for construction work, with a free template you can use today."
      publishDate="2026-04-02"
      readTime="9 min"
    >
      <p>
        A Job Safety Analysis (JSA) — sometimes called a Job Hazard
        Analysis (JHA) — breaks a work task into steps, identifies
        the hazards at each step, and describes how to control
        those hazards. It is one of the most effective safety tools
        for construction, and many general contractors require one
        before you start work on their site.
      </p>
      <p>
        This guide walks you through writing a JSA for construction
        work, with a template and a real example you can adapt to
        your trade.
      </p>

      <h2>What Is a Job Safety Analysis?</h2>
      <p>
        A JSA is a written document that answers three questions for
        each step of a job:
      </p>
      <ol>
        <li>What are the steps to do this task?</li>
        <li>What could go wrong at each step?</li>
        <li>How do we prevent it from going wrong?</li>
      </ol>
      <p>
        OSHA recommends JSAs under their{" "}
        <strong>Job Hazard Analysis guidelines (OSHA 3071)</strong>.
        While not a formal regulation, many OSHA standards — like
        29 CFR 1926.21 (safety training) — effectively require the
        kind of hazard identification that a JSA provides.
      </p>
      <p>
        For residential subcontractors, JSAs are especially valuable
        because:
      </p>
      <ul>
        <li>
          GCs and project owners increasingly require them as a
          condition of working on site
        </li>
        <li>
          They serve as training documents for new employees
        </li>
        <li>
          They demonstrate due diligence if an incident occurs
        </li>
        <li>
          They force you to think through hazards before work
          starts — not after someone gets hurt
        </li>
      </ul>

      <h2>JSA Template: The Format</h2>
      <p>
        Every JSA follows the same three-column format. Here is the
        template:
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Job Step
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Potential Hazards
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Controls / Safe Procedures
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-3 text-gray-500">
                Step 1: [Describe the task]
              </td>
              <td className="border border-gray-300 px-4 py-3 text-gray-500">
                What could cause injury?
              </td>
              <td className="border border-gray-300 px-4 py-3 text-gray-500">
                How do we prevent it?
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-3 text-gray-500">
                Step 2: ...
              </td>
              <td className="border border-gray-300 px-4 py-3 text-gray-500">
                ...
              </td>
              <td className="border border-gray-300 px-4 py-3 text-gray-500">
                ...
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-3 text-gray-500">
                Step 3: ...
              </td>
              <td className="border border-gray-300 px-4 py-3 text-gray-500">
                ...
              </td>
              <td className="border border-gray-300 px-4 py-3 text-gray-500">
                ...
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The header of the JSA should include: job title, date,
        location, crew members, supervisor name, and required PPE.
      </p>

      <h2>Example: JSA for Residential Roof Shingle Installation</h2>
      <p>
        Here is a real example of what a completed JSA looks like
        for a common residential task:
      </p>

      <div className="my-6 rounded-lg border border-gray-300 bg-gray-50 p-4">
        <p className="mb-2 font-semibold text-gray-900">
          Job: Residential Roof Shingle Installation
        </p>
        <p className="mb-1 text-sm text-gray-600">
          Location: 123 Main St, Residential New Build
        </p>
        <p className="mb-4 text-sm text-gray-600">
          Required PPE: Hard hat, safety glasses, work gloves,
          non-slip boots, personal fall arrest system
        </p>
      </div>

      <div className="my-6 overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Job Step
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Potential Hazards
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Controls / Safe Procedures
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-3">
                1. Set up ladders and access to roof
              </td>
              <td className="border border-gray-300 px-4 py-3">
                Falls from ladder; ladder sliding or tipping
              </td>
              <td className="border border-gray-300 px-4 py-3">
                Extend ladder 3 ft above roof edge. Set on firm,
                level surface. Maintain 4:1 angle. Three points of
                contact. Have spotter hold base.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-3">
                2. Install fall protection anchors
              </td>
              <td className="border border-gray-300 px-4 py-3">
                Falls from roof edge during anchor installation
              </td>
              <td className="border border-gray-300 px-4 py-3">
                First worker up uses temporary anchor or controlled
                access zone per 29 CFR 1926.502(k). Anchors rated
                for 5,000 lbs per person attached.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-3">
                3. Hoist materials to roof
              </td>
              <td className="border border-gray-300 px-4 py-3">
                Struck-by falling bundles; overexertion; back injury
              </td>
              <td className="border border-gray-300 px-4 py-3">
                Use mechanical hoist where possible. Clear area
                below drop zone. Team lift for bundles over 50 lbs.
                Hard hats required below.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-3">
                4. Remove old shingles (if re-roof)
              </td>
              <td className="border border-gray-300 px-4 py-3">
                Nail puncture; slipping on debris; falling off roof
              </td>
              <td className="border border-gray-300 px-4 py-3">
                Wear puncture-resistant boots. Clean debris
                continuously. Stay clipped in to fall arrest.
                Dispose of nails in bucket, not on roof.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-3">
                5. Install underlayment and shingles
              </td>
              <td className="border border-gray-300 px-4 py-3">
                Nail gun injuries; repetitive motion; heat illness
              </td>
              <td className="border border-gray-300 px-4 py-3">
                Sequential-trip trigger only (no bump-fire). Keep
                finger off trigger when not nailing. Rotate tasks
                to prevent strain. Water and shade breaks every
                hour in heat.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-3">
                6. Clean up and descend
              </td>
              <td className="border border-gray-300 px-4 py-3">
                Falls during descent; debris falling to ground
              </td>
              <td className="border border-gray-300 px-4 py-3">
                Remove tools and loose materials before descending.
                Last worker removes anchors using controlled access.
                Descend ladder facing it with 3-point contact.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>How to Write Your Own JSA: Step by Step</h2>

      <h3>Step 1: Choose the Job</h3>
      <p>
        Start with your highest-risk tasks — the ones most likely
        to cause injury. For most residential subs, that means:
        working at heights, electrical work, trenching, or using
        heavy equipment.
      </p>

      <h3>Step 2: Break It Into Steps</h3>
      <p>
        Walk through the job from start to finish. List 5-10
        major steps. Not too detailed (you are not writing a full
        procedure manual), but enough that each step represents
        a distinct activity where hazards change.
      </p>

      <h3>Step 3: Identify Hazards at Each Step</h3>
      <p>
        For each step, ask: what could hurt someone here? Think
        about:
      </p>
      <ul>
        <li>
          <strong>Falls</strong> — From heights, same level
          (trips/slips)
        </li>
        <li>
          <strong>Struck-by</strong> — Falling objects, swinging
          loads, vehicles
        </li>
        <li>
          <strong>Caught-in/between</strong> — Moving parts,
          cave-ins, pinch points
        </li>
        <li>
          <strong>Electrical</strong> — Shock, arc flash, static
        </li>
        <li>
          <strong>Overexertion</strong> — Heavy lifting, repetitive
          motion, heat
        </li>
        <li>
          <strong>Exposure</strong> — Chemicals, dust, noise,
          temperature
        </li>
      </ul>

      <h3>Step 4: Write Controls for Each Hazard</h3>
      <p>
        Follow the hierarchy of controls (most effective first):
      </p>
      <ol>
        <li>
          <strong>Elimination</strong> — Can you remove the hazard
          entirely?
        </li>
        <li>
          <strong>Substitution</strong> — Can you use a less
          hazardous method?
        </li>
        <li>
          <strong>Engineering controls</strong> — Guardrails,
          ventilation, machine guards
        </li>
        <li>
          <strong>Administrative controls</strong> — Training,
          procedures, rotation
        </li>
        <li>
          <strong>PPE</strong> — The last line of defense, not the
          first
        </li>
      </ol>

      <h3>Step 5: Review with Your Crew</h3>
      <p>
        The best JSAs are written with input from the workers who
        actually do the job. They know the real hazards better than
        anyone. Review the JSA at a{" "}
        <Link
          href="/blog/what-is-a-toolbox-talk"
          className="font-semibold text-blue-800 hover:underline"
        >
          toolbox talk
        </Link>{" "}
        before starting the task.
      </p>

      <h2>Common Mistakes in JSAs</h2>
      <ul>
        <li>
          <strong>Too generic</strong> — &quot;Be careful&quot; is
          not a control. Specify exactly what to do.
        </li>
        <li>
          <strong>Missing steps</strong> — Setup and cleanup are
          where many injuries happen. Include them.
        </li>
        <li>
          <strong>Only listing PPE as controls</strong> — PPE is
          the weakest control. Always look for engineering or
          administrative controls first.
        </li>
        <li>
          <strong>Never updating</strong> — JSAs should be living
          documents. Update them when conditions change or after
          near-misses.
        </li>
      </ul>

      <h2>Generate a Custom JSA in Seconds</h2>
      <p>
        Writing a thorough JSA from scratch takes 30-60 minutes of
        research and formatting. If you need JSAs for multiple
        tasks across different trades, that adds up fast.
      </p>
      <p>
        <Link
          href="/generate"
          className="font-semibold text-blue-800 hover:underline"
        >
          SafetyDocs Pro generates custom JSAs
        </Link>{" "}
        tailored to your specific trade, project type, and site
        conditions. You get a professional document with the right
        OSHA citations, proper hazard identification, and
        actionable controls — ready to print and use on the
        jobsite.
      </p>
      <p>
        JSA forms are{" "}
        <Link
          href="/pricing"
          className="font-semibold text-blue-800 hover:underline"
        >
          $49 each
        </Link>
        . One document costs less than 30 minutes of your time —
        and a fraction of what OSHA fines for missing
        documentation.
      </p>
    </BlogLayout>
  );
}
