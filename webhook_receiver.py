# webhook_receiver.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/webhook", methods=["POST"])
def webhook():
    data = request.json
    # check event type and extract transcript/summary
    print("Webhook received:", data)
    # process: send SMS, notify emergency contact, etc.
    return jsonify({"status":"ok"})

if __name__ == "__main__":
    app.run(port=5000)
