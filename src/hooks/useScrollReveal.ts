import { useEffect } from 'react';

/** Activa las entradas de secciones marcadas sin acoplar la animación a cada página. */
export const useScrollReveal = () => {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canObserve = !reducedMotion && 'IntersectionObserver' in window;
    const observer = canObserve ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    ) : null;

    const register = (section: HTMLElement) => {
      if (section.dataset.revealRegistered) return;
      section.dataset.revealRegistered = 'true';
      if (observer) observer.observe(section);
      else section.classList.add('is-revealed');
    };

    const scan = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(register);
    };

    scan();
    const mutations = new MutationObserver((changes) => {
      changes.forEach((change) => {
        change.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches('[data-reveal]')) register(node);
          scan(node);
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer?.disconnect();
    };
  }, []);
};
