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
          if (badge) {
            badge.className = "status-badge";
            badge.innerHTML = `<span class="status-indicator-dot"></span> Backend Active (Native App Launch Ready)`;
            badge.title = `Connected to FCLDC Server at ${data.workspace}`;
          }
          return true;
        }
      } catch (e) {
        this.isServerOnline = false;
        if (badge) {
          badge.className = "status-badge offline";
          badge.innerHTML = `<span class="status-indicator-dot"></span> Browser Direct Mode`;
          badge.title = "Local backend not detected. Files will open in browser tabs or download.";
        }
        return false;
      }
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
