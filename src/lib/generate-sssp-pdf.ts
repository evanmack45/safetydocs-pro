import jsPDF from "jspdf";
import type { SsspDocument, SsspHazardEntry } from "@/lib/types";

const PAGE_MARGIN = 15;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2;
const LINE_HEIGHT = 5;
const SECTION_GAP = 6;
const BLUE = [30, 64, 175] as const;
const DARK = [23, 23, 23] as const;
const GRAY = [100, 100, 100] as const;
const AMBER = [217, 119, 6] as const;
const LIGHT_GRAY = [245, 245, 245] as const;
const RED = [220, 38, 38] as const;
const YELLOW = [234, 179, 8] as const;
const GREEN = [22, 163, 74] as const;

function addNewPageIfNeeded(
  doc: jsPDF,
  y: number,
  needed: number
): number {
  if (y + needed > 275) {
    doc.addPage();
    return PAGE_MARGIN;
  }
  return y;
}

function wrapText(
  doc: jsPDF,
  text: string,
  maxWidth: number
): string[] {
  return doc.splitTextToSize(text, maxWidth) as string[];
}

function getRiskColor(
  rating: string
): readonly [number, number, number] {
  switch (rating) {
    case "Critical":
      return RED;
    case "High":
      return AMBER;
    case "Medium":
      return YELLOW;
    default:
      return GREEN;
  }
}

function drawSectionHeading(
  doc: jsPDF,
  heading: string,
  y: number
): number {
  y = addNewPageIfNeeded(doc, y, 15);
  doc.setTextColor(...BLUE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(heading.toUpperCase(), PAGE_MARGIN, y);
  y += LINE_HEIGHT + 2;
  return y;
}

function drawSectionContent(
  doc: jsPDF,
  content: string,
  y: number
): number {
  doc.setTextColor(...DARK);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const paragraphs = content.split("\n");
  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) {
      y += 2;
      continue;
    }
    const lines = wrapText(doc, paragraph.trim(), CONTENT_WIDTH);
    for (const line of lines) {
      y = addNewPageIfNeeded(doc, y, LINE_HEIGHT);
      doc.text(line, PAGE_MARGIN, y);
      y += LINE_HEIGHT;
    }
    y += 1;
  }
  return y;
}

function drawHazardRow(
  doc: jsPDF,
  entry: SsspHazardEntry,
  index: number,
  y: number
): number {
  const col1 = PAGE_MARGIN;
  const col1W = 45;
  const col2 = col1 + col1W + 2;
  const col2W = 14;
  const col3 = col2 + col2W + 2;
  const col3W = 55;
  const col4 = col3 + col3W + 2;
  const col4W = CONTENT_WIDTH - (col4 - PAGE_MARGIN);

  const hazardLines = wrapText(doc, entry.hazard, col1W);
  const controlText = entry.controlMeasures.join("; ");
  const controlLines = wrapText(doc, controlText, col3W);
  const partyLines = wrapText(doc, entry.responsibleParty, col4W);

  const maxLines = Math.max(
    hazardLines.length,
    controlLines.length,
    partyLines.length,
    1
  );
  const rowHeight = maxLines * LINE_HEIGHT + 4;

  y = addNewPageIfNeeded(doc, y, rowHeight + 2);

  if (index % 2 === 0) {
    doc.setFillColor(...LIGHT_GRAY);
    doc.rect(PAGE_MARGIN, y - 3, CONTENT_WIDTH, rowHeight, "F");
  }

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...DARK);

  let lineY = y;
  for (const line of hazardLines) {
    doc.text(line, col1, lineY);
    lineY += LINE_HEIGHT;
  }

  const riskColor = getRiskColor(entry.riskLevel);
  doc.setTextColor(...riskColor);
  doc.setFont("helvetica", "bold");
  doc.text(entry.riskLevel, col2, y);
  doc.setFont("helvetica", "normal");

  doc.setTextColor(...DARK);
  lineY = y;
  for (const line of controlLines) {
    doc.text(line, col3, lineY);
    lineY += LINE_HEIGHT;
  }

  lineY = y;
  for (const line of partyLines) {
    doc.text(line, col4, lineY);
    lineY += LINE_HEIGHT;
  }

  if (entry.oshaReference) {
    doc.setFontSize(6);
    doc.setTextColor(...GRAY);
    doc.text(
      entry.oshaReference,
      col3,
      y + maxLines * LINE_HEIGHT + 1
    );
  }

  return y + rowHeight + 1;
}

