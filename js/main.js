
document.getElementById('yr').textContent = new Date().getFullYear();

// Header: transparent over hero, solid white once scrolled
(function(){
  const header = document.querySelector('header');
  if (!header || header.classList.contains('solid')) return;
  function onScroll(){
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

// Mouse-follow glow: eased trailing, desktop pointers only
(function(){
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function attachGlow(container, glow){
    if (!container || !glow) return;
    let tx = 0.5, ty = 0.4, cx = 0.5, cy = 0.4, raf = null;

    container.addEventListener('mousemove', function(e){
      const r = container.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      if (!raf) raf = requestAnimationFrame(step);
    });

    function step(){
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      glow.style.setProperty('--gx', (cx * 100).toFixed(2) + '%');
      glow.style.setProperty('--gy', (cy * 100).toFixed(2) + '%');
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001){
        raf = requestAnimationFrame(step);
      } else {
        raf = null;
      }
    }
  }

  attachGlow(document.querySelector('.hero'), document.querySelector('.hero-glow'));
  attachGlow(document.querySelector('.contact-box'), document.querySelector('.contact-glow'));
})();
