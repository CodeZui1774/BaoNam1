window.addEventListener('load', () => {
    const messages = [
        "Hôm nay là ngày 20/10",
        "Chúc em một ngày lễ trọn vẹn, đầy ý nghĩa với những kỉ niệm đẹp nhất",
        "Chúc em luôn vui vẻ, gặp nhiều may mắn, chúc em mỗi ngày đều cười tươi",
        "Chúc em ngày càng xinh đẹp, giỏi giang, chúc em cuộc sống đong đầy bao nhiêu hạnh phúc đều là của em",
        "Và đặc biệt là không còn buồn phiền, tiêu cực, luôn an nhiên. Mỗi ngày trôi qua đèu là ngày hạnh phúc nhất..."
    ];

    const msgEl = document.getElementById('message');
    let i = 0;
    msgEl.style.opacity = 1;
    setInterval(() => {
        msgEl.style.opacity = 0;
        setTimeout(() => {
            i = (i + 1) % messages.length;
            msgEl.textContent = messages[i];
            msgEl.style.opacity = 1;
        }, 800);
    }, 4800);

    const falling = [];
    for (let k = 1; k <= 12; k++) falling.push(`style/img/Anh (${k}).png`);

    const memories = [
        'style/memory/AnhKyNiem (1).jpg',
        'style/memory/AnhKyNiem (2).jpg',
        'style/memory/AnhKyNiem (3).jpg',
        'style/memory/AnhKyNiem (4).jpg',
        'style/memory/AnhKyNiem (5).jpg',
        'style/memory/AnhKyNiem (6).jpg'
    ];

    const popupTexts = [
        "Hôm nay là ngày 20/10",
        "Chúc em một ngày lễ trọn vẹn, đầy ý nghĩa với những kỉ niệm đẹp nhất",
        "Chúc em luôn vui vẻ, gặp nhiều may mắn, chúc em mỗi ngày đều cười tươi",
        "Chúc em ngày càng xinh đẹp, giỏi giang, chúc em cuộc sống đong đầy bao nhiêu hạnh phúc đều là của em",
        "Và đặc biệt là không còn buồn phiền, tiêu cực, luôn an nhiên. Mỗi ngày trôi qua đèu là ngày hạnh phúc nhất..."
    ];

    const overlay = document.getElementById('overlay');
    const popupImg = document.getElementById('popupImg');
    const popupCaption = document.getElementById('popupCaption');
    const popupText = document.getElementById('popupText');

    function openPopup(imgSrc, captionText) {
        popupCaption.textContent = captionText || '';
        popupImg.style.display = '';
        popupImg.src = imgSrc || '';
        popupText.textContent = '';
        setTimeout(() => {
            overlay.style.display = 'flex';
            overlay.setAttribute('aria-hidden', 'false');
        }, 40);
    }

    popupImg.addEventListener('error', () => {
        popupImg.style.display = 'none';
        if (!popupText.textContent) popupText.textContent = "Ảnh kỷ niệm không tìm thấy, nhưng lời nhắn vẫn ở đây ❤️";
    });

    function closePopup() {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
        popupImg.src = '';
        popupText.textContent = '';
        popupCaption.textContent = '';
    }
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });

    const activePositions = [];
    function createFallingImage() {
        let left;
        const safe = 8;
        const minDistance = 10;
        let tries = 0;
        do {
            left = safe + Math.random() * (100 - 2 * safe);
            tries++;
        } while (activePositions.some(x => Math.abs(x - left) < minDistance) && tries < 20);

        const el = document.createElement('img');
        el.className = 'falling-img';
        el.src = falling[Math.floor(Math.random() * falling.length)];
        el.style.left = left + 'vw';

        let min = 80, max = 120;
        if (window.innerWidth <= 480) { min = 40; max = 70; }
        else if (window.innerWidth <= 768) { min = 60; max = 90; }
        el.style.width = (min + Math.random() * (max - min)) + 'px';
        el.style.animationDuration = (8 + Math.random() * 4) + 's';
        el.style.transform = `rotate(${Math.random() * 360}deg)`;

        el.addEventListener('click', (ev) => {
            const mem = memories[Math.floor(Math.random() * memories.length)];
            const txt = popupTexts[Math.floor(Math.random() * popupTexts.length)];
            openPopup(mem, txt);
            ev.stopPropagation();
        });

        document.body.appendChild(el);
        activePositions.push(left);

        setTimeout(() => {
            el.remove();
            const idx = activePositions.indexOf(left);
            if (idx !== -1) activePositions.splice(idx, 1);
        }, 14000);
    }

    setInterval(createFallingImage, 1100);

    const bgm = document.getElementById('bgm');
    const toggle = document.getElementById('soundToggle');
    let playing = false;

    toggle.addEventListener('click', async () => {
        try {
            if (!playing) {
                bgm.currentTime = 68;
                await bgm.play();
                toggle.textContent = "🔈";
                playing = true;
            } else {
                bgm.pause();
                toggle.textContent = "🔇";
                playing = false;
            }
        } catch (err) {
            console.log("Không thể phát", err);
        }
    }
    );

});
