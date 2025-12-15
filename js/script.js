/* script.js - consolidated frontend logic for EMS project */

/* -------------------------
   Basic utilities & data
   ------------------------- */
const data = {
    events: [
        { id: 'e1', title: 'Tech Summit 2025', category: 'Tech', type: 'Paid', date: '2025-12-20', location: 'Ahmedabad', img: 'assets/event1.jpg', desc: 'A full day of tech talks and workshops.', agenda: [{ time: '10:00', title: 'Opening' }, { time: '11:00', title: 'Keynote' }] },
        { id: 'e2', title: 'Music Fest', category: 'Concert', type: 'Paid', date: '2025-11-10', location: 'Mumbai', img: 'assets/event2.jpg', desc: 'Live artists and food stalls.', agenda: [{ time: '18:00', title: 'Band A' }, { time: '20:00', title: 'Band B' }] },
        { id: 'e3', title: 'Cultural Fiesta', category: 'Cultural', type: 'Free', date: '2025-10-05', location: 'Surat', img: 'assets/event3.jpg', desc: 'Local cultural programs and stalls.', agenda: [] },
        // add more events as needed
    ],
    blogs: [
        { id: 'b1', title: 'How to plan a tech meetup', category: 'Tech', snippet: 'Quick guide...', content: 'Full article content here...' },
        { id: 'b2', title: 'Top 10 concert tips', category: 'Music', snippet: 'Tips for attendees...', content: 'Full article content here...' }
    ],
    gallery: [
        { id: 'g1', tag: 'Concert', img: 'assets/gallery1.jpg' },
        { id: 'g2', tag: 'Tech', img: 'assets/gallery2.jpg' },
        { id: 'g3', tag: 'Cultural', img: 'assets/gallery3.jpg' }
    ],
    testimonials: [
        { name: 'Sana', text: 'Great experience!' },
        { name: 'Raj', text: 'Well organized event.' }
    ]
}

/* -------------------------
    DOM helpers / init
   ------------------------- */
document.addEventListener('DOMContentLoaded', init);

function init() {
    setYears();
    setupNav();
    populateFeatured();
    populateTestimonials();
    initStats();
    populateEventsList();
    populateEventDetail();
    setupRegisterPage();
    setupRegisterModal();
    populateGallery();
    populateBlogs();
    setupContact();
    setupRevealObserver();
}

/* ---------- NAV & THEME ---------- */
function setupNav() {
    const burger = document.querySelectorAll('#hamburger');
    const navs = document.querySelectorAll('#main-nav');
    burger.forEach(b => {
        b.addEventListener('click', () => {
            navs.forEach(n => n.classList.toggle('open'));
        });
    });

    const themeBtn = document.querySelectorAll('#theme-toggle');
    themeBtn.forEach(btn => btn.addEventListener('click', toggleTheme));
    // load theme
    if (localStorage.getItem('ems_theme') === 'dark') document.documentElement.classList.add('dark');
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('ems_theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

/* ---------- Year in footer ---------- */
function setYears() {
    for (let i = 1; i <= 10; i++) {
        const el = document.getElementById('year' + i);
        if (el) el.textContent = new Date().getFullYear();
    }
}

/* ---------- Featured slider ---------- */
function populateFeatured() {
    const slider = document.getElementById('featured-slider');
    if (!slider) return;
    data.events.slice(0, 4).forEach(ev => {
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `<img src="${ev.img}" alt="${ev.title}" style="width:100%;border-radius:8px"><h4>${ev.title}</h4><p>${ev.date} • ${ev.location}</p><a class="btn" href="event-details.html?id=${ev.id}">View</a>`;
        slider.appendChild(el);
    });
    // basic horizontal scroll
    slider.style.display = 'flex';
    slider.style.overflowX = 'auto';
    slider.querySelectorAll('.card').forEach(c => c.style.minWidth = '260px');
}

/* ---------- Testimonials ---------- */
function populateTestimonials() {
    const t = document.getElementById('testimonials');
    if (!t) return;
    data.testimonials.forEach(item => {
        const d = document.createElement('div');
        d.className = 'card';
        d.style.minWidth = '220px';
        d.innerHTML = `<p>"${item.text}"</p><strong>${item.name}</strong>`;
        t.appendChild(d);
    });
}

/* ---------- Animated counters ---------- */
function initStats() {
    const nums = document.querySelectorAll('.num');
    nums.forEach(n => {
        const target = +n.dataset.target;
        animateNumber(n, target, 1200);
    });
}
function animateNumber(el, target, duration = 1000) {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
        start += Math.ceil(target / (duration / stepTime));
        if (start >= target) { el.textContent = target; clearInterval(timer); }
        else el.textContent = start;
    }, stepTime);
}

