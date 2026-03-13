const prizes = {
  gift1: {
    key: "gift1",
    title: "惊喜礼物一 · 运动手环券",
    shortTitle: "运动手环券",
    img: "assets/shouhuan.jpg",
    subtitle: "金星掉落 · 惊喜礼物系列",
    whisper: "戴上它，看看你每天能为我心跳加速多少次——虽然我猜是0，毕竟你已经习惯我这么可爱了😏"
  },
  gift2: {
    key: "gift2",
    title: "惊喜礼物二 · 游戏耳机券",
    shortTitle: "游戏耳机券",
    img: "assets/tech.jpg",
    subtitle: "水星掉落 · 惊喜礼物系列",
    whisper: "听声辨位是基操，听出我在隔壁房间偷偷吃零食才是本事😏"
  },
  game: {
    key: "game",
    title: "游戏陪玩券",
    shortTitle: "游戏陪玩券",
    img: "assets/youxi.jpg",
    subtitle: "木星掉落 · 惊喜礼券",
    whisper: "陪你玩一天游戏，你负责carry，我负责在你身后喊“666”和“救我救我”🫡"
  },
  gift4: {
    key: "gift4",
    title: "惊喜礼物四 · 篮球券",
    shortTitle: "篮球券",
    img: "assets/lanqiu.jpg",
    subtitle: "火星掉落 · 惊喜礼物系列",
    whisper: "拿着它去球场装X，没进就说女朋友送的球，还没适应🤪"
  },
  movie: {
    key: "movie",
    title: "电影券",
    shortTitle: "电影券",
    img: "assets/dianying.jpg",
    subtitle: "海王星掉落 · 惊喜礼券",
    whisper: "请你看电影，买一送一：一张电影票，附赠一个随时炫完你爆米花的女朋友🤪"
  },
  hidden: {
    key: "hidden",
    title: "全心全意券（隐藏款）",
    shortTitle: "全心全意券（隐藏款）",
    img: "assets/yincang.jpg",
    subtitle: "黑洞掉落 · 隐藏款",
    whisper: "恭喜你抽中隐藏款！奖励是：实现任一愿望！🎉"
  },
  snack: {
    key: "snack",
    title: "零食大礼包券",
    shortTitle: "零食大礼包券",
    img: "assets/lingshi.png",
    subtitle: "天王星掉落 · 惊喜礼券",
    whisper: "凭此券，可获得女朋友亲手挑选的零食大礼包一份（口味随机，保证不难吃）🤤；\n也可以选择和我一起去超市采购，你推车，我拿零食~\n注：如果我想吃你的零食，你要分我一半！😋"
  },
  lucky: {
    key: "lucky",
    title: "好运连连",
    shortTitle: "好运连连",
    img: "assets/haoyun.jpg",
    subtitle: "地球特别掉落 · lucky",
    whisper: "恭喜你触发好运连连！本次不计入最终奖品列表，并为你额外增加一次抽奖机会🤩"
  },
  gift3: {
    key: "gift3",
    title: "惊喜礼物三 · 音乐耳机券",
    shortTitle: "音乐耳机券",
    img: "assets/yinyue.jpg",
    subtitle: "冥王星掉落 · 惊喜礼物系列",
    whisper: "入耳式的戴久了耳朵疼，头戴式的舒服点~😊"
  }
};

const sectorAngles = {
  gift1: 0,
  gift2: 40,
  game: 80,
  gift4: 120,
  movie: 160,
  hidden: 200,
  snack: 240,
  lucky: 280,
  gift3: 320
};

let drawCount = 3;
let totalSpinCount = 0;
let selectedPrize = null;
let isExtraDrawGranted = false;
let isSpinning = false;
let pointerRotation = 0;
let fireworksMode = "soft";
let fireworksStarted = false;
let cakeTimer = null;
let cakeMovedToGift = false;
const collectedPrizes = [];
const clickedWishStars = new Set();

const introScreen = document.getElementById("introScreen");
const wheelScreen = document.getElementById("wheelScreen");
const ticketScreen = document.getElementById("ticketScreen");
const prizeScreen = document.getElementById("prizeScreen");
const cakeScreen = document.getElementById("cakeScreen");

