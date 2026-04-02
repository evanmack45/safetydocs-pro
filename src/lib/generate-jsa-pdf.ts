import jsPDF from "jspdf";
import type { JsaDocument, JsaStep } from "@/lib/types";

const PAGE_MARGIN = 15;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2;
const LINE_HEIGHT = 5;
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

function drawStepRow(
  doc: jsPDF,
  step: JsaStep,
  y: number
): number {
  const col1 = PAGE_MARGIN;
  const col1W = 8;
  const col2 = col1 + col1W + 2;
  const col2W = 42;
  const col3 = col2 + col2W + 2;
  const col3W = 40;
  const col4 = col3 + col3W + 2;
  const col4W = 40;
  const col5 = col4 + col4W + 2;
  const col5W = CONTENT_WIDTH - (col5 - PAGE_MARGIN);

  const taskLines = wrapText(doc, step.taskStep, col2W);
  const hazardText = step.hazards.join("; ");
  const hazardLines = wrapText(doc, hazardText, col3W);
  const controlText = step.controlMeasures.join("; ");
  const controlLines = wrapText(doc, controlText, col4W);
  const ppeText = step.ppeRequired.join(", ");
  const ppeLines = wrapText(doc, ppeText, col5W);

  const maxLines = Math.max(
    taskLines.length,
    hazardLines.length,
    controlLines.length,
    ppeLines.length,
    1
  );
  const rowHeight = maxLines * LINE_HEIGHT + 4;

  y = addNewPageIfNeeded(doc, y, rowHeight + 2);

  if (step.stepNumber % 2 === 0) {
    doc.setFillColor(...LIGHT_GRAY);
    doc.rect(PAGE_MARGIN, y - 3, CONTENT_WIDTH, rowHeight, "F");
  }

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...DARK);
  doc.text(String(step.stepNumber), col1 + col1W / 2, y, {
    align: "center",
  });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...DARK);
  let lineY = y;
  for (const line of taskLines) {
    doc.text(line, col2, lineY);
    lineY += LINE_HEIGHT;
  }

  doc.setTextColor(...DARK);
  lineY = y;
  for (const line of hazardLines) {
    doc.text(line, col3, lineY);
    lineY += LINE_HEIGHT;
  }

  lineY = y;
  for (const line of controlLines) {
    doc.text(line, col4, lineY);
    lineY += LINE_HEIGHT;
  }

  lineY = y;
  for (const line of ppeLines) {
    doc.text(line, col5, lineY);
    lineY += LINE_HEIGHT;
  }

  const riskColor = getRiskColor(step.riskRating);
  doc.setFontSize(7);
  doc.setTextColor(...riskColor);
  doc.setFont("helvetica", "bold");
  doc.text(step.riskRating, col3 + col3W, y - 1, { align: "right" });
  doc.setFont("helvetica", "normal");

  if (step.oshaReference) {
    doc.setFontSize(6);
    doc.setTextColor(...GRAY);
    doc.text(
      step.oshaReference,
      col4,
      y + maxLines * LINE_HEIGHT + 1
    );
  }

  return y + rowHeight + 2;
}

