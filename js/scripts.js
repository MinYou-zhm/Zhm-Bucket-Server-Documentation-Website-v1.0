// 菜单开关：移动端点击展开/收起
(function(){
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('active');
      document.body.classList.toggle('nav-open', links.classList.contains('active'));
    });
    // 点击菜单项后自动收起
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('active');
        document.body.classList.remove('nav-open');
      });
    });
    // 按 ESC 关闭菜单
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        links.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
    });
  }
})();

// 复制IP到剪贴板
(function(){
  function copyIp() {
    const ipEl = document.getElementById('serverIp');
    if (!ipEl) return;
    const ip = ipEl.textContent.trim();
    navigator.clipboard.writeText(ip).then(() => alert('IP已复制：' + ip)).catch(() => alert('复制失败，请手动复制'));
  }
  const btn1 = document.getElementById('copyIpBtn');
  const btn2 = document.getElementById('copyIpBtn2');
  btn1 && btn1.addEventListener('click', copyIp);
  btn2 && btn2.addEventListener('click', copyIp);
})();

// 标签页切换（指令文档）
(function(){
  const tabs = Array.from(document.querySelectorAll('.tab-btn'));
  const contents = Array.from(document.querySelectorAll('.tab-content'));
  function activate(tab) {
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    contents.forEach(c => c.classList.toggle('active', c.id === 'tab-' + tab.dataset.tab));
  }
  tabs.forEach(t => t.addEventListener('click', () => activate(t)));
})();

// 移除了Minecraft服务器状态API调用代码，因为现在直接使用图片显示状态


// 浏览板块滚动进入动画：IntersectionObserver
(function(){
  const targets = Array.from(document.querySelectorAll('section, header.navbar, footer.footer'));
  if (!('IntersectionObserver' in window) || !targets.length) return;
  // 先标记当前视口内元素为 in-view，再统一添加 reveal，避免闪烁
  const isInViewport = el => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.9 && r.bottom > 0;
  };
  targets.forEach(el => { if (isInViewport(el)) el.classList.add('in-view'); });
  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('in-view');
      } else {
        el.classList.remove('in-view');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  targets.forEach(el => io.observe(el));
})();