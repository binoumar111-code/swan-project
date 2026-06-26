(function(){
  const $ = id => document.getElementById(id);
  const GATE_CODE = '29-06';
  const VALID_NAMES = ['swan', 'ola'];

  /* ---------- gate balloons ---------- */
  const gateBalloons = $('gateBalloons');
  ['c1','c2','c3'].forEach((c) => {
    for(let j = 0; j < 3; j++){
      const b = document.createElement('div');
      b.className = 'gate-balloon ' + c;
      b.style.left = (Math.random()*90)+'%';
      b.style.animationDuration = (14 + Math.random()*12)+'s';
      b.style.animationDelay = (Math.random()*10)+'s';
      b.style.transform = `scale(${0.7 + Math.random()*0.6})`;
      gateBalloons.appendChild(b);
    }
  });

  /* ---------- gate input auto-format ---------- */
  $('gateInput').addEventListener('input', () => {
    let v = $('gateInput').value.replace(/[^\d]/g,'');
    if(v.length > 2) v = v.slice(0,2) + '-' + v.slice(2,4);
    $('gateInput').value = v;
    $('gateError').classList.remove('show');
  });

  /* ---------- day counter ---------- */
  const RELATIONSHIP_START = new Date('2025-05-16T00:00:00');
  function getDaysTogether(){
    const s = new Date(RELATIONSHIP_START.getFullYear(), RELATIONSHIP_START.getMonth(), RELATIONSHIP_START.getDate());
    const n = new Date(); const nd = new Date(n.getFullYear(), n.getMonth(), n.getDate());
    return Math.floor((nd - s) / 86400000);
  }
  const liveDays = getDaysTogether();
  ['dayCounter','dayCounterTimeline'].forEach(id => {
    const el = $(id); if(el) el.textContent = liveDays;
  });

  function pad(v){ return String(v).padStart(2,'0'); }
  function updateBirthdayCountdown(){
    const now = new Date();
    let target = new Date(now.getFullYear(), 5, 29, 0, 0, 0);
    if(now >= target) target = new Date(now.getFullYear() + 1, 5, 29, 0, 0, 0);
    const diff = target - now;
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);
    const el = $('hubCountdown');
    if(el) el.textContent = `${pad(days)}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
  }
  updateBirthdayCountdown();
  setInterval(updateBirthdayCountdown, 1000);

  /* ---------- hub stars ---------- */
  function createHubStars(){
    const container = $('hubStars');
    if(!container) return;
    for(let i = 0; i < 16; i++){
      const star = document.createElement('span');
      star.style.left = `${Math.random()*100}%`;
      star.style.top  = `${-10 - Math.random()*20}%`;
      star.style.animationDuration = `${4 + Math.random()*4}s`;
      star.style.animationDelay    = `${Math.random()*4}s`;
      star.style.opacity = '0';
      container.appendChild(star);
    }
  }
  createHubStars();

  /* ---------- ambient balloons ---------- */
  const field = $('balloonField');
  for(let i = 0; i < 10; i++){
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left = (Math.random()*94)+'%';
    b.style.animationDuration = (16 + Math.random()*14)+'s';
    b.style.animationDelay    = (Math.random()*14)+'s';
    b.style.transform = `scale(${0.7 + Math.random()*0.6})`;
    field.appendChild(b);
  }

  /* ---------- screen manager ---------- */
  function showScreen(id){
    document.querySelectorAll('.screen').forEach(s => {
      s.style.display = 'none';
      s.classList.remove('visible');
    });
    const el = $(id);
    if(!el) return;
    el.style.display = 'flex';
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
  }

  /* ---------- gate ---------- */
  $('gateForm').addEventListener('submit', e => {
    e.preventDefault();
    if($('gateInput').value.trim() === GATE_CODE){
      document.body.classList.remove('locked');
      $('gate').classList.add('hidden');
      setTimeout(() => showScreen('consent'), 500);
    } else {
      $('gateError').classList.add('show','shake');
      setTimeout(() => $('gateError').classList.remove('shake'), 400);
    }
  });

  /* ---------- consent ---------- */
  $('consentYes').addEventListener('click', () => { showScreen('hub'); startMusic(); });
  $('consentNo').addEventListener('click', () => {
    $('consentText').innerHTML = "That's okay — it'll be here whenever you're ready. 🤍";
    $('consentBtns').innerHTML = '<button class="consent-yes" id="consentReady">I\'m ready 🌹</button>';
    $('consentReady').addEventListener('click', () => { showScreen('hub'); startMusic(); });
  });

  /* ---------- overlay system ---------- */
  function openOverlay(id){
    const ov = $(id); if(!ov) return;
    const hub = $('hub');
    hub.style.opacity = '0'; hub.style.pointerEvents = 'none';
    ov.classList.add('active');
    const scroll = ov.querySelector('.ov-scroll');
    if(scroll) scroll.scrollTop = 0;
    if(id === 'ov-license'){
      $('bgWash').classList.add('phaseB');
      document.querySelector('.frame').style.borderColor = 'rgba(91,122,157,0.25)';
    }
    setTimeout(() => {
      ov.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      ov.querySelectorAll('.tl-item').forEach(el => el.classList.add('in'));
    }, 350);
  }

  function closeOverlay(ov){
    ov.classList.remove('active');
    if(ov.id === 'ov-license'){
      $('bgWash').classList.remove('phaseB');
      document.querySelector('.frame').style.borderColor = '';
    }
    setTimeout(() => {
      const hub = $('hub');
      hub.style.opacity = ''; hub.style.pointerEvents = '';
    }, 300);
  }

  document.querySelectorAll('.hub-card[data-open]').forEach(btn => {
    btn.addEventListener('click', () => openOverlay(btn.dataset.open));
  });
  document.querySelectorAll('.ov-back').forEach(btn => {
    btn.addEventListener('click', () => {
      const ov = btn.closest('.section-overlay');
      if(ov) closeOverlay(ov);
    });
  });

  /* ---------- gallery lightbox ---------- */
  const lightbox = $('lightbox');
  const lightboxImg = $('lightboxImg');
  const lightboxCaption = $('lightboxCaption');
  const lightboxClose = $('lightboxClose');

  function openLightbox(src, caption, alt){
    if(!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || caption || '';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('visible');
    lightbox.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){
    if(!lightbox) return;
    lightbox.classList.remove('visible');
    lightbox.setAttribute('aria-hidden','true');
  }
  document.querySelectorAll('.gallery-thumb').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.dataset.fullSrc || img.src, img.dataset.caption, img.alt));
  });
  if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if(lightbox) lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' && lightbox && lightbox.classList.contains('visible')) closeLightbox();
  });

  /* ---------- mystery cards ---------- */
  document.querySelectorAll('.mystery-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });

  /* ---------- 3D card tilt ---------- */
  const MAX_TILT = 13;
  document.querySelectorAll('.hub-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease';
    });
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  * 0.5)) / (r.width  * 0.5);
      const dy = (e.clientY - (r.top  + r.height * 0.5)) / (r.height * 0.5);
      const rx = -dy * MAX_TILT;
      const ry =  dx * MAX_TILT;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.045,1.045,1.045)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = [
        'transform 0.65s cubic-bezier(0.23,1,0.32,1)',
        'border-color 0.35s ease',
        'box-shadow 0.35s ease',
        'background 0.35s ease'
      ].join(',');
      card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
  });

  /* ---------- confetti ---------- */
  function launchConfetti(){
    const colors = ['#e8b923','#f0cc5c','#fff7d6','#c9690e','#faf6ea','#8a6f1f'];
    const overlay = $('confettiOverlay');
    for(let i = 0; i < 90; i++){
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      const size = 4 + Math.random() * 9;
      const isCircle = Math.random() > 0.5;
      p.style.cssText = [
        `left:${Math.random()*100}vw`,
        `width:${size}px`,
        `height:${size * (isCircle ? 1 : 0.4 + Math.random()*0.8)}px`,
        `background:${colors[Math.floor(Math.random()*colors.length)]}`,
        `animation-delay:${Math.random()*1.2}s`,
        `animation-duration:${1.4 + Math.random()*1.8}s`,
        `border-radius:${isCircle ? '50%' : '2px'}`,
        `opacity:1`
      ].join(';');
      overlay.appendChild(p);
    }
    setTimeout(() => {
      overlay.querySelectorAll('.confetti-piece').forEach(p => p.remove());
    }, 5000);
  }

  /* ---------- candle blow ---------- */
  $('blowBtn').addEventListener('click', () => {
    if($('blowBtn').disabled) return;
    document.querySelectorAll('.flame').forEach(f => f.classList.add('out'));
    $('blowBtn').disabled = true;
    $('blowBtn').textContent = '🌙 Blown out — I hope it comes true';

    const dimEl = $('confettiOverlay');
    dimEl.style.background = 'rgba(0,0,0,0)';
    dimEl.style.transition  = 'background 0.8s ease';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      dimEl.style.background = 'rgba(0,0,0,0.7)';
    }));

    setTimeout(() => {
      dimEl.style.background = 'rgba(0,0,0,0)';
      launchConfetti();
      const msg = $('birthdayMsgOverlay');
      msg.classList.add('show');
      setTimeout(() => msg.classList.remove('show'), 4500);
    }, 1000);

    setTimeout(() => $('wishWrap').classList.add('show'), 1800);
  });

  $('wishSave').addEventListener('click', () => $('wishSavedMsg').classList.add('show'));

  /* ---------- rose garden ---------- */
  let roseCount = 0;
  const roseBtn = $('roseBtn');
  const roseField = $('roseField');
  const roseCountEl = $('roseCount');
  const roseSecret = $('roseSecret');

  if(roseBtn){
    roseBtn.addEventListener('click', () => {
      roseCount++;
      if(roseCountEl) roseCountEl.textContent = roseCount === 1 ? '1 rose' : `${roseCount} roses`;
      if(roseField){
        const r = document.createElement('span');
        r.className = 'rose-pop';
        r.textContent = '🌹';
        r.style.left = (8 + Math.random()*76)+'%';
        r.style.top  = (5 + Math.random()*75)+'%';
        roseField.appendChild(r);
      }
      if(roseCount >= 10 && roseSecret) roseSecret.classList.add('show');
    });
  }

  /* ---------- gold dust particles ---------- */
  (function createGoldDust(){
    const c = document.createElement('div');
    c.id = 'goldDust';
    document.body.appendChild(c);
    for(let i = 0; i < 28; i++){
      const p = document.createElement('div');
      p.className = 'dust-particle';
      const size = 1 + Math.random() * 3;
      p.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `left:${Math.random()*100}%`,
        `animation-duration:${14 + Math.random()*22}s`,
        `animation-delay:${Math.random()*20}s`
      ].join(';');
      c.appendChild(p);
    }
  })();

  /* ---------- voice message ---------- */
  const voiceBtn = $('voiceBtn');
  if(voiceBtn){
    let voiceAudio = null;
    let voicePlaying = false;
    voiceBtn.addEventListener('click', () => {
      if(!voiceAudio) voiceAudio = new Audio('voice.mp3');
      if(!voicePlaying){
        voiceAudio.play().catch(() => {
          const orig = voiceBtn.textContent;
          voiceBtn.textContent = '🎙️ Coming soon...';
          setTimeout(() => { voiceBtn.textContent = orig; }, 2200);
        });
        voicePlaying = true;
        voiceAudio.onended = () => { voicePlaying = false; };
      } else {
        voiceAudio.pause();
        voiceAudio.currentTime = 0;
        voicePlaying = false;
      }
    });
  }

  /* ---------- name gate (letter) ---------- */
  const letterText = `Happy birthday, sweetheart 🤍

Out of everything that happened this year, you were the most beautiful part of it.

Thank you for every laugh, every conversation, every beautiful memory we made together.

I wish you a new year full of joy, success, and everything you've ever dreamed of — from better to even better, from one achievement to the next.

I hope we get to make more memories, take more photos, and live days even more beautiful than the ones we've already had.

I love you so much. May God keep you in my life and write only good things for us.

Happy birthday to the most beautiful gift this year brought me ❤`;

  function unlockLetter(){
    const val = $('nameInput').value.trim().toLowerCase();
    if(VALID_NAMES.includes(val)){
      $('letterGate').style.display = 'none';
      const content = $('letterContent');
      content.style.display = 'block';
      setTimeout(() => {
        content.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
        startTypewriter();
      }, 150);
    } else {
      $('nameError').classList.add('show');
      setTimeout(() => $('nameError').classList.remove('show'), 2500);
    }
  }
  $('nameSubmit').addEventListener('click', unlockLetter);
  $('nameInput').addEventListener('keydown', e => { if(e.key === 'Enter') unlockLetter(); });

  /* ---------- typewriter ---------- */
  let typed = false;
  function startTypewriter(){
    if(typed) return; typed = true;
    const body = $('letterBody');
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    let i = 0;
    (function type(){
      if(i <= letterText.length){
        body.textContent = letterText.slice(0, i);
        body.appendChild(cursor);
        i++;
        setTimeout(type, 26);
      }
    })();
  }

  /* ---------- background music ---------- */
  const bgMusic = $('bgMusic');
  const soundBtn = $('soundBtn');

  function setMusicPlaying(playing){
    if(!soundBtn) return;
    soundBtn.classList.remove('music-invite');
    soundBtn.style.color = playing ? 'var(--gold)' : 'rgba(250,246,234,0.4)';
  }

  function startMusic(){
    if(!bgMusic) return;
    bgMusic.volume = 0.4;
    bgMusic.play().then(() => {
      setMusicPlaying(true);
    }).catch(() => {
      /* autoplay blocked — pulse the button to invite her to tap */
      if(soundBtn) soundBtn.classList.add('music-invite');
    });
  }

  if(bgMusic){
    bgMusic.addEventListener('error', () => {
      if(soundBtn) soundBtn.title = 'Music unavailable';
    });
  }

  if(soundBtn){
    soundBtn.addEventListener('click', () => {
      if(!bgMusic) return;
      if(bgMusic.paused){
        bgMusic.play().then(() => setMusicPlaying(true)).catch(() => {});
      } else {
        bgMusic.pause();
        setMusicPlaying(false);
      }
    });
  }

})();
