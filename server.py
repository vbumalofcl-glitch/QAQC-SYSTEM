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

# Ensure stdout/stderr exist when running via pythonw.exe (windowless background service)
if sys.stdout is None:
    sys.stdout = open(os.devnull, "w", encoding="utf-8")
if sys.stderr is None:
    sys.stderr = open(os.devnull, "w", encoding="utf-8")

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


def format_size(num_bytes):
    """Format byte count into human-readable string."""
    if num_bytes < 1024:
        return f"{num_bytes} B"
    elif num_bytes < 1024 * 1024:
        return f"{num_bytes / 1024:.1f} KB"
    else:
        return f"{num_bytes / (1024 * 1024):.2f} MB"


def is_valid_doc_file(p):
    """Check if file is a valid document and not a temporary/lock file."""
    if not p.is_file():
        return False
    name = p.name
    # Exclude Office lock files (~$...), hidden files, and desktop thumbnail caches
    if name.startswith("~$") or name.startswith(".") or name.lower() == "thumbs.db":
        return False
    return True


def make_file_meta(f):
    """Build standardized file metadata dictionary."""
    stat = f.stat()
    return {
        "name": f.name,
        "rel_path": str(f.relative_to(BASE_DIR)).replace("\\", "/"),
        "size": stat.st_size,
        "size_formatted": format_size(stat.st_size),
        "ext": f.suffix.lower(),
        "modified": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(stat.st_mtime))
    }


def get_file_structure():
    """Dynamically scan folders and return structured metadata."""
    structure = {
        "procedures": {},
        "governance": [],
        "executive": [],
        "capa": [],
        "punchlist": [],
        "global_forms": [],
        "stats": {
            "total_opn": 0,
            "total_main_docs": 0,
            "total_sub_procs": 0,
            "total_forms": 0,
            "total_files": 0
        }
    }

    # 1. Scan CONST_PROCEDURES
    const_proc_dir = BASE_DIR / "CONST_PROCEDURES"
    all_proc_files = set()

    if const_proc_dir.exists():
        # Global forms directory
        forms_dir = const_proc_dir / "FORMS"
        global_forms = []
        if forms_dir.exists():
            for f in sorted(forms_dir.iterdir()):
                if is_valid_doc_file(f):
                    meta = make_file_meta(f)
                    global_forms.append(meta)
                    all_proc_files.add(meta["rel_path"])
        structure["global_forms"] = global_forms

        # Operation procedures OPN-01 to OPN-07+
        op_dir = const_proc_dir / "OPERATION PROCEDURE"
        if op_dir.exists():
            # Scan all directories in OPERATION PROCEDURE
            opn_folders = [
                d for d in op_dir.iterdir()
                if d.is_dir() and not d.name.startswith(".")
            ]

            # Natural sort key so PM-OPN-01, PM-OPN-02... PM-OPN-10 order properly
            def opn_sort_key(folder):
                name = folder.name
                import re
                nums = re.findall(r'\d+', name)
                return (int(nums[0]) if nums else 999, name)

            opn_folders.sort(key=opn_sort_key)

            for opn_folder in opn_folders:
                # Standardize OPN key: PM-OPN-01 -> OPN-01
                opn_key = opn_folder.name
                if opn_key.startswith("PM-"):
                    opn_key = opn_key[3:]

                main_docs = []
                sub_procs = []
                forms = []

                # Main docs directly in root of OPN folder
                for item in sorted(opn_folder.iterdir()):
                    if is_valid_doc_file(item):
                        meta = make_file_meta(item)
                        main_docs.append(meta)
                        all_proc_files.add(meta["rel_path"])

                # Sub-procedures folder (support variations: SUB PROCEDURE, SUB PROCEDURES, etc.)
                sub_dirs = [
                    d for d in opn_folder.iterdir()
                    if d.is_dir() and "sub" in d.name.lower() and not d.name.startswith(".")
                ]
                for s_dir in sub_dirs:
                    for item in sorted(s_dir.rglob("*")):
                        if is_valid_doc_file(item):
                            meta = make_file_meta(item)
                            sub_procs.append(meta)
                            all_proc_files.add(meta["rel_path"])

                # Forms folder inside OPN folder (support FORMS, Checklists, etc.)
                opn_form_dirs = [
                    d for d in opn_folder.iterdir()
                    if d.is_dir() and ("form" in d.name.lower() or "checklist" in d.name.lower()) and not d.name.startswith(".")
                ]
                for f_dir in opn_form_dirs:
                    for item in sorted(f_dir.rglob("*")):
                        if is_valid_doc_file(item):
                            meta = make_file_meta(item)
                            forms.append(meta)
                            all_proc_files.add(meta["rel_path"])

                # Any other subdirectories in OPN folder (e.g. custom subfolders)
                other_dirs = [
                    d for d in opn_folder.iterdir()
                    if d.is_dir() and not d.name.startswith(".")
                    and d not in sub_dirs and d not in opn_form_dirs
                ]
                for o_dir in other_dirs:
                    for item in sorted(o_dir.rglob("*")):
                        if is_valid_doc_file(item):
                            meta = make_file_meta(item)
                            sub_procs.append(meta)
                            all_proc_files.add(meta["rel_path"])

                # Also automatically link relevant checklists from global FORMS
                # e.g. FM-OPN-02-12 matches OPN-02
                for gf in global_forms:
                    gf_name_upper = gf["name"].upper()
                    # Check if filename contains OPN-01, OPN-02, etc.
                    clean_key = opn_key.upper().replace("-", "")
                    clean_name = gf_name_upper.replace("-", "")
                    if opn_key.upper() in gf_name_upper or clean_key in clean_name:
                        # Add to forms if not already present by relative path
                        if not any(f["rel_path"] == gf["rel_path"] for f in forms):
                            forms.append(gf)

                structure["procedures"][opn_key] = {
                    "folder_name": opn_folder.name,
                    "opn_key": opn_key,
                    "main_docs": main_docs,
                    "sub_procs": sub_procs,
                    "forms": forms,
                    "all_count": len(main_docs) + len(sub_procs) + len(forms)
                }

        # Calculate live stats
        total_opn = len(structure["procedures"])
        total_main_docs = sum(len(p["main_docs"]) for p in structure["procedures"].values())
        total_sub_procs = sum(len(p["sub_procs"]) for p in structure["procedures"].values())
        # Total unique forms
        total_forms = len(global_forms)
        for p in structure["procedures"].values():
            for f in p["forms"]:
                if f["rel_path"] not in [gf["rel_path"] for gf in global_forms]:
                    total_forms += 1

        structure["stats"] = {
            "total_opn": total_opn,
            "total_main_docs": total_main_docs,
            "total_sub_procs": total_sub_procs,
            "total_forms": total_forms,
            "total_files": len(all_proc_files)
        }

    # 2. Scan QAQC_GOVERNANCE
    gov_dir = BASE_DIR / "QAQC_GOVERNANCE"
    if gov_dir.exists():
        for f in sorted(gov_dir.rglob("*")):
            if is_valid_doc_file(f):
                structure["governance"].append(make_file_meta(f))

    # 3. Scan EXECUTIVE_REPORT
    exec_dir = BASE_DIR / "EXECUTIVE_REPORT"
    if exec_dir.exists():
        for f in sorted(exec_dir.rglob("*")):
            if is_valid_doc_file(f):
                structure["executive"].append(make_file_meta(f))

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

        if path == "/api/shutdown":
            self.send_json({"success": True, "message": "QA/QC Backend server shutting down."})
            def _shutdown():
                time.sleep(0.5)
                print("[SHUTDOWN] Server terminated via web request.")
                os._exit(0)
            threading.Thread(target=_shutdown, daemon=True).start()
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
                file_meta = make_file_meta(dest_file)
                self.send_json({
                    "success": True,
                    "message": f"Uploaded {filename} successfully.",
                    "file": file_meta,
                    "rel_path": str(dest_file.relative_to(BASE_DIR)).replace("\\", "/")
                })
            except Exception as e:
                self.send_json({"success": False, "error": str(e)}, status=500)
            return

        # 4. Shutdown Endpoint
        if path == "/api/shutdown":
            self.send_json({"success": True, "message": "QA/QC Backend server shutting down."})
            def _shutdown():
                time.sleep(0.5)
                print("[SHUTDOWN] Server terminated via web application request.")
                os._exit(0)
            threading.Thread(target=_shutdown, daemon=True).start()
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
        # Clean logging (safe for pythonw windowless mode)
        if sys.stderr:
            try:
                sys.stderr.write(f"[HTTP {time.strftime('%H:%M:%S')}] {format % args}\n")
            except Exception:
                pass