export function generateJsaPdf(document: JsaDocument): jsPDF {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm" });
  let y = PAGE_MARGIN;

  doc.setFillColor(...BLUE);
  doc.rect(0, 0, PAGE_WIDTH, 35, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("SafetyDocs Pro", PAGE_MARGIN, 14);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Job Safety Analysis (JSA)", PAGE_MARGIN, 22);
  doc.text(document.date, PAGE_WIDTH - PAGE_MARGIN, 14, {
    align: "right",
  });
  doc.text(document.companyName, PAGE_WIDTH - PAGE_MARGIN, 22, {
    align: "right",
  });
  y = 42;

  doc.setTextColor(...DARK);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  const titleLines = wrapText(doc, document.title, CONTENT_WIDTH);
  for (const line of titleLines) {
    doc.text(line, PAGE_MARGIN, y);
    y += 7;
  }
  y += 2;

  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.setFont("helvetica", "normal");
  doc.text(`Trade: ${document.trade}`, PAGE_MARGIN, y);
  doc.text(`Location: ${document.projectLocation}`, PAGE_MARGIN + 70, y);
  y += 5;

  const riskColor = getRiskColor(document.overallRiskLevel);
  doc.setTextColor(...riskColor);
  doc.setFont("helvetica", "bold");
  doc.text(
    `Overall Risk Level: ${document.overallRiskLevel}`,
    PAGE_MARGIN,
    y
  );
  y += 5;

  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const descLines = wrapText(
    doc,
    `Task: ${document.taskDescription}`,
    CONTENT_WIDTH
  );
  for (const line of descLines) {
    doc.text(line, PAGE_MARGIN, y);
    y += LINE_HEIGHT;
  }
  y += 3;

  doc.setDrawColor(...AMBER);
  doc.setLineWidth(0.5);
  doc.line(PAGE_MARGIN, y, PAGE_WIDTH - PAGE_MARGIN, y);
  y += 6;

  doc.setFillColor(...BLUE);
  doc.rect(PAGE_MARGIN, y - 4, CONTENT_WIDTH, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.text("#", PAGE_MARGIN + 4, y, { align: "center" });
  doc.text("Task Step", PAGE_MARGIN + 12, y);
  doc.text("Hazards / Risk", PAGE_MARGIN + 52, y);
  doc.text("Controls", PAGE_MARGIN + 94, y);
  doc.text("PPE", PAGE_MARGIN + 136, y);
  y += 7;

  for (const step of document.steps) {
    y = drawStepRow(doc, step, y);
  }

  y += 4;

  if (document.generalPpe.length > 0) {
    y = addNewPageIfNeeded(doc, y, 20);
    doc.setDrawColor(...AMBER);
    doc.line(PAGE_MARGIN, y, PAGE_WIDTH - PAGE_MARGIN, y);
    y += 6;

    doc.setTextColor(...BLUE);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("GENERAL PPE REQUIREMENTS", PAGE_MARGIN, y);
    y += 6;

    doc.setTextColor(...DARK);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    for (const ppe of document.generalPpe) {
      y = addNewPageIfNeeded(doc, y, LINE_HEIGHT);
      doc.text(`  ${ppe}`, PAGE_MARGIN, y);
      y += LINE_HEIGHT;
    }
    y += 4;
  }

  if (document.emergencyProcedures) {
    y = addNewPageIfNeeded(doc, y, 20);
    doc.setTextColor(...BLUE);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("EMERGENCY PROCEDURES", PAGE_MARGIN, y);
    y += 6;

    doc.setTextColor(...DARK);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const emergLines = wrapText(
      doc,
      document.emergencyProcedures,
      CONTENT_WIDTH
    );
    for (const line of emergLines) {
      y = addNewPageIfNeeded(doc, y, LINE_HEIGHT);
      doc.text(line, PAGE_MARGIN, y);
      y += LINE_HEIGHT;
    }
    y += 4;
  }

  if (document.oshaReferences.length > 0) {
    y = addNewPageIfNeeded(doc, y, 20);
    doc.setDrawColor(...AMBER);
    doc.line(PAGE_MARGIN, y, PAGE_WIDTH - PAGE_MARGIN, y);
    y += 6;

    doc.setTextColor(...BLUE);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("OSHA REGULATION REFERENCES", PAGE_MARGIN, y);
    y += 6;

    doc.setTextColor(...DARK);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    for (const ref of document.oshaReferences) {
      y = addNewPageIfNeeded(doc, y, LINE_HEIGHT);
      doc.text(`  ${ref}`, PAGE_MARGIN, y);
      y += LINE_HEIGHT;
    }
  }

  y = addNewPageIfNeeded(doc, y, 35);
  y += 8;
  doc.setDrawColor(...GRAY);
  doc.setLineWidth(0.3);

  doc.setTextColor(...GRAY);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Prepared by:", PAGE_MARGIN, y);
  doc.text("Reviewed by:", PAGE_MARGIN + 95, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.line(PAGE_MARGIN, y, PAGE_MARGIN + 70, y);
  doc.line(PAGE_MARGIN + 95, y, PAGE_WIDTH - PAGE_MARGIN, y);
  y += 5;
  doc.setFontSize(8);
  doc.text("Signature / Date", PAGE_MARGIN, y);
  doc.text("Signature / Date", PAGE_MARGIN + 95, y);

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...GRAY);
    doc.text(
      `Generated by SafetyDocs Pro | Page ${i} of ${pageCount}`,
      PAGE_WIDTH / 2,
      290,
      { align: "center" }
    );
  }

  return doc;
}
