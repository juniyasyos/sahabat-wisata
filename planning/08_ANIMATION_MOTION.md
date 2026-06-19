# 08 — Animation & Motion Design

## 1. Filosofi Animasi

> **Prinsip:** Animasi ada untuk **membantu pengguna memahami** perubahan state, bukan untuk terlihat keren. Setiap animasi harus punya alasan fungsional.

Website travel lokal harus terasa **hidup namun profesional**. Animasi yang berlebihan akan:
- Memperlambat website
- Mengganggu pengguna yang ingin cepat mendapatkan informasi
- Terlihat amatir jika tidak dieksekusi dengan baik

### Prinsip Animasi

1. **Subtle over flashy** — Efek subtle terasa premium; efek berlebihan terasa murahan
2. **Purposeful** — Setiap animasi punya alasan (feedback, transisi, attention)
3. **Fast** — Durasi ≤ 300ms untuk interaksi, ≤ 600ms untuk transisi
4. **Respect user preferences** — Gunakan `prefers-reduced-motion`

---

## 2. Timing Functions (Easing)

```css
:root {
  /* Easing curves */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);         /* Cepat lalu melambat — paling natural */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);        /* Standar material design */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Sedikit bounce — untuk hover cards */
  --ease-linear: linear;
  
  /* Durations */
  --dur-fast: 150ms;     /* Hover states, toggle kecil */
  --dur-base: 250ms;     /* Transisi umum */
  --dur-slow: 400ms;     /* Transisi konten, reveal */
  --dur-slower: 600ms;   /* Hero, entrance pertama */
}
```

---

## 3. Hover Animations

### Kartu (Cards)

```css
.card {
  transition:
    transform var(--dur-base) var(--ease-spring),
    box-shadow var(--dur-base) var(--ease-out);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

> **Feel:** Kartu "terangkat" saat hover — memberikan feedback yang jelas bahwa elemen ini clickable.

---

### Tombol (Buttons)

```css
.btn {
  transition:
    background-color var(--dur-fast) var(--ease-out),
    transform var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-fast) var(--ease-out);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.btn:active {
  transform: translateY(0) scale(0.99);
}

/* WhatsApp button khusus */
.btn-whatsapp:hover {
  background-color: var(--color-action-600);
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4); /* Green glow */
}
```

---

### Link Navigasi

```css
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary-500);
  transition: width var(--dur-base) var(--ease-out);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}
```

---

## 4. Scroll Animations (Entrance)

### Prinsip

- Elemen masuk layar dari bawah dengan sedikit fade
- Delay bertahap untuk elemen yang sejajar (staggered)
- Hanya aktif jika `prefers-reduced-motion: no-preference`

### Implementasi dengan Intersection Observer

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Animate hanya sekali
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('[data-animate]').forEach((el) => {
  observer.observe(el);
});
```

```css
/* Animasi default: fade + slide dari bawah */
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity var(--dur-slow) var(--ease-out),
    transform var(--dur-slow) var(--ease-out);
}

[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delay untuk grid items */
[data-animate]:nth-child(1) { transition-delay: 0ms; }
[data-animate]:nth-child(2) { transition-delay: 80ms; }
[data-animate]:nth-child(3) { transition-delay: 160ms; }
[data-animate]:nth-child(4) { transition-delay: 240ms; }

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

---

## 5. Micro-interactions

### 5.1 Floating WhatsApp Button — Pulse

```css
@keyframes wa-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.btn-floating-wa {
  animation: wa-pulse 3s ease-out infinite;
}

.btn-floating-wa:hover {
  animation: none; /* Stop pulse on hover, show hover state */
}
```

---

### 5.2 Navbar — Scroll Transition

```javascript
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 80) {
    navbar.classList.add('is-scrolled');
  } else {
    navbar.classList.remove('is-scrolled');
  }
});
```

```css
.navbar {
  background: transparent;
  transition:
    background-color var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out),
    backdrop-filter var(--dur-base) var(--ease-out);
}

.navbar.is-scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-sm);
}
```

---

### 5.3 FAQ Accordion

```css
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--dur-slow) var(--ease-out);
}

