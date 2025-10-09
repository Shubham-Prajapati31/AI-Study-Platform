from flask import Flask, request, jsonify
import requests
import os
import re
from dotenv import load_dotenv
from flask_cors import CORS
import difflib
import base64
import fitz  # PyMuPDF for PDF reading
import traceback

# Load the API key from .env
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Predefined answers
predefined_answers = {
    "who created you": "I was created by Shubham Prajapati.",
    "who create you": "I was created by Shubham Prajapati.",
    "who is my best friend": "Your best friend is Shubham Thakare.",
    "who trained you": "I was trained by Shubham Prajapati.",
    "who is your god": "I don't have personal beliefs or a god, but I was created by Shubham Prajapati.",
    "what is your name": "My name is EduMentor AI.",
}

def get_best_match(question):
    matches = difflib.get_close_matches(question, predefined_answers.keys(), n=1, cutoff=0.8)
    if matches:
        return predefined_answers[matches[0]]
    return None

@app.route('/chat', methods=['POST'])
def chat():
    try:
        # Handle both JSON and FormData requests
        if request.is_json:
            user_message = request.json.get('message')
            uploaded_file = None
        else:
            user_message = request.form.get('message')
            uploaded_file = request.files.get('file')

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Handle file upload if present
        file_content = ""
        image_part = None

        if uploaded_file:
            try:
                filename = uploaded_file.filename.lower()
                if filename.endswith(('.txt', '.py', '.js', '.html', '.css', '.java', '.cpp', '.c')):
                    file_content = uploaded_file.read().decode('utf-8', errors='ignore')
                    user_message += f"\n\nFile content ({uploaded_file.filename}):\n{file_content}"
                elif filename.endswith(('.jpg', '.jpeg', '.png', '.gif')):
                    image_data = uploaded_file.read()
                    image_base64 = base64.b64encode(image_data).decode('utf-8')
                    mime_type = uploaded_file.mimetype or "image/jpeg"
                    image_part = {
                        "inlineData": {
                            "mimeType": mime_type,
                            "data": image_base64
                        }
                    }
                elif filename.endswith('.pdf'):
                    try:
                        doc = fitz.open(stream=uploaded_file.read(), filetype="pdf")
                        pdf_text = ""
                        for page in doc:
                            pdf_text += page.get_text()
                        user_message += f"\n\nExtracted text from PDF ({uploaded_file.filename}):\n{pdf_text}"
                    except Exception as e:
                        user_message += f"\n\n[Error extracting text from PDF: {str(e)}]"
                else:
                    user_message += f"\n\n[File uploaded: {uploaded_file.filename}]"
            except Exception as e:
                return jsonify({"error": f"Error reading file: {str(e)}"}), 400

        # Normalize the question
        cleaned_question = re.sub(r'[^\w\s]', '', user_message).strip().lower()

        # Check predefined answers
        predefined_reply = predefined_answers.get(cleaned_question) or get_best_match(cleaned_question)
        if predefined_reply:
            return jsonify({"reply": predefined_reply})

        # Enhanced prompt
        enhanced_message = f"""You are EduMentor AI, a helpful study chatbot for Computer Science students.
Your goal is to provide clear, focused answers for educational questions related to programming and computer science.
Avoid comparing answers to other programming languages unless explicitly asked.
Use clean formatting, and when showing code, wrap it in triple backticks (```). 

User Query: {user_message}"""

        # Gemini 2.0 Flash API (use v1beta)
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

        payload = {
            "contents": [
                {
                    "parts": (
                        [{"text": enhanced_message}] + ([image_part] if image_part else [])
                    )
                }
            ]
        }

        headers = {"Content-Type": "application/json"}

        response = requests.post(url, json=payload, headers=headers)
        data = response.json()

        # Debug log
        print("Gemini API raw response:", data)

        if "candidates" not in data:
            return jsonify({"error": "No response from Gemini API", "details": data}), 500

        text_reply = data["candidates"][0]["content"]["parts"][0]["text"]
        return jsonify({"reply": text_reply})

    except Exception as e:
        print("Error Traceback:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

#  python main.py              


