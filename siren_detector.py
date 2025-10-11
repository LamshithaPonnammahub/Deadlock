import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import sounddevice as sd
import librosa
import time
import csv

# Load YAMNet model
print("Loading YAMNet model...")
model = hub.load("https://tfhub.dev/google/yamnet/1")

# Load class labels
labels = []
with open("yamnet_class_map.csv", "r") as f:
    reader = csv.reader(f)
    next(reader)  # skip header
    for row in reader:
        labels.append(row[2])  # class name

# Siren-related labels (you can modify this list)
SIREN_KEYWORDS = ["siren", "emergency vehicle", "police car", "ambulance", "fire engine"]

# Audio capture settings
DURATION = 2.0  # seconds per chunk
SAMPLE_RATE = 16000  # Hz (YAMNet expects 16kHz)

def detect_siren(audio):
    """Run YAMNet and check if a siren-like sound is detected."""
    scores, embeddings, spectrogram = model(audio)
    mean_scores = np.mean(scores, axis=0)
    top_indexes = mean_scores.argsort()[-5:][::-1]

    detected = False
    for i in top_indexes:
        label = labels[i].lower()
        score = mean_scores[i]
        if any(keyword in label for keyword in SIREN_KEYWORDS):
            if score > 0.1:  # threshold (tune as needed)
                print(f"🚨 Detected: {label} ({score:.2f})")
                detected = True
    return detected

print("🎙️ Listening for sirens... Press Ctrl+C to stop.\n")

try:
    while True:
        # Record audio chunk
        audio = sd.rec(int(DURATION * SAMPLE_RATE), samplerate=SAMPLE_RATE, channels=1, dtype='float32')
        sd.wait()
        audio = np.squeeze(audio)

        # Run detection
        detected = detect_siren(audio)
        if detected:
            print("🚑 Ambulance Siren Detected!\n")
        else:
            print("No siren detected...\n")

        time.sleep(0.5)

except KeyboardInterrupt:
    print("\n🛑 Detection stopped by user.")
