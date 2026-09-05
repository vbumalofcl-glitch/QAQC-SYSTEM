/* ==========================================================================
   CAPA Professional - Subsystem API & Persistence Bridge
   Supports:
   1. Backend Server API Sync (/api/load, /api/save)
   2. Seamless LocalStorage fallback when standalone or offline
   3. Parent App Window Messaging (postMessage) for embedded sub-system use
   ========================================================================== */

(function(){
  if(window.__CAPA_PRO_SAVE_PATCHED__) return;
  window.__CAPA_PRO_SAVE_PATCHED__ = true;

  var saving = false;
  var hasBackendServer = null; // null = unknown, true = connected, false = fallback mode

  function arr(v){ return Array.isArray(v) ? v : []; }

  async function postJSON(path, payload){
    var res = await fetch(path, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload || {})
    });
    if(!res.ok) throw new Error(await res.text());
    return await res.json();
  }

  function getState(){
    if(typeof window.getCapaHybridState === 'function') {
      return window.getCapaHybridState();
    }
    return {
      capaData: JSON.parse(localStorage.getItem('capaDataWorking') || '[]'),
      actionLetters: JSON.parse(localStorage.getItem('capaActionLetters') || '[]'),
      hiddenColumns: JSON.parse(localStorage.getItem('capaHiddenColumns') || '[]')
    };
  }

  function setState(state){
    state = state || {};
    if(typeof window.setCapaHybridState === 'function'){
      window.setCapaHybridState(state);
      return;
    }
    localStorage.setItem('capaDataWorking', JSON.stringify(arr(state.capaData)));
    localStorage.setItem('capaActionLetters', JSON.stringify(arr(state.actionLetters)));
    localStorage.setItem('capaHiddenColumns', JSON.stringify(arr(state.hiddenColumns)));
  }

  async function saveToSystem(silent){
    if(saving) return;
    saving = true;
    var state = getState();

    // Always update localStorage first
    localStorage.setItem('capaDataWorking', JSON.stringify(arr(state.capaData)));
    localStorage.setItem('capaActionLetters', JSON.stringify(arr(state.actionLetters)));
    localStorage.setItem('capaHiddenColumns', JSON.stringify(arr(state.hiddenColumns)));

    // Notify parent app if embedded in iframe
    if(window.parent && window.parent !== window){
      try{
        window.parent.postMessage({
          type: 'CAPA_DATA_CHANGED',
          payload: state
        }, '*');
      }catch(e){}
    }

    try{
      var saved = await postJSON('/api/save', {
        capaData: arr(state.capaData),
        actionLetters: arr(state.actionLetters),
        hiddenColumns: arr(state.hiddenColumns)
      });
      hasBackendServer = true;
      setState(saved);
      if(!silent){
        try{ showToast('Saved to system database'); }catch(e){}
      }
      return saved;
    }catch(err){
      // Backend not available - fallback to browser storage
      hasBackendServer = false;
      if(!silent){
        try{ showToast('Saved locally in browser storage'); }catch(e){}
      }
      return state;
    }finally{
      saving = false;
    }
  }

  async function loadFromSystem(){
    try{
      var res = await fetch('/api/load', {cache:'no-store'});
      if(!res.ok) throw new Error('Status ' + res.status);
      var loaded = await res.json();
      hasBackendServer = true;
      if(arr(loaded.capaData).length || arr(loaded.actionLetters).length || arr(loaded.hiddenColumns).length){
        setState(loaded);
        try{ showToast('Loaded from database'); }catch(e){}
      }
    }catch(err){
      hasBackendServer = false;
      // Using local storage state
      console.log('Running in client storage mode (no backend server detected)');
    }
  }

  function addSaveButton(){
    var toolbar = document.querySelector('.toolbar-actions') || document.querySelector('.toolbar');
    if(!toolbar || document.getElementById('saveToSystemBtn')) return;
    var btn = document.createElement('button');
    btn.id = 'saveToSystemBtn';
    btn.type = 'button';
    btn.className = 'btn btn-primary';
    btn.textContent = 'Save to System';
    btn.title = 'Save CAPA records, action letters, images and settings (Ctrl+S)';
    btn.addEventListener('click', function(){ saveToSystem(false); });
    toolbar.prepend(btn);
  }

  // Keyboard shortcut Ctrl+S / Cmd+S
  document.addEventListener('keydown', function(e){
    if((e.ctrlKey || e.metaKey) && String(e.key).toLowerCase() === 's'){
      e.preventDefault();
      saveToSystem(false);
    }
  });

  // Listen for messages from parent application
  window.addEventListener('message', function(e){
    if(!e.data || typeof e.data !== 'object') return;
    if(e.data.type === 'CAPA_SET_STATE'){
      setState(e.data.payload);
      if(e.data.save) saveToSystem(true);
    }else if(e.data.type === 'CAPA_GET_STATE'){
      var curState = getState();
      if(e.source && typeof e.source.postMessage === 'function'){
        e.source.postMessage({ type: 'CAPA_STATE_RESPONSE', payload: curState }, '*');
      }
    }
  });

  // Public Subsystem API
  window.CapaSubsystem = {
    getState: getState,
    setState: setState,
    save: saveToSystem,
    load: loadFromSystem,
    hasBackend: function(){ return hasBackendServer; }
  };
  window.saveCapaToSystem = saveToSystem;

  window.addEventListener('load', function(){
    addSaveButton();
    setTimeout(loadFromSystem, 500);
  });
})();
