# get_call_logs.py
logs = client.call.get_call_logs(page=1, page_size=10)
print(logs)

# get details for a specific call log
call_log_id = logs["results"][0]["id"]   # adapt to actual response structure
call_detail = client.call.get_call_log(call_log_id)
print(call_detail)  # contains transcript, status, duration, metadata
print("Transcript:", call_detail.get("transcript"))