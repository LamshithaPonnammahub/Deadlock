from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io, base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("yolov8n.pt")
vehicle_classes = ["car", "bus", "truck", "motorcycle", "bicycle"]

@app.get("/")
def home():
    return {"message": "FastAPI YOLO API is running!"}

@app.post("/detect")
async def detect(file: UploadFile):
    img = Image.open(io.BytesIO(await file.read()))
    results = model(img)
    names = model.names

    vehicle_count = sum(
        1 for box in results[0].boxes if names[int(box.cls)] in vehicle_classes
    )

    results[0].save(filename="result.jpg")

    with open("result.jpg", "rb") as f:
        img_base64 = base64.b64encode(f.read()).decode("utf-8")

    return {"vehicle_count": vehicle_count, "image": img_base64}
