/* ===== SDP Prototype Viewer — viewer.js ===== */

(function () {
  'use strict';

  // ─── Config ───────────────────────────────────────────────────────────────

  const VERSIONS = ['v2.6.0', 'v2.4.1'];

  // Module registry: id → { name, docFile, pages[] }
  const MODULES = [
    {
      id: 'design-task',
      name: '开款任务管理',
      docFile: '../modules/design-task.md',
      pages: [
        { id: 'list',        label: '任务列表',     file: 'pages/design-task/list.html' },
        { id: 'create',      label: '创建开款任务', file: 'pages/design-task/create.html' },
        { id: 'review',      label: '审核开款任务', file: 'pages/design-task/review.html' },
        { id: 'bulk-open',   label: '批量开款',     file: 'pages/design-task/bulk-open.html' },
      ],
    },
    {
      id: 'spot-goods',
      name: '现货管理',
      docFile: '../modules/spot-goods.md',
      pages: [
        { id: 'list',        label: '列表页',       file: 'pages/spot-goods/list.html' },
        { id: 'create-spu',  label: '创建 SPU',     file: 'pages/spot-goods/create-spu.html' },
        { id: 'edit-skc',    label: '编辑 SKC',     file: 'pages/spot-goods/edit-skc.html' },
      ],
    },
    {
      id: 'style-management',
      name: '款式管理',
      docFile: '../modules/style-management.md',
      pages: [
        { id: 'list',        label: '款式列表',     file: 'pages/style-management/list.html' },
      ],
    },
    {
      id: 'temu-product',
      name: '商品管理',
      docFile: '../modules/temu-product.md',
      pages: [
        { id: 'list',        label: '商品列表',     file: 'pages/temu-product/list.html' },
      ],
    },
    {
      id: 'image-update',
      name: '图片更新任务',
      docFile: '../modules/image-update.md',
      pages: [
        { id: 'list',        label: '任务列表',     file: 'pages/image-update/list.html' },
      ],
    },
    {
      id: 'shop-management',
      name: '店铺管理',
      docFile: '../modules/shop-management.md',
      pages: [
        { id: 'list',        label: '店铺列表',     file: 'pages/shop-management/list.html' },
      ],
    },
    {
      id: 'notification-center',
      name: '通知中心',
      docFile: '../modules/notification-center.md',
      pages: [
        { id: 'list',        label: '通知列表',     file: 'pages/notification-center/list.html' },
      ],
    },
  ];

  // ─── State ────────────────────────────────────────────────────────────────

  let state = {
    version: VERSIONS[0],
    moduleId: null,
    pageId: null,
    diffOn: true,
    docPanelWidth: parseInt(localStorage.getItem('sdp-doc-w') || '360', 10),
    docCollapsed: false,
    currentDocMd: '',
    highlightTimer: null,
  };

  // ─── DOM refs ─────────────────────────────────────────────────────────────

  const $ = id => document.getElementById(id);
  const els = {
    versionSelect:    () => $('version-select'),
    currentModule:    () => $('current-module'),
    diffToggle:       () => $('diff-toggle-cb'),
    changelogBtn:     () => $('changelog-btn'),
    changelogOverlay: () => $('changelog-overlay'),
    changelogClose:   () => $('changelog-close'),
    changelogBody:    () => $('changelog-body'),
    navScroll:        () => $('nav-scroll'),
    breadcrumb:       () => $('breadcrumb'),
    pageFrame:        () => $('page-frame'),
    pageEmpty:        () => $('page-empty'),
    docPanel:         () => $('doc-panel'),
    docTitle:         () => $('doc-panel-title'),
    docCollapseBtn:   () => $('doc-collapse-btn'),
    docToc:           () => $('doc-toc'),
    docContent:       () => $('doc-content'),
    docLoading:       () => $('doc-loading'),
    resizeHandle:     () => $('resize-handle'),
  };

  // ─── Init ─────────────────────────────────────────────────────────────────

  function init() {
    buildNav();
    bindTopbar();
    bindDocPanel();
    bindResizeHandle();
    bindChangelogPanel();
    applyDocPanelWidth(state.docPanelWidth);

    // Restore last page from sessionStorage
    const last = sessionStorage.getItem('sdp-last-page');
    if (last) {
      try {
        const { moduleId, pageId } = JSON.parse(last);
        navigateTo(moduleId, pageId, false);
        return;
      } catch (_) {}
    }
    // Default: open first page of first module
    navigateTo(MODULES[0].id, MODULES[0].pages[0].id, false);
  }

  // ─── Nav ──────────────────────────────────────────────────────────────────

  function buildNav() {
    const container = els.navScroll();
    container.innerHTML = '';
    MODULES.forEach(mod => {
      const wrap = document.createElement('div');
      wrap.className = 'nav-module';
      wrap.dataset.moduleId = mod.id;

      const title = document.createElement('div');
      title.className = 'nav-module-title';
      title.innerHTML = `<span>${mod.name}</span><span class="arrow">▶</span>`;
      title.addEventListener('click', () => toggleModule(mod.id));

      const pages = document.createElement('div');
      pages.className = 'nav-pages';
      mod.pages.forEach(pg => {
        const a = document.createElement('a');
        a.className = 'nav-page';
        a.dataset.moduleId = mod.id;
        a.dataset.pageId = pg.id;
        a.textContent = pg.label;
        a.href = '#';
        a.addEventListener('click', e => {
          e.preventDefault();
          navigateTo(mod.id, pg.id);
        });
        pages.appendChild(a);
      });

      wrap.appendChild(title);
      wrap.appendChild(pages);
      container.appendChild(wrap);
    });
  }

  function toggleModule(moduleId) {
    const wrap = els.navScroll().querySelector(`[data-module-id="${moduleId}"]`);
    if (!wrap) return;
    const isOpen = wrap.classList.contains('open');
    // Close all
    els.navScroll().querySelectorAll('.nav-module.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) wrap.classList.add('open');
  }

  function setNavActive(moduleId, pageId) {
    els.navScroll().querySelectorAll('.nav-page').forEach(el => {
      el.classList.toggle('active',
        el.dataset.moduleId === moduleId && el.dataset.pageId === pageId);
    });
    // Open the module
    const wrap = els.navScroll().querySelector(`.nav-module[data-module-id="${moduleId}"]`);
    if (wrap) {
      els.navScroll().querySelectorAll('.nav-module.open').forEach(el => el.classList.remove('open'));
      wrap.classList.add('open');
    }
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  function navigateTo(moduleId, pageId, saveSession = true) {
    const mod = MODULES.find(m => m.id === moduleId);
    if (!mod) return;
    const pg = mod.pages.find(p => p.id === pageId);
    if (!pg) return;

    state.moduleId = moduleId;
    state.pageId = pageId;

    if (saveSession) {
      sessionStorage.setItem('sdp-last-page', JSON.stringify({ moduleId, pageId }));
    }

    // Update nav
    setNavActive(moduleId, pageId);

    // Update topbar module label
    els.currentModule().textContent = `${mod.name} / ${pg.label}`;

    // Update breadcrumb
    els.breadcrumb().innerHTML =
      `<span>${mod.name}</span><span class="bc-sep">›</span><span class="bc-current">${pg.label}</span>`;

    // Load iframe
    loadPage(pg.file);

    // Load doc
    loadDoc(mod.docFile, mod.name);
  }

  // ─── Page iframe ──────────────────────────────────────────────────────────

  function loadPage(file) {
    const frame = els.pageFrame();
    const empty = els.pageEmpty();

    frame.style.display = 'none';
    empty && (empty.style.display = 'none');

    frame.onload = () => {
      frame.style.display = 'block';
      injectFrameBridge(frame);
      if (state.diffOn) applyDiffToFrame(frame);
    };
    frame.onerror = () => {
      frame.style.display = 'none';
      if (empty) {
        empty.style.display = 'flex';
        empty.querySelector('.empty-text').textContent = '页面文件不存在：' + file;
      }
    };
    frame.src = file;
  }

  // Inject message bridge into iframe so it can communicate doc-ref events
  function injectFrameBridge(frame) {
    try {
      const doc = frame.contentDocument;
      if (!doc) return;

      // Listen for mouseover / click on elements with data-doc-ref
      doc.addEventListener('mouseover', e => {
        const ref = findDocRef(e.target);
        if (ref) highlightDocSection(ref, false);
      });
      doc.addEventListener('click', e => {
        const ref = findDocRef(e.target);
        if (ref) highlightDocSection(ref, true);
      });
    } catch (_) {
      // Cross-origin — ignore
    }
  }

  function findDocRef(el) {
    let node = el;
    while (node && node !== document.body) {
      if (node.dataset && node.dataset.docRef) return node.dataset.docRef;
      node = node.parentElement;
    }
    return null;
  }

  // ─── Doc panel ────────────────────────────────────────────────────────────

  async function loadDoc(docFile, moduleName) {
    const loading = els.docLoading();
    const content = els.docContent();
    const toc = els.docToc();

    loading.classList.add('show');
    content.innerHTML = '';
    toc.innerHTML = '';
    if (els.docTitle()) els.docTitle().textContent = moduleName;

    try {
      const res = await fetch(docFile);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      let md = await res.text();

      // Strip YAML front-matter
      md = md.replace(/^---[\s\S]*?---\n/, '');

      state.currentDocMd = md;
      renderDoc(md);
    } catch (err) {
      content.innerHTML = `<p style="color:#999;padding:16px">文档加载失败：${err.message}</p>`;
    } finally {
      loading.classList.remove('show');
    }
  }

  function renderDoc(md) {
    const content = els.docContent();
    const toc = els.docToc();

    // Render markdown
    if (window.marked) {
      content.innerHTML = window.marked.parse(md);
    } else {
      // Fallback: basic rendering
      content.innerHTML = '<pre style="white-space:pre-wrap">' + escHtml(md) + '</pre>';
    }

    // Add IDs to headings for anchor linking
    content.querySelectorAll('h1,h2,h3,h4').forEach(h => {
      const id = h.textContent.trim().replace(/\s+/g, '-').replace(/[^\w一-龥-]/g, '');
      h.id = 'doc-' + id;
    });

    // Build TOC
    buildToc(content, toc);

    // Apply change markers from md text
    applyDocChangeMarkers(content);
  }

  function buildToc(content, toc) {
    toc.innerHTML = '';
    content.querySelectorAll('h2,h3').forEach(h => {
      const a = document.createElement('a');
      a.className = 'toc-item' + (h.tagName === 'H3' ? ' toc-h3' : '');
      a.textContent = h.textContent.replace(/\(v[\d.]+\s+\S+\)/g, '').trim();
      a.href = '#';
      a.addEventListener('click', e => {
        e.preventDefault();
        h.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Highlight active toc item
        toc.querySelectorAll('.toc-item').forEach(i => i.classList.remove('active'));
        a.classList.add('active');
      });
      toc.appendChild(a);
    });
  }

  // Parse (vX.X.X 新增/变更/删除) markers in rendered HTML and add badges
  function applyDocChangeMarkers(content) {
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
    const replacements = [];
    let node;
    while ((node = walker.nextNode())) {
      const text = node.textContent;
      if (/\(v[\d.]+\s+(新增|变更|删除)\)/.test(text)) {
        replacements.push(node);
      }
    }
    replacements.forEach(textNode => {
      const span = document.createElement('span');
      span.innerHTML = textNode.textContent.replace(
        /\(v([\d.]+)\s+(新增|变更|删除)\)/g,
        (_, ver, type) => {
          const cls = type === '新增' ? 'new' : type === '变更' ? 'changed' : 'deleted';
          const label = type === '新增' ? 'NEW' : type === '变更' ? 'CHG' : 'DEL';
          return `<span class="change-badge ${cls}" title="v${ver} ${type}">${label}</span>`;
        }
      );
      textNode.parentNode.replaceChild(span, textNode);
    });
  }

  // Highlight a doc section by anchor ref
  function highlightDocSection(ref, sticky) {
    const [, anchor] = ref.split('#');
    if (!anchor) return;

    const content = els.docContent();
    // Find heading whose text contains the anchor keyword
    const headings = content.querySelectorAll('h2,h3,h4');
    let target = null;
    for (const h of headings) {
      if (h.textContent.includes(anchor) || h.id.includes(anchor)) {
        target = h;
        break;
      }
    }
    if (!target) return;

    // Remove previous highlights
    content.querySelectorAll('.doc-section-highlight').forEach(el => {
      el.classList.remove('doc-section-highlight');
    });

    // Highlight the section (heading + siblings until next heading)
    target.classList.add('doc-section-highlight');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (sticky) {
      // Keep highlight for 2s then fade
      clearTimeout(state.highlightTimer);
      state.highlightTimer = setTimeout(() => {
        content.querySelectorAll('.doc-section-highlight').forEach(el => {
          el.classList.remove('doc-section-highlight');
        });
      }, 2000);
    }
  }

  // ─── Diff / change markers on iframe ──────────────────────────────────────

  function applyDiffToFrame(frame) {
    try {
      const doc = frame.contentDocument;
      if (!doc) return;
      const body = doc.body;
      if (state.diffOn) {
        body.classList.add('diff-on');
        // Inject badge elements next to [data-change] elements
        doc.querySelectorAll('[data-change]').forEach(el => {
          if (el.querySelector('.change-badge')) return; // already injected
          const type = el.dataset.change;
          const label = type === 'new' ? 'NEW' : type === 'changed' ? 'CHG' : 'DEL';
          const badge = doc.createElement('span');
          badge.className = `change-badge ${type}`;
          badge.textContent = label;
          badge.title = type === 'new' ? '新增' : type === 'changed' ? '变更' : '删除';
          badge.addEventListener('click', e => {
            e.stopPropagation();
            const docRef = findDocRef(el);
            if (docRef) highlightDocSection(docRef, true);
          });
          el.appendChild(badge);
        });
      } else {
        body.classList.remove('diff-on');
      }
    } catch (_) {}
  }

  // ─── Topbar ───────────────────────────────────────────────────────────────

  function bindTopbar() {
    // Version select
    const sel = els.versionSelect();
    VERSIONS.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      sel.appendChild(opt);
    });
    sel.value = state.version;
    sel.addEventListener('change', () => {
      state.version = sel.value;
      // Reload current page (version-specific pages would live in versioned dirs)
      if (state.moduleId && state.pageId) navigateTo(state.moduleId, state.pageId);
    });

    // Diff toggle
    const cb = els.diffToggle();
    cb.checked = state.diffOn;
    cb.addEventListener('change', () => {
      state.diffOn = cb.checked;
      const frame = els.pageFrame();
      if (frame.contentDocument) {
        if (state.diffOn) applyDiffToFrame(frame);
        else {
          try {
            frame.contentDocument.body.classList.remove('diff-on');
          } catch (_) {}
        }
      }
    });
  }

  // ─── Doc panel collapse / resize ──────────────────────────────────────────

  function bindDocPanel() {
    els.docCollapseBtn().addEventListener('click', () => {
      state.docCollapsed = !state.docCollapsed;
      const panel = els.docPanel();
      panel.classList.toggle('collapsed', state.docCollapsed);
      els.docCollapseBtn().textContent = state.docCollapsed ? '◀' : '▶';
    });
  }

  function applyDocPanelWidth(w) {
    const panel = els.docPanel();
    const clamped = Math.max(parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--doc-min'), 10) || 240,
      Math.min(w, parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--doc-max'), 10) || 600));
    panel.style.width = clamped + 'px';
    panel.style.minWidth = clamped + 'px';
    state.docPanelWidth = clamped;
    localStorage.setItem('sdp-doc-w', clamped);
  }

  function bindResizeHandle() {
    const handle = els.resizeHandle();
    let startX = 0;
    let startW = 0;

    handle.addEventListener('mousedown', e => {
      e.preventDefault();
      startX = e.clientX;
      startW = state.docPanelWidth;
      handle.classList.add('dragging');

      const onMove = e => {
        const delta = startX - e.clientX; // dragging left = wider doc
        applyDocPanelWidth(startW + delta);
        // Auto-collapse if dragged too narrow
        if (state.docPanelWidth <= 240 && !state.docCollapsed) {
          state.docCollapsed = true;
          els.docPanel().classList.add('collapsed');
          els.docCollapseBtn().textContent = '◀';
        } else if (state.docCollapsed && state.docPanelWidth > 240) {
          state.docCollapsed = false;
          els.docPanel().classList.remove('collapsed');
          els.docCollapseBtn().textContent = '▶';
        }
      };

      const onUp = () => {
        handle.classList.remove('dragging');
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  }

  // ─── Changelog panel ──────────────────────────────────────────────────────

  function bindChangelogPanel() {
    els.changelogBtn().addEventListener('click', openChangelog);
    els.changelogClose().addEventListener('click', closeChangelog);
    els.changelogOverlay().addEventListener('click', e => {
      if (e.target === els.changelogOverlay()) closeChangelog();
    });
  }

  function openChangelog() {
    buildChangelogList();
    els.changelogOverlay().classList.add('open');
  }

  function closeChangelog() {
    els.changelogOverlay().classList.remove('open');
  }

  function buildChangelogList() {
    const body = els.changelogBody();
    body.innerHTML = '';

    // Collect all change markers from all module docs
    // For now, build from MODULES registry — in a real build this would be pre-parsed
    const items = collectChangelogItems();

    if (!items.length) {
      body.innerHTML = '<p style="color:#999;text-align:center;padding:24px">暂无变更记录</p>';
      return;
    }

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'changelog-item';
      div.innerHTML = `
        <span class="ci-badge ${item.type}">${item.type === 'new' ? '新增' : item.type === 'changed' ? '变更' : '删除'}</span>
        <div class="ci-info">
          <div class="ci-module">${item.module}</div>
          <div class="ci-desc">${escHtml(item.desc)}</div>
        </div>
      `;
      div.addEventListener('click', () => {
        closeChangelog();
        navigateTo(item.moduleId, item.pageId || 'list');
        setTimeout(() => highlightDocSection(item.moduleId + '#' + item.anchor, true), 600);
      });
      body.appendChild(div);
    });
  }

  // Parse change markers from the current doc md (simple regex scan)
  function collectChangelogItems() {
    const items = [];
    const version = state.version;
    const vShort = version.replace('v', '');

    MODULES.forEach(mod => {
      // We only have the current module's md loaded; for others we'd need to fetch
      // For now, emit items from the currently loaded doc
      if (mod.id !== state.moduleId) return;
      const md = state.currentDocMd;
      const re = /\(v([\d.]+)\s+(新增|变更|删除)\)/g;
      let m;
      // Find surrounding context (the line containing the marker)
      const lines = md.split('\n');
      lines.forEach(line => {
        re.lastIndex = 0;
        while ((m = re.exec(line)) !== null) {
          const [, ver, typeZh] = m;
          if (ver !== vShort) continue;
          const type = typeZh === '新增' ? 'new' : typeZh === '变更' ? 'changed' : 'deleted';
          const desc = line.replace(/^[#|*\-\s]+/, '').replace(/\(v[\d.]+\s+\S+\)/g, '').trim().slice(0, 80);
          if (desc) {
            items.push({ moduleId: mod.id, module: mod.name, type, desc, anchor: desc.slice(0, 20), pageId: 'list' });
          }
        }
      });
    });
    return items;
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function escHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ─── Boot ─────────────────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
