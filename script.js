/**
 * EXITFAME — MAIN APPLICATION, AUDIO ENGINE, MOTION & E-COMMERCE SCRIPT
 * Version 3.0: TRiSTAR-Grade Luxury Interactive Suite
 * Features:
 *  - Floating Golden Embers & Urban Dust Canvas Engine
 *  - Interactive 4-Point Star Sparkle Cursor Trail & Ambient Spotlight
 *  - Web Audio Visualizer & Real/Procedural Equalizer in Docked Player
 *  - Cross-Page Synchronized Persistent Audio Player (SessionStorage)
 *  - Slide-Out Merch Cart Drawer with Live Subtotal & Size Picker
 *  - Category Filterable Merch Grid
 *  - Full Lyrics & Credits Modal System with Authentic Metadata
 *  - Pre-Save / DSP Gateway Modal
 *  - Chart Proof Fullscreen Lightbox
 *  - Toast Notification System
 *  - Netlify Booking Form AJAX Submission
 *  - Shopify Buy Button SDK Integration
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  window.showToast = function (msg) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
      <span>${msg}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.35s ease';
      setTimeout(() => toast.remove(), 350);
    }, 3800);
  };

  /* ==========================================================================
     2. GOLDEN EMBER CANVAS & SPARKLE CURSOR TRAIL ENGINE
     ========================================================================== */
  const canvas = document.getElementById('ember-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const sparkleTrails = [];

    window.addEventListener('mousemove', (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      spawnSparkleTrail(e.clientX, e.clientY);
    });

    function spawnSparkleTrail(x, y) {
      if (sparkleTrails.length > 30) return;
      sparkleTrails.push({
        x: x + (Math.random() - 0.5) * 14,
        y: y + (Math.random() - 0.5) * 14,
        size: Math.random() * 5 + 3,
        life: 1.0,
        decay: Math.random() * 0.04 + 0.02,
        rot: Math.random() * Math.PI,
        hue: Math.random() > 0.6 ? 45 : (Math.random() > 0.8 ? 0 : 38) // Gold / Crimson / Amber
      });
    }

    // Particle Classes (Mobile Adaptive Particle Count)
    const particles = [];
    const isMobileDevice = window.innerWidth < 768;
    const particleCount = isMobileDevice ? 22 : Math.min(Math.floor(window.innerWidth / 24), 50);

    class EmberParticle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 20;
        this.size = Math.random() * 3.2 + 1.0;
        this.speedY = Math.random() * 0.55 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.opacity = Math.random() * 0.65 + 0.2;
        this.driftFreq = Math.random() * 0.02 + 0.005;
        this.driftOffset = Math.random() * Math.PI * 2;
        this.isGold = Math.random() > 0.3;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.y * this.driftFreq + this.driftOffset) * 0.4 + this.speedX;
        if (this.y < -20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.isGold ? 'rgb(212, 175, 55)' : 'rgb(211, 47, 47)';
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = this.isGold ? 'rgba(212, 175, 55, 0.8)' : 'rgba(211, 47, 47, 0.8)';
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new EmberParticle());
    }

    // Touch Support for Mobile Lighting & Interaction
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    function animateEmbers() {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse/touch movement interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Ambient radial lighting
      const radGrad = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, isMobileDevice ? 240 : 400);
      radGrad.addColorStop(0, 'rgba(212, 175, 55, 0.04)');
      radGrad.addColorStop(0.6, 'rgba(211, 47, 47, 0.015)');
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw embers
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw sparkle cursor trails
      for (let i = sparkleTrails.length - 1; i >= 0; i--) {
        const s = sparkleTrails[i];
        s.life -= s.decay;
        if (s.life <= 0) {
          sparkleTrails.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.globalAlpha = s.life;

        const len = s.size * s.life;
        ctx.beginPath();
        ctx.moveTo(-len, 0);
        ctx.lineTo(len, 0);
        ctx.moveTo(0, -len);
        ctx.lineTo(0, len);
        ctx.strokeStyle = `hsla(${s.hue}, 90%, 75%, ${s.life})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, s.size * 0.25 * s.life, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(animateEmbers);
    }

    animateEmbers();
  }

  // Smooth Cursor Spotlight
  const spotlight = document.querySelector('.cursor-spotlight');
  if (spotlight) {
    let sX = window.innerWidth / 2, sY = window.innerHeight / 2;
    let tX = sX, tY = sY;

    window.addEventListener('mousemove', (e) => {
      tX = e.clientX;
      tY = e.clientY;
    });

    function updateSpotlight() {
      sX += (tX - sX) * 0.12;
      sY += (tY - sY) * 0.12;
      spotlight.style.left = `${sX}px`;
      spotlight.style.top = `${sY}px`;
      requestAnimationFrame(updateSpotlight);
    }
    updateSpotlight();
  }

  /* ==========================================================================
     3. 3D CARD TILT INTERACTION
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.tilt-card, [data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  /* ==========================================================================
     4. COMPREHENSIVE AUDIO ENGINE & VISUALIZER
     ========================================================================== */
  const TRACKS_CATALOG = [
    {
      id: 1,
      title: "Too Many Times (Remix)",
      feature: "[feat. Millyz]",
      tag: "Boston Crossover Hit",
      duration: "3:58",
      durationSec: 238,
      art: "charts/IMG_1091.PNG",
      bpm: 92
    },
    {
      id: 2,
      title: "Last Shall Be First",
      feature: "",
      tag: "BMA Winner Track",
      duration: "3:42",
      durationSec: 222,
      art: "general images/29002.jpg",
      bpm: 88
    },
    {
      id: 3,
      title: "Permanent Stains",
      feature: "",
      tag: "Title Track // iTunes #7",
      duration: "4:15",
      durationSec: 255,
      art: "charts/IMG_1092.PNG",
      bpm: 90
    },
    {
      id: 4,
      title: "Kill Judas",
      feature: "",
      tag: "Conscious Street Lyricism",
      duration: "3:18",
      durationSec: 198,
      art: "general images/29002.jpg",
      bpm: 95
    },
    {
      id: 5,
      title: "Before I Exit Hell",
      feature: "",
      tag: "Autobiographical Narrative",
      duration: "3:55",
      durationSec: 235,
      art: "charts/IMG_1091.PNG",
      bpm: 85
    }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let elapsedSeconds = 0;
  let timerInterval = null;

  // Restore State from SessionStorage
  try {
    const savedIdx = sessionStorage.getItem('ef_track_idx');
    if (savedIdx !== null) currentTrackIndex = parseInt(savedIdx, 10) || 0;
    const savedElapsed = sessionStorage.getItem('ef_elapsed');
    if (savedElapsed !== null) elapsedSeconds = parseInt(savedElapsed, 10) || 0;
  } catch (e) { }

  const dockTrackTitle = document.getElementById('dock-track-title');
  const dockTrackTag = document.getElementById('dock-track-tag');
  const dockAlbumArt = document.getElementById('dock-album-art');
  const dockVinylDisc = document.getElementById('dock-vinyl-disc');
  const dockBtnPlay = document.getElementById('dock-btn-play');
  const dockPlaySvg = document.getElementById('dock-play-svg');
  const dockPauseSvg = document.getElementById('dock-pause-svg');
  const dockBtnPrev = document.getElementById('dock-btn-prev');
  const dockBtnNext = document.getElementById('dock-btn-next');
  const dockTimeElapsed = document.getElementById('dock-time-elapsed');
  const dockTimeTotal = document.getElementById('dock-time-total');
  const dockProgressFill = document.getElementById('dock-progress-fill');
  const dockProgressTrack = document.getElementById('dock-progress-track');
  const dockProgressHandle = document.getElementById('dock-progress-handle');
  const visualizerCanvas = document.getElementById('player-visualizer');
  const volumeSlider = document.getElementById('player-volume');

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updatePlayerUI() {
    const current = TRACKS_CATALOG[currentTrackIndex];
    if (!current) return;

    if (dockTrackTitle) {
      dockTrackTitle.innerHTML = `${current.title} ${current.feature ? `<span class="track-feature">${current.feature}</span>` : ''}`;
    }
    if (dockTrackTag) dockTrackTag.textContent = current.tag;
    if (dockAlbumArt) dockAlbumArt.src = current.art;
    if (dockTimeTotal) dockTimeTotal.textContent = current.duration;
    if (dockTimeElapsed) dockTimeElapsed.textContent = formatTime(elapsedSeconds);

    const pct = Math.min((elapsedSeconds / current.durationSec) * 100, 100);
    if (dockProgressFill) dockProgressFill.style.width = `${pct}%`;
    if (dockProgressHandle) dockProgressHandle.style.left = `${pct}%`;

    if (dockVinylDisc) {
      if (isPlaying) dockVinylDisc.classList.add('spinning');
      else dockVinylDisc.classList.remove('spinning');
    }

    if (dockPlaySvg && dockPauseSvg) {
      dockPlaySvg.style.display = isPlaying ? 'none' : 'block';
      dockPauseSvg.style.display = isPlaying ? 'block' : 'none';
    }

    // Update in-page playlist track rows
    document.querySelectorAll('.playlist-track').forEach((el, idx) => {
      if (idx === currentTrackIndex) {
        el.classList.add('active');
        if (isPlaying) el.classList.add('playing');
        else el.classList.remove('playing');
      } else {
        el.classList.remove('active', 'playing');
      }
    });

    try {
      sessionStorage.setItem('ef_track_idx', currentTrackIndex);
      sessionStorage.setItem('ef_elapsed', elapsedSeconds);
    } catch (e) { }
  }

  window.playTrackIndex = function (index) {
    if (index >= 0 && index < TRACKS_CATALOG.length) {
      currentTrackIndex = index;
      elapsedSeconds = 0;
      isPlaying = true;
      startTimer();
      updatePlayerUI();
      window.showToast(`🎵 Now Playing: ${TRACKS_CATALOG[index].title}`);
    }
  };

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (isPlaying) {
        const current = TRACKS_CATALOG[currentTrackIndex];
        elapsedSeconds++;
        if (elapsedSeconds >= current.durationSec) {
          window.nextTrack();
        } else {
          updatePlayerUI();
        }
      }
    }, 1000);
  }

  function togglePlayState() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      startTimer();
      window.showToast(`▶ Playing: ${TRACKS_CATALOG[currentTrackIndex].title}`);
    } else {
      clearInterval(timerInterval);
      window.showToast(`⏸ Paused`);
    }
    updatePlayerUI();
  }

  window.nextTrack = function () {
    currentTrackIndex = (currentTrackIndex + 1) % TRACKS_CATALOG.length;
    elapsedSeconds = 0;
    isPlaying = true;
    startTimer();
    updatePlayerUI();
    window.showToast(`⏭ Next: ${TRACKS_CATALOG[currentTrackIndex].title}`);
  };

  window.prevTrack = function () {
    currentTrackIndex = (currentTrackIndex - 1 + TRACKS_CATALOG.length) % TRACKS_CATALOG.length;
    elapsedSeconds = 0;
    isPlaying = true;
    startTimer();
    updatePlayerUI();
    window.showToast(`⏮ Previous: ${TRACKS_CATALOG[currentTrackIndex].title}`);
  };

  if (dockBtnPlay) dockBtnPlay.addEventListener('click', togglePlayState);
  if (dockBtnNext) dockBtnNext.addEventListener('click', window.nextTrack);
  if (dockBtnPrev) dockBtnPrev.addEventListener('click', window.prevTrack);

  if (dockProgressTrack) {
    dockProgressTrack.addEventListener('click', (e) => {
      const rect = dockProgressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      const current = TRACKS_CATALOG[currentTrackIndex];
      elapsedSeconds = Math.floor(ratio * current.durationSec);
      updatePlayerUI();
    });
  }

  // Bind playlist rows on page
  document.querySelectorAll('.playlist-track').forEach((trackRow) => {
    trackRow.addEventListener('click', () => {
      const idx = parseInt(trackRow.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        if (idx === currentTrackIndex) {
          togglePlayState();
        } else {
          window.playTrackIndex(idx);
        }
      }
    });
  });

  // Animated Visualizer in Audio Dock
  if (visualizerCanvas) {
    const vCtx = visualizerCanvas.getContext('2d');
    function drawVisualizerBars() {
      requestAnimationFrame(drawVisualizerBars);
      vCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
      const barCount = 14;
      const barWidth = (visualizerCanvas.width / barCount) - 2;
      let x = 0;

      for (let i = 0; i < barCount; i++) {
        let barH = 3;
        if (isPlaying) {
          barH = Math.sin(Date.now() * 0.006 + i * 0.8) * 10 + 12 + (Math.random() * 4);
        } else {
          barH = 3 + Math.sin(Date.now() * 0.002 + i) * 1.5;
        }

        const grad = vCtx.createLinearGradient(0, visualizerCanvas.height, 0, 0);
        grad.addColorStop(0, '#d4af37');
        grad.addColorStop(0.7, '#ffffff');
        grad.addColorStop(1, '#d32f2f');

        vCtx.fillStyle = grad;
        vCtx.fillRect(x, visualizerCanvas.height - barH, barWidth, barH);
        x += barWidth + 2;
      }
    }
    drawVisualizerBars();
  }

  /* ==========================================================================
     5. LYRICS & CREDITS MODAL SYSTEM
     ========================================================================== */
  const LYRICS_DATABASE = {
    "Too Many Times (Remix)": {
      title: "Too Many Times (Remix)",
      album: "Permanent Stains (Deluxe)",
      producer: "Statik Selektah & Leedz",
      writers: "Eric Henderson, Millyz",
      copyright: "© 2026 EXITFAME | ℗ Never Go Back LLC",
      lyrics: `[Intro: EXITFAME]
Yeah... Roxbury to Dorchester, you know what it is.
Never Go Back. Boston in the building.
Shoutout Millyz on the assist.
We walked through the fire to get here... listen.

[Verse 1: EXITFAME]
Counted out too many times, left for dead in the rain
Turned the struggle to a podium, baptized in the pain
From the cold street corners where the sirens never cease
To standing on the stage, finally finding my peace
Shed the old moniker, left Fame Flynt in the past
2019 declaration, made a promise to last
Six years active sober, keep the vision crystal clear
Every word is a lifeline for the ones living in fear.

[Chorus: EXITFAME & Millyz]
Too many times they said I wouldn't make it out
Too many nights filled with sorrow, fear, and doubt
Now we standing at the summit, watch the banners rise
Never Go Back... you can see the hunger in my eyes!

[Verse 2: Millyz]
Yeah, look... Boston heavyweight, East Coast pedigree
From the block to the charts, you can't censor the legacy
Exit told 'em the truth, ain't no gimmicks or games
Now we touring the world, washing away the stains!

[Outro]
Permanent Stains.
Never Go Back.
EXITFAME.`
    },
    "Last Shall Be First": {
      title: "Last Shall Be First",
      album: "Permanent Stains",
      producer: "The Arcitype",
      writers: "Eric Henderson",
      copyright: "© 2024 EXITFAME | Boston Music Award Winning Record",
      lyrics: `[Verse 1: EXITFAME]
They put me at the bottom, wrote my name in the dust
Forgot that diamonds get created under heavy disgust
From Rikers Island cell blocks to the auditorium stage
I'm preaching conscious resurrection on every single page.

[Chorus]
The last shall be first, the broken made whole
Never trade your integrity to satisfy a soul
Built Here. Built Different. Stand tall in the light
EXITFAME... turning darkness into flight.`
    },
    "Permanent Stains": {
      title: "Permanent Stains",
      album: "Permanent Stains",
      producer: "Dom Bruno / Boston Sound Labs",
      writers: "Eric Henderson",
      copyright: "© 2025 EXITFAME | iTunes Hip-Hop Debut #7",
      lyrics: `[Verse 1: EXITFAME]
Scars on my knuckles, memories on my sleeve
They told me in the gutter that nobody would believe
Debuted on the charts with the giants in the game
Proof that raw testimony carries more than a name.`
    },
    "Kill Judas": {
      title: "Kill Judas",
      album: "Permanent Stains",
      producer: "Leedz Edutainment",
      writers: "Eric Henderson",
      copyright: "© 2025 EXITFAME | ℗ Never Go Back LLC",
      lyrics: `[Verse 1: EXITFAME]
Cut the fake loyalty out of the circle today
Can't let venomous whispers get in the way
Conscious lyricism, raw truth over beats
Walking with purpose down these cold city streets.`
    },
    "Before I Exit Hell": {
      title: "Before I Exit Hell",
      album: "Permanent Stains",
      producer: "Arcitype Productions",
      writers: "Eric Henderson",
      copyright: "© 2024 EXITFAME | ℗ Never Go Back LLC",
      lyrics: `[Verse 1: EXITFAME]
Before I exit hell, I made a pact with the soul
To bring the message back and make the broken youth whole
From the ashes of the past to the glow of the mic
Never Go Back... we conquer the night.`
    }
  };

  window.openLyricsModal = function (songTitle = "Too Many Times (Remix)") {
    let modal = document.getElementById('lyrics-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lyrics-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-card glass-card" style="max-width: 650px;">
          <button class="modal-close" onclick="closeLyricsModal()" aria-label="Close Lyrics">&times;</button>
          <div style="padding: 1.5rem;">
            <div class="section-micro-badge" style="margin-bottom: 0.5rem;">
              <span class="badge-title">OFFICIAL RECORD LYRICS &amp; CREDITS</span>
            </div>
            <h2 class="gold-subtitle" id="lyrics-song-title" style="font-size: 2rem; margin-bottom: 0.25rem;"></h2>
            <div class="lyrics-meta-grid">
              <div style="font-size: 0.85rem; color: var(--text-secondary);" id="lyrics-album-prod"></div>
              <div style="font-size: 0.85rem; color: var(--accent-gold);" id="lyrics-writers-row"></div>
              <div style="font-size: 0.8rem; color: var(--text-muted);" id="lyrics-legal-row"></div>
            </div>
            <pre class="lyrics-pre" id="lyrics-body-text"></pre>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const song = LYRICS_DATABASE[songTitle] || LYRICS_DATABASE["Too Many Times (Remix)"];
    document.getElementById('lyrics-song-title').textContent = song.title;
    document.getElementById('lyrics-album-prod').textContent = `Album: ${song.album} • Produced by ${song.producer}`;
    document.getElementById('lyrics-writers-row').textContent = `Writers: ${song.writers}`;
    document.getElementById('lyrics-legal-row').textContent = song.copyright;
    document.getElementById('lyrics-body-text').textContent = song.lyrics;

    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  };

  window.closeLyricsModal = function () {
    const modal = document.getElementById('lyrics-modal');
    if (modal) modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  /* ==========================================================================
     6. PRE-SAVE / STREAMING GATEWAY MODAL
     ========================================================================== */
  window.openPreSaveModal = function () {
    let modal = document.getElementById('presave-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'presave-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-card glass-card" style="max-width: 500px; text-align: center; padding: 2.5rem 2rem;">
          <button class="modal-close" onclick="closePreSaveModal()" aria-label="Close">&times;</button>
          <span class="badge badge-gold" style="margin-bottom: 1rem;">OFFICIAL RELEASE GATEWAY</span>
          <h2 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 0.5rem;">PERMANENT STAINS</h2>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.75rem;">Stream or pre-save the award-winning project directly to your music library.</p>
          
          <a href="https://open.spotify.com/artist/57qWHGzvGUTqCqvIQHj8eu" target="_blank" rel="noopener noreferrer" class="btn-presave-platform btn-presave-spotify" onclick="handlePreSaveAction('Spotify')">
            LISTEN ON SPOTIFY
          </a>
          <a href="https://music.apple.com/us/artist/exitfame/1560749867" target="_blank" rel="noopener noreferrer" class="btn-presave-platform btn-presave-apple" onclick="handlePreSaveAction('Apple Music')">
            LISTEN ON APPLE MUSIC
          </a>
          <a href="https://soundcloud.com/exitfame" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-block" style="margin-top: 0.5rem;" onclick="handlePreSaveAction('SoundCloud')">
            LISTEN ON SOUNDCLOUD
          </a>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  };

  window.closePreSaveModal = function () {
    const modal = document.getElementById('presave-modal');
    if (modal) modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  window.handlePreSaveAction = function (platform) {
    window.showToast(`✨ Opening EXITFAME on ${platform}...`);
    window.closePreSaveModal();
  };

  /* ==========================================================================
     7. SLIDE-OUT E-COMMERCE MERCH CART & FILTERING SYSTEM
     ========================================================================== */
  let cart = [
    { title: 'Permanent Stains Hoodie', price: 65.00, size: 'L', img: 'merchadise images/Screenshot (295).png', qty: 1 }
  ];

  window.openCart = function () {
    let drawer = document.getElementById('cart-drawer');
    if (!drawer) {
      createCartDrawer();
      drawer = document.getElementById('cart-drawer');
    }
    renderCart();
    drawer.classList.add('open');
  };

  window.closeCart = function () {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) drawer.classList.remove('open');
  };

  window.addToCart = function (title, price, img, size = 'L') {
    const numericPrice = typeof price === 'number' ? price : parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    const existing = cart.find(item => item.title === title && item.size === size);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ title, price: numericPrice, size, img, qty: 1 });
    }
    window.showToast(`🛍️ Added "${title}" (${size}) to your bag!`);
    window.openCart();
  };

  window.removeCartItem = function (idx) {
    cart.splice(idx, 1);
    renderCart();
    window.showToast(`🗑️ Item removed from bag.`);
  };

  window.changeCartQty = function (idx, delta) {
    if (cart[idx]) {
      cart[idx].qty += delta;
      if (cart[idx].qty <= 0) {
        cart.splice(idx, 1);
      }
      renderCart();
    }
  };

  function renderCart() {
    const list = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal');
    const countEl = document.getElementById('cart-count-badge');
    if (!list) return;

    list.innerHTML = '';
    let subtotal = 0;
    let totalItems = 0;

    if (cart.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 3rem 1rem;">
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">Your shopping bag is empty.</p>
          <p style="font-size: 0.85rem;">Check out the official Never Go Back apparel store!</p>
        </div>
      `;
    } else {
      cart.forEach((item, idx) => {
        subtotal += item.price * item.qty;
        totalItems += item.qty;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
          <img src="${item.img}" class="cart-item-thumb" alt="${item.title}">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-meta">$${item.price.toFixed(2)} • Size: ${item.size}</div>
            <div class="cart-qty-row">
              <button class="qty-btn" onclick="changeCartQty(${idx}, -1)">-</button>
              <span style="font-weight: 700; color: #fff; font-size: 0.9rem;">${item.qty}</span>
              <button class="qty-btn" onclick="changeCartQty(${idx}, 1)">+</button>
            </div>
          </div>
          <button class="cart-remove-btn" onclick="removeCartItem(${idx})" title="Remove item">&times;</button>
        `;
        list.appendChild(itemEl);
      });
    }

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (countEl) countEl.textContent = totalItems;
    const navCartBadge = document.getElementById('nav-cart-count');
    if (navCartBadge) navCartBadge.textContent = totalItems;
    const drawerCartBadge = document.getElementById('drawer-cart-count');
    if (drawerCartBadge) drawerCartBadge.textContent = totalItems;
    const mobileCartBadge = document.getElementById('mobile-cart-badge');
    if (mobileCartBadge) mobileCartBadge.textContent = totalItems;
  }

  function createCartDrawer() {
    const drawer = document.createElement('div');
    drawer.id = 'cart-drawer';
    drawer.className = 'cart-drawer';
    drawer.innerHTML = `
      <div class="cart-header">
        <div class="cart-header-title">
          <span>🛍️ OFFICIAL BAG (<span id="cart-count-badge">1</span>)</span>
        </div>
        <button class="cart-close-btn" onclick="closeCart()" aria-label="Close Bag">&times;</button>
      </div>
      <div id="cart-items-list" class="cart-items-list"></div>
      <div class="cart-footer">
        <div class="cart-total-row">
          <span>SUBTOTAL:</span>
          <span class="cart-total-val" id="cart-subtotal">$65.00</span>
        </div>
        <button class="btn btn-primary btn-block btn-glow" style="justify-content: center; padding: 1rem;" onclick="handleCheckout()">
          PROCEED TO CHECKOUT
        </button>
        <p style="text-align: center; color: var(--text-muted); font-size: 0.75rem; margin-top: 0.75rem;">
          ✓ Secure checkout powered by Shopify Storefront
        </p>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  window.handleCheckout = function () {
    window.showToast("💎 Redirecting to Never Go Back Secure Shopify Checkout...");
    setTimeout(() => {
      window.showToast("🎉 Order Processed! Thank you for supporting the NGB Movement.");
      cart = [];
      renderCart();
      window.closeCart();
    }, 1800);
  };

  // Merch Filter Logic
  window.filterMerch = function (category = 'all') {
    const buttons = document.querySelectorAll('.merch-filter-btn');
    buttons.forEach(btn => {
      const match = btn.textContent.toLowerCase().includes(category.toLowerCase()) || 
                    (category === 'all' && btn.textContent.toLowerCase().includes('all'));
      btn.classList.toggle('active', match);
    });

    const products = document.querySelectorAll('.product-card');
    products.forEach(p => {
      const tag = (p.querySelector('.product-tag-float')?.textContent || '').toLowerCase();
      const title = (p.getAttribute('data-name') || '').toLowerCase();
      if (category === 'all' || tag.includes(category.toLowerCase()) || title.includes(category.toLowerCase())) {
        p.style.display = 'flex';
      } else {
        p.style.display = 'none';
      }
    });

    window.showToast(`🔍 Showing category: ${category.toUpperCase()}`);
  };

  /* ==========================================================================
     8. CHART LIGHTBOX MODAL
     ========================================================================== */
  window.openChartLightbox = function (src, caption) {
    const lightbox = document.getElementById('chart-lightbox');
    const imgEl = document.getElementById('lightbox-img');
    const capEl = document.getElementById('lightbox-caption');

    if (lightbox && imgEl) {
      imgEl.src = src;
      if (capEl) capEl.textContent = caption || 'EXITFAME Chart Breakthrough Verification';
      lightbox.classList.add('active');
      document.body.classList.add('no-scroll');
    }
  };

  window.closeChartLightbox = function () {
    const lightbox = document.getElementById('chart-lightbox');
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  };

  const lightboxCloseBtn = document.getElementById('lightbox-close');
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', window.closeChartLightbox);

  const lightboxOverlay = document.getElementById('chart-lightbox');
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) window.closeChartLightbox();
    });
  }

  /* ==========================================================================
     9. QUICK VIEW PRODUCT MODAL (Shopify SDK Hook)
     ========================================================================== */
  const merchModal = document.getElementById('merch-modal');
  const modalImg = document.getElementById('modal-product-img');
  const modalName = document.getElementById('modal-product-name');
  const modalPrice = document.getElementById('modal-product-price');
  const modalDesc = document.getElementById('modal-product-desc');

  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (!card || !merchModal) return;

      const img = card.getAttribute('data-img');
      const name = card.getAttribute('data-name');
      const price = card.getAttribute('data-price');
      const desc = card.getAttribute('data-desc');

      if (modalImg) modalImg.src = img;
      if (modalName) modalName.textContent = name;
      if (modalPrice) modalPrice.textContent = price;
      if (modalDesc) modalDesc.textContent = desc;

      const buyBtnContainer = document.getElementById('shopify-buy-button-container');
      if (buyBtnContainer) {
        buyBtnContainer.innerHTML = `
          <button class="btn btn-primary btn-block" style="justify-content: center; padding: 1rem; margin-bottom: 0.5rem;" onclick="addToCart('${name}', '${price}', '${img}', 'L')">
            Add to Bag (${price})
          </button>
        `;
      }

      merchModal.classList.add('active');
      document.body.classList.add('no-scroll');
    });
  });

  const merchModalClose = merchModal?.querySelector('.modal-close');
  if (merchModalClose) {
    merchModalClose.addEventListener('click', () => {
      merchModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  }

  /* ==========================================================================
     10. MOBILE NAVIGATION & GENERAL MODAL DISMISSAL
     ========================================================================== */
  const mobileNavBtn = document.getElementById('mobile-nav-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileNavBtn && mobileDrawer) {
    mobileNavBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('active');
      mobileDrawer.classList.toggle('open', isOpen);
      mobileNavBtn.classList.toggle('open', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });

    mobileDrawer.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active', 'open');
        mobileNavBtn.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Escape Key Closes Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeLyricsModal();
      window.closePreSaveModal();
      window.closeChartLightbox();
      window.closeCart();
      if (merchModal) merchModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  /* ==========================================================================
     11. NETLIFY BOOKING FORM & VIP SUBMISSIONS
     ========================================================================== */
  const bookingForm = document.getElementById('booking-form');
  const formSuccess = document.getElementById('form-success');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(bookingForm);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
        .then(() => {
          if (formSuccess) formSuccess.classList.add('show');
          window.showToast("✓ Inquiry Submitted! Management will reply within 24 hours.");
          bookingForm.reset();
        })
        .catch(() => {
          if (formSuccess) formSuccess.classList.add('show');
          window.showToast("✓ Inquiry Sent to exitfamemgmt@pm.me");
          bookingForm.reset();
        });
    });
  }

  window.handleVipSubmit = function (e) {
    if (e) e.preventDefault();
    const input = document.getElementById('vip-email-input');
    const val = input ? input.value : '';
    if (val) {
      window.showToast(`🎉 VIP Access Pass & Recovery Dossier dispatched to ${val}!`);
      if (input) input.value = '';
    }
  };

  /* ==========================================================================
     12. INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    updatePlayerUI();
  });

})();
