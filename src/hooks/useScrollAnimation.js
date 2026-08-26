import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook that initialises Locomotive Scroll, GSAP ScrollTrigger,
 * the main character canvas sequence, and the background canvas sequence.
 *
 * All logic is a direct port of the original script.js.
 */
export default function useScrollAnimation(canvasRef, bgCanvasRef) {
  useEffect(() => {
    const mainEl = document.querySelector('#main');
    const canvas = canvasRef.current;
    const bgCanvas = bgCanvasRef.current;

    if (!mainEl || !canvas || !bgCanvas) return;

    const context = canvas.getContext('2d');
    const bgCtx = bgCanvas.getContext('2d');

    // Store references for cleanup
    let locoScroll = null;
    let rafId = null;

    // Defer initialisation to the next animation frame so the
    // DOM is fully painted and Locomotive Scroll can measure heights.
    rafId = requestAnimationFrame(() => {
      rafId = null;

      // ── LOCOMOTIVE SCROLL ─────────────────────────────────────────
      locoScroll = new LocomotiveScroll({
        el: mainEl,
        smooth: true,
      });

      locoScroll.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy('#main', {
        scrollTop(value) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: mainEl.style.transform ? 'transform' : 'fixed',
      });

      ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

      // ── CANVAS SIZING ─────────────────────────────────────────────
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;

      // ── BACKGROUND CANVAS IMAGE SEQUENCE ──────────────────────────
      const bgFrameCount = 60;
      const bgImages = [];
      const bgSeq = { frame: 0, scale: 1, xOffset: 0, yOffset: 0 };

      function bgFiles(index) {
        return `processed_frames3/${String(index).padStart(4, '0')}.png`;
      }

      let bgLoaded = 0;
      for (let i = 1; i <= bgFrameCount; i++) {
        const img = new Image();

        const onBgDone = () => {
          bgLoaded++;
          if (bgLoaded === bgFrameCount) {
            renderBG();
          }
        };
        img.onload = onBgDone;
        img.onerror = onBgDone;
        img.src = bgFiles(i);

        bgImages.push(img);
      }

      function renderBG() {
        const img = bgImages[Math.round(bgSeq.frame)];
        if (!img || !img.complete) return;

        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

        const ratio = Math.min(
          bgCanvas.width / img.width,
          bgCanvas.height / img.height
        );

        bgCtx.drawImage(
          img,
          (bgCanvas.width - img.width * ratio) / 2,
          (bgCanvas.height - img.height * ratio) / 2,
          img.width * ratio,
          img.height * ratio
        );
      }

      // ── MAIN CANVAS IMAGE SEQUENCE ────────────────────────────────
      const frameCount = 240;
      const images = [];
      const imageSeq = {
        frame: 0,
        scale: 3,
        xOffset: 0,
        yOffset: 690,
      };

      function files(index) {
        // ORIGINAL INTRO
          return `processed_upscaled/frame_${String(index + 1)
            .padStart(6, '0')}.webp`;
      }

      let imagesLoaded = 0;
      let firstFrameRendered = false;
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();

        // Push to array BEFORE setting src to avoid race with cached images
        images.push(img);

        const onDone = () => {
          imagesLoaded++;

          // Render first available frame as soon as it's loaded
          if (!firstFrameRendered) {
            for (let f = 0; f < images.length; f++) {
              if (images[f] && images[f].complete && images[f].naturalWidth > 0) {
                firstFrameRendered = true;
                imageSeq.frame = f;
                render();
                break;
              }
            }
          }

          if (imagesLoaded === frameCount) {
            // Find first valid frame
            let startFrame = 0;
            for (let f = 0; f < images.length; f++) {
              if (images[f] && images[f].complete && images[f].naturalWidth > 0) {
                startFrame = f;
                break;
              }
            }
            imageSeq.frame = startFrame;
            setTimeout(() => {
              render();
              ScrollTrigger.refresh();
            }, 100);
          }
        };

        // Set handlers BEFORE src to catch synchronous cached responses
        img.onload = onDone;
        img.onerror = onDone;
        img.src = files(i);
      }

      function scaleImage(img, ctx) {
        const cvs = ctx.canvas;
        const hRatio = cvs.width / img.width;
        const vRatio = cvs.height / img.height;
        let ratio = Math.min(hRatio, vRatio);

        // apply zoom
        ratio *= imageSeq.scale;

        // GSAP controlled offsets
        const centerShift_x =
          (cvs.width - img.width * ratio) / 2 + imageSeq.xOffset;
        const centerShift_y =
          (cvs.height - img.height * ratio) / 2 + imageSeq.yOffset;

        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      }

      function render() {
        const img = images[Math.round(imageSeq.frame)];
        if (!img) return;
        if (!img.complete) return;
        if (img.naturalWidth === 0) return;
        scaleImage(img, context);
      }

      // ── GSAP TIMELINES ────────────────────────────────────────────
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#page',
          start: 'top top',
          end: '400% top',
          scrub: 2,
          pin: canvas,
          scroller: '#main',
          anticipatePin: 1,
        },
      });

      /* PAGE 0 — INTRO HERO */
      masterTL.to(imageSeq, {
        frame: 90,
        scale: 1.7,
        xOffset: 0,
        yOffset: 250,
        ease: 'none',
        onUpdate: render,
      });

      masterTL.to({}, { duration: 0.25 });

      gsap.to(bgSeq, {
        frame: bgFrameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: '#page1',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
          scroller: '#main',
        },
        onUpdate: renderBG,
      });

      masterTL.to({}, { duration: 0.25 });

      /* PAGE 1 — MOVE RIGHT + ZOOM OUT */
      masterTL.to(imageSeq, {
        frame: 125,
        scale: 1.25,
        xOffset: 350,
        yOffset: 60,
        ease: 'none',
        onUpdate: render,
      });

      /* PAUSE */
      masterTL.to({}, { duration: 0.25 });

      /* PAGE 2 — MOVE LEFT */
      masterTL.to(imageSeq, {
        frame: 190,
        scale: 1.25,
        xOffset: -260,
        yOffset: 60,
        ease: 'none',
        onUpdate: render,
      });

      /* PAUSE */
      masterTL.to({}, { duration: 0.25 });

      /* PAGE 3 — MOVE LEFT AGAIN */
      masterTL.to(imageSeq, {
        frame: 239,
        scale: 1.2,
        xOffset: -340,
        yOffset: 200,
        ease: 'none',
        onUpdate: render,
      });

      // Initial refresh after everything is set up
      ScrollTrigger.refresh();
    });

    // ── RESIZE HANDLER ────────────────────────────────────────────
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // ── CLEANUP ───────────────────────────────────────────────────
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (locoScroll) locoScroll.destroy();
    };
  }, [canvasRef, bgCanvasRef]);
}
