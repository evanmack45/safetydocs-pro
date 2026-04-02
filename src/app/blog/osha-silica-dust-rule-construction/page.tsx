import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title:
    "OSHA Silica Dust Rule for Construction: Table 1 Compliance Explained",
  description:
    "How to comply with OSHA's silica dust rule (29 CFR 1926.1153) on construction sites. Table 1 explained in plain language for small contractors cutting concrete, brick, and tile.",
  keywords: [
    "OSHA silica dust rule",
    "silica dust construction",
    "29 CFR 1926.1153",
    "Table 1 silica",
    "silica exposure construction",
    "crystalline silica OSHA",
    "silica dust toolbox talk",
    "cutting concrete silica",
    "silica dust mask requirements",
  ],
  alternates: {
    canonical:
      "https://safetydocspro.com/blog/osha-silica-dust-rule-construction",
  },
  openGraph: {
    title:
      "OSHA Silica Dust Rule for Construction: Table 1 Compliance Explained",
    description:
      "How to comply with OSHA's silica dust rule on construction sites. Table 1 explained in plain language for contractors.",
    type: "article",
  },
};

export default function SilicaDustRule() {
  return (
    <BlogLayout
      title="OSHA Silica Dust Rule for Construction: Table 1 Compliance Explained"
      description="How to comply with OSHA's silica dust rule (29 CFR 1926.1153) on construction sites. Table 1 explained in plain language for small contractors."
      publishDate="2026-04-02"
      readTime="10 min"
      slug="osha-silica-dust-rule-construction"
    >
      <p>
        If your crew cuts concrete, grinds mortar, drills into brick,
        or saws tile, they are breathing crystalline silica dust. You
        cannot see it, you cannot smell it, and it causes permanent
        lung damage. OSHA&apos;s silica dust rule{" "}
        <strong>(29 CFR 1926.1153)</strong> applies to every
        construction employer — including small residential subs with
        just a few workers.
      </p>
      <p>
        The good news: OSHA built a cheat sheet called{" "}
        <strong>Table 1</strong> that tells you exactly what controls
        to use for common tasks. Follow Table 1 and you are compliant.
        No air monitoring, no exposure assessments, no industrial
        hygienist. Here is how it works.
      </p>

      <h2>Why Silica Dust Matters</h2>
      <p>
        Crystalline silica is a mineral found in concrete, brick,
        mortar, sandstone, granite, and tile. When you cut, grind, or
        drill these materials, fine dust particles become airborne.
        Particles small enough to reach the deepest parts of your
        lungs.
      </p>
      <p>
        Long-term silica exposure causes{" "}
        <strong>silicosis</strong> — irreversible scarring of the
        lungs. It also increases risk of lung cancer, kidney disease,
        and chronic obstructive pulmonary disease (COPD). There is no
        cure for silicosis. Once the damage is done, it is permanent.
      </p>
      <p>
        OSHA estimates that 2.3 million workers in the U.S. are
        exposed to silica dust on the job. Construction workers face
        the highest exposure levels of any industry.
      </p>

      <h2>The Rule: 29 CFR 1926.1153</h2>
      <p>
        OSHA&apos;s construction silica standard sets a{" "}
        <strong>
          permissible exposure limit (PEL) of 50 micrograms per cubic
          meter of air
        </strong>
        , averaged over an 8-hour shift. That is an incredibly small
        amount — invisible to the naked eye.
      </p>
      <p>
        For small contractors, the standard offers two paths to
        compliance:
      </p>
      <ol>
        <li>
          <strong>Table 1</strong> — Follow the specified controls
          for your task. No air monitoring required.
        </li>
        <li>
          <strong>Alternative exposure control methods</strong> —
          Conduct air monitoring, measure actual exposure levels, and
          implement controls to stay below the PEL.
        </li>
      </ol>
      <p>
        For almost every small residential sub,{" "}
        <strong>Table 1 is the way to go</strong>. It is simpler,
        cheaper, and does not require hiring a consultant to do air
        sampling.
      </p>

      <h2>Table 1: The Contractor&apos;s Cheat Sheet</h2>
      <p>
        Table 1 lists 18 common construction tasks that generate
        silica dust. For each task, it specifies the exact engineering
        controls and respiratory protection required. Here are the
        tasks most relevant to residential subcontractors:
      </p>

      <h3>Cutting with a Handheld Saw</h3>
      <p>
        This covers cutting concrete, brick, block, and tile with a
        handheld power saw (including masonry saws and angle
        grinders with cutting wheels).
      </p>
      <ul>
        <li>
          <strong>Required control:</strong> Use a saw with
          integrated water delivery that continuously feeds water to
          the blade
        </li>
        <li>
          <strong>Respiratory protection:</strong> None required when
          cutting outdoors. APF 10 respirator (like an N95) required
          for indoor work.
        </li>
        <li>
          <strong>Key detail:</strong> The water must actually reach
          the blade during the entire cut. A dry-cut saw with a
          bottle of water nearby does not count.
        </li>
      </ul>

      <h3>Using a Handheld Grinder for Mortar Removal</h3>
      <p>
        Tuckpointing and mortar removal with an angle grinder are
        among the highest-silica-exposure tasks in construction.
      </p>
      <ul>
        <li>
          <strong>Required control:</strong> Grinder with integrated
          shroud and dust collection system (commercial vacuum with
          HEPA filter)
        </li>
        <li>
          <strong>Respiratory protection:</strong> APF 10 respirator
          required outdoors, APF 25 required indoors
        </li>
        <li>
          <strong>Key detail:</strong> The shroud must be designed
          for the specific grinder and wheel size. A zip-tied piece
          of sheet metal does not qualify.
        </li>
      </ul>

      <h3>Drilling with a Handheld or Stand-Mounted Drill</h3>
      <p>
        Drilling into concrete, brick, or block for anchors,
        fasteners, or conduit.
      </p>
      <ul>
        <li>
          <strong>Required control:</strong> Drill with commercially
          designed dust collection system (shroud or funnel around
          the bit connected to a vacuum with HEPA filter)
        </li>
        <li>
          <strong>Respiratory protection:</strong> None required when
          using the dust collection system
        </li>
        <li>
          <strong>Key detail:</strong> This applies to hammer drills
          and rotary hammers too — any drill making holes in
          silica-containing materials.
        </li>
      </ul>

      <h3>Jackhammering and Breaking Concrete</h3>
      <ul>
        <li>
          <strong>Required control:</strong> Use a water delivery
          system that continuously wets the point of impact
        </li>
        <li>
          <strong>Respiratory protection:</strong> None required
          outdoors when using water. APF 10 required indoors.
        </li>
      </ul>

      <h3>Mixing Concrete or Mortar</h3>
      <ul>
        <li>
          <strong>Required control:</strong> Use a mixer with a
          water delivery system that wets the mix. If mixing by hand,
          use a bag-slitting method and dump into an enclosed mixer.
        </li>
        <li>
          <strong>Respiratory protection:</strong> None required
          outdoors. APF 10 required indoors.
        </li>
      </ul>

      <h2>What &quot;APF 10&quot; Means</h2>
      <p>
        You will see &quot;APF 10&quot; a lot in Table 1. APF stands
        for <strong>Assigned Protection Factor</strong>. APF 10 means
        the respirator reduces your exposure by a factor of 10. In
        practical terms:
      </p>
      <ul>
        <li>
          <strong>APF 10:</strong> A properly fitted N95 or half-face
          respirator. This is the most common requirement for
          residential work.
        </li>
        <li>
          <strong>APF 25:</strong> A powered air-purifying respirator
          (PAPR) with a loose-fitting facepiece, or a half-face
          respirator with P100 filters.
        </li>
      </ul>
      <p>
        The catch: if you put workers in respirators, OSHA&apos;s
        respiratory protection standard{" "}
        <strong>(29 CFR 1910.134)</strong> kicks in. That means you
        need a written respiratory protection program, medical
        evaluations, and annual fit testing. For a small sub, this
        is an added cost — but skipping it makes the respirator use
        non-compliant.
      </p>

      <h2>
        Your Obligations Beyond Table 1
      </h2>
      <p>
        Even when using Table 1, you still must:
      </p>
      <ol>
        <li>
          <strong>Restrict access</strong> to work areas where silica
          dust is generated. Use signs or barriers to keep other
          workers out.
        </li>
        <li>
          <strong>Offer medical exams</strong> to workers who wear
          respirators for 30 or more days per year. The exam includes
          a chest X-ray and lung function test, provided at no cost
          to the worker.
        </li>
        <li>
          <strong>Train workers</strong> on the health effects of
          silica exposure, the specific controls being used, and the
          purpose and proper use of respiratory protection.
        </li>
        <li>
          <strong>Keep records</strong> of exposure assessments (if
          you use the alternative method instead of Table 1) and
          medical exams.
        </li>
        <li>
          <strong>Designate a competent person</strong> to implement
          the written exposure control plan and ensure dust controls
          are working properly.
        </li>
      </ol>

      <h2>Common Violations and Fines</h2>
      <p>
        OSHA has been enforcing the silica standard aggressively
        since it took full effect in 2018. Common citations on
        construction sites:
      </p>
      <ul>
        <li>
          <strong>Dry cutting concrete or masonry</strong> — No water
          suppression and no dust collection. This is the most
          frequently cited violation.
        </li>
        <li>
          <strong>No respiratory protection program</strong> —
          Handing workers dust masks without fit testing, medical
          evaluations, or a written program.
        </li>
        <li>
          <strong>No training</strong> — Workers cutting
          silica-containing materials with no knowledge of the
          hazards or required controls.
        </li>
        <li>
          <strong>Inadequate dust collection</strong> — Using a shop
          vacuum instead of a HEPA-filtered commercial unit, or
          using a shroud that does not fit the grinder.
        </li>
      </ul>
      <p>
        Penalties mirror the fall protection numbers: up to{" "}
        <strong>$16,131 for a serious violation</strong> and{" "}
        <strong>$161,323 for a willful violation</strong> (2026
        rates). Per-worker multipliers apply here too.
      </p>

      <h2>Run a Silica Dust Toolbox Talk</h2>
      <p>
        Before any task that generates silica dust, your crew needs
        a{" "}
        <Link
          href="/blog/what-is-a-toolbox-talk"
          className="font-semibold text-blue-800 hover:underline"
        >
          toolbox talk
        </Link>{" "}
        covering the hazards and required controls. A good silica
        toolbox talk covers:
      </p>
      <ul>
        <li>What silica is and why it is dangerous</li>
        <li>Which tasks on today&apos;s job generate silica dust</li>
        <li>
          The specific controls being used (wet cutting, dust
          collection, etc.)
        </li>
        <li>Required PPE and respirator use</li>
        <li>
          What to do if dust controls fail (stop work, notify
          supervisor)
        </li>
      </ul>
      <p>
        <Link
          href="/generate"
          className="font-semibold text-blue-800 hover:underline"
        >
          SafetyDocs Pro generates silica dust toolbox talks
        </Link>{" "}
        tailored to your specific task — cutting, grinding, drilling,
        or demolition. The document includes the correct Table 1
        controls, required PPE, and OSHA regulation citations. Print
        it, discuss it with your crew, and have everyone sign in.
      </p>
      <p>
        Ready in seconds, not hours. Toolbox talks start at{" "}
        <Link
          href="/pricing"
          className="font-semibold text-blue-800 hover:underline"
        >
          $29
        </Link>
        .
      </p>
    </BlogLayout>
  );
}
