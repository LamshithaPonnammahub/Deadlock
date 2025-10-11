# create_agent.py
from dotenv import load_dotenv
import os
from omnidimension import Client

load_dotenv(dotenv_path=r"D:\ai-call\.env")
api_key = os.environ.get("OMNI_API_KEY")
client = Client(api_key)

agent_resp = client.agent.create(
    name="Emergency Call Assistant AI",
    description="Guides callers through urgent first-aid steps and routes rescue.",
    welcome_message="Hello — I am an emergency assistant. Tell me what happened and where you are.",
    config={"mode": "emergency"},
    # REQUIRED: list of dicts
    context_breakdown=[
        {"title":"Purpose", "body":"You must calmly instruct the caller with step-by-step first-aid actions and encourage calling emergency services.", "is_enabled": True},
        {"title":"Behavior", "body":"Use short sentences, repeat confirmations, ask for location and consciousness/breathing status, instruct clearly.", "is_enabled": True},
        {"title":"Knowledge", "body":"CPR, choking (Heimlich), severe bleeding control, stroke FAST steps, placement for unconscious but breathing patients.", "is_enabled": True},
    ]
)

print("agent_id:", agent_resp.get("id") or agent_resp)
