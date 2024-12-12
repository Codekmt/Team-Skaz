from flask import Flask, request, jsonify
from flask_cors import CORS
import stanza


nlp = stanza.Pipeline(lang='nl', processors='tokenize,ner')

app = Flask(__name__)


CORS(app)
@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    doc = nlp(text)
    entities = [{"text": ent.text, "type": ent.type} for ent in doc.ents]

    return jsonify({"entities": entities})

if __name__ == "__main__":
    app.run(debug=True)
