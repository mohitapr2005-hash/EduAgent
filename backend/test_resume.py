from services.resume_service import extract_resume_text

text = extract_resume_text("resume.pdf")

print(text)