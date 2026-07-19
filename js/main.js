
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


// Case study carousel
(function(){
  const car = document.getElementById('case-carousel');
  if (!car) return;
  const track = car.querySelector('.car-track');
  const cards = track.querySelectorAll('.case');
  const dotsBox = car.querySelector('.car-dots');
  const prev = car.querySelector('.car-prev');
  const next = car.querySelector('.car-next');
  if (!track || !cards.length) return;

  cards.forEach(function(_, i){
    const d = document.createElement('button');
    d.className = 'car-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Go to case study ' + (i+1));
    d.addEventListener('click', function(){
      track.scrollTo({left: cards[i].offsetLeft - track.offsetLeft, behavior:'smooth'});
    });
    dotsBox.appendChild(d);
  });
  const dots = dotsBox.querySelectorAll('.car-dot');

  function currentIndex(){
    let best = 0, bestDist = Infinity;
    cards.forEach(function(c, i){
      const dist = Math.abs((c.offsetLeft - track.offsetLeft) - track.scrollLeft);
      if (dist < bestDist){ bestDist = dist; best = i; }
    });
    return best;
  }
  function update(){
    const i = currentIndex();
    dots.forEach(function(d, j){ d.classList.toggle('active', j === i); });
    prev.disabled = track.scrollLeft <= 5;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 5;
  }
  track.addEventListener('scroll', function(){ requestAnimationFrame(update); }, {passive:true});
  window.addEventListener('resize', update);

  function step(dir){
    const i = currentIndex();
    const target = Math.min(Math.max(i + dir, 0), cards.length - 1);
    track.scrollTo({left: cards[target].offsetLeft - track.offsetLeft, behavior:'smooth'});
  }
  prev.addEventListener('click', function(){ step(-1); });
  next.addEventListener('click', function(){ step(1); });
  update();
})();
Explain
