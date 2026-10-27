/* ============================================================
	Aster451
	Accessible Styling & Techniques for Expressive Representation Web-Template
	451 Standard

	1. Tabview
	2. Hamburger Menu
	3. Table of Contents
   ========================================================== */


/* 1. Tabview ----------------------------------------------- */

document.querySelectorAll('.tabview-navset').forEach(set => {

	const tabs = set.querySelectorAll('.tabview-nav li');
	const panes = set.querySelectorAll('.tabview-content > div');

	function select(index) {

		tabs.forEach((tab, i) => {

			const selected = i === index;

			tab.classList.toggle('selected', selected);

			const link = tab.firstElementChild;

			if (link) {
				link.setAttribute('aria-selected', selected);
			}

		});

		panes.forEach((pane, i) => {
			pane.classList.toggle('active', i === index);
		});

	}

	tabs.forEach((tab, index) => {

		const link = tab.firstElementChild;

		if (!link) return;

		link.setAttribute('role', 'tab');
		link.tabIndex = 0;

		link.addEventListener('click', () => {
			select(index);
		});

		link.addEventListener('keydown', event => {

			if (event.key === 'Enter' || event.key === ' ') {

				event.preventDefault();
				select(index);

			}

			if (
				event.key === 'ArrowRight' ||
				event.key === 'ArrowLeft'
			) {

				const next =
					(
						index +
						(
							event.key === 'ArrowRight'
								? 1
								: tabs.length - 1
						)
					) % tabs.length;

				select(next);
				tabs[next].firstElementChild.focus();

			}

		});

	});

	panes.forEach(pane => {
		pane.setAttribute('role', 'tabpanel');
	});

	// 最初のタブを表示
	if (tabs.length > 0) {
		select(0);
	}

});

/* 2. Hamburger Menu --------------------------------------- */

(function () {

	const button = document.querySelector('.menu-button');
	const drawer = document.getElementById('drawer');
	const backdrop = document.getElementById('backdrop');

	if (!button || !drawer || !backdrop) {
		return;
	}

	function setOpen(open) {

		drawer.classList.toggle('open', open);
		backdrop.classList.toggle('open', open);
		document.body.classList.toggle('menu-open', open);

		button.setAttribute('aria-expanded', open);

		button.setAttribute(
			'aria-label',
			open ? 'メニューを閉じる' : 'メニューを開く'
		);

		if (open) {

			const firstLink = drawer.querySelector('a');

			if (firstLink) {
				firstLink.focus();
			}

		} else {

			button.focus();

		}

	}

	button.addEventListener('click', () => {

		const open =
			button.getAttribute('aria-expanded') !== 'true';

		setOpen(open);

	});

	backdrop.addEventListener('click', () => {
		setOpen(false);
	});

	drawer.addEventListener('click', event => {

		if (event.target.closest('a')) {
			setOpen(false);
		}

	});

	document.addEventListener('keydown', event => {

		if (
			event.key === 'Escape' &&
			drawer.classList.contains('open')
		) {
			setOpen(false);
		}

	});

})();


// ------------------------------------------------------------
// Local Image Preview
// ------------------------------------------------------------

(function () {

	const picker = document.getElementById('img-test');

	if (!picker) {
		return;
	}

	picker.addEventListener('change', () => {

		const file = picker.files[0];

		if (!file) {
			return;
		}

		const image = document.getElementById('img-preview');
		const caption = document.getElementById('img-caption');

		if (!image || !caption) {
			return;
		}

		image.src = URL.createObjectURL(file);
		image.alt = file.name;

		caption.textContent = file.name;

	});

})();

/* 3. Table of Contents ------------------------------------- */

/*
	使い方:
	<div class="toc" toc-title="目次"></div>

	属性（すべて省略可。data- 付きでも指定できます）
	  toc-title      目次のタイトル（既定: 目次）
	  section-level  最初の番号の開始値（既定: 1）
	  toc-max-level  目次に含める最も深い見出し（2〜6、既定: 6）
	  toc-target     見出しを探す範囲のCSSセレクタ（既定: ページ全体）

	除外: 見出し（または祖先）に data-toc-ignore を付ける

	生成するマークアップ（スタイルはテーマ側のCSSで定義）
	  .toc > .toc-title + ol.toc-list > li.toc-level-hN[data-number]
	  li には --toc-depth（0〜）が設定され、現在位置の li には .current、
	  a には aria-current="location" が付きます。

	生成完了時に document へ 'aster451:toc' イベントを送ります
	  (detail.count = 生成した項目数)。
	動的に見出しを追加した場合は Aster451.generateTOC() で再生成できます。
*/

