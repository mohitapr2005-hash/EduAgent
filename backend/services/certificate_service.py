from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF

from datetime import datetime
import random
import os
import math

# -------------------------------------------------------
# FONT REGISTRATION
# -------------------------------------------------------
try:
    pdfmetrics.registerFont(TTFont("Poppins", "Poppins-Regular.ttf"))
    pdfmetrics.registerFont(TTFont("Poppins-Bold", "Poppins-Bold.ttf"))
    FONT = "Poppins"
    FONT_BOLD = "Poppins-Bold"
except Exception:
    FONT = "Helvetica"
    FONT_BOLD = "Helvetica-Bold"


def draw_circular_stamp(c, x, y, text_top, text_bottom, inner_text):
    """
    Draws a compact circular stamp (radius 45) at (x, y).
    """
    c.saveState()
    
    STAMP_INK_COLOR = HexColor("#1A365D")
    c.setStrokeColor(STAMP_INK_COLOR)
    c.setFillColor(STAMP_INK_COLOR)
    
    # Compact Stamp Sizes
    outer_radius = 45
    inner_radius = 32
    
    c.setLineWidth(2)
    c.circle(x, y, outer_radius, fill=False)
    c.setLineWidth(0.8)
    c.circle(x, y, inner_radius, fill=False)
    
    # --- Top Arc Text ---
    c.setFont(FONT_BOLD, 7)
    angle_step_top = 180 / len(text_top)
    for i, char in enumerate(text_top):
        angle = math.radians(180 - (i * angle_step_top + angle_step_top / 2))
        char_x = x + (outer_radius + inner_radius) / 2 * math.cos(angle)
        char_y = y + (outer_radius + inner_radius) / 2 * math.sin(angle)
        
        c.saveState()
        c.translate(char_x, char_y)
        c.rotate(180 - (i * angle_step_top + angle_step_top / 2) - 90)
        c.drawCentredString(0, 0, char)
        c.restoreState()

    # --- Bottom Arc Text ---
    c.setFont(FONT, 6.5)
    angle_step_bottom = 180 / len(text_bottom)
    for i, char in enumerate(text_bottom):
        angle = math.radians(180 + (i * angle_step_bottom + angle_step_bottom / 2))
        char_x = x + (outer_radius + inner_radius) / 2 * math.cos(angle)
        char_y = y + (outer_radius + inner_radius) / 2 * math.sin(angle)
        
        c.saveState()
        c.translate(char_x, char_y)
        c.rotate(180 + (i * angle_step_bottom + angle_step_bottom / 2) + 90)
        c.drawCentredString(0, 0, char)
        c.restoreState()

    # --- Central Seal ---
    c.setFont(FONT_BOLD, 9)
    c.drawCentredString(x, y + 12, "★ ★ ★")
    
    c.setFont(FONT_BOLD, 9)
    c.drawCentredString(x, y - 2, inner_text)
    
    c.setFont(FONT, 6)
    c.drawCentredString(x, y - 13, "VERIFIED")

    c.restoreState()


