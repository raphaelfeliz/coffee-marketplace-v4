import sys
import datetime
import os

def log_action(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"[{timestamp}] {message}\n"
    
    log_file = "project_log.md"
    
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(log_entry)
    
    print(f"Logged: {message}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        message = " ".join(sys.argv[1:])
        log_action(message)
    else:
        print("Usage: python add_log.py <message>")
