(function () {
	const body = document.body;
	const navToggle = document.querySelector('.nav-toggle');
	const siteNav = document.getElementById('site-nav');
	if (navToggle && siteNav) {
		navToggle.addEventListener('click', () => {
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', String(!expanded));
			siteNav.classList.toggle('open');
		});
		siteNav.addEventListener('click', (e) => {
			const target = e.target;
			if (target && target.tagName === 'A') {
				navToggle.setAttribute('aria-expanded', 'false');
				siteNav.classList.remove('open');
			}
		});
	}

	const header = document.querySelector('.site-header');
	function offsetScrollIntoView(hash) {
		const el = document.querySelector(hash);
		if (!el) return;
		const headerHeight = header ? header.offsetHeight + 12 : 0;
		const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
		window.scrollTo({ top: y, behavior: 'smooth' });
	}
	document.addEventListener('click', (e) => {
		const a = e.target.closest('a[href^="#"]');
		if (!a) return;
		const url = new URL(a.href);
		if (url.hash.length > 1) {
			e.preventDefault();
			offsetScrollIntoView(url.hash);
		}
	});

	const yearEl = document.getElementById('year');
	if (yearEl) {
		yearEl.textContent = String(new Date().getFullYear());
	}

	// Theme toggle
	const themeToggle = document.getElementById('theme-toggle');
	const THEME_KEY = 'site-theme';
	const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
	const safeLocalStorage = {
		get(key) {
			try { return window.localStorage.getItem(key); } catch (err) { return null; }
		},
		set(key, value) {
			try { window.localStorage.setItem(key, value); } catch (err) { /* ignore */ }
		}
	};
	const applyTheme = (theme) => {
		const isLight = theme === 'light';
		if (isLight) {
			body.setAttribute('data-theme', 'light');
		} else {
			body.removeAttribute('data-theme');
		}
		if (themeToggle) {
			themeToggle.setAttribute('aria-pressed', String(isLight));
			themeToggle.setAttribute('aria-label', isLight ? 'Toggle dark mode' : 'Toggle light mode');
		}
	};
	const initialTheme = safeLocalStorage.get(THEME_KEY) || (mediaQuery.matches ? 'light' : 'dark');
	applyTheme(initialTheme);
	if (themeToggle) {
		themeToggle.addEventListener('click', () => {
			const current = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
			applyTheme(current);
			safeLocalStorage.set(THEME_KEY, current);
		});
	}
	mediaQuery.addEventListener('change', (event) => {
		if (safeLocalStorage.get(THEME_KEY)) return;
		applyTheme(event.matches ? 'light' : 'dark');
	});

	const ICONS = {
		github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.56v-2c-3.23.7-3.91-1.52-3.91-1.52-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.04 1.79 2.73 1.27 3.4.97.1-.77.41-1.28.75-1.57-2.58-.29-5.29-1.3-5.29-5.78 0-1.28.46-2.33 1.21-3.15-.12-.3-.53-1.5.12-3.12 0 0 .99-.32 3.26 1.2a11.2 11.2 0 0 1 5.94 0c2.27-1.52 3.26-1.2 3.26-1.2.65 1.62.24 2.82.12 3.12.75.82 1.21 1.87 1.21 3.15 0 4.5-2.72 5.48-5.31 5.77.43.37.81 1.1.81 2.22v3.29c0 .31.2.68.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
		linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 8.96h3.96V21H3V8.96Zm6.74 0h3.78v1.65h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.15V21h-3.96v-5.58c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95V21H9.74V8.96Z"/></svg>',
		scholar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5 2 8.5l10 5 8-4v7h2v-8L12 3.5Zm-6 9.74v2.26c0 2.57 2.75 4 6 4s6-1.43 6-4v-2.26l-6 3.01-6-3.01Z"/></svg>',
		twitter: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.46 3.5c-1.26.74-2.66 1.27-4.14 1.53a3.57 3.57 0 0 0-6.08 3.25A10.13 10.13 0 0 1 3.1 4.56a3.53 3.53 0 0 0-.48 1.8 3.56 3.56 0 0 0 1.58 2.97 3.55 3.55 0 0 1-1.62-.45v.05a3.57 3.57 0 0 0 2.86 3.5c-.46.12-.94.18-1.43.07a3.58 3.58 0 0 0 3.33 2.47A7.16 7.16 0 0 1 2 18.27 10.09 10.09 0 0 0 7.46 20c6.83 0 10.56-5.66 10.56-10.56 0-.16 0-.31-.01-.46a7.54 7.54 0 0 0 1.84-1.92 7.34 7.34 0 0 1-2.1.58 3.64 3.64 0 0 0 1.57-2.07 7.2 7.2 0 0 1-2.27.87Z"/></svg>',
		mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 7.5L4.8 6.4 4 7.7 12 12.5l8-4.8-.8-1.3L12 11.5Z"/></svg>',
		default: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 4.09 6.59L22 9.75l-5 5.15L18.18 22 12 18.8 5.82 22 7 14.9l-5-5.15 5.91-1.16L12 2Z"/></svg>'
	};

	const createIconSpan = (icon) => {
		if (!icon) return null;
		const span = document.createElement('span');
		span.className = 'icon';
		span.setAttribute('aria-hidden', 'true');
		span.innerHTML = ICONS[icon] || ICONS.default;
		return span;
	};

	const createLinkEl = (link) => {
		if (!link?.label || !link?.url) return null;
		const a = document.createElement('a');
		a.href = link.url;
		a.setAttribute('aria-label', link.label);
		const iconSpan = createIconSpan(link.icon);
		if (iconSpan) a.append(iconSpan);
		a.append(document.createTextNode(link.label));
		return a;
	};

	const fillLinks = (container, links) => {
		if (!container) return;
		container.innerHTML = '';
		if (!Array.isArray(links) || !links.length) {
			container.style.display = 'none';
			return;
		}
		container.style.display = '';
		links.forEach((link) => {
			const el = createLinkEl(link);
			if (!el) return;
			container.appendChild(el);
		});
	};

	const toggleSectionVisibility = (container, hasItems) => {
		if (!container) return;
		const section = container.closest('section');
		if (section) {
			section.style.display = hasItems ? '' : 'none';
		}
	};

	const data = window.SITE_CONTENT;
	if (!data) return;

	const setText = (selector, text) => {
		const el = document.querySelector(selector);
		if (el && typeof text === 'string' && text.length) {
			el.textContent = text;
		}
	};

const setImage = (id, media, fallbackAlt = '') => {
	const slot = document.getElementById(id);
	if (!slot) return;
	slot.innerHTML = '';
	slot.classList.remove('has-image');
	if (!media) return;
	const file = typeof media === 'string' ? media : media.file;
	if (!file) return;
	const isAbsolute = /^(?:https?:)?\/\//i.test(file) || file.startsWith('.') || file.startsWith('assets/');
	const src = isAbsolute ? file : `assets/images/${file}`;
	const alt = typeof media === 'object' && media.alt ? media.alt : fallbackAlt;
	const img = document.createElement('img');
	img.src = src;
	img.alt = alt || '';
	slot.appendChild(img);
	slot.classList.add('has-image');
	if (typeof media === 'object' && media.caption) {
		const caption = document.createElement('figcaption');
		caption.textContent = media.caption;
		slot.appendChild(caption);
	}
};

	if (data.profile) {
		const name = data.profile.name || 'Your Name';
		setText('#hero-title', `Hi, I’m ${name}`);
		setText('#hero-lead', data.profile.tagline || '');
	setText('#profile-intro', data.profile.intro || '');
	setImage('profile-media', data.media?.profile, `${name} portrait`);
		const factsEl = document.getElementById('key-facts');
		if (factsEl) {
			factsEl.innerHTML = '';
			const rows = [
				{ k: 'Degree', v: data.profile.degree },
				{ k: 'University', v: data.profile.university },
				{ k: 'Location', v: data.profile.location }
			];
			rows.filter((row) => row.v).forEach((row) => {
				const li = document.createElement('li');
				li.innerHTML = `<span class="k">${row.k}</span><span class="v">${row.v}</span>`;
				factsEl.appendChild(li);
			});
		}

		const socialList = document.getElementById('social-list');
		if (socialList) {
			socialList.innerHTML = '';
			if (Array.isArray(data.profile.socials) && data.profile.socials.length) {
				data.profile.socials.forEach((item) => {
					const li = document.createElement('li');
					const linkEl = createLinkEl(item);
					if (linkEl) li.appendChild(linkEl);
					socialList.appendChild(li);
				});
			} else {
				socialList.innerHTML = '<li>No social links yet.</li>';
			}
		}

		const emailEl = document.getElementById('contact-email');
		if (emailEl && data.profile.email) {
			emailEl.textContent = data.profile.email;
			emailEl.href = `mailto:${data.profile.email}`;
		}
		const contactSocials = document.getElementById('contact-socials');
		if (contactSocials) {
			const links = data.profile.contactLinks?.length ? data.profile.contactLinks : data.profile.socials;
			contactSocials.innerHTML = '';
			if (Array.isArray(links)) {
				links.forEach((item) => {
					const li = document.createElement('li');
					const linkEl = createLinkEl(item);
					if (linkEl) li.appendChild(linkEl);
					contactSocials.appendChild(li);
				});
			}
		}
	}

	const eduEl = document.getElementById('education-timeline');
	if (eduEl) {
	setImage('education-media', data.media?.education, 'Education highlight');
		eduEl.innerHTML = '';
		if (Array.isArray(data.education) && data.education.length) {
			data.education.forEach((item) => {
				const art = document.createElement('article');
				art.className = 'timeline-item';
				art.innerHTML = `
					<div class="ti-header">
						<h3>${item.title || ''}</h3>
						<span class="ti-meta">${[item.institution, item.period].filter(Boolean).join(' • ')}</span>
					</div>
					<p>${item.details || ''}</p>
				`;
				eduEl.appendChild(art);
			});
		}
		toggleSectionVisibility(eduEl, Array.isArray(data.education) && data.education.length);
	}

	const renderTagGroup = (container, tags) => {
		if (!container) return;
		if (!Array.isArray(tags) || !tags.length) {
			container.remove();
			return;
		}
		container.innerHTML = '';
		tags.forEach((tag) => {
			const span = document.createElement('span');
			span.textContent = tag;
			container.appendChild(span);
		});
	};

	const researchEl = document.getElementById('research-grid');
	if (researchEl) {
	setImage('research-media', data.media?.research, 'Research spotlight');
		researchEl.innerHTML = '';
		if (Array.isArray(data.research) && data.research.length) {
			data.research.forEach((proj) => {
				const card = document.createElement('article');
				card.className = 'card';
				card.innerHTML = `
					<h3>${proj.title || ''}</h3>
					<p>${proj.summary || ''}</p>
					<div class="tags"></div>
					<div class="meta-links"></div>
				`;
				researchEl.appendChild(card);
				renderTagGroup(card.querySelector('.tags'), proj.tags);
				fillLinks(card.querySelector('.meta-links'), proj.links);
			});
		}
		toggleSectionVisibility(researchEl, Array.isArray(data.research) && data.research.length);
	}

	const projectsEl = document.getElementById('projects-grid');
	if (projectsEl) {
	setImage('projects-media', data.media?.projects, 'Projects showcase');
		projectsEl.innerHTML = '';
		if (Array.isArray(data.projects) && data.projects.length) {
			data.projects.forEach((proj) => {
				const card = document.createElement('article');
				card.className = 'card';
				card.innerHTML = `
					<h3>${proj.title || ''}</h3>
					<p>${proj.description || ''}</p>
					<ul class="meta"></ul>
					<div class="meta-links"></div>
				`;
				projectsEl.appendChild(card);
				const metaList = card.querySelector('.meta');
				if (metaList && Array.isArray(proj.meta)) {
					metaList.innerHTML = '';
					proj.meta.forEach((entry) => {
						const li = document.createElement('li');
						li.textContent = entry;
						metaList.appendChild(li);
					});
				} else if (metaList) {
					metaList.remove();
				}
				fillLinks(card.querySelector('.meta-links'), proj.links);
			});
		}
		toggleSectionVisibility(projectsEl, Array.isArray(data.projects) && data.projects.length);
	}

	const interestsEl = document.getElementById('interests-chips');
	if (interestsEl) {
	setImage('interests-media', data.media?.interests, 'Interest collage');
		interestsEl.innerHTML = '';
		if (Array.isArray(data.interests) && data.interests.length) {
			data.interests.forEach((interest) => {
				const span = document.createElement('span');
				span.className = 'chip';
				span.textContent = interest;
				interestsEl.appendChild(span);
			});
		}
		toggleSectionVisibility(interestsEl, Array.isArray(data.interests) && data.interests.length);
	}

	const achievementsEl = document.getElementById('achievements-list');
	if (achievementsEl) {
	setImage('achievements-media', data.media?.achievements, 'Achievement highlight');
		achievementsEl.innerHTML = '';
		if (Array.isArray(data.achievements) && data.achievements.length) {
			data.achievements.forEach((item) => {
				const card = document.createElement('article');
				card.className = 'card';
				const meta = [item.issuer, item.year].filter(Boolean).join(' • ');
				card.innerHTML = `
					<h3>${item.title || ''}</h3>
					${meta ? `<p class="meta">${meta}</p>` : ''}
					<p>${item.description || ''}</p>
				`;
				achievementsEl.appendChild(card);
			});
		}
		toggleSectionVisibility(achievementsEl, Array.isArray(data.achievements) && data.achievements.length);
	}

	const postersEl = document.getElementById('posters-list');
	if (postersEl) {
	setImage('posters-media', data.media?.posters, 'Poster or publication visual');
		postersEl.innerHTML = '';
		if (Array.isArray(data.posters) && data.posters.length) {
			data.posters.forEach((poster) => {
				const card = document.createElement('article');
				card.className = 'card';
				const meta = [poster.venue, poster.year].filter(Boolean).join(' • ');
				card.innerHTML = `
					<h3>${poster.title || ''}</h3>
					${meta ? `<p class="meta">${meta}</p>` : ''}
					<p>${poster.summary || ''}</p>
					<div class="meta-links"></div>
				`;
				postersEl.appendChild(card);
				fillLinks(card.querySelector('.meta-links'), poster.links);
			});
		}
		toggleSectionVisibility(postersEl, Array.isArray(data.posters) && data.posters.length);
	}

	const engagementsEl = document.getElementById('engagements-timeline');
	if (engagementsEl) {
	setImage('engagements-media', data.media?.engagements, 'Academic engagement visual');
		engagementsEl.innerHTML = '';
		if (Array.isArray(data.engagements) && data.engagements.length) {
			data.engagements.forEach((item) => {
				const art = document.createElement('article');
				art.className = 'timeline-item';
				const meta = [item.organization, item.period].filter(Boolean).join(' • ');
				art.innerHTML = `
					<div class="ti-header">
						<h3>${item.role || ''}</h3>
						<span class="ti-meta">${meta}</span>
					</div>
					<p>${item.description || ''}</p>
				`;
				engagementsEl.appendChild(art);
			});
		}
		toggleSectionVisibility(engagementsEl, Array.isArray(data.engagements) && data.engagements.length);
	}

	const skillsEl = document.getElementById('skills-groups');
	if (skillsEl) {
	setImage('skills-media', data.media?.skills, 'Skills visual');
		skillsEl.innerHTML = '';
		if (Array.isArray(data.skills) && data.skills.length) {
			data.skills.forEach((group) => {
				const card = document.createElement('article');
				card.className = 'card';
				card.innerHTML = `
					<h3>${group.category || ''}</h3>
					<ul class="skill-list"></ul>
				`;
				skillsEl.appendChild(card);
				const list = card.querySelector('.skill-list');
				if (list && Array.isArray(group.items)) {
					group.items.forEach((skill) => {
						const li = document.createElement('li');
						li.textContent = skill;
						list.appendChild(li);
					});
				}
			});
		}
		toggleSectionVisibility(skillsEl, Array.isArray(data.skills) && data.skills.length);
	}

	const languagesEl = document.getElementById('languages-list');
	if (languagesEl) {
	setImage('languages-media', data.media?.languages, 'Languages visual');
		languagesEl.innerHTML = '';
		if (Array.isArray(data.languages) && data.languages.length) {
			data.languages.forEach((lang) => {
				const li = document.createElement('li');
				li.className = 'badge';
				const label = [lang.name, lang.proficiency].filter(Boolean).join(' — ');
				li.textContent = label;
				languagesEl.appendChild(li);
			});
		}
		toggleSectionVisibility(languagesEl, Array.isArray(data.languages) && data.languages.length);
	}

	const internshipsEl = document.getElementById('internships-list');
	if (internshipsEl) {
	setImage('internships-media', data.media?.internships, 'Internship highlight');
		internshipsEl.innerHTML = '';
		if (Array.isArray(data.internships) && data.internships.length) {
			data.internships.forEach((internship) => {
				const art = document.createElement('article');
				art.className = 'timeline-item';
				const meta = [internship.company, internship.period].filter(Boolean).join(' • ');
				art.innerHTML = `
					<div class="ti-header">
						<h3>${internship.role || ''}</h3>
						<span class="ti-meta">${meta}</span>
					</div>
					<p>${internship.description || ''}</p>
				`;
				internshipsEl.appendChild(art);
			});
		}
		toggleSectionVisibility(internshipsEl, Array.isArray(data.internships) && data.internships.length);
	}

	const certificationsEl = document.getElementById('certifications-list');
	if (certificationsEl) {
	setImage('certifications-media', data.media?.certifications, 'Certification visual');
		certificationsEl.innerHTML = '';
		if (Array.isArray(data.certifications) && data.certifications.length) {
			data.certifications.forEach((cert) => {
				const li = document.createElement('li');
				li.className = 'badge';
				const label = [cert.name, cert.issuer, cert.year].filter(Boolean).join(' — ');
				if (cert.url) {
					const link = createLinkEl({ ...cert, label });
					if (link) {
						li.appendChild(link);
					}
				} else {
					li.textContent = label;
				}
				certificationsEl.appendChild(li);
			});
		}
		toggleSectionVisibility(certificationsEl, Array.isArray(data.certifications) && data.certifications.length);
	}

setImage('contact-media', data.media?.contact, 'Contact visual');

	const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
	if (navLinks.length) {
		const sectionObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				const activeId = `#${entry.target.id}`;
				navLinks.forEach((link) => {
					link.classList.toggle('is-active', link.getAttribute('href') === activeId);
				});
			});
		}, { rootMargin: '-45% 0px -45% 0px', threshold: 0.25 });

		navLinks.forEach((link) => {
			const target = document.querySelector(link.getAttribute('href'));
			if (target) {
				sectionObserver.observe(target);
			}
		});
	}

	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	}, { rootMargin: '0px 0px -15% 0px', threshold: 0.2 });

	const revealTargets = document.querySelectorAll('.hero-text, .section, .card, .timeline-item, .skills-grid article');
	revealTargets.forEach((el) => {
		if (!el.hasAttribute('data-reveal')) {
			el.setAttribute('data-reveal', '');
		}
		revealObserver.observe(el);
	});
})();