def generate_certificate(student_name, course_name):
    if not os.path.exists("certificates"):
        os.makedirs("certificates")

    certificate_id = f"FAI-{datetime.now().strftime('%Y')}-{random.randint(100000, 999999)}"
    filename = f"certificates/{certificate_id}.pdf"

    c = canvas.Canvas(filename, pagesize=landscape(A4))
    width, height = landscape(A4)

    # -------------------------------------------------------
    # COLOR PALETTE
    # -------------------------------------------------------
    PRIMARY_NAVY = HexColor("#0A192F")
    GOLD_ACCENT = HexColor("#C5A059")
    GOLD_LIGHT = HexColor("#E2C481")
    TEXT_MUTED = HexColor("#4A5568")
    BG_COLOR = HexColor("#FAFBFD")

    # -------------------------------------------------------
    # 1. BACKGROUND & BORDERS
    # -------------------------------------------------------
    c.setFillColor(BG_COLOR)
    c.rect(0, 0, width, height, fill=1, stroke=0)

    c.setStrokeColor(GOLD_ACCENT)
    c.setLineWidth(3)
    c.rect(25, 25, width - 50, height - 50)

    c.setStrokeColor(GOLD_LIGHT)
    c.setLineWidth(1)
    c.rect(32, 32, width - 64, height - 64)

    # Corner Accents
    c.setStrokeColor(PRIMARY_NAVY)
    c.setLineWidth(3)
    c.line(20, height - 40, 60, height - 40)
    c.line(40, height - 20, 40, height - 60)

    c.line(width - 60, height - 40, width - 20, height - 40)
    c.line(width - 40, height - 20, width - 40, height - 60)

    c.line(20, 40, 60, 40)
    c.line(40, 20, 40, 60)

    c.line(width - 60, 40, width - 20, 40)
    c.line(width - 40, 20, width - 40, 60)

    # -------------------------------------------------------
    # 2. BACKGROUND WATERMARK
    # -------------------------------------------------------
    c.saveState()
    c.setFillColor(Color(0.1, 0.15, 0.25, alpha=0.03))
    c.translate(width / 2, height / 2)
    c.rotate(25)
    c.setFont(FONT_BOLD, 72)
    c.drawCentredString(0, 0, "EduAgent AI")
    c.restoreState()

    # -------------------------------------------------------
    # 3. HEADER & BRANDING
    # -------------------------------------------------------
    c.setFillColor(PRIMARY_NAVY)
    c.setFont(FONT_BOLD, 22)
    c.drawString(60, height - 75, "EduAgent AI")

    c.setFont(FONT, 10)
    c.setFillColor(TEXT_MUTED)
    c.drawString(60, height - 90, "AI Powered Learning Platform")

    # Verified Badge (Top Right)
    c.setFillColor(GOLD_ACCENT)
    c.circle(width - 80, height - 75, 30, fill=1, stroke=0)
    c.setFillColor(HexColor("#FFFFFF"))
    c.setFont(FONT_BOLD, 8)
    c.drawCentredString(width - 80, height - 68, "OFFICIAL")
    c.drawCentredString(width - 80, height - 78, "VERIFIED")
    c.drawCentredString(width - 80, height - 88, "★ ★ ★")

    # -------------------------------------------------------
    # 4. CERTIFICATE TITLE & RIBBON
    # -------------------------------------------------------
    c.setFillColor(PRIMARY_NAVY)
    c.setFont("Times-Bold", 34)
    c.drawCentredString(width / 2, height - 140, "CERTIFICATE OF COMPLETION")

    c.setStrokeColor(GOLD_ACCENT)
    c.setLineWidth(1.5)
    c.line(width / 2 - 120, height - 150, width / 2 + 120, height - 150)

    # Pill Ribbon
    c.setFillColor(PRIMARY_NAVY)
    c.roundRect(width / 2 - 130, height - 188, 260, 24, 6, fill=1, stroke=0)

    c.setFillColor(HexColor("#FFFFFF"))
    c.setFont(FONT_BOLD, 10)
    c.drawCentredString(width / 2, height - 179, "PROUDLY PRESENTED TO")

    # -------------------------------------------------------
    # 5. RECIPIENT NAME
    # -------------------------------------------------------
    c.setFillColor(PRIMARY_NAVY)
    c.setFont(FONT_BOLD, 30)
    # -------------------------------------------------------
    # 5. RECIPIENT NAME
    # -------------------------------------------------------

    student_name = str(student_name).strip()

    if student_name == "":
        student_name = "EduAgent AI Student"

    c.setFillColor(PRIMARY_NAVY)
    c.setFont(FONT_BOLD, 30)

    c.drawCentredString(
        width / 2,
        height - 215,
        student_name.upper()
    )

    c.setStrokeColor(GOLD_ACCENT)
    c.setLineWidth(1)

    c.line(
        width / 2 - 220,
        height - 225,
        width / 2 + 220,
        height - 225
    )

    # -------------------------------------------------------
    # 6. COURSE DETAILS
    # -------------------------------------------------------

    c.setFillColor(TEXT_MUTED)
    c.setFont(FONT, 13)

    c.drawCentredString(
        width / 2,
        height - 260,
        "For successfully completing the specialized AI program"
    )

    c.setFillColor(GOLD_ACCENT)
    c.setFont(FONT_BOLD, 20)

    c.drawCentredString(
        width / 2,
        height - 295,
        course_name
    )

    c.setFillColor(TEXT_MUTED)
    c.setFont(FONT, 11)

    c.drawCentredString(
        width / 2,
        height - 320,
        "and demonstrating exceptional dedication toward mastering core competencies."
    )
    # -------------------------------------------------------
    # 7. FOOTER SECTION
    # -------------------------------------------------------
    issue_date = datetime.now().strftime("%d %B %Y")
    bottom_y = 100

    # Column 1: Certificate Metadata (Left)
    c.setFillColor(PRIMARY_NAVY)
    c.setFont(FONT_BOLD, 10)
    c.drawString(60, bottom_y + 35, "ISSUE DATE")
    c.setFont(FONT, 10)
    c.setFillColor(TEXT_MUTED)
    c.drawString(60, bottom_y + 21, issue_date)

    c.setFillColor(PRIMARY_NAVY)
    c.setFont(FONT_BOLD, 10)
    c.drawString(60, bottom_y - 2, "CERTIFICATE ID")
    c.setFont(FONT, 10)
    c.setFillColor(TEXT_MUTED)
    c.drawString(60, bottom_y - 16, certificate_id)

    # Column 2: Signature Line & Compact Circular Stamp (Center)
    center_stamp_x = width / 2 - 20
    sig_line_y = bottom_y + 65
    
    c.setStrokeColor(PRIMARY_NAVY)
    c.setLineWidth(1)
    c.line(center_stamp_x - 65, sig_line_y, center_stamp_x + 65, sig_line_y)

    c.setFillColor(PRIMARY_NAVY)
    c.setFont(FONT_BOLD, 13)
    c.drawCentredString(center_stamp_x, sig_line_y + 8, "MOHIT VERMA")

    c.setFont(FONT, 9)
    c.setFillColor(TEXT_MUTED)
    c.drawCentredString(center_stamp_x, sig_line_y - 10, "Founder & CEO, EduAgent AI")
    
    # Compact Stamp Below Signature
    draw_circular_stamp(c, center_stamp_x, bottom_y - 10, "GOVERNING BOARD", "EDUAGENT AI PLATFORM", "OFFICIAL SEAL")

    # Column 3: QR Code Verification (Right)
    qr_code = qr.QrCodeWidget(f"https://eduagent.ai/verify/{certificate_id}")
    bounds = qr_code.getBounds()
    w_qr, h_qr = bounds[2] - bounds[0], bounds[3] - bounds[1]

    drawing = Drawing(60, 60, transform=[60 / w_qr, 0, 0, 60 / h_qr, 0, 0])
    drawing.add(qr_code)
    renderPDF.draw(drawing, c, width - 135, bottom_y - 15)

    c.setFillColor(TEXT_MUTED)
    c.setFont(FONT, 8)
    c.drawCentredString(width - 105, bottom_y - 28, "Scan to Verify")

    # -------------------------------------------------------
    # 8. BOTTOM DISCLAIMER
    # -------------------------------------------------------
    c.setFillColor(HexColor("#888888"))
    c.setFont(FONT, 8)
    c.drawCentredString(
        width / 2, 22, "This digital certificate is cryptographically verified and issued by EduAgent AI Platform."
    )

    c.save()
    return filename


if __name__ == "__main__":
    generate_certificate("John Doe", "Data Structures: A Comprehensive 10-Week Roadmap")