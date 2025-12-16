from fastapi import FastAPI
from fastapi.responses import FileResponse
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
import qrcode
import os
from datetime import datetime

app = FastAPI()

OUTPUT_DIR = "generated_pdfs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Register Unicode font for ₹ symbol
pdfmetrics.registerFont(TTFont("DejaVu", "fonts/DejaVuSans.ttf"))

# Paragraph style
styles = getSampleStyleSheet()
style_para = styles["Normal"]
style_para.fontName = "DejaVu"
style_para.fontSize = 11
style_para.leading = 16
style_para.alignment = TA_LEFT


def draw_wrapped(canvas, text, x, y, width):
    p = Paragraph(text, style_para)
    w, h = p.wrap(width, 90000)
    p.drawOn(canvas, x, y - h)
    return y - h - 5


@app.get("/generate-sanction")
def generate_sanction(
    sanction_id: str,
    name: str,
    amount: int,
    tenure: int,
    emi: int
):
    file_path = f"{OUTPUT_DIR}/{sanction_id}.pdf"
    c = canvas.Canvas(file_path, pagesize=A4)
    width, height = A4

    c.setTitle("TATA CAPITAL – Loan Sanction Letter")

    # Colors
    blue = HexColor("#033C73")
    light_gray = HexColor("#F4F6F8")
    dark_gray = HexColor("#333333")

    # --------------------------------------------
    # HEADER (Premium Letterhead)
    # --------------------------------------------
    c.setFillColor(blue)
    c.rect(0, height - 80, width, 80, fill=True)

    c.setFont("DejaVu", 28)
    c.setFillColor("#FFFFFF")
    c.drawString(30, height - 45, "TATA CAPITAL")

    c.setFont("DejaVu", 12)
    c.drawString(30, height - 65, "Loan Sanction Letter (Pre-Approved)")

    y = height - 120

    # --------------------------------------------
    # DATE + SANCTION ID
    # --------------------------------------------
    c.setFont("DejaVu", 11)
    c.setFillColor(dark_gray)
    c.drawString(30, y, f"Date: {datetime.now().strftime('%d-%m-%Y')}")
    y -= 18
    c.drawString(30, y, f"Sanction ID: {sanction_id}")
    y -= 35

    # --------------------------------------------
    # INTRO PARAGRAPH
    # --------------------------------------------
    intro = (
        f"Dear {name},<br/><br/>"
        "Congratulations! Your loan request has been pre-approved by Tata Capital based on the "
        "information you provided. This is an in-principle approval and the final approval will "
        "be granted upon successful submission and verification of required documents."
    )
    y = draw_wrapped(c, intro, 30, y, width - 60)
    y -= 20

    # --------------------------------------------
    # LOAN SUMMARY BOX
    # --------------------------------------------
    c.setFillColor(light_gray)
    c.rect(25, y - 120, width - 50, 120, fill=True, stroke=False)

    c.setFillColor(blue)
    c.setFont("DejaVu", 14)
    c.drawString(35, y - 20, "Loan Summary")

    c.setFillColor(dark_gray)
    c.setFont("DejaVu", 11)

    items = [
        f"Loan Amount: ₹{amount:,}",
        f"Tenure: {tenure} months",
        f"Estimated EMI: ₹{emi:,}",
        "Interest Rate: 13.5% (fixed)",
        "Processing Fee: ₹0"
    ]

    yy = y - 45
    for item in items:
        c.drawString(40, yy, item)
        yy -= 18

    y = y - 140
    y -= 20

    # --------------------------------------------
    # REQUIRED DOCUMENTS
    # --------------------------------------------
    c.setFont("DejaVu", 14)
    c.setFillColor(blue)
    c.drawString(30, y, "Documents Required")
    y -= 25

    doc_lines = [
        "1. PAN Card",
        "2. Aadhaar / Address Proof",
        "3. Salary Slips (Last 3 Months)",
        "4. Bank Statement (Last 6 Months)",
        "5. Photograph",
    ]

    c.setFont("DejaVu", 11)
    c.setFillColor(dark_gray)
    for d in doc_lines:
        c.drawString(40, y, d)
        y -= 18

    # --------------------------------------------
    # QR Code
    # --------------------------------------------
    qr_data = f"{sanction_id}|{name}|{amount}"
    qr = qrcode.make(qr_data)
    qr_path = f"{OUTPUT_DIR}/{sanction_id}_qr.png"
    qr.save(qr_path)

    c.drawImage(qr_path, width - 150, 100, width=110, height=110)

    # --------------------------------------------
    # SIGNATURE
    # --------------------------------------------
    c.setFont("DejaVu", 14)
    c.drawString(30, 140, "Authorized Signatory")

    c.setFont("DejaVu", 11)
    c.drawString(30, 120, "Tata Capital Financial Services Limited")

    # --------------------------------------------
    # FOOTER
    # --------------------------------------------
    footer = (
        "This is a system-generated document and does not require a physical signature. "
        "Final loan disbursal is subject to eligibility and document verification."
    )
    draw_wrapped(c, footer, 30, 60, width - 60)

    c.save()
    return FileResponse(file_path, filename=f"{sanction_id}.pdf")