export function generateSsspPdf(document: SsspDocument): jsPDF {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm" });
  let y = PAGE_MARGIN;

  // Header bar
  doc.setFillColor(...BLUE);
  doc.rect(0, 0, PAGE_WIDTH, 38, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("SafetyDocs Pro", PAGE_MARGIN, 14);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Site-Specific Safety Plan (SSSP)",
    PAGE_MARGIN,
    22
  );
  doc.setFontSize(8);
  doc.text(document.date, PAGE_WIDTH - PAGE_MARGIN, 12, {
    align: "right",
  });
  doc.text(document.companyName, PAGE_WIDTH - PAGE_MARGIN, 18, {
    align: "right",
  });
  doc.text(
    document.projectAddress,
    PAGE_WIDTH - PAGE_MARGIN,
    24,
    { align: "right" }
  );
  y = 45;

  // Title
  doc.setTextColor(...DARK);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  const titleLines = wrapText(doc, document.title, CONTENT_WIDTH);
  for (const line of titleLines) {
    doc.text(line, PAGE_MARGIN, y);
    y += 7;
  }
  y += 2;

  // Project info box
  doc.setFillColor(...LIGHT_GRAY);
  doc.rect(PAGE_MARGIN, y, CONTENT_WIDTH, 24, "F");
  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.setFont("helvetica", "bold");
  const infoY = y + 5;
  doc.text("Trade:", PAGE_MARGIN + 3, infoY);
  doc.text("Start Date:", PAGE_MARGIN + 3, infoY + 6);
  doc.text("Duration:", PAGE_MARGIN + 3, infoY + 12);
  doc.text("Workers:", PAGE_MARGIN + 90, infoY);
  doc.text("Address:", PAGE_MARGIN + 90, infoY + 6);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...DARK);
  doc.text(document.trade, PAGE_MARGIN + 25, infoY);
  doc.text(document.projectStartDate, PAGE_MARGIN + 30, infoY + 6);
  doc.text(document.projectDuration, PAGE_MARGIN + 27, infoY + 12);
  doc.text(document.numberOfWorkers, PAGE_MARGIN + 112, infoY);
  doc.text(document.projectAddress, PAGE_MARGIN + 112, infoY + 6);
  y += 30;

  // Divider
  doc.setDrawColor(...AMBER);
  doc.setLineWidth(0.5);
  doc.line(PAGE_MARGIN, y, PAGE_WIDTH - PAGE_MARGIN, y);
  y += SECTION_GAP;

  // Main sections
  for (const section of document.sections) {
    y = drawSectionHeading(doc, section.heading, y);
    y = drawSectionContent(doc, section.content, y);
    y += SECTION_GAP;
  }

  // Hazard Assessment Table
  if (document.hazardAssessment.length > 0) {
    y = addNewPageIfNeeded(doc, y, 30);
    doc.setDrawColor(...AMBER);
    doc.line(PAGE_MARGIN, y, PAGE_WIDTH - PAGE_MARGIN, y);
    y += SECTION_GAP;

    y = drawSectionHeading(doc, "Hazard Assessment Summary", y);

    // Table header
    doc.setFillColor(...BLUE);
    doc.rect(PAGE_MARGIN, y - 4, CONTENT_WIDTH, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text("Hazard", PAGE_MARGIN + 2, y);
    doc.text("Risk", PAGE_MARGIN + 47, y);
    doc.text("Control Measures", PAGE_MARGIN + 63, y);
    doc.text("Responsible", PAGE_MARGIN + 120, y);
    y += 7;

    for (let i = 0; i < document.hazardAssessment.length; i++) {
      y = drawHazardRow(
        doc,
        document.hazardAssessment[i],
        i,
        y
      );
    }
    y += SECTION_GAP;
  }

  // PPE Matrix
  if (document.ppeMatrix.length > 0) {
    y = addNewPageIfNeeded(doc, y, 25);
    doc.setDrawColor(...AMBER);
    doc.line(PAGE_MARGIN, y, PAGE_WIDTH - PAGE_MARGIN, y);
    y += SECTION_GAP;

    y = drawSectionHeading(doc, "PPE Requirements by Role", y);

    for (let i = 0; i < document.ppeMatrix.length; i++) {
      const ppe = document.ppeMatrix[i];
      y = addNewPageIfNeeded(doc, y, 10);

      if (i % 2 === 0) {
        doc.setFillColor(...LIGHT_GRAY);
        doc.rect(PAGE_MARGIN, y - 3, CONTENT_WIDTH, 8, "F");
      }

      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...DARK);
      doc.text(ppe.role, PAGE_MARGIN + 2, y);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(...GRAY);
      const ppeText = ppe.requiredPpe.join(", ");
      const ppeLines = wrapText(doc, ppeText, CONTENT_WIDTH - 50);
      let lineY = y;
      for (const line of ppeLines) {
        doc.text(line, PAGE_MARGIN + 48, lineY);
        lineY += LINE_HEIGHT;
      }
      y = lineY + 2;
    }
    y += SECTION_GAP;
  }

  // Emergency Contacts
  if (document.emergencyContacts.length > 0) {
    y = addNewPageIfNeeded(doc, y, 25);
    doc.setDrawColor(...AMBER);
    doc.line(PAGE_MARGIN, y, PAGE_WIDTH - PAGE_MARGIN, y);
    y += SECTION_GAP;

    y = drawSectionHeading(
      doc,
      "Emergency Contact Roles",
      y
    );

    doc.setFontSize(8);
    for (const contact of document.emergencyContacts) {
      y = addNewPageIfNeeded(doc, y, 10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...DARK);
      doc.text(contact.role, PAGE_MARGIN + 2, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...GRAY);
      doc.text(contact.responsibility, PAGE_MARGIN + 55, y);
      y += LINE_HEIGHT + 1;
    }
    y += SECTION_GAP;
  }

  // OSHA References
  if (document.oshaReferences.length > 0) {
    y = addNewPageIfNeeded(doc, y, 20);
    doc.setDrawColor(...AMBER);
    doc.line(PAGE_MARGIN, y, PAGE_WIDTH - PAGE_MARGIN, y);
    y += SECTION_GAP;

    y = drawSectionHeading(
      doc,
      "OSHA Regulation References",
      y
    );

    doc.setTextColor(...DARK);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    for (const ref of document.oshaReferences) {
      y = addNewPageIfNeeded(doc, y, LINE_HEIGHT);
      doc.text(`  ${ref}`, PAGE_MARGIN, y);
      y += LINE_HEIGHT;
    }
    y += SECTION_GAP;
  }

  // Signature block
  y = addNewPageIfNeeded(doc, y, 45);
  y += 6;
  doc.setDrawColor(...AMBER);
  doc.line(PAGE_MARGIN, y, PAGE_WIDTH - PAGE_MARGIN, y);
  y += 8;

  doc.setTextColor(...BLUE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("PLAN APPROVAL", PAGE_MARGIN, y);
  y += 8;

  doc.setDrawColor(...GRAY);
  doc.setLineWidth(0.3);
  doc.setTextColor(...GRAY);
  doc.setFontSize(9);

  const sigLabels = [
    "Prepared by (Safety Officer):",
    "Approved by (Project Manager):",
    "Reviewed by (Site Foreman):",
  ];

  for (const label of sigLabels) {
    y = addNewPageIfNeeded(doc, y, 15);
    doc.setFont("helvetica", "bold");
    doc.text(label, PAGE_MARGIN, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.line(PAGE_MARGIN, y, PAGE_MARGIN + 70, y);
    doc.line(PAGE_MARGIN + 80, y, PAGE_MARGIN + 120, y);
    y += 4;
    doc.setFontSize(7);
    doc.text("Signature", PAGE_MARGIN, y);
    doc.text("Date", PAGE_MARGIN + 80, y);
    doc.setFontSize(9);
    y += 8;
  }

  // Footer on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...GRAY);
    doc.text(
      `Generated by SafetyDocs Pro | Site-Specific Safety Plan | Page ${i} of ${pageCount}`,
      PAGE_WIDTH / 2,
      290,
      { align: "center" }
    );
  }

  return doc;
}
