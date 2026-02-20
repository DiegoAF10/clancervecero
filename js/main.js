/**
 * Clan Cervecero — Main JS v1.0
 * Age gate, nav, animations, portfolio filter, form validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── Age Gate ──────────────────────────────────────
  const ageGate = document.getElementById('age-gate');
  const ageConfirm = document.getElementById('age-confirm');

  if (ageGate) {
    if (localStorage.getItem('clan_age_verified') === 'true') {
      ageGate.classList.add('hidden');
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }

    if (ageConfirm) {
      ageConfirm.addEventListener('click', () => {
        localStorage.setItem('clan_age_verified', 'true');
        ageGate.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }
  }

  // ── Hamburger Menu ────────────────────────────────
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      });
    });
  }

  // ── Nav Scroll ────────────────────────────────────
  const nav = document.getElementById('main-nav');
  if (nav) {
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '80px';
    sentinel.style.height = '1px';
    sentinel.style.width = '1px';
    document.body.prepend(sentinel);

    const navObserver = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle('nav-scrolled', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    navObserver.observe(sentinel);
  }

  // ── Scroll Animations ─────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  // ── Portfolio Filter ──────────────────────────────
  const filterPills = document.querySelectorAll('.filter-pill');
  const brandCards = document.querySelectorAll('.brand-card');

  if (filterPills.length && brandCards.length) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        // Update active state
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const country = pill.dataset.country;

        brandCards.forEach(card => {
          if (country === 'all' || card.dataset.country === country) {
            card.style.display = '';
            // Re-trigger fade
            card.classList.remove('visible');
            requestAnimationFrame(() => card.classList.add('visible'));
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Form Validation ───────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const requiredFields = contactForm.querySelectorAll('[required]');
      let valid = true;

      requiredFields.forEach(field => {
        // Remove previous error state
        field.classList.remove('border-red-500');

        if (!field.value.trim()) {
          valid = false;
          field.classList.add('border-red-500');
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            valid = false;
            field.classList.add('border-red-500');
          }
        }
      });

      if (!valid) {
        e.preventDefault();
        const firstError = contactForm.querySelector('.border-red-500');
        if (firstError) firstError.focus();
      }
    });
  }
});