/* ---------- Events list, filters & pagination ---------- */
function populateEventsList() {
    const grid = document.getElementById('events-grid');
    if (!grid) return;
    // fill category select
    const catSelect = document.getElementById('filter-category');
    if (catSelect) {
        const cats = [...new Set(data.events.map(e => e.category))];
        cats.forEach(c => catSelect.innerHTML += `<option value="${c}">${c}</option>`);
    }
    // render function
    function renderEvents(list) {
        grid.innerHTML = '';
        list.forEach(ev => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
        <img src="${ev.img}" alt="" style="width:100%;height:140px;object-fit:cover;border-radius:8px">
        <h4>${ev.title}</h4>
        <p class="muted">${ev.date} • ${ev.location}</p>
        <p>${ev.desc}</p>
        <div style="display:flex;gap:.5rem">
          <a class="btn" href="event-details.html?id=${ev.id}">Details</a>
          <button class="btn outline" onclick="quickRegister('${ev.id}')">Quick Register</button>
        </div>`;
            grid.appendChild(card);
        });
    }
    // initial render
    renderEvents(data.events);

    // filters inline
    const search = document.getElementById('search-events');
    const cat = document.getElementById('filter-category');
    const type = document.getElementById('filter-type');
    const sort = document.getElementById('sort-events');

    function applyFilters() {
        let list = data.events.slice();
        if (search && search.value) list = list.filter(e => e.title.toLowerCase().includes(search.value.toLowerCase()));
        if (cat && cat.value) list = list.filter(e => e.category === cat.value);
        if (type && type.value) list = list.filter(e => e.type === type.value);
        if (sort && sort.value === 'popular') list = list.sort((a, b) => a.title.localeCompare(b.title));
        renderEvents(list);
    }
    [search, cat, type, sort].forEach(el => el && el.addEventListener('input', applyFilters));
}

/* quickRegister invoked from events list */
function quickRegister(evId) {
    const ev = data.events.find(x => x.id === evId);
    if (!ev) return alert('Event not found');
    // auto create a registration placeholder and save
    const reg = { id: `r${Date.now()}`, name: 'Guest', email: 'guest@example.com', phone: '', tickets: 1, eventId: ev.id, eventTitle: ev.title, date: ev.date };
    saveRegistration(reg);
    alert(`Registered (frontend-only) for ${ev.title}. Check My Registrations.`);
}

/* ---------- Event Details rendering & modal registration ---------- */
function populateEventDetail() {
    const container = document.getElementById('event-detail');
    if (!container) return;
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || data.events[0].id;
    const ev = data.events.find(x => x.id === id);
    if (!ev) { container.innerHTML = '<p>Event not found</p>'; return; }
    container.innerHTML = `
    <div class="card">
      <img src="${ev.img}" alt="" style="width:100%;height:300px;object-fit:cover;border-radius:10px">
      <h1>${ev.title}</h1>
      <p class="muted">${ev.date} • ${ev.location}</p>
      <p>${ev.desc}</p>
      <h3>Agenda</h3>
      <div>${ev.agenda.length ? ev.agenda.map(a => `<div><strong>${a.time}</strong> - ${a.title}</div>`).join('') : '<p>No agenda yet</p>'}</div>
      <div style="margin-top:1rem">
        <button class="btn" id="open-register">Register Now</button>
        <a class="btn outline" href="events.html">Back to events</a>
      </div>
    </div>
  `;
    document.getElementById('open-register').addEventListener('click', () => openModal(ev));
}

/* modal helpers */
function setupRegisterModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeModal));
    const form = document.getElementById('modal-register-form');
    if (form) {
        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            const dataForm = Object.fromEntries(new FormData(form).entries());
            // expect eventId passed via dataset
            const reg = { id: `r${Date.now()}`, name: dataForm.name, email: dataForm.email, phone: dataForm.phone || '', tickets: dataForm.tickets, eventId: window._modalEventId || 'unknown', eventTitle: window._modalEventTitle || 'Event', date: new Date().toISOString().split('T')[0] };
            saveRegistration(reg);
            closeModal();
            alert('Registered (frontend-only). Check My Registrations.');
        });
    }
}
function openModal(ev) {
    window._modalEventId = ev.id;
    window._modalEventTitle = ev.title;
    const modal = document.getElementById('modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    // optionally prefill form
    const form = document.getElementById('modal-register-form');
    if (form) { form.name.value = ''; form.email.value = ''; form.phone.value = ''; }
}
function closeModal() { const m = document.getElementById('modal'); if (m) m.classList.add('hidden'); }

/* ---------- Registrations (localStorage) ---------- */
function loadRegistrations() { return JSON.parse(localStorage.getItem('ems_registrations') || '[]'); }
function saveRegistration(reg) {
    const arr = loadRegistrations();
    arr.push(reg);
    localStorage.setItem('ems_registrations', JSON.stringify(arr));
}
function removeRegistration(id) {
    const arr = loadRegistrations().filter(r => r.id !== id);
    localStorage.setItem('ems_registrations', JSON.stringify(arr));
    renderMyRegistrations();
}

/* render my registrations page */
function renderMyRegistrations() {
    const listEl = document.getElementById('registrations-list');
    if (!listEl) return;
    const regs = loadRegistrations();
    if (!regs.length) { listEl.innerHTML = '<p>No registrations yet.</p>'; return; }
    listEl.innerHTML = '';
    regs.forEach(r => {
        const el = document.createElement('div'); el.className = 'reg-item';
        el.innerHTML = `<div><strong>${r.eventTitle}</strong><div class="muted small">${r.date}</div></div>
      <div style="display:flex;gap:.5rem;align-items:center">
        <button class="btn outline" onclick="removeRegistration('${r.id}')">Cancel</button>
        <div class="chip">QR</div>
      </div>`;
        listEl.appendChild(el);
    });
}
window.renderMyRegistrations = renderMyRegistrations;

/* ---------- Register page: populate event select & submit ---------- */
function setupRegisterPage() {
    const select = document.getElementById('r-event');
    if (select) {
        data.events.forEach(ev => select.innerHTML += `<option value="${ev.id}">${ev.title} — ${ev.date}</option>`);
    }
    const form = document.getElementById('register-form');
    if (form) {
        form.addEventListener('submit', ev => {
            ev.preventDefault();
            const name = document.getElementById('r-name').value.trim();
            const email = document.getElementById('r-email').value.trim();
            const phone = document.getElementById('r-phone').value.trim();
            const eventId = document.getElementById('r-event').value;
            const tickets = document.getElementById('r-tickets').value;
            if (!name || !email || !eventId) { showToast('Please fill required fields'); return; }
            const evObj = data.events.find(e => e.id === eventId) || { title: 'Event' };
            const reg = { id: `r${Date.now()}`, name, email, phone, tickets, eventId, eventTitle: evObj.title, date: evObj.date };
            saveRegistration(reg);
            showToast('Registration saved (frontend-only).');
            form.reset();
        });
    }
}

/* toast helper */
function showToast(msg, timeout = 1800) {
    const t = document.getElementById('register-msg');
    if (!t) return alert(msg);
    t.textContent = msg; t.classList.remove('hidden');
    setTimeout(() => t.classList.add('hidden'), timeout);
}

/* ---------- Gallery ---------- */
function populateGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    function render(filter) {
        grid.innerHTML = '';
        data.gallery.filter(g => !filter || g.tag === filter).forEach(item => {
            const d = document.createElement('div'); d.className = 'card';
            d.innerHTML = `<img src="${item.img}" alt="" style="width:100%;height:160px;object-fit:cover;border-radius:8px;cursor:pointer" data-img="${item.img}">`;
            grid.appendChild(d);
        });
        grid.querySelectorAll('img[data-img]').forEach(img => {
            img.addEventListener('click', (e) => openLightbox(e.target.dataset.img));
        });
    }
    render();
    document.querySelectorAll('.chip').forEach(b => b.addEventListener('click', e => {
        document.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
        e.target.classList.add('active'); render(e.target.dataset.filter || '');
    }));
    const lb = document.getElementById('lightbox');
    if (lb) {
        document.getElementById('lightbox-close').addEventListener('click', () => lb.classList.add('hidden'));
        lb.addEventListener('click', e => { if (e.target === lb) lb.classList.add('hidden'); });
    }
}
function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    document.getElementById('lightbox-img').src = src;
    lb.classList.remove('hidden');
}

/* ---------- Blogs ---------- */
function populateBlogs() {
    const grid = document.getElementById('blogs-grid');
    if (!grid) return;
    data.blogs.forEach(b => {
        const el = document.createElement('div'); el.className = 'card';
        el.innerHTML = `<h4>${b.title}</h4><p class="muted">${b.category}</p><p>${b.snippet}</p><button class="btn" data-id="${b.id}">Read More</button>`;
        grid.appendChild(el);
    });
    grid.querySelectorAll('button[data-id]').forEach(btn => btn.addEventListener('click', e => {
        const id = e.target.dataset.id; const blog = data.blogs.find(x => x.id === id);
        const modal = document.getElementById('blog-modal');
        if (modal) { document.getElementById('blog-modal-body').innerHTML = `<h2>${blog.title}</h2><p>${blog.content}</p>`; modal.classList.remove('hidden'); }
    }));
    document.querySelectorAll('.modal .modal-close').forEach(b => b.addEventListener('click', () => document.getElementById('blog-modal').classList.add('hidden')));
}

/* ---------- Contact / FAQ ---------- */
function setupContact() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert('Message sent (frontend-only).');
            form.reset();
        });
    }
    document.querySelectorAll('.accordion-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.nextElementSibling;
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
        });
    });
}

/* ---------- Reveal on scroll (Intersection Observer) ---------- */
function setupRevealObserver() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('active');
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ---------- Helpers for pages loaded after DOM ready ---------- */
(function autoRunAfterLoad() {
    // If user lands on my-registrations page, render list
    if (document.getElementById('registrations-list')) renderMyRegistrations();
})();
