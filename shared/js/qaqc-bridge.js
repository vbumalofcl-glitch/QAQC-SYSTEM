/**
 * FCLaranang Dev Corp QA/QC Executive Management System
 * Shared System Bridge & Native Launcher Client
 */

(function () {
  window.QAQCBridge = {
    isServerOnline: false,
    serverUrl: "",

    /**
     * Initialize connection status check and attach global listeners
     */
    init: function () {
      this.createToastContainer();
      this.checkServer();
      // Periodically check server liveness
      setInterval(() => this.checkServer(), 10000);
    },

    /**
     * Create toast container if not already in DOM
     */
    createToastContainer: function () {
      if (!document.getElementById("toast-container")) {
        const container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
      }
    },

    /**
     * Show animated corporate toast notification
     */
    showToast: function (msg, type = "info") {
      this.createToastContainer();
      const container = document.getElementById("toast-container");
      const toast = document.createElement("div");
      toast.className = `toast ${type}`;

      let icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
      if (type === "success") {
        icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
      } else if (type === "error") {
        icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
      }

      toast.innerHTML = `${icon} <span>${msg}</span>`;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    },

    /**
     * Check if local Python backend server is running
     */
    checkServer: async function () {
      const badge = document.getElementById("server-status-badge");
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          this.isServerOnline = true;
          this.serverData = data;
          if (badge) {
            badge.className = "status-badge";
            badge.style.cursor = "pointer";
            badge.innerHTML = `<span class="status-indicator-dot"></span> Backend Active (Hidden Service)`;
            badge.title = `Local Server active in background. Click for controls.`;
            if (!badge.hasAttribute("data-listener")) {
              badge.setAttribute("data-listener", "true");
              badge.addEventListener("click", () => this.showServerMenu());
            }
          }
          return true;
        }
      } catch (e) {
        this.isServerOnline = false;
        if (badge) {
          badge.className = "status-badge offline";
          badge.style.cursor = "default";
          badge.innerHTML = `<span class="status-indicator-dot"></span> Browser Direct Mode`;
          badge.title = "Local backend not detected. Files will open in browser tabs or download.";
        }
        return false;
      }
    },

    /**
     * Show compact in-app server controls popover
     */
    showServerMenu: function () {
      let menu = document.getElementById("server-control-popover");
      if (menu) {
        menu.remove();
        return;
      }

      menu = document.createElement("div");
      menu.id = "server-control-popover";
      menu.style.position = "fixed";
      menu.style.top = "54px";
      menu.style.right = "1.25rem";
      menu.style.background = "#ffffff";
      menu.style.border = "1px solid var(--emerald-300, #10b981)";
      menu.style.borderRadius = "8px";
      menu.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
      menu.style.padding = "0.75rem 1rem";
      menu.style.zIndex = "10000";
      menu.style.width = "280px";
      menu.style.fontSize = "0.75rem";
      menu.style.color = "#1e293b";

      menu.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.5rem; border-bottom:1px solid #e2e8f0; padding-bottom:0.35rem;">
          <strong style="color:#065f46; font-size:0.8rem; display:flex; align-items:center; gap:0.35rem;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10b981;"></span>
            QA/QC Background Server
          </strong>
          <button id="close-server-popover" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:1rem; line-height:1;">&times;</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.35rem; color:#475569; margin-bottom:0.75rem;">
          <div><strong>Process:</strong> Hidden Background (pythonw)</div>
          <div><strong>Status:</strong> Active &bull; Port 8000</div>
          <div><strong>Launcher:</strong> Native Word, Excel, Acrobat</div>
        </div>
        <div style="display:flex; gap:0.45rem;">
          <button id="btn-stop-backend" style="flex:1; padding:0.3rem 0.6rem; font-size:0.72rem; font-weight:700; color:#dc2626; background:#fee2e2; border:1px solid #fca5a5; border-radius:5px; cursor:pointer;">
            Stop Server
          </button>
          <button id="btn-rescan-backend" style="flex:1; padding:0.3rem 0.6rem; font-size:0.72rem; font-weight:700; color:#065f46; background:#ecfdf5; border:1px solid #a7f3d0; border-radius:5px; cursor:pointer;">
            Check Status
          </button>
        </div>
      `;

      document.body.appendChild(menu);

      document.getElementById("close-server-popover").onclick = () => menu.remove();
      document.getElementById("btn-rescan-backend").onclick = () => {
        this.checkServer();
        this.showToast("Backend connection verified active.", "success");
        menu.remove();
      };
      document.getElementById("btn-stop-backend").onclick = async () => {
        if (confirm("Stop the background QA/QC server?")) {
          try {
            await fetch("/api/shutdown", { method: "POST" });
            this.showToast("Backend server stopped.", "info");
          } catch (e) {
            this.showToast("Server stopped.", "info");
          }
          menu.remove();
          setTimeout(() => this.checkServer(), 800);
        }
      };

      // Close when clicking outside
      const outsideClick = (e) => {
        if (!menu.contains(e.target) && e.target.id !== "server-status-badge") {
          menu.remove();
          document.removeEventListener("click", outsideClick);
        }
      };
      setTimeout(() => document.addEventListener("click", outsideClick), 100);
    },

    /**
     * Compute relative path based on current page location
     */
    resolveLocalUrl: function (relPath) {
      let clean = relPath.replace(/\\/g, "/").replace(/^\/+/, "");
      const currentPath = window.location.pathname.replace(/\\/g, "/");

      if (currentPath.includes("/CONST_PROCEDURES/")) {
        if (clean.startsWith("CONST_PROCEDURES/")) {
          return clean.substring("CONST_PROCEDURES/".length);
        }
        return clean;
      }

      const isInSubfolder = currentPath.includes("/QAQC_GOVERNANCE/") || 
                            currentPath.includes("/CAPA/") || 
                            currentPath.includes("/PUNCHLISTING_COMMISSIONING/") ||
                            currentPath.includes("/QAQC_KPI/") ||
                            currentPath.includes("/EXECUTIVE_REPORT/");

      if (isInSubfolder) {
        return "../" + clean;
      }

      return clean;
    },

    /**
     * Primary file launcher:
     * 1. If backend server is active -> Calls /api/open to launch native Word, Excel, Acrobat
     * 2. If standalone/offline -> Opens relative web link or triggers direct browser download
     */
    openFile: async function (relPath, fileName = "") {
      const displayTitle = fileName || relPath.split("/").pop();
      const ext = relPath.split(".").pop().toLowerCase();
      let appName = "Application";
      if (["doc", "docx"].includes(ext)) appName = "Microsoft Word";
      else if (["xls", "xlsx", "xlsm"].includes(ext)) appName = "Microsoft Excel";
      else if (ext === "pdf") appName = "Adobe Acrobat / PDF Viewer";

      // Attempt 1: Call Local Python Native Launcher API
      try {
        const res = await fetch("/api/open", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: relPath }),
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            this.showToast(`Launching '${displayTitle}' in ${appName}...`, "success");
            return;
          }
        }
      } catch (err) {
        console.log("Backend native launcher unavailable, falling back to direct browser mode:", err);
      }

      // Attempt 2: Direct Browser Navigation / Download Fallback
      const localUrl = this.resolveLocalUrl(relPath);
      this.showToast(`Opening '${displayTitle}' (${appName})...`, "info");

      const link = document.createElement("a");
      link.href = encodeURI(localUrl);
      link.target = "_blank";
      if (["doc", "docx", "xls", "xlsx", "xlsm"].includes(ext)) {
        link.download = displayTitle;
      }
      document.body.appendChild(link);
      link.click();
      setTimeout(() => link.remove(), 200);
    },

    /**
     * Fetch full structure from backend if available
     */
    fetchStructure: async function () {
      try {
        const res = await fetch("/api/structure", { cache: "no-store" });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn("Could not fetch dynamic structure from API:", e);
      }
      return null;
    },

    /**
     * Instant search filter helper for cards
     */
    bindSearch: function (inputId, cardSelector, textSelector = "") {
      const input = document.getElementById(inputId);
      if (!input) return;

      input.addEventListener("input", function (e) {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll(cardSelector);

        cards.forEach((card) => {
          const text = textSelector
            ? (card.querySelector(textSelector)?.textContent || "").toLowerCase()
            : card.textContent.toLowerCase();

          if (!query || text.includes(query)) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    },
  };

  // Auto-init on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.QAQCBridge.init());
  } else {
    window.QAQCBridge.init();
  }
})();