(function () {

	const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6';
	const DEFAULT_TITLE = '目次';

	let observer = null;

	// 属性 → data-属性 → 既定値 の順で読む
	function readAttr(element, name, fallback) {

		const value =
			element.getAttribute(name) ??
			element.getAttribute('data-' + name);

		return value === null || value === undefined
			? fallback
			: value;

	}

	function levelOf(heading) {
		return Number(heading.tagName.slice(1));
	}

	// 見出しのテキストからIDを作る（重複時は -2, -3 ... を付与）
	function assignIds(headings, usedIds) {

		headings.forEach((heading, index) => {

			if (heading.id) {
				return;
			}

			const baseId =
				heading.textContent.trim()
					.normalize('NFKC')
					.toLowerCase()
					.replace(/[^\p{L}\p{N}]+/gu, '-')
					.replace(/^-|-$/g, '')
				|| `heading-${index + 1}`;

			let id = baseId;
			let suffix = 2;

			while (usedIds.has(id)) {
				id = `${baseId}-${suffix++}`;
			}

			heading.id = id;
			usedIds.add(id);

		});

	}

	// 番号を作る。階層が飛んでも「1-0-1」のように0を出さない
	function createNumberer(startLevel) {

		const levels = [];
		const counts = [];

		return level => {

			while (levels.length && levels[levels.length - 1] > level) {
				levels.pop();
				counts.pop();
			}

			if (levels.length && levels[levels.length - 1] === level) {
				counts[counts.length - 1]++;
			} else {
				levels.push(level);
				counts.push(1);
			}

			const numbers = counts.slice();
			numbers[0] = startLevel + numbers[0] - 1;

			return {
				number: numbers.join('-'),
				depth: counts.length - 1
			};

		};

	}

	// 目次1つ分の見出しを集める
	function collectHeadings(toc) {

		const selector = readAttr(toc, 'toc-target', '');
		let scope = document;

		if (selector) {

			try {
				scope = document.querySelector(selector) || document;
			} catch (error) {
				scope = document;
			}

		}

		return [...scope.querySelectorAll(HEADING_SELECTOR)].filter(heading =>
			heading.textContent.trim() &&
			!heading.closest('[data-toc-ignore], .toc')
		);

	}

	function buildToc(toc, headings, linkMap) {

		const title = readAttr(toc, 'toc-title', DEFAULT_TITLE) || DEFAULT_TITLE;

		const rawStart = readAttr(toc, 'section-level', null);
		const parsedStart = rawStart === null ? 1 : Number(rawStart);
		const startLevel =
			Number.isInteger(parsedStart) && parsedStart >= 0
				? parsedStart
				: 1;

		const rawMax = Number(readAttr(toc, 'toc-max-level', 6));
		const maxLevel =
			Number.isInteger(rawMax) && rawMax >= 2 && rawMax <= 6
				? rawMax
				: 6;

		const nextNumber = createNumberer(startLevel);

		const titleElement = document.createElement('div');
		titleElement.className = 'toc-title';
		titleElement.textContent = title;

		const list = document.createElement('ol');
		list.className = 'toc-list';

		headings.forEach(heading => {

			const level = levelOf(heading);

			// h1は番号付けしない。maxLevelより深い見出しも対象外
			if (level < 2 || level > maxLevel) {
				return;
			}

			const { number, depth } = nextNumber(level);

			const item = document.createElement('li');
			item.className = `toc-level-h${level}`;
			item.dataset.number = number;
			item.style.setProperty('--toc-depth', depth);

			const link = document.createElement('a');
			link.href = `#${encodeURIComponent(heading.id)}`;
			link.textContent = heading.textContent.trim();

			item.appendChild(link);
			list.appendChild(item);

			if (!linkMap.has(heading)) {
				linkMap.set(heading, []);
			}

			linkMap.get(heading).push({ item, link });

		});

		toc.replaceChildren();

		if (list.children.length === 0) {
			toc.hidden = true;
			return 0;
		}

		if (toc.tagName !== 'NAV') {
			toc.setAttribute('role', 'navigation');
		}

		toc.setAttribute('aria-label', title);

		toc.hidden = false;
		toc.append(titleElement, list);

		return list.children.length;

	}

	// スクロール位置に応じて現在の見出しをハイライトする
	function watchCurrentSection(linkMap) {

		if (observer) {
			observer.disconnect();
			observer = null;
		}

		if (!('IntersectionObserver' in window) || linkMap.size === 0) {
			return;
		}

		const headings = [...linkMap.keys()].sort((a, b) =>
			a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
				? -1
				: 1
		);

		const visible = new Set();
		let current = null;

		function mark(heading) {

			linkMap.forEach(entries => {

				entries.forEach(({ item, link }) => {
					item.classList.remove('current');
					link.removeAttribute('aria-current');
				});

			});

			(linkMap.get(heading) || []).forEach(({ item, link }) => {
				item.classList.add('current');
				link.setAttribute('aria-current', 'location');
			});

			current = heading;

		}

		observer = new IntersectionObserver(entries => {

			entries.forEach(entry => {

				if (entry.isIntersecting) {
					visible.add(entry.target);
				} else {
					visible.delete(entry.target);
				}

			});

			// 画面上部にある見出しのうち、文書順で最初のものを現在地にする
			const next = headings.find(heading => visible.has(heading));

			if (next && next !== current) {
				mark(next);
			}

		}, { rootMargin: '0px 0px -65% 0px' });

		headings.forEach(heading => observer.observe(heading));

	}

	function generateTOC() {

		const tocs = [
			...document.querySelectorAll('.toc[toc-title], .toc[data-toc-title]')
		];

		if (tocs.length === 0) {
			return 0;
		}

		const usedIds = new Set(
			[...document.querySelectorAll('[id]')].map(element => element.id)
		);

		const linkMap = new Map();
		let total = 0;

		tocs.forEach(toc => {

			const headings = collectHeadings(toc);

			// IDの付与は見出しごとに1回だけ
			assignIds(headings, usedIds);

			total += buildToc(toc, headings, linkMap);

		});

		watchCurrentSection(linkMap);

		document.dispatchEvent(
			new CustomEvent('aster451:toc', { detail: { count: total } })
		);

		return total;

	}

	window.Aster451 = window.Aster451 || {};
	window.Aster451.generateTOC = generateTOC;

	if (document.readyState === 'loading') {

		document.addEventListener('DOMContentLoaded', generateTOC, {
			once: true
		});

	} else {

		generateTOC();

	}

})();