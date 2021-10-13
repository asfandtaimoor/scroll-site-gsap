gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ======== smooth scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector('.scrollContainer'),
  smooth: true,
  multiplier: 3,
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)

locoScroll.on('scroll', ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy('.scrollContainer', {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector('.scrollContainer').style.transform
    ? 'transform'
    : 'fixed',
});
//   ==

let sectionsArr = gsap.utils.toArray('.panel-vertical');
sectionsArr.forEach((element) => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      scroller: '.scrollContainer',
      scrub: 1,
      pin: true,
      start: 'top top',
      end: '+=100%',
    },
  });
  tl.from(element, { autoAlpha: 0, ease: 'power2', duration: 111 });
});
// Horizontal
let panelsContainer = document.querySelector('.panel-vertical-inner'),
  panels = gsap.utils.toArray('.panel-vertical-inner .panel');
gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.panels-horizontal',
    scroller: '.scrollContainer',
    pin: true,
    start: (self) => self.previous().end,
    toggleClass: 'active',
    scrub: 1,
    snap: {
      snapTo: 1 / (panels.length - 1),
      duration: 0.1,
      directional: true,
    },
    end: () => '+=' + (panels.length - 1) * panels[0].offsetWidth,
  },
});

// ==== 2

let sectionsArr2 = gsap.utils.toArray('.panel2-vertical');
sectionsArr2.forEach((element) => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      scroller: '.scrollContainer',
      scrub: 1,
      pin: true,
      start: 'top top',
      end: '+=100%',
    },
  });
  tl.from(element, { autoAlpha: 0, ease: 'power2', duration: 111 });
});
// Horizontal
let panel2sContainer = document.querySelector('.panel2-vertical-inner'),
  panel2s = gsap.utils.toArray('.panel2-vertical-inner .panel2');
gsap.to(panel2s, {
  xPercent: -100 * (panel2s.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.panel2s-horizontal',
    scroller: '.scrollContainer',
    pin: true,
    start: (self) => self.previous().end,
    toggleClass: 'active',
    scrub: 1,
    snap: {
      snapTo: 1 / (panel2s.length - 1),
      duration: 0.1,
      directional: true,
    },
    end: () => '+=' + (panel2s.length - 1) * panel2s[0].offsetWidth,
  },
});

// smooth scroll
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
