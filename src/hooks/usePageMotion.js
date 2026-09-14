import { useEffect } from 'react';

const revealSelector = [
  '.impact-grid > div',
  '.about-grid > div',
  '.section-heading',
  '.objectives-grid > article',
  '.knowledge-articles > article',
  '.agenda-preview',
  '.team-grid > article',
  '.results-toolbar',
  '.events-tabs',
  '.research-article',
  '.event-entry',
  '.empty-state',
  '.service-entry',
  '.service-contact',
  '.partners-inner',
  '.footer-invitation',
  '.footer-grid > div',
  '.footer-grid > nav',
].join(',');

export default function usePageMotion(rootRef, pathname) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stop = () => {};

    function start() {
      stop();
      if (preference.matches) return;

      const seen = new WeakSet();
      const animations = new Map();
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer.unobserve(target);
          // Keep focused content and anchor destinations immediately readable.
          if (target.matches(':focus-within') || target.closest(':target, section:focus, footer:focus')) return;

          const siblings = [...target.parentElement.children].filter((node) => node.matches(revealSelector));
          const animation = target.animate([
            { opacity: 0, transform: 'translateY(22px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], {
            duration: 650,
            delay: Math.min(siblings.indexOf(target), 3) * 70,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'backwards',
          });
          animations.set(target, animation);
          animation.onfinish = animation.oncancel = () => {
            if (animations.get(target) === animation) animations.delete(target);
          };
        });
      }, { rootMargin: '0px 0px 40px 0px', threshold: 0 });

      function observeContent() {
        root.querySelectorAll(revealSelector).forEach((node) => {
          if (seen.has(node)) return;
          seen.add(node);
          observer.observe(node);
        });
      }

      // Include cards inserted by article filters and event tabs.
      const mutations = new MutationObserver((records) => {
        records.forEach(({ removedNodes }) => removedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          [node, ...node.querySelectorAll(revealSelector)].forEach((element) => {
            observer.unobserve(element);
            animations.get(element)?.cancel();
            seen.delete(element);
          });
        }));
        observeContent();
      });

      function revealFocusedContent(event) {
        animations.forEach((animation, node) => {
          if (node.contains(event.target)) animation.cancel();
        });
      }

      observeContent();
      mutations.observe(root, { childList: true, subtree: true });
      root.addEventListener('focusin', revealFocusedContent);
      stop = () => {
        observer.disconnect();
        mutations.disconnect();
        root.removeEventListener('focusin', revealFocusedContent);
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      };
    }

    start();
    preference.addEventListener('change', start);
    return () => {
      stop();
      preference.removeEventListener('change', start);
    };
  }, [rootRef, pathname]);
}
