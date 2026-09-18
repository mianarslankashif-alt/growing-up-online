"""Builds docs/Final-Report.pdf from docs/05-final-report-source.md.
One-off build script for the coursework report; not part of the website itself.
"""
import re
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

SRC = Path(__file__).parent / "05-final-report-source.md"
OUT = Path(__file__).parent / "Final-Report.pdf"

styles = getSampleStyleSheet()
title_style = ParagraphStyle("TitleCustom", parent=styles["Title"], fontSize=17, leading=21, alignment=TA_CENTER, spaceAfter=4)
subtitle_style = ParagraphStyle("SubtitleCustom", parent=styles["Normal"], fontSize=10.5, leading=14, alignment=TA_CENTER, textColor="#555555", spaceAfter=16)
h2_style = ParagraphStyle("H2Custom", parent=styles["Heading2"], fontSize=13, leading=17, spaceBefore=16, spaceAfter=8, textColor="#0b1220")
body_style = ParagraphStyle("BodyCustom", parent=styles["Normal"], fontSize=10.3, leading=15, spaceAfter=10, alignment=4)  # 4 = justify

story = []
lines = SRC.read_text(encoding="utf-8").split("\n")

paragraph_buf = []


def flush_paragraph():
    if paragraph_buf:
        text = " ".join(paragraph_buf).strip()
        if text:
            story.append(Paragraph(text, body_style))
        paragraph_buf.clear()


def escape(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


for raw_line in lines:
    line = escape(raw_line.rstrip())
    if line.startswith("# "):
        flush_paragraph()
        story.append(Paragraph(line[2:], title_style))
    elif line.startswith("### "):
        flush_paragraph()
        story.append(Paragraph(line[4:], subtitle_style))
        story.append(HRFlowable(width="100%", thickness=0.75, color="#cccccc", spaceAfter=10))
    elif line.startswith("## "):
        flush_paragraph()
        story.append(Paragraph(line[3:], h2_style))
    elif line.strip() == "":
        flush_paragraph()
    else:
        paragraph_buf.append(line.strip())

flush_paragraph()

doc = SimpleDocTemplate(
    str(OUT),
    pagesize=A4,
    topMargin=2.2 * cm,
    bottomMargin=2.2 * cm,
    leftMargin=2.3 * cm,
    rightMargin=2.3 * cm,
    title="Growing Up Online — Coursework Report",
    author="Mian Arslan Kashif",
)
doc.build(story)
print(f"Wrote {OUT}")
