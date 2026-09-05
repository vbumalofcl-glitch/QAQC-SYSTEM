"""
FCLaranang Dev Corp QA/QC Executive Management System - Local Backend Server
Handles static file serving, native Windows shell file launching (MS Word, Excel, PDF),
live directory structure scanning, and CAPA persistence.
"""

import sys
import os
import json
import urllib.parse
import mimetypes
import subprocess
import webbrowser
import threading
import time
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

# Ensure root directory is the current folder of this script
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)
CAPA_DB_FILE = DATA_DIR / "capa_db.json"

# Register common document MIME types
mimetypes.add_type("application/msword", ".doc")
mimetypes.add_type("application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".docx")
mimetypes.add_type("application/vnd.ms-excel", ".xls")
mimetypes.add_type("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ".xlsx")
mimetypes.add_type("application/vnd.ms-excel.sheet.macroEnabled.12", ".xlsm")
mimetypes.add_type("application/pdf", ".pdf")
mimetypes.add_type("text/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/x-icon", ".ico")


def get_file_structure():
    """Dynamically scan folders and return structured metadata."""
    structure = {
        "procedures": {},
        "governance": [],
        "executive": [],
        "capa": [],
        "punchlist": []
    }

    # 1. Scan CONST_PROCEDURES
    const_proc_dir = BASE_DIR / "CONST_PROCEDURES"
    if const_proc_dir.exists():
        # Global forms
        forms_dir = const_proc_dir / "FORMS"
        global_forms = []
        if forms_dir.exists():
            for f in sorted(forms_dir.glob("*")):
                if f.is_file():
                    global_forms.append({
                        "name": f.name,
                        "rel_path": str(f.relative_to(BASE_DIR)).replace("\\", "/"),
                        "size": f.stat().st_size,
                        "ext": f.suffix.lower(),
                        "modified": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(f.stat().st_mtime))
                    })
        structure["global_forms"] = global_forms

        # Operation procedures OPN-01 to OPN-07
        op_dir = const_proc_dir / "OPERATION PROCEDURE"
        if op_dir.exists():
            for opn_folder in sorted(op_dir.glob("PM-OPN-*")):
                if opn_folder.is_dir():
                    opn_key = opn_folder.name.replace("PM-", "")
                    main_docs = []
                    sub_procs = []
                    forms = []

                    # Main docs in root of OPN folder
                    for item in sorted(opn_folder.glob("*")):
                        if item.is_file():
                            main_docs.append({
                                "name": item.name,
                                "rel_path": str(item.relative_to(BASE_DIR)).replace("\\", "/"),
                                "size": item.stat().st_size,
                                "ext": item.suffix.lower(),
                                "modified": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(item.stat().st_mtime))
                            })

                    # Sub procedures
                    sub_dir = opn_folder / "SUB PROCEDURE"
                    if sub_dir.exists():
                        for item in sorted(sub_dir.glob("*")):
                            if item.is_file():
                                sub_procs.append({
                                    "name": item.name,
                                    "rel_path": str(item.relative_to(BASE_DIR)).replace("\\", "/"),
                                    "size": item.stat().st_size,
                                    "ext": item.suffix.lower(),
                                    "modified": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(item.stat().st_mtime))
                                })

                    # Forms in OPN folder
                    opn_forms_dir = opn_folder / "FORMS"
                    if opn_forms_dir.exists():
                        for item in sorted(opn_forms_dir.glob("*")):
                            if item.is_file():
                                forms.append({
                                    "name": item.name,
                                    "rel_path": str(item.relative_to(BASE_DIR)).replace("\\", "/"),
                                    "size": item.stat().st_size,
                                    "ext": item.suffix.lower(),
                                    "modified": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(item.stat().st_mtime))
                                })

                    structure["procedures"][opn_key] = {
                        "folder_name": opn_folder.name,
                        "main_docs": main_docs,
                        "sub_procs": sub_procs,
                        "forms": forms
                    }

    # 2. Scan QAQC_GOVERNANCE
    gov_dir = BASE_DIR / "QAQC_GOVERNANCE"
    if gov_dir.exists():
        for f in sorted(gov_dir.rglob("*")):
            if f.is_file():
                structure["governance"].append({
                    "name": f.name,
                    "rel_path": str(f.relative_to(BASE_DIR)).replace("\\", "/"),
                    "size": f.stat().st_size,
                    "ext": f.suffix.lower(),
                    "modified": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(f.stat().st_mtime))
                })

    # 3. Scan EXECUTIVE_REPORT
    exec_dir = BASE_DIR / "EXECUTIVE_REPORT"
    if exec_dir.exists():
        for f in sorted(exec_dir.rglob("*")):
            if f.is_file():
                structure["executive"].append({
                    "name": f.name,
                    "rel_path": str(f.relative_to(BASE_DIR)).replace("\\", "/"),
                    "size": f.stat().st_size,
                    "ext": f.suffix.lower(),
                    "modified": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(f.stat().st_mtime))
                })

    return structure