def is_server_already_running(port=8000):
    """Check if an instance of our QA/QC server is already online."""
    import urllib.request
    try:
        req = urllib.request.urlopen(f"http://127.0.0.1:{port}/api/status", timeout=0.8)
        if req.status == 200:
            data = json.loads(req.read().decode("utf-8"))
            if "QA/QC" in data.get("system", ""):
                return True
    except Exception:
        pass
    return False


def open_client_window(url, app_mode=False):
    """Open the application in standalone desktop app window or default browser."""
    if app_mode:
        browser_paths = [
            r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
            r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
            r"C:\Program Files\Google\Chrome\Application\chrome.exe",
            r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        ]
        for b_path in browser_paths:
            if os.path.exists(b_path):
                try:
                    subprocess.Popen([b_path, f"--app={url}"])
                    return
                except Exception:
                    pass
    # Fallback to standard default browser
    webbrowser.open(url)


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


def start_server(port=8000, open_browser=True, app_mode=False):
    # Single-instance check: if server is already running, just open the client and exit cleanly!
    if is_server_already_running(port):
        url = f"http://localhost:{port}/index.html"
        print(f"[ATTACHED] QA/QC server is already running in the background at {url}")
        if open_browser:
            open_client_window(url, app_mode=app_mode)
        return

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
            time.sleep(0.8)
            open_client_window(url, app_mode=app_mode)
        threading.Thread(target=_open, daemon=True).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[STOPPING] Shutting down QA/QC Server...")
        httpd.server_close()
        print("[STOPPED] Server closed.")


if __name__ == "__main__":
    auto_open = "--no-browser" not in sys.argv
    is_app = "--app" in sys.argv
    start_server(8000, open_browser=auto_open, app_mode=is_app)
