from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Home route (to check server is running)
@app.route("/")
def home():
    return "Counterfeit Product Detection Backend Running 🚀"


# Image prediction route (dummy for now)
@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]

    # Dummy response (replace later with your model)
    return jsonify({
        "prediction": "fake",
        "confidence": "0.85"
    })


# Text prediction route (dummy)
@app.route("/predict_text", methods=["POST"])
def predict_text():
    data = request.get_json()

    title = data.get("title")
    price = data.get("price")
    rating = data.get("rating")
    brand = data.get("brand")

    # Dummy logic
    return jsonify({
        "prediction": "genuine",
        "confidence": "0.92",
        "received": {
            "title": title,
            "price": price,
            "rating": rating,
            "brand": brand
        }
    })


# Required for Render
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)