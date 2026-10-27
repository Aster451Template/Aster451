const pick = document.getElementById('img-test');

pick.addEventListener('change', () => {

    const f = pick.files[0];

    if (!f) return;

    const img =
        document.getElementById('img-preview');

    img.src = URL.createObjectURL(f);
    img.alt = f.name;

    document.getElementById('img-caption')
        .textContent = f.name;

});