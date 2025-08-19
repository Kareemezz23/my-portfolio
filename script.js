
// Smooth scroll
function smoothScrollTo(id){
  const el = document.querySelector(id);
  if(el) window.scrollTo({top: el.offsetTop - 70, behavior:'smooth'});
}

// Theme toggle
(function themeInit(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved === 'light'){ root.classList.add('light'); }
  document.getElementById('themeToggle')?.addEventListener('click', ()=>{
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
})();

// Intersection reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=> e.isIntersecting && e.target.classList.add('show'));
}, {threshold: .15});
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));
});

// Particles background
(function particles(){
  const c = document.getElementById('particles');
  if(!c) return;
  const ctx = c.getContext('2d');
  let w,h, dpr = window.devicePixelRatio || 1;
  function resize(){
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr; ctx.scale(dpr,dpr);
  }
  window.addEventListener('resize', resize, {passive:true}); resize();

  const dots = Array.from({length: 80}, ()=> ({
    x: Math.random()*w, y: Math.random()*h,
    vx: (Math.random()-.5)*.6, vy: (Math.random()-.5)*.6,
    r: Math.random()*2+0.5
  }));

  function step(){
    ctx.clearRect(0,0,w,h);
    for(const p of dots){
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>w) p.vx*=-1;
      if(p.y<0||p.y>h) p.vy*=-1;
    }
    // draw connections
    for(let i=0;i<dots.length;i++){
      for(let j=i+1;j<dots.length;j++){
        const a=dots[i], b=dots[j];
        const dx=a.x-b.x, dy=a.y-b.y, dist=Math.hypot(dx,dy);
        if(dist<120){
          ctx.strokeStyle = `rgba(124,58,237, ${1 - dist/120})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    // draw dots
    for(const p of dots){
      ctx.fillStyle = 'rgba(34,211,238,.8)';
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();
})();

// Tilt effect on cards
document.addEventListener('mousemove', (e)=>{
  document.querySelectorAll('.card').forEach(card=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const rx = ((y - rect.height/2) / rect.height) * -4;
    const ry = ((x - rect.width/2) / rect.width) * 4;
    card.style.transform = `perspective(800px) translateZ(12px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
});
document.addEventListener('mouseleave', ()=>{
  document.querySelectorAll('.card').forEach(card=> card.style.transform='');
}, true);

// Simple filter (not functional without categories; left as a hook)
function filterProjects(tag){
  document.querySelectorAll('.project').forEach(p=>{
    p.style.display = (tag==='all' || p.dataset.tag?.includes(tag)) ? '' : 'none';
  });
}