const introBtn = document.getElementById("introBtn");
const drawBtn = document.getElementById("drawBtn");
const spinBtn = document.getElementById("spinBtn");
const pointerNeedle = document.getElementById("pointerNeedle");
const drawCountText = document.getElementById("drawCountText");

const ticketCard = document.getElementById("ticketCard");
const ticketTitle = document.getElementById("ticketTitle");
const ticketSubtitle = document.getElementById("ticketSubtitle");
const ticketWhisper = document.getElementById("ticketWhisper");
const ticketImage = document.getElementById("ticketImage");
const ticketActions = document.getElementById("ticketActions");
const collectBtn = document.getElementById("collectBtn");
const downloadTicketBtn = document.getElementById("downloadTicketBtn");

const prizeList = document.getElementById("prizeList");
const goCakeBtn = document.getElementById("goCakeBtn");

const cakeStage = document.getElementById("cakeStage");
const giftStage = document.getElementById("giftStage");
const candlesWrap = document.getElementById("candlesWrap");
const blowBtn = document.getElementById("blowBtn");
const loveGiftBtn = document.getElementById("loveGiftBtn");
const lovePrizeTicket = document.getElementById("lovePrizeTicket");
const downloadLoveBtn = document.getElementById("downloadLoveBtn");

const openMusic = document.getElementById("openMusic");
const birthdaySong = document.getElementById("birthdaySong");
const interactiveSky = document.getElementById("interactiveSky");
const secretStar = document.getElementById("secretStar");
const rocketTrail = document.getElementById("rocketTrail");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicToggleText = document.getElementById("musicToggleText");

function showScreen(screen) {
  [introScreen, wheelScreen, ticketScreen, prizeScreen, cakeScreen].forEach((s) => {
    s.classList.remove("active");
    s.classList.add("hidden");
  });
  screen.classList.remove("hidden");
  screen.classList.add("active");
}

function updateDrawText() {
  drawCountText.textContent = `剩余抽奖次数：${drawCount}`;
}

introBtn.addEventListener("click", () => {
  showScreen(wheelScreen);
  attemptStartBackgroundMusic(true);
  updateDrawText();
});

function getUsedKeys() {
  return new Set(collectedPrizes.map((item) => item.key));
}

function getCollectedSurpriseKeys() {
  return collectedPrizes
    .map((item) => item.key)
    .filter((key) => ["gift1", "gift2", "gift3", "gift4"].includes(key));
}

function getNonSurprisePool() {
  const used = getUsedKeys();
  return ["game", "snack", "movie", "hidden"].filter((key) => !used.has(key));
}