.faq-item.is-open .faq-answer {
  max-height: 500px; /* Cukup besar untuk konten apapun */
}

/* Arrow icon */
.faq-icon {
  transition: transform var(--dur-base) var(--ease-out);
}

.faq-item.is-open .faq-icon {
  transform: rotate(180deg);
}
```

---

### 5.4 Image Lazy Load Reveal

```css
img {
  transition: opacity var(--dur-slow) var(--ease-out);
}

img[loading="lazy"] {
  opacity: 0;
}

img.is-loaded {
  opacity: 1;
}
```

```javascript
document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
  img.addEventListener('load', () => img.classList.add('is-loaded'));
  if (img.complete) img.classList.add('is-loaded');
});
```

---

### 5.5 Mobile Drawer

```css
.drawer-overlay {
  opacity: 0;
  transition: opacity var(--dur-base) var(--ease-out);
}

.drawer-panel {
  transform: translateX(100%);
  transition: transform var(--dur-slow) var(--ease-out);
}

.drawer.is-open .drawer-overlay {
  opacity: 1;
}

.drawer.is-open .drawer-panel {
  transform: translateX(0);
}
```

---

## 6. Animasi Hero

### Hero Text Entrance

Teks hero masuk dengan sedikit delay bertahap:

```css
@keyframes hero-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-badge {
  animation: hero-slide-up var(--dur-slow) var(--ease-out) 200ms both;
}

.hero-headline {
  animation: hero-slide-up var(--dur-slow) var(--ease-out) 350ms both;
}

.hero-sub {
  animation: hero-slide-up var(--dur-slow) var(--ease-out) 500ms both;
}

.hero-cta {
  animation: hero-slide-up var(--dur-slow) var(--ease-out) 650ms both;
}
```

---

## 7. Loading State

### Tidak Ada Skeleton Loading (v1.0.0)

Karena arsitektur v1.0.0 menggunakan **SSG (Static Site Generation)** atau SSR (Server-Side Rendering), semua data dirender di server sebelum dikirim ke browser. 

Oleh karena itu, **tidak diperlukan efek Skeleton Loading** untuk konten utama (seperti rute travel atau paket wisata). HTML yang diterima pengguna sudah berisi data utuh, membuat *First Contentful Paint* sangat cepat dan SEO sempurna. Hindari animasi loading yang menunda penampilan teks utama.

---

## 8. Page Transitions

Jika menggunakan SPA atau JavaScript router (misal: Next.js), gunakan transisi antar halaman yang sangat ringan (opsional):

```css
/* Page enter */
@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-content {
  animation: page-enter 300ms var(--ease-out);
}
```

---

## 9. Daftar Animasi — Prioritas Implementasi

| Animasi | Prioritas | Kompleksitas |
|---------|-----------|-------------|
| Hover kartu (lift + shadow) | ⭐ Tinggi | Rendah |
| Hover tombol | ⭐ Tinggi | Rendah |
| Floating WA pulse | ⭐ Tinggi | Rendah |
| Navbar scroll transition | ⭐ Tinggi | Rendah |
| FAQ accordion | ⭐ Tinggi | Menengah |
| Hero text entrance | Menengah | Rendah |
| Scroll entrance (cards) | Menengah | Menengah |
| Image lazy reveal | Menengah | Rendah |
| Mobile drawer | Menengah | Menengah |
| Page transitions | Rendah | Tinggi |

---

## 10. Checklist Animasi

- [ ] Semua hover state terasa responsif (< 150ms)
- [ ] Floating WA button memiliki pulse yang eye-catching namun tidak mengganggu
- [ ] Navbar berubah smooth saat scroll
- [ ] Scroll entrance tidak terlalu agresif (tidak setiap elemen animate)
- [ ] FAQ accordion smooth tanpa jump
- [ ] `prefers-reduced-motion` diimplementasi
- [ ] Di perangkat low-end (Android entry-level), tidak ada janky animation
- [ ] Tidak ada animasi yang memblokir interaksi user
