# dispatch_call.py
agent_id = <AGENT_ID_FROM_CREATE>           # e.g. 12345
to_number = "+918302833123"                 # include country code
call_context = {"caller_location": "Delhi, India", "priority": "high"}

resp = client.call.dispatch_call(agent_id, to_number, call_context)
print(resp)
