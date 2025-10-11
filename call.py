from dotenv import load_dotenv
import os
from omnidimension import Client

# Load .env
load_dotenv(dotenv_path=r"D:\ai-call\.env")

api_key = os.environ.get("OMNI_API_KEY")
if not api_key:
    raise ValueError("API key not found!")

client = Client(api_key)

# Example: create emergency agent
response = client.agent.create(
    name="Emergency Call Assistant AI",
    description="AI assistant to guide users with first aid and emergency help.",
    config={"mode": "emergency"}
)

print("Agent created successfully!")
print(response)

