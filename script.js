/* ============================================================
   Romantic Love Story Website - Main Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  initLoading();
  initCursor();
  initStars();
  initRain();
  initFloatingHearts();
  initShootingStars();
  initMusic();
});

/* ===================== LOADING SCREEN ===================== */
function initLoading() {
  const loader = document.getElementById('loading-screen');
  const sections = document.querySelectorAll('#love-story, #heart-collage, #ending');
  sections.forEach(s => { s.style.display = 'none'; });

  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
      startOpeningAnimation();
    }, 800);
  }, 3000);
}

/* ===================== CUSTOM CURSOR ===================== */
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  if (window.innerWidth <= 768) return;

  let mx = 0, my = 0, dx = 0, dy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx - 4 + 'px';
    dot.style.top = my - 4 + 'px';
  });

  function animateRing() {
    dx += (mx - dx) * 0.15;
    dy += (my - dy) * 0.15;
    ring.style.left = dx - 17.5 + 'px';
    ring.style.top = dy - 17.5 + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('button, a, .heart-photo, .timeline-card, .video-play-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('hover');
      dot.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('hover');
      dot.style.transform = 'scale(1)';
    });
  });
}

/* ===================== STARS ===================== */
function initStars() {
  const container = document.getElementById('starsContainer');
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%; top:${Math.random() * 100}%;
      --duration:${Math.random() * 3 + 2}s;
      animation-delay:${Math.random() * 5}s;
      opacity:${Math.random() * 0.5 + 0.2};
    `;
    container.appendChild(star);
  }
}

/* ===================== RAIN ===================== */
function initRain() {
  const container = document.getElementById('rainContainer');
  for (let i = 0; i < 60; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    const h = Math.random() * 30 + 15;
    drop.style.cssText = `
      left:${Math.random() * 100}%;
      height:${h}px;
      animation-duration:${Math.random() * 1.5 + 1}s;
      animation-delay:${Math.random() * 3}s;
      opacity:${Math.random() * 0.3 + 0.1};
    `;
    container.appendChild(drop);
  }
}

/* ===================== FLOATING HEARTS ===================== */
function initFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const hearts = ['💕', '💗', '💖', '❤️', '🩷', '💘'];
  for (let i = 0; i < 15; i++) {
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.cssText = `
      left:${Math.random() * 100}%;
      font-size:${Math.random() * 16 + 10}px;
      animation-duration:${Math.random() * 8 + 6}s;
      animation-delay:${Math.random() * 10}s;
    `;
    container.appendChild(h);
  }
}



/* ===================== SHOOTING STARS ===================== */
function initShootingStars() {
  const container = document.getElementById('shootingStars');
  for (let i = 0; i < 6; i++) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.cssText = `
      top:${Math.random() * 50}%; left:${Math.random() * 50}%;
      animation-duration:${Math.random() * 3 + 2}s;
      animation-delay:${Math.random() * 10}s;
    `;
    container.appendChild(star);
  }
}

/* ===================== MUSIC ===================== */
function initMusic() {
  const btn = document.getElementById('musicBtn');
  const bars = document.getElementById('musicBars');
  const audio = document.getElementById('bgMusic');
  let isPlaying = false;

  btn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      bars.classList.add('paused');
    } else {
      audio.play().catch(() => { });
      bars.classList.remove('paused');
    }
    isPlaying = !isPlaying;
  });

  // Try autoplay
  bars.classList.add('paused');
}

/* ===================== OPENING ANIMATION ===================== */
function startOpeningAnimation() {
  // Typing animation
  const text = "Welcome Sayang Ke Galeri Kita";
  const typingEl = document.getElementById('typingText');
  let charIndex = 0;

  function typeChar() {
    if (charIndex < text.length) {
      typingEl.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 50);
    }
  }

  gsap.to('#openingSubtitle', {
    opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
    onComplete: typeChar
  });

  gsap.to('#openingMessage', { opacity: 1, y: 0, duration: 1, delay: 5, ease: 'power2.out' });
  gsap.to('#btnMaaf', { opacity: 1, y: 0, duration: 1, delay: 5.5, ease: 'power2.out' });
}

/* ===================== FORGIVE BUTTON (Love Explosion) ===================== */
function handleForgive() {
  const explosion = document.getElementById('loveExplosion');
  explosion.classList.add('active');

  const hearts = ['❤️', '💕', '💖', '💗', '💘', '💝', '🩷', '✨', '💫'];
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;

  for (let i = 0; i < 50; i++) {
    const heart = document.createElement('div');
    heart.className = 'explosion-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = cx + 'px';
    heart.style.top = cy + 'px';
    heart.style.fontSize = Math.random() * 30 + 15 + 'px';

    const angle = (Math.PI * 2 * i) / 50;
    const dist = Math.random() * 400 + 200;
    const tx = Math.cos(angle) * dist, ty = Math.sin(angle) * dist;
    heart.style.animation = 'none';

    explosion.appendChild(heart);

    gsap.to(heart, {
      x: tx, y: ty,
      rotation: Math.random() * 720 - 360,
      scale: Math.random() * 1.5 + 0.5,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out'
    });
  }

  // Transition to next sections
  setTimeout(() => {
    gsap.to('#opening', {
      opacity: 0, duration: 1, ease: 'power2.inOut',
      onComplete: () => {
        document.getElementById('opening').style.display = 'none';
        explosion.classList.remove('active');
        explosion.innerHTML = '';
        showMainSections();
      }
    });
  }, 1200);
}

/* ===================== SHOW MAIN SECTIONS ===================== */
function showMainSections() {
  const sections = document.querySelectorAll('#love-story, #heart-collage, #ending');
  sections.forEach(s => { s.style.display = ''; });

  initTimelineAnimation();
  initTimelineVideos();
  initHeartCollage();
  initEndingAnimation();

  // Auto scroll to love story
  setTimeout(() => {
    document.getElementById('love-story').scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

/* ===================== TIMELINE ANIMATION ===================== */
function initTimelineAnimation() {
  const items = document.querySelectorAll('.timeline-item');
  items.forEach((item, i) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: i * 0.15,
      ease: 'power3.out'
    });
  });

  // Section header
  gsap.from('#love-story .section-header', {
    scrollTrigger: { trigger: '#love-story', start: 'top 75%' },
    opacity: 0, y: 40, duration: 1, ease: 'power3.out'
  });
}

/* ===================== TIMELINE VIDEOS ===================== */
function initTimelineVideos() {
  document.querySelectorAll('.timeline-card video').forEach(video => {
    if (!video.parentElement.classList.contains('timeline-video-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'timeline-video-wrapper';
      video.parentNode.insertBefore(wrapper, video);
      wrapper.appendChild(video);

      const playBtn = document.createElement('button');
      playBtn.className = 'video-play-btn playing';
      playBtn.innerHTML = '⏸';
      playBtn.setAttribute('aria-label', 'Pause video');
      wrapper.appendChild(playBtn);

      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
          video.play();
          playBtn.classList.add('playing');
          playBtn.innerHTML = '⏸';
        } else {
          video.pause();
          playBtn.classList.remove('playing');
          playBtn.innerHTML = '▶';
        }
      });

      // Autoplay when scrolled into view, pause when out
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(() => { });
            playBtn.classList.add('playing');
            playBtn.innerHTML = '⏸';
          } else {
            video.pause();
            playBtn.classList.remove('playing');
            playBtn.innerHTML = '▶';
          }
        });
      }, { threshold: 0.3 });

      observer.observe(wrapper);
    }
  });
}

/* ===================== HEART COLLAGE ===================== */
function initHeartCollage() {
  const container = document.getElementById('heartShapeContainer');

  // ============================================================
  // CARA MENAMBAH FOTO:
  // 1. Taruh foto kamu di folder: assets/heart-collage/
  // 2. Beri nama file: 1.png, 2.png, 3.png, ... dst
  //    (bisa juga .jpg/.jpeg/.webp, sesuaikan extension di bawah)
  // 3. Ubah angka TOTAL_PHOTOS sesuai jumlah foto kamu
  // ============================================================
  const TOTAL_PHOTOS = 20;          // <-- Ubah sesuai jumlah foto kamu
  const EXTENSION = '.jpg';         // <-- Ubah jika pakai .png / .webp
  const FOLDER = 'assets/heart-collage/';

  // Build image list from folder
  const images = [];
  for (let i = 1; i <= TOTAL_PHOTOS; i++) {
    images.push(FOLDER + i + EXTENSION);
  }

  // Generate heart shape with number of points based on photo count
  // Minimum 30 points for a nice shape, scale up with more photos
  const pointCount = Math.max(30, TOTAL_PHOTOS);
  const points = generateHeartPoints(pointCount);
  const cw = container.offsetWidth || 500;
  const ch = container.offsetHeight || 500;

  points.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'heart-photo';
    const img = document.createElement('img');
    img.src = images[i % images.length];
    img.alt = 'Kenangan ' + ((i % images.length) + 1);
    img.loading = 'lazy';
    div.appendChild(img);

    const tooltip = document.createElement('div');
    tooltip.className = 'photo-tooltip';
    tooltip.textContent = '💕 Kenangan ' + ((i % images.length) + 1);
    div.appendChild(tooltip);

    // Position in heart shape
    const x = (p.x + 1) / 2 * (cw - 60);
    const y = (1 - (p.y + 1) / 2) * (ch - 60);
    div.style.left = x + 'px';
    div.style.top = y + 'px';

    container.appendChild(div);
  });

  // Animate in with scroll trigger
  ScrollTrigger.create({
    trigger: '#heart-collage',
    start: 'top 60%',
    onEnter: () => {
      const photos = container.querySelectorAll('.heart-photo');
      photos.forEach((photo, i) => {
        gsap.to(photo, {
          opacity: 1, scale: 1,
          duration: 0.5,
          delay: i * 0.04,
          ease: 'back.out(1.5)'
        });
      });
    }
  });

  // Section header
  gsap.from('#heart-collage .section-header', {
    scrollTrigger: { trigger: '#heart-collage', start: 'top 75%' },
    opacity: 0, y: 40, duration: 1, ease: 'power3.out'
  });
}

function generateHeartPoints(count) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    points.push({ x: x / 17, y: y / 17 });
  }
  return points;
}

/* ===================== ENDING ANIMATION ===================== */
function initEndingAnimation() {
  gsap.from('.ending-icon', {
    scrollTrigger: { trigger: '#ending', start: 'top 70%' },
    opacity: 0, scale: 0, duration: 1, ease: 'back.out(2)'
  });
  gsap.from('.ending-title', {
    scrollTrigger: { trigger: '#ending', start: 'top 65%' },
    opacity: 0, y: 30, duration: 1.2, delay: 0.3, ease: 'power3.out'
  });
  gsap.from('.ending-message', {
    scrollTrigger: { trigger: '#ending', start: 'top 60%' },
    opacity: 0, y: 30, duration: 1.2, delay: 0.6, ease: 'power3.out'
  });
  gsap.from('.btn-love', {
    scrollTrigger: { trigger: '#ending', start: 'top 55%' },
    opacity: 0, y: 30, duration: 1, delay: 0.9, ease: 'power3.out'
  });
}

/* ===================== LOVE FOREVER BUTTON ===================== */
function handleLoveForever() {
  const btn = document.getElementById('btnLove');
  btn.textContent = '💖 Aku juga mencintaimu selamanya 💖';
  btn.style.pointerEvents = 'none';

  // Burst hearts from button
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.style.cssText = `
      position:fixed; font-size:${Math.random() * 24 + 14}px;
      left:${btn.getBoundingClientRect().left + btn.offsetWidth / 2}px;
      top:${btn.getBoundingClientRect().top}px;
      pointer-events:none; z-index:9999;
    `;
    heart.textContent = ['❤️', '💕', '💖', '💗', '✨'][Math.floor(Math.random() * 5)];
    document.body.appendChild(heart);

    gsap.to(heart, {
      x: (Math.random() - 0.5) * 500,
      y: -(Math.random() * 400 + 100),
      rotation: Math.random() * 720,
      opacity: 0,
      scale: Math.random() + 0.5,
      duration: 2,
      ease: 'power2.out',
      onComplete: () => heart.remove()
    });
  }
}
