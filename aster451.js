/* ============================================================
	Aster451
	Accessible Styling & Typography for Elegant Responsive Web
	451 Standard

	1. Tabview
	2. Hamburger Menu
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