import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import json

app = Flask(__name__)
CORS(app)

MODEL_PATH = "model/disease_model.h5"
LABELS_PATH = "model/labels.json"
UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

model = load_model(MODEL_PATH)
with open(LABELS_PATH, "r") as f:
    labels_map = {int(k): v for k, v in json.load(f).items()}

print(f"Model loaded with {len(labels_map)} classes: {labels_map}")

ADVICE = {
    "healthy": "Your pet looks healthy! Keep up the good care and regular vet checkups.",
    "ringworm": "Ringworm is a fungal infection. It needs antifungal treatment. Visit a vet soon.",
    "demodicosis": "Mange mites detected. This is treatable with medication. Consult a vet.",
    "hypersensitivity": "Allergic dermatitis detected. Identify the allergen and consult a vet.",
    "fungal": "Fungal infection detected. Needs antifungal treatment. Visit a vet soon.",
    "dermatitis": "Skin inflammation detected. Please consult a vet for proper diagnosis.",
    "default": "Please consult a veterinarian for proper diagnosis and treatment."
}

def get_advice(name):
    n = name.lower()
    for key in ADVICE:
        if key in n:
            return ADVICE[key]
    return ADVICE["default"]

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "running", "classes": labels_map})

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400
    img_path = os.path.join(UPLOAD_DIR, file.filename)
    file.save(img_path)
    try:
        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        prediction = model.predict(img_array)
        class_id = int(np.argmax(prediction[0]))
        confidence = round(float(prediction[0][class_id]) * 100, 2)
        disease_name = labels_map.get(class_id, "Unknown")
        all_probs = {}
        for idx, prob in enumerate(prediction[0]):
            name = labels_map.get(idx, f"class_{idx}")
            all_probs[name] = round(float(prob) * 100, 2)
        return jsonify({
            "disease": disease_name,
            "confidence": confidence,
            "advice": get_advice(disease_name),
            "all_predictions": all_probs,
            "uploaded_image": file.filename
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