function getAllowedSurprisePool() {
  const used = getUsedKeys();
  const collectedSurprises = getCollectedSurpriseKeys();
  let base = ["gift1", "gift2", "gift3", "gift4"].filter((key) => !used.has(key));

  // 规则③：一旦抽到惊喜礼物二，后续不再抽其他惊喜礼物
  if (collectedSurprises.includes("gift2")) return [];
  // 规则②：惊喜礼物二和三不能同时被抽到
  if (collectedSurprises.includes("gift3")) {
    base = base.filter((key) => key !== "gift2");
  }
  return base;
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedPick(weightMap) {
  const entries = Object.entries(weightMap).filter(([, weight]) => weight > 0);
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  if (!entries.length || total <= 0) return null;
  let roll = Math.random() * total;
  for (const [key, weight] of entries) {
    roll -= weight;
    if (roll <= 0) return key;
  }
  return entries[entries.length - 1][0];
}

function pickNonSurpriseWeighted(nonSurprisePool, booster = {}) {
  const baseWeights = {
    game: 30,
    snack: 26,
    movie: 24,
    hidden: 12,
    ...booster
  };
  const available = {};
  nonSurprisePool.forEach((key) => {
    available[key] = baseWeights[key] ?? 20;
  });
  const picked = weightedPick(available);
  return picked ? prizes[picked] : prizes[randomPick(nonSurprisePool)];
}

function choosePrize() {
  totalSpinCount += 1;

  // 规则④：第三次抽奖固定为好运连连
  if (totalSpinCount === 3) {
    return prizes.lucky;
  }

  const nonSurprisePool = getNonSurprisePool();
  const collectedSurprises = getCollectedSurpriseKeys();
  const surpriseCount = collectedSurprises.length;
  const firstSurprise = collectedSurprises[0] || null;
  const hasGift1 = collectedSurprises.includes("gift1");
  const hasGift2 = collectedSurprises.includes("gift2");
  const hasGift3 = collectedSurprises.includes("gift3");
  const hasGift4 = collectedSurprises.includes("gift4");

  // 第一抽：必须抽到惊喜礼物系列；礼物一概率最大，礼物二次之，礼物三/四更低
  if (surpriseCount === 0) {
    const firstPick = weightedPick({
      gift1: 43,
      gift2: 29,
      gift3: 21,
      gift4: 7
    }) || "gift1";
    return prizes[firstPick];
  }

  // 礼物二是“单独成套”的高优先级结果：抽到它后，不再出现其他惊喜礼物
  if (hasGift2) {
    return pickNonSurpriseWeighted(nonSurprisePool, { hidden: 10 });
  }

  // 兜底：最终奖品里不能三次都来自惊喜礼物系列
  // 由于第3次固定是好运连连，这里主要限制第4次额外抽奖不能把前两次都为惊喜时凑成3个惊喜
  if (surpriseCount >= 2) {
    return pickNonSurpriseWeighted(nonSurprisePool, { movie: 30 });
  }

  // 已抽到礼物一：后续更偏向非惊喜券；礼物三/四可以再掉，但概率再次之
  if (hasGift1) {
    const options = {};
    nonSurprisePool.forEach((key) => {
      options[key] = { game: 28, snack: 26, movie: 24, hidden: 12 }[key] ?? 20;
    });

    if (!hasGift3) options.gift3 = 10;
    if (!hasGift4) options.gift4 = 8;

    const picked = weightedPick(options);
    if (picked) return prizes[picked];
    return pickNonSurpriseWeighted(nonSurprisePool);
  }

  // 先抽到礼物三：不能再抽礼物二；倾向非惊喜，其次补礼物一
  if (hasGift3) {
    const options = {};
    nonSurprisePool.forEach((key) => {
      options[key] = { game: 30, snack: 26, movie: 24, hidden: 12 }[key] ?? 20;
    });
    if (!hasGift1) options.gift1 = 14;
    if (!hasGift4) options.gift4 = 7;
    const picked = weightedPick(options);
    if (picked) return prizes[picked];
    return pickNonSurpriseWeighted(nonSurprisePool);
  }

  // 先抽到礼物四：同样偏向非惊喜，其次补礼物一
  if (hasGift4) {
    const options = {};
    nonSurprisePool.forEach((key) => {
      options[key] = { game: 29, snack: 26, movie: 24, hidden: 12 }[key] ?? 20;
    });
    if (!hasGift1) options.gift1 = 16;
    if (!hasGift3) options.gift3 = 8;
    const picked = weightedPick(options);
    if (picked) return prizes[picked];
    return pickNonSurpriseWeighted(nonSurprisePool);
  }

  return pickNonSurpriseWeighted(nonSurprisePool);
}

function clearPlanetHighlight() {
  document.querySelectorAll(".planet-slot.active-hit").forEach((el) => el.classList.remove("active-hit"));
}

function highlightPlanet(key) {
  clearPlanetHighlight();
  const target = document.querySelector(`.planet-slot[data-key="${key}"]`);
  if (target) target.classList.add("active-hit");
}

function triggerSpin() {
  if (isSpinning || drawCount <= 0) return;

  isSpinning = true;
  selectedPrize = choosePrize();
  const targetAngle = sectorAngles[selectedPrize.key] ?? 0;
  const extraTurns = 1800 + Math.floor(Math.random() * 240);
  pointerRotation += extraTurns + targetAngle;

  clearPlanetHighlight();
  pointerNeedle.style.transform = `rotate(${pointerRotation}deg)`;

  setTimeout(() => {
    highlightPlanet(selectedPrize.key);
    showTicket(selectedPrize);
    isSpinning = false;
  }, 4300);
}

drawBtn.addEventListener("click", triggerSpin);
spinBtn.addEventListener("click", triggerSpin);

function showTicket(prize) {
  showScreen(ticketScreen);
  ticketActions.classList.add("hidden");
  ticketCard.classList.remove("show", "reveal");

  ticketTitle.textContent = prize.title;
  ticketSubtitle.textContent = prize.subtitle;
  ticketWhisper.innerText = prize.whisper;
  ticketImage.src = prize.img;
  ticketImage.alt = prize.title;

  void ticketCard.offsetWidth;
  ticketCard.classList.add("show");

  fireworksMode = "soft";
  startFireworks();

  setTimeout(() => {
    ticketCard.classList.add("reveal");
  }, 950);

  setTimeout(() => {
    ticketActions.classList.remove("hidden");
  }, 1750);
}

collectBtn.addEventListener("click", () => {
  if (!selectedPrize) return;

  drawCount -= 1;
  if (selectedPrize.key === "lucky") {
    if (!isExtraDrawGranted) {
      drawCount += 1;
      isExtraDrawGranted = true;
    }
  } else {
    collectedPrizes.push(selectedPrize);
  }

  updateDrawText();
  clearPlanetHighlight();

  if (drawCount > 0) {
    showScreen(wheelScreen);
  } else {
    renderPrizeList();
    showScreen(prizeScreen);
  }
});

function renderPrizeList() {
  prizeList.innerHTML = "";
  collectedPrizes.forEach((item) => {
    const card = document.createElement("div");
    card.className = "prize-item";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <h3>${item.shortTitle}</h3>
      <p>${item.whisper.replace(/\n/g, "<br>")}</p>
    `;
    prizeList.appendChild(card);
  });
}

goCakeBtn.addEventListener("click", () => {
  showScreen(cakeScreen);
  cakeStage.classList.remove("hidden");
  giftStage.classList.add("hidden");
  lovePrizeTicket.classList.add("hidden");
  downloadLoveBtn.classList.add("hidden");
  candlesWrap.classList.remove("off");
  playBirthdaySong();
  fireworksMode = "grand";
  startFireworks();
  if (cakeTimer) clearTimeout(cakeTimer);
  cakeMovedToGift = false;
  cakeTimer = setTimeout(moveToGiftStage, 21000);
});

function moveToGiftStage() {
  if (cakeMovedToGift) return;
  cakeMovedToGift = true;
  candlesWrap.classList.add("off");
  cakeStage.classList.add("hidden");
  giftStage.classList.remove("hidden");
  lovePrizeTicket.classList.add("hidden");
  loveGiftBtn.classList.remove("open");
  downloadLoveBtn.classList.add("hidden");
}

blowBtn.addEventListener("click", moveToGiftStage);
candlesWrap.addEventListener("click", moveToGiftStage);

loveGiftBtn.addEventListener("click", () => {
  loveGiftBtn.classList.add("open");
  setTimeout(() => {
    lovePrizeTicket.classList.remove("hidden");
    downloadLoveBtn.classList.remove("hidden");
  }, 450);
});

function syncMusicToggle() {
  if (!musicToggleBtn || !musicToggleText) return;
  musicToggleBtn.classList.toggle("is-off", !bgMusicEnabled);
  musicToggleBtn.setAttribute("aria-pressed", String(bgMusicEnabled));
  musicToggleText.textContent = bgMusicEnabled
    ? "背景音乐已准备好，若还没响，轻轻点我一下"
    : "背景音乐已关闭，想听的时候再点我一下";
}

function attemptStartBackgroundMusic(force = false) {
  if (!bgMusicEnabled && !force) return;
  birthdaySong.pause();
  birthdaySong.currentTime = 0;
  openMusic.loop = true;
  if (openMusic.paused) {
    openMusic.play().then(() => {
      bgMusicUnlocked = true;
      syncMusicToggle();
    }).catch(() => {
      syncMusicToggle();
    });
  }
}

function toggleBackgroundMusic() {
  bgMusicEnabled = !bgMusicEnabled;
  if (bgMusicEnabled) {
    attemptStartBackgroundMusic(true);
  } else {
    openMusic.pause();
  }
  syncMusicToggle();
}

if (musicToggleBtn) {
  musicToggleBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleBackgroundMusic();
  });
}

window.addEventListener("load", () => {
  syncMusicToggle();
  setTimeout(() => attemptStartBackgroundMusic(), 180);
});

document.addEventListener("pointerdown", () => {
  if (bgMusicEnabled && openMusic.paused && birthdaySong.paused) {
    attemptStartBackgroundMusic(true);
  }
}, { once: true });

function playOpenMusic() {
  attemptStartBackgroundMusic(true);
}

function playBirthdaySong() {
  openMusic.pause();
  openMusic.currentTime = 0;
  birthdaySong.currentTime = 0;
  birthdaySong.play().catch(() => {});
}

birthdaySong.addEventListener("ended", () => {
  if (bgMusicEnabled && cakeMovedToGift) {
    attemptStartBackgroundMusic(true);
  }
});

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let particles = [];
let textBursts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createFirework(mode = "soft", x = null, y = null) {
  const px = x ?? Math.random() * canvas.width;
  const py = y ?? (80 + Math.random() * canvas.height * 0.5);
  const count = mode === "grand" ? 70 + Math.floor(Math.random() * 50) : 34 + Math.floor(Math.random() * 24);
  for (let i = 0; i < count; i++) {
    const hue = 40 + Math.random() * 280;
    const speedBase = mode === "grand" ? 13 : 9;
    particles.push({
      x: px,
      y: py,
      radius: 1.8 + Math.random() * (mode === "grand" ? 3.8 : 2.8),
      speedX: (Math.random() - 0.5) * speedBase,
      speedY: (Math.random() - 0.5) * speedBase,
      alpha: 1,
      hue
    });
  }
}

function addWishBurst(text, x, y) {
  textBursts.push({ text, x, y, alpha: 1, dy: 0 });
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const probability = fireworksMode === "grand" ? 0.18 : 0.08;
  if (Math.random() < probability) createFirework(fireworksMode);

  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.alpha -= fireworksMode === "grand" ? 0.012 : 0.015;
  });
  particles = particles.filter((p) => p.alpha > 0);

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.alpha})`;
    ctx.fill();
  });

  textBursts.forEach((item) => {
    item.dy += 0.18;
    item.alpha -= 0.013;
    ctx.font = "bold 30px Microsoft YaHei";
    ctx.textAlign = "center";
    ctx.fillStyle = `rgba(255,245,195,${item.alpha})`;
    ctx.strokeStyle = `rgba(118,69,255,${item.alpha * 0.6})`;
    ctx.lineWidth = 5;
    ctx.strokeText(item.text, item.x, item.y - item.dy * 12);
    ctx.fillText(item.text, item.x, item.y - item.dy * 12);
  });
  textBursts = textBursts.filter((item) => item.alpha > 0);

  requestAnimationFrame(animateFireworks);
}

function startFireworks() {
  if (fireworksStarted) return;
  fireworksStarted = true;
  animateFireworks();
}

const wishWords = ["平安喜乐", "未来可期", "顺遂无忧", "心想事成", "梦想成真", "好运连连", "幸福快乐"];

function createWishStars() {
  const positions = [
    [8,16],[16,28],[23,12],[32,22],[40,14],[48,28],[57,10],[64,22],[72,14],[81,27],
    [12,44],[21,54],[30,42],[39,58],[50,46],[60,56],[71,42],[82,52]
  ];
  interactiveSky.innerHTML = "";
  positions.forEach((pos, index) => {
    const btn = document.createElement("button");
    btn.className = "wish-star";
    btn.style.left = `${pos[0]}%`;
    btn.style.top = `${pos[1]}%`;
    btn.style.animationDelay = `${(index % 7) * 0.4}s`;
    btn.dataset.word = wishWords[index % wishWords.length];
    btn.addEventListener("click", () => {
      const rect = btn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      createFirework("soft", x, y);
      addWishBurst(btn.dataset.word, x, y - 10);
      clickedWishStars.add(index);
      btn.classList.add("touched");
    });
    interactiveSky.appendChild(btn);
  });
}
createWishStars();

let secretUnlocked = false;
let bgMusicEnabled = true;
let bgMusicUnlocked = false;
secretStar.addEventListener("dblclick", () => {
  if (secretUnlocked) return;
  secretUnlocked = true;
  rocketTrail.classList.remove("hidden");
  rocketTrail.classList.add("show");
  const rect = secretStar.getBoundingClientRect();
  createFirework("soft", rect.left, rect.top);
  setTimeout(() => {
    rocketTrail.classList.remove("show");
    setTimeout(() => rocketTrail.classList.add("hidden"), 500);
    secretUnlocked = false;
  }, 5600);
});

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function wrapText(ctx, text, maxWidth) {
  const paragraphs = String(text).split("\n");
  const lines = [];
  paragraphs.forEach((para) => {
    let current = "";
    for (const ch of para) {
      const test = current + ch;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = ch;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
  });
  return lines;
}

async function downloadPrizeTicket(prize) {
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 820;
  const c = canvas.getContext("2d");

  const grad = c.createLinearGradient(0,0,1400,820);
  grad.addColorStop(0, "#f6e3ab");
  grad.addColorStop(0.5, "#dfb85f");
  grad.addColorStop(1, "#f8edc7");

  c.fillStyle = grad;
  roundRect(c, 40, 40, 1320, 740, 48, true, false);
  c.strokeStyle = "rgba(148,96,10,0.55)";
  c.lineWidth = 6;
  roundRect(c, 40, 40, 1320, 740, 48, false, true);

  drawNotch(c, 40, 260, "left");
  drawNotch(c, 40, 560, "left");
  drawNotch(c, 1360, 260, "right");
  drawNotch(c, 1360, 560, "right");

  c.fillStyle = "#8d5609";
  c.font = "bold 34px Microsoft YaHei";
  c.fillText("专属奖券", 110, 120);
  c.font = "bold 64px Microsoft YaHei";
  c.fillText(prize.title, 110, 220);
  c.font = "30px Microsoft YaHei";
  c.fillStyle = "#6c4f14";
  c.fillText(prize.subtitle, 110, 280);

  c.fillStyle = "rgba(255,250,239,0.58)";
  roundRect(c, 90, 350, 720, 280, 28, true, false);
  c.fillStyle = "#443221";
  c.font = "36px Microsoft YaHei";
  const lines = wrapText(c, prize.whisper, 650);
  lines.slice(0, 6).forEach((line, i) => c.fillText(line, 125, 425 + i * 52));

  try {
    const img = await loadImage(prize.img);
    c.save();
    roundRect(c, 900, 150, 360, 360, 28, false, false);
    c.clip();
    c.drawImage(img, 900, 150, 360, 360);
    c.restore();
    c.strokeStyle = "rgba(148,96,10,0.35)";
    c.lineWidth = 4;
    roundRect(c, 900, 150, 360, 360, 28, false, true);
  } catch (e) {}

  triggerDownload(canvas.toDataURL("image/png"), `${prize.shortTitle}.png`);
}

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function drawNotch(ctx, x, y, side) {
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function triggerDownload(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

downloadTicketBtn.addEventListener("click", () => {
  if (selectedPrize) downloadPrizeTicket(selectedPrize);
});

downloadLoveBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 700;
  const c = canvas.getContext("2d");
  const grad = c.createLinearGradient(0,0,1400,700);
  grad.addColorStop(0, "#f6e3ab");
  grad.addColorStop(0.5, "#dfb85f");
  grad.addColorStop(1, "#f8edc7");
  c.fillStyle = grad;
  roundRect(c, 40, 40, 1320, 620, 48, true, false);
  c.strokeStyle = "rgba(148,96,10,0.55)";
  c.lineWidth = 6;
  roundRect(c, 40, 40, 1320, 620, 48, false, true);
  drawNotch(c, 40, 210, "left");
  drawNotch(c, 40, 490, "left");
  drawNotch(c, 1360, 210, "right");
  drawNotch(c, 1360, 490, "right");
  c.fillStyle = "#8d5609";
  c.font = "bold 36px Microsoft YaHei";
  c.fillText("额外大奖", 110, 120);
  c.font = "bold 68px Microsoft YaHei";
  c.fillText("“爱心大餐”兑换券", 110, 235);
  c.fillStyle = "rgba(255,250,239,0.55)";
  roundRect(c, 90, 300, 1220, 220, 28, true, false);
  c.fillStyle = "#443221";
  c.font = "42px Microsoft YaHei";
  c.fillText("恭喜你获得了一次我亲手做的大餐兑换券！", 140, 390);
  c.fillText("有效期：一辈子", 140, 470);
  triggerDownload(canvas.toDataURL("image/png"), "爱心大餐兑换券.png");
});
