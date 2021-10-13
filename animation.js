gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let sectionsArr = gsap.utils.toArray('.panel-vertical');
sectionsArr.forEach((element) => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
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