class QAQCRequestHandler(SimpleHTTPRequestHandler):
    """Custom request handler with API endpoints and native app launcher."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def end_headers(self):
        # Enable CORS and caching rules
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/status":
            self.send_json({
                "status": "online",
                "system": "FCLaranang Dev Corp QA/QC Executive Management System",
                "version": "2.0.0",
                "workspace": str(BASE_DIR),
                "serverTime": time.strftime("%Y-%m-%d %H:%M:%S")
            })
            return

        if path == "/api/structure":
            data = get_file_structure()
            self.send_json(data)
            return

        if path == "/api/load":
            # CAPA persistence endpoint
            if CAPA_DB_FILE.exists():
                try:
                    with open(CAPA_DB_FILE, "r", encoding="utf-8") as f:
                        data = json.load(f)
                    self.send_json(data)
                    return
                except Exception as e:
                    print(f"[ERROR] Loading CAPA DB: {e}")
            self.send_json({"capaData": [], "actionLetters": [], "hiddenColumns": []})
            return

        # Fallback to standard static file serving
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        content_length = int(self.headers.get("Content-Length", 0))
        post_body = self.rfile.read(content_length) if content_length > 0 else b"{}"

        try:
            payload = json.loads(post_body.decode("utf-8")) if post_body else {}
        except Exception:
            payload = {}

        # 1. Native File Launcher Endpoint
        if path == "/api/open":
            file_rel_path = payload.get("path", "").strip()
            if not file_rel_path:
                self.send_json({"success": False, "error": "No file path provided."}, status=400)
                return

            # Clean and sanitize path
            file_rel_path = urllib.parse.unquote(file_rel_path)
            clean_rel = file_rel_path.replace("/", os.sep).replace("\\", os.sep).lstrip(os.sep)
            target_path = (BASE_DIR / clean_rel).resolve()

            # If not found directly, check inside CONST_PROCEDURES/
            if not target_path.exists():
                alt_path = (BASE_DIR / "CONST_PROCEDURES" / clean_rel).resolve()
                if alt_path.exists():
                    target_path = alt_path

            # Security check: ensure target is within BASE_DIR
            try:
                target_path.relative_to(BASE_DIR)
            except ValueError:
                self.send_json({"success": False, "error": "Access denied: outside workspace."}, status=403)
                return

            if not target_path.exists():
                self.send_json({"success": False, "error": f"File not found: {file_rel_path}"}, status=404)
                return

            # Launch native application on Windows
            try:
                if os.name == "nt":
                    # os.startfile opens the file with its associated application (Word, Excel, Acrobat, etc.)
                    os.startfile(str(target_path))
                else:
                    # Fallback for Linux/macOS
                    opener = "open" if sys.platform == "darwin" else "xdg-open"
                    subprocess.Popen([opener, str(target_path)])

                print(f"[LAUNCH] Successfully opened in native app: {target_path.name}")
                self.send_json({
                    "success": True,
                    "message": f"Opened '{target_path.name}' in its default application.",
                    "filename": target_path.name,
                    "extension": target_path.suffix.lower()
                })
            except Exception as e:
                print(f"[ERROR] Failed to open file: {e}")
                self.send_json({"success": False, "error": f"Failed to launch application: {str(e)}"}, status=500)
            return

        # 2. CAPA Save Endpoint
        if path == "/api/save":
            try:
                with open(CAPA_DB_FILE, "w", encoding="utf-8") as f:
                    json.dump(payload, f, indent=2)
                self.send_json(payload)
                print(f"[CAPA DB] Successfully saved {len(payload.get('capaData', []))} records.")
            except Exception as e:
                self.send_json({"error": str(e)}, status=500)
            return

        # 3. Document Upload / Quick Attach Endpoint
        if path == "/api/upload":
            target_folder = payload.get("folder", "").strip()
            filename = payload.get("filename", "").strip()
            content_base64 = payload.get("content", "")

            if not filename or not content_base64:
                self.send_json({"success": False, "error": "Missing filename or content."}, status=400)
                return

            import base64
            dest_dir = (BASE_DIR / target_folder).resolve() if target_folder else BASE_DIR
            try:
                dest_dir.relative_to(BASE_DIR)
            except ValueError:
                self.send_json({"success": False, "error": "Invalid destination."}, status=403)
                return

            dest_dir.mkdir(parents=True, exist_ok=True)
            dest_file = dest_dir / filename
            try:
                with open(dest_file, "wb") as f:
                    f.write(base64.b64decode(content_base64))
                self.send_json({
                    "success": True,
                    "message": f"Uploaded {filename} successfully.",
                    "rel_path": str(dest_file.relative_to(BASE_DIR)).replace("\\", "/")
                })
            except Exception as e:
                self.send_json({"success": False, "error": str(e)}, status=500)
            return

        self.send_json({"error": "Endpoint not found"}, status=404)

    def send_json(self, data, status=200):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        # Clean logging
        sys.stderr.write(f"[HTTP {time.strftime('%H:%M:%S')}] {format % args}\n")


def find_available_port(start_port=8000, max_attempts=20):
    """Find an open port to bind."""
    import socket
    for port in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("127.0.0.1", port))
                return port
            except OSError:
                continue
    return start_port


def start_server(port=8000, open_browser=True):
    actual_port = find_available_port(port)
    server_address = ("127.0.0.1", actual_port)
    httpd = HTTPServer(server_address, QAQCRequestHandler)

    url = f"http://localhost:{actual_port}/index.html"
    print("=" * 70)
    print("  FCLaranang Dev Corp QA/QC Executive Management System")
    print("  Enterprise Dynamic Portal & Native App Bridge")
    print("=" * 70)
    print(f"  [SERVER RUNNING]  : {url}")
    print(f"  [WORKSPACE DIR]   : {BASE_DIR}")
    print(f"  [NATIVE LAUNCHER] : Enabled for MS Word, Excel, PDF")
    print(f"  [CAPA DATABASE]   : {CAPA_DB_FILE}")
    print("=" * 70)
    print("  Press Ctrl+C to stop server.\n")

    if open_browser:
        def _open():
            time.sleep(1.0)
            webbrowser.open(url)
        threading.Thread(target=_open, daemon=True).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[STOPPING] Shutting down QA/QC Server...")
        httpd.server_close()
        print("[STOPPED] Server closed.")


if __name__ == "__main__":
    auto_open = "--no-browser" not in sys.argv
    start_server(8000, open_browser=auto_open)
