/**
 * DuoScreen - CarPlay Multi-Screen Dashboard & Infotainment
 * Complete application logic matching duoscreen.vercel.app with improvements
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= 1. STATE & STORAGE =================
  const STORAGE = {
    PROFILE: 'duo_driver_profile',
    SPEED_LIMIT: 'duo_speed_limit',
    GPS_OFFSET: 'duo_gps_offset',
    HISTORY: 'duo_history',
    SAVED_TRACKS: 'duo_saved_tracks',
    ACTIVE_TRACKS: 'duo_active_tracks',
    ACTIVE_QUERY: 'duo_active_query',
    PLAYLISTS: 'duo_playlists',
    AUDIO_ALERT: 'duo_audio_alert'
  };

  // Curated 20 verified driving tracks specifically arranged for Ford Territory
  const DEFAULT_TRACKS = [
    {
      id: '7_CNPRkVpQg',
      title: 'NHẠC NGHE TRÊN XE 🎧 MIXSET HOUSE LAK & DEEP HOUSE',
      channel: 'Hoàng Dương',
      views: '8.4M',
      time: '52:14',
      thumb: 'https://i.ytimg.com/vi/7_CNPRkVpQg/hqdefault.jpg'
    },
    {
      id: 'PUX1YnmGytM',
      title: 'Nhạc Chill TikTok 2025 - Những Bản Nhạc Lofi Chill Nhẹ Nhàng',
      channel: 'Mùa Đi Ngang Phố',
      views: '5.2M',
      time: '1:14:02',
      thumb: 'https://i.ytimg.com/vi/PUX1YnmGytM/hqdefault.jpg'
    },
    {
      id: 'm7Wya6Z-QdM',
      title: 'Từng Là, Giữa Đại Lộ Đông Tây, Thu Cuối - Nhạc Trẻ Chill',
      channel: 'Soul Tracks',
      views: '9.1M',
      time: '1:28:40',
      thumb: 'https://i.ytimg.com/vi/m7Wya6Z-QdM/hqdefault.jpg'
    },
    {
      id: 'Yzj-t2OIIVs',
      title: 'NHẠC TREND TIKTOK REMIX 2026 | NONSTOP VIỆT MIX BASS CỰC MẠNH',
      channel: 'Việt Mix TV',
      views: '14.5M',
      time: '1:05:30',
      thumb: 'https://i.ytimg.com/vi/Yzj-t2OIIVs/hqdefault.jpg'
    },
    {
      id: 'Bh2lnFf-uFQ',
      title: 'Những Bản Acoustic Nhẹ Nhàng - Tuyệt Phẩm Guitar & Piano Lái Xe',
      channel: 'Nguyễn Văn Chung',
      views: '3.7M',
      time: '48:15',
      thumb: 'https://i.ytimg.com/vi/Bh2lnFf-uFQ/hqdefault.jpg'
    },
    {
      id: 'H1SvdzDszBE',
      title: 'NHẠC NGHE TRÊN XE 🎧 House Lak & Deep Club Music Cực Bốc',
      channel: 'Neodrop Music',
      views: '6.8M',
      time: '1:12:00',
      thumb: 'https://i.ytimg.com/vi/H1SvdzDszBE/hqdefault.jpg'
    },
    {
      id: 'GXpi4UO9vwI',
      title: 'NONSTOP 2026 BAY PHÒNG - NHẠC SÀN VINAHOUSE DJ MIXTAPE CỰC BỐC',
      channel: 'Việt Mix TV',
      views: '11.2M',
      time: '1:02:18',
      thumb: 'https://i.ytimg.com/vi/GXpi4UO9vwI/hqdefault.jpg'
    },
    {
      id: 'GgE82Z2n6pg',
      title: 'Tuyển Tập Nhạc Chill Thịnh Suy: Nghe Em, Chuyện Rằng, Thắc Mắc',
      channel: 'Mùa Đi Ngang Phố',
      views: '7.4M',
      time: '56:30',
      thumb: 'https://i.ytimg.com/vi/GgE82Z2n6pg/hqdefault.jpg'
    },
    {
      id: '-7dHBvoeCRk',
      title: 'Acoustic Cover Thư Giãn Lái Xe - Nếu Em Không Về, Lãng Quên Chiều Thu',
      channel: 'TD Acoustic',
      views: '4.9M',
      time: '1:04:12',
      thumb: 'https://i.ytimg.com/vi/-7dHBvoeCRk/hqdefault.jpg'
    },
    {
      id: '-geU5H8Eu4w',
      title: 'NONSTOP BASS CỰC CĂNG - NHẠC ĐI BÃO TRÊN Ô TÔ SÔI ĐỘNG',
      channel: 'Mee Remix',
      views: '8.9M',
      time: '58:45',
      thumb: 'https://i.ytimg.com/vi/-geU5H8Eu4w/hqdefault.jpg'
    },
    {
      id: 'KjuCKeyaiBc',
      title: 'VIET DEEP 2026 - MIXTAPE HOUSE LAK SET NHẠC CŨ 9X ĐI XE',
      channel: 'GenZ MUSIC CLUB',
      views: '17.3M',
      time: '1:07:06',
      thumb: 'https://i.ytimg.com/vi/KjuCKeyaiBc/hqdefault.jpg'
    },
    {
      id: 'j7TqFbwxqcY',
      title: 'DEEP HOUSE 2026 - NHẠC REMIX DEEP HOUSE & HOUSE LAK CỰC HAY',
      channel: 'TDEEP HOUSE',
      views: '2.5M',
      time: '1:43:34',
      thumb: 'https://i.ytimg.com/vi/j7TqFbwxqcY/hqdefault.jpg'
    },
    {
      id: '_Ic6IkztKLI',
      title: 'PLAYLIST DEEP CHILL ĐƯỜNG MỘT CHILL - NHẠC LÁI XE CỰC PHÊ',
      channel: 'ACV Music',
      views: '395K',
      time: '1:03:06',
      thumb: 'https://i.ytimg.com/vi/_Ic6IkztKLI/hqdefault.jpg'
    },
    {
      id: 'SlQR9iu09bQ',
      title: 'SƠN TÙNG M-TP x TYGA | COME MY WAY | OFFICIAL MUSIC VIDEO',
      channel: 'Sơn Tùng M-TP Official',
      views: '44M',
      time: '3:55',
      thumb: 'https://i.ytimg.com/vi/SlQR9iu09bQ/hqdefault.jpg'
    },
    {
      id: 'xypzmu5mMPY',
      title: 'SƠN TÙNG M-TP | MUỘN RỒI MÀ SAO CÒN | OFFICIAL MUSIC VIDEO',
      channel: 'Sơn Tùng M-TP Official',
      views: '245M',
      time: '4:49',
      thumb: 'https://i.ytimg.com/vi/xypzmu5mMPY/hqdefault.jpg'
    },
    {
      id: 'LCyo565N_5w',
      title: 'Buông Đôi Tay Nhau Ra | OFFICIAL MUSIC VIDEO | Sơn Tùng M-TP',
      channel: 'Sơn Tùng M-TP Official',
      views: '182M',
      time: '4:50',
      thumb: 'https://i.ytimg.com/vi/LCyo565N_5w/hqdefault.jpg'
    },
    {
      id: '1eO83kwoVYQ',
      title: 'Tuyển Tập Nhạc Vàng Xưa 2026 - Bolero Trữ Tình Lái Xe Đường Dài',
      channel: 'Bến Tình BOLERO',
      views: '3.6K',
      time: '1:03:40',
      thumb: 'https://i.ytimg.com/vi/1eO83kwoVYQ/hqdefault.jpg'
    },
    {
      id: 'MjGGt1w5EeY',
      title: 'Có Chắc Yêu Là Đây - Chill Lofi Lái Xe Thư Giãn',
      channel: 'Cortis Vibe',
      views: '1.5M',
      time: '29:27',
      thumb: 'https://i.ytimg.com/vi/MjGGt1w5EeY/hqdefault.jpg'
    },
    {
      id: '7AEy7MtqUxo',
      title: 'Tổng Hợp List Nhạc Deep Chill Nghe Lái Xe Đêm Cực Thấm',
      channel: 'Hub Chill Music',
      views: '19K',
      time: '1:03:04',
      thumb: 'https://i.ytimg.com/vi/7AEy7MtqUxo/hqdefault.jpg'
    },
    {
      id: 'yuuWdm5tBD0',
      title: 'Sơn Tùng M-TP - Tuyển Tập Bản Phối Acoustic Lái Xe Êm Dịu',
      channel: 'M-TP Entertainment',
      views: '12M',
      time: '34:20',
      thumb: 'https://i.ytimg.com/vi/yuuWdm5tBD0/hqdefault.jpg'
    },
    {
      id: 'SSyqKSOwm-M',
      title: 'Playlist Nghe Nhạc Lái Xe Cực Chill 2026 - Nhạc Remix Deep Chill x Chill Out',
      channel: 'Muzik Chill',
      views: '2.1M',
      time: '1:08:45',
      thumb: 'https://i.ytimg.com/vi/SSyqKSOwm-M/hqdefault.jpg'
    },
    {
      id: '5BxoSQw9tOo',
      title: 'Mixset Chillout Hoài Niệm - Nhạc Lạnh Hot Tiktok 2026 Đi Xe',
      channel: 'Bụi Chill',
      views: '3.4M',
      time: '1:30:15',
      thumb: 'https://i.ytimg.com/vi/5BxoSQw9tOo/hqdefault.jpg'
    },
    {
      id: 'dpolE3013jk',
      title: 'Nhạc Chill Nhẹ Nhàng - Nhạc Chill TikTok Triệu View Hay Nhất Đi Đường',
      channel: 'Chill Vibe Media',
      views: '4.8M',
      time: '58:20',
      thumb: 'https://i.ytimg.com/vi/dpolE3013jk/hqdefault.jpg'
    },
    {
      id: 'F0XLVSbxhAo',
      title: 'Nhạc Chill Quán Cafe - Những Ca Khúc Lofi Nhẹ Nhàng Dành Cho Lái Xe',
      channel: 'Phố Lofi',
      views: '1.9M',
      time: '1:15:30',
      thumb: 'https://i.ytimg.com/vi/F0XLVSbxhAo/hqdefault.jpg'
    },
    {
      id: 'lkotmZNWq5I',
      title: '🍃Xanh Playlist🍃 TAN LÀM, BẬT NHẠC | Nhạc R&B Lofi Chill Yêu Đời',
      channel: 'Xanh Music',
      views: '850K',
      time: '45:10',
      thumb: 'https://i.ytimg.com/vi/lkotmZNWq5I/hqdefault.jpg'
    },
    {
      id: 'pB64u5qBd5g',
      title: 'ĐẾN KHI NÀO - Mặt Trời Ngừng Chiếu | Tuyển Tập Hits Nhạc Trẻ Chill',
      channel: 'Chill Station',
      views: '5.6M',
      time: '1:02:18',
      thumb: 'https://i.ytimg.com/vi/pB64u5qBd5g/hqdefault.jpg'
    },
    {
      id: 'Qj4vrbcgcg0',
      title: 'NHẠC NGHE TRÊN XE 🎧 House Lak & Deep Chill Hot TikTok 2026',
      channel: 'Deep House Vietnam',
      views: '3.1M',
      time: '1:10:05',
      thumb: 'https://i.ytimg.com/vi/Qj4vrbcgcg0/hqdefault.jpg'
    },
    {
      id: 'hhk8a58n-Is',
      title: '[ NHẠC LÁI XE CỰC CHILL 2026 ] DEEP CHILL PLAYLIST 🚗 Nhạc Trẻ Chillout',
      channel: 'Enjoy Music',
      views: '2.7M',
      time: '59:40',
      thumb: 'https://i.ytimg.com/vi/hhk8a58n-Is/hqdefault.jpg'
    },
    {
      id: 'nqSm-CH68Gg',
      title: 'Lái Xe Phải Nghe Nhạc Này ➤ Tuyệt Phẩm Rumba Bolero Trữ Tình Hay Nhất',
      channel: 'Trạm Bolero',
      views: '1.2M',
      time: '1:24:50',
      thumb: 'https://i.ytimg.com/vi/nqSm-CH68Gg/hqdefault.jpg'
    },
    {
      id: '8eEY_NqHlRw',
      title: 'Bolero Nhạc Trữ Tình Tuyển Chọn Đi Đường Dài Không Mệt Mỏi',
      channel: 'Phố Tây Bolero',
      views: '4.3M',
      time: '1:18:22',
      thumb: 'https://i.ytimg.com/vi/8eEY_NqHlRw/hqdefault.jpg'
    }
  ];
  const TRACKS = DEFAULT_TRACKS;

  let currentTrackIdx = 0;
  let isSoundEnabled = true;
  let isPlaying = false;
  let currentSpeed = 0;
  let maxSpeedRecorded = 0;
  let totalDistance = 0;
  let tripCount = 1;
  let speedLimit = 60;
  let gpsOffset = 0;
  let isSimulating = false;
  let simInterval = null;
  let isSwapped = false;
  let currentRatio = '16:9'; // Default Media fullscreen mode per user request

  let leafletMap = null;
  let mapInitialized = false;

  // Sound Synth
  let audioCtx = null;
  function playBeep(freq = 600, duration = 0.1, type = 'sine') {
    if (!isSoundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function speakVoice(text) {
    if (!isSoundEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }

  // ================= 2. ONBOARDING & PROFILE =================
  const welcomeModal = document.getElementById('welcomeModal');
  const btnCloseWelcome = document.getElementById('btnCloseWelcome');
  const driverNameInput = document.getElementById('driverNameInput');
  const btnStartOnboard = document.getElementById('btnStartOnboard');
  const avatarButtons = document.querySelectorAll('.avatar-btn');
  const profileAvatar = document.getElementById('profileAvatar');
  const profileName = document.getElementById('profileName');
  const profileModal = document.getElementById('profileModal');
  const btnProfile = document.getElementById('btnProfile');
  const btnCloseProfile = document.getElementById('btnCloseProfile');
  const btnSaveProfile = document.getElementById('btnSaveProfile');
  const btnResetProfile = document.getElementById('btnResetProfile');
  const profileNameEdit = document.getElementById('profileNameEdit');
  const profileDistance = document.getElementById('profileDistance');
  const profileMaxSpeed = document.getElementById('profileMaxSpeed');
  const profileTrips = document.getElementById('profileTrips');

  let selectedAvatar = '🏎️';

  if (welcomeModal) {
    welcomeModal.addEventListener('click', (e) => {
      if (e.target === welcomeModal) {
        welcomeModal.classList.add('hidden');
      }
    });
  }

  if (btnCloseWelcome) {
    btnCloseWelcome.addEventListener('click', () => {
      if (welcomeModal) welcomeModal.classList.add('hidden');
    });
  }

  avatarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      avatarButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAvatar = btn.getAttribute('data-avatar');
      playBeep(700, 0.08);
    });
  });

  function loadProfile() {
    try {
      const data = localStorage.getItem(STORAGE.PROFILE);
      if (data) {
        const p = JSON.parse(data);
        if (profileName) profileName.textContent = p.name || 'Ford Territory';
        if (profileAvatar) profileAvatar.textContent = p.avatar || '🚙';
        maxSpeedRecorded = p.maxSpeed || 0;
        totalDistance = p.distance || 0;
        tripCount = p.trips || 1;
      } else {
        const defaultProfile = { name: 'Ford Territory', avatar: '🚙', maxSpeed: 0, distance: 0, trips: 1 };
        try { localStorage.setItem(STORAGE.PROFILE, JSON.stringify(defaultProfile)); } catch (err) {}
        if (profileName) profileName.textContent = 'Ford Territory';
        if (profileAvatar) profileAvatar.textContent = '🚙';
      }
    } catch (e) {
      if (profileName) profileName.textContent = 'Ford Territory';
      if (profileAvatar) profileAvatar.textContent = '🚙';
    } finally {
      // Luôn đóng màn hình onboarding, không bao giờ chặn màn hình CarPlay của xe
      if (welcomeModal) welcomeModal.classList.add('hidden');
    }
  }

  if (btnStartOnboard) {
    btnStartOnboard.addEventListener('click', (e) => {
      if (e) e.preventDefault();
      const name = (driverNameInput && driverNameInput.value.trim()) || 'Ford Territory';
      const profile = { name, avatar: selectedAvatar || '🚙', maxSpeed: 0, distance: 0, trips: 1 };
      try { localStorage.setItem(STORAGE.PROFILE, JSON.stringify(profile)); } catch (err) {}
      if (profileName) profileName.textContent = name;
      if (profileAvatar) profileAvatar.textContent = selectedAvatar || '🚙';
      if (welcomeModal) welcomeModal.classList.add('hidden');
      playBeep(880, 0.2);
    });
  }

  btnProfile.addEventListener('click', () => {
    profileDistance.textContent = `${totalDistance.toFixed(1)} km`;
    profileMaxSpeed.textContent = `${maxSpeedRecorded} km/h`;
    profileTrips.textContent = tripCount;
    profileNameEdit.value = profileName.textContent;
    profileModal.classList.remove('hidden');
    playBeep(650, 0.1);
  });

  btnCloseProfile.addEventListener('click', () => profileModal.classList.add('hidden'));

  btnSaveProfile.addEventListener('click', () => {
    const newName = profileNameEdit.value.trim() || profileName.textContent;
    profileName.textContent = newName;
    const p = { name: newName, avatar: profileAvatar.textContent, maxSpeed: maxSpeedRecorded, distance: totalDistance, trips: tripCount };
    localStorage.setItem(STORAGE.PROFILE, JSON.stringify(p));
    profileModal.classList.add('hidden');
    playBeep(750, 0.1);
  });

  btnResetProfile.addEventListener('click', () => {
    if (confirm('Bạn có chắc muốn xóa dữ liệu hồ sơ và đặt lại từ đầu?')) {
      localStorage.clear();
      location.reload();
    }
  });

  // ================= 3. SPEED LIMIT & GPS OFFSET MODALS =================
  const speedLimitModal = document.getElementById('speedLimitModal');
  const speedLimitSign = document.getElementById('speedLimitSign');
  const limitDisplay = document.getElementById('limitDisplay');
  const speedPresetButtons = document.querySelectorAll('.speed-preset-btn');
  const stepperLimitValue = document.getElementById('stepperLimitValue');
  const btnLimitMinus = document.getElementById('btnLimitMinus');
  const btnLimitPlus = document.getElementById('btnLimitPlus');
  const btnApplyLimit = document.getElementById('btnApplyLimit');
  const btnCloseSpeedModal = document.getElementById('btnCloseSpeedModal');
  const overspeedLimitSpan = document.getElementById('overspeedLimit');

  let tempLimit = 60;

  speedLimitSign.addEventListener('click', () => {
    tempLimit = speedLimit;
    stepperLimitValue.textContent = `${tempLimit} km/h`;
    speedLimitModal.classList.remove('hidden');
    playBeep(600, 0.1);
  });

  btnCloseSpeedModal.addEventListener('click', () => speedLimitModal.classList.add('hidden'));

  speedPresetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      speedPresetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tempLimit = parseInt(btn.getAttribute('data-limit'), 10);
      stepperLimitValue.textContent = `${tempLimit} km/h`;
      playBeep(680, 0.08);
    });
  });

  btnLimitMinus.addEventListener('click', () => {
    tempLimit = Math.max(30, tempLimit - 5);
    stepperLimitValue.textContent = `${tempLimit} km/h`;
    playBeep(520, 0.08);
  });

  btnLimitPlus.addEventListener('click', () => {
    tempLimit = Math.min(140, tempLimit + 5);
    stepperLimitValue.textContent = `${tempLimit} km/h`;
    playBeep(720, 0.08);
  });

  btnApplyLimit.addEventListener('click', () => {
    speedLimit = tempLimit;
    limitDisplay.textContent = speedLimit;
    overspeedLimitSpan.textContent = speedLimit;
    speedLimitModal.classList.add('hidden');
    playBeep(800, 0.12);
  });

  // GPS Offset
  const gpsOffsetModal = document.getElementById('gpsOffsetModal');
  const btnGpsOffset = document.getElementById('btnGpsOffset');
  const offsetBadge = document.getElementById('offsetBadge');
  const offsetPill = document.getElementById('offsetPill');
  const offsetValue = document.getElementById('offsetValue');
  const btnOffsetMinus = document.getElementById('btnOffsetMinus');
  const btnOffsetPlus = document.getElementById('btnOffsetPlus');
  const btnApplyOffset = document.getElementById('btnApplyOffset');
  const btnCloseOffsetModal = document.getElementById('btnCloseOffsetModal');
  const speedOffsetLabel = document.getElementById('speedOffsetLabel');

  let tempOffset = 0;

  btnGpsOffset.addEventListener('click', () => {
    tempOffset = gpsOffset;
    offsetValue.textContent = (tempOffset >= 0 ? `+${tempOffset}` : tempOffset) + ' km/h';
    gpsOffsetModal.classList.remove('hidden');
    playBeep(650, 0.1);
  });

  btnCloseOffsetModal.addEventListener('click', () => gpsOffsetModal.classList.add('hidden'));

  btnOffsetMinus.addEventListener('click', () => {
    tempOffset = Math.max(-10, tempOffset - 1);
    offsetValue.textContent = (tempOffset >= 0 ? `+${tempOffset}` : tempOffset) + ' km/h';
    playBeep(500, 0.06);
  });

  btnOffsetPlus.addEventListener('click', () => {
    tempOffset = Math.min(15, tempOffset + 1);
    offsetValue.textContent = (tempOffset >= 0 ? `+${tempOffset}` : tempOffset) + ' km/h';
    playBeep(650, 0.06);
  });

  btnApplyOffset.addEventListener('click', () => {
    gpsOffset = tempOffset;
    if (gpsOffset !== 0) {
      offsetBadge.textContent = `${gpsOffset >= 0 ? '+' : ''}${gpsOffset}`;
      offsetBadge.classList.remove('hidden');
      offsetPill.textContent = `Bù: ${gpsOffset >= 0 ? '+' : ''}${gpsOffset} km/h`;
      offsetPill.classList.remove('hidden');
      speedOffsetLabel.textContent = `(Đã bù ${gpsOffset >= 0 ? '+' : ''}${gpsOffset} km/h)`;
      speedOffsetLabel.classList.remove('hidden');
    } else {
      offsetBadge.classList.add('hidden');
      offsetPill.classList.add('hidden');
      speedOffsetLabel.classList.add('hidden');
    }
    gpsOffsetModal.classList.add('hidden');
    playBeep(800, 0.12);
  });

  // Sound toggle
  const btnSoundToggle = document.getElementById('btnSoundToggle');
  const soundLabel = document.getElementById('soundLabel');

  btnSoundToggle.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    if (isSoundEnabled) {
      soundLabel.textContent = 'Âm thanh: BẬT';
      btnSoundToggle.classList.add('cyan');
      playBeep(880, 0.15);
      speakVoice('Âm thanh cảnh báo đã bật.');
    } else {
      soundLabel.textContent = 'Âm thanh: TẮT';
      btnSoundToggle.classList.remove('cyan');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  });

  // ================= 4. NAVIGATION TABS (HUB, MAP, CHIA, MEDIA) =================
  const navButtons = document.querySelectorAll('.nav-btn[data-tab]');
  const viewHub = document.getElementById('viewHub');
  const viewMap = document.getElementById('viewMap');
  const panelLeft = document.getElementById('panelLeft');
  const panelRight = document.getElementById('panelRight');
  const divider = document.getElementById('divider');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      playBeep(600, 0.08);

      if (tab === 'hub') {
        panelLeft.style.display = 'flex';
        panelRight.style.display = 'flex';
        divider.style.display = 'flex';
        viewHub.classList.remove('hidden');
        viewMap.classList.add('hidden');
        restoreSplitRatio();
      } else if (tab === 'map') {
        panelLeft.style.display = 'flex';
        panelRight.style.display = 'flex';
        divider.style.display = 'flex';
        viewHub.classList.add('hidden');
        viewMap.classList.remove('hidden');
        restoreSplitRatio();
        if (activeMapType === 'waze') {
          updateWazeUrl(currentLat, currentLng);
        } else {
          initLeafletMap();
        }
      } else if (tab === 'split') {
        panelLeft.style.display = 'flex';
        panelRight.style.display = 'flex';
        divider.style.display = 'flex';
        if (currentRatio === '16:9') currentRatio = '35:65';
        ratioButtons.forEach(b => {
          if (b.getAttribute('data-ratio') === currentRatio) b.classList.add('active');
          else b.classList.remove('active');
        });
        restoreSplitRatio();
      } else if (tab === 'media') {
        currentRatio = '16:9';
        ratioButtons.forEach(b => {
          if (b.getAttribute('data-ratio') === '16:9') b.classList.add('active');
          else b.classList.remove('active');
        });
        restoreSplitRatio();
      }
    });
  });

  function restoreSplitRatio() {
    if (currentRatio === '16:9') {
      panelLeft.style.display = 'none';
      divider.style.display = 'none';
      panelRight.style.display = 'flex';
      panelRight.style.flexBasis = '100%';
      navButtons.forEach(b => {
        if (b.getAttribute('data-tab') === 'media') b.classList.add('active');
        else b.classList.remove('active');
      });
      return;
    }
    panelLeft.style.display = 'flex';
    panelRight.style.display = 'flex';
    divider.style.display = 'flex';
    navButtons.forEach(b => {
      if (b.getAttribute('data-tab') === 'split') b.classList.add('active');
      else if (b.getAttribute('data-tab') === 'media') b.classList.remove('active');
    });
    const [leftVal, rightVal] = currentRatio.split(':').map(Number);
    if (isSwapped) {
      panelLeft.style.flexBasis = `${rightVal}%`;
      panelRight.style.flexBasis = `${leftVal}%`;
    } else {
      panelLeft.style.flexBasis = `${leftVal}%`;
      panelRight.style.flexBasis = `${rightVal}%`;
    }
  }

  // ================= 5. ORIENTATION & SPLIT RATIOS =================
  const btnHorizontal = document.getElementById('btnHorizontal');
  const btnVertical = document.getElementById('btnVertical');
  const workspace = document.getElementById('workspace');

  btnHorizontal.addEventListener('click', () => {
    btnHorizontal.classList.add('active');
    btnVertical.classList.remove('active');
    workspace.classList.remove('vertical-mode');
    divider.style.cursor = 'col-resize';
    playBeep(520, 0.08);
  });

  btnVertical.addEventListener('click', () => {
    btnVertical.classList.add('active');
    btnHorizontal.classList.remove('active');
    workspace.classList.add('vertical-mode');
    divider.style.cursor = 'row-resize';
    playBeep(480, 0.08);
  });

  const ratioButtons = document.querySelectorAll('.ratio-btn[data-ratio]');
  ratioButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      ratioButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRatio = btn.getAttribute('data-ratio');
      restoreSplitRatio();
      playBeep(600, 0.08);
    });
  });

  const btnSwap = document.getElementById('btnSwap');
  btnSwap.addEventListener('click', () => {
    isSwapped = !isSwapped;
    playBeep(720, 0.1);
    if (isSwapped) {
      panelLeft.style.order = '3';
      panelRight.style.order = '1';
      btnSwap.style.color = 'var(--cyan-accent)';
      btnSwap.style.borderColor = 'var(--cyan-accent)';
    } else {
      panelLeft.style.order = '1';
      panelRight.style.order = '3';
      btnSwap.style.color = 'var(--text-muted)';
      btnSwap.style.borderColor = 'var(--border-color)';
    }
    restoreSplitRatio();
  });

  // Draggable Divider
  let isDragging = false;
  divider.addEventListener('mousedown', () => {
    isDragging = true;
    document.body.style.cursor = workspace.classList.contains('vertical-mode') ? 'row-resize' : 'col-resize';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const rect = workspace.getBoundingClientRect();
    const isVert = workspace.classList.contains('vertical-mode');
    const pct = isVert
      ? ((e.clientY - rect.top) / rect.height) * 100
      : ((e.clientX - rect.left) / rect.width) * 100;
    if (pct > 20 && pct < 80) {
      if (isSwapped) {
        panelRight.style.flexBasis = `${pct}%`;
        panelLeft.style.flexBasis = `${100 - pct}%`;
      } else {
        panelLeft.style.flexBasis = `${pct}%`;
        panelRight.style.flexBasis = `${100 - pct}%`;
      }
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = 'default';
    }
  });

  // ================= 6. DRIVING SIMULATION ("THỬ") =================
  const btnSimulate = document.getElementById('btnSimulate');
  const gpsStatus = document.getElementById('gpsStatus');
  const gpsText = document.getElementById('gpsText');
  const gearStatus = document.getElementById('gearStatus');
  const roadTrack = document.getElementById('roadTrack');
  const speedNum = document.getElementById('speedNum');
  const speedFill = document.getElementById('speedFill');
  const overspeedPill = document.getElementById('overspeedPill');
  const alertDist = document.getElementById('alertDist');
  const alertMsg = document.getElementById('alertMsg');
  const alertBanner = document.getElementById('alertBanner');
  const telemHeading = document.getElementById('telemHeading');
  const telemMax = document.getElementById('telemMax');
  const telemDist = document.getElementById('telemDist');

  const DYNAMIC_ALERTS = [
    { dist: '369 mét', msg: 'Trạm thu phí BOT Pháp Vân - Làn ETC' },
    { dist: '54 mét', msg: 'Camera phạt nguội giám sát tốc độ' },
    { dist: 'Vành đai 3 trên cao', msg: 'Lối ra nút giao Khuất Duy Tiến' },
    { dist: '1.2 km', msg: 'Trạm xăng Petrolimex phía trước' }
  ];

  btnSimulate.addEventListener('click', () => {
    if (isSimulating) {
      stopSimulation();
    } else {
      startSimulation();
    }
  });

  function startSimulation() {
    isSimulating = true;
    btnSimulate.textContent = '⏹ Dừng';
    btnSimulate.style.background = '#3b1c1c';
    btnSimulate.style.borderColor = '#ef4444';
    btnSimulate.style.color = '#ff6666';

    gpsStatus.innerHTML = '<span class="pulse-dot green"></span> Mô phỏng xe chạy';
    gearStatus.innerHTML = '<span class="gear-dot drive"></span> DRIVE • XE ĐANG CHẠY';
    roadTrack.classList.add('moving');
    playBeep(520, 0.2, 'triangle');
    speakVoice('Bắt đầu hành trình mô phỏng lái xe.');

    let simStep = 0;
    let targetSpeed = 85; // Natural curve up to 85, cruising, then decelerate
    let hasAlertedOverspeed = false;

    simInterval = setInterval(() => {
      simStep++;

      // Natural speed profile: Accelerate (1-20), Cruise (21-35), Decelerate (36-48)
      if (simStep <= 20) {
        currentSpeed = Math.round((simStep / 20) * targetSpeed);
      } else if (simStep <= 35) {
        // slight fluctuation while cruising
        currentSpeed = targetSpeed + Math.floor(Math.sin(simStep) * 4);
      } else if (simStep <= 48) {
        // natural braking curve
        const brakePct = (48 - simStep) / 13;
        currentSpeed = Math.max(0, Math.round(targetSpeed * brakePct));
      } else {
        stopSimulation();
        return;
      }

      const displaySpeed = Math.max(0, currentSpeed + gpsOffset);
      speedNum.textContent = displaySpeed;
      speedFill.style.width = `${Math.min(100, (displaySpeed / 120) * 100)}%`;

      // Update max speed
      if (displaySpeed > maxSpeedRecorded) {
        maxSpeedRecorded = displaySpeed;
        telemMax.textContent = `${maxSpeedRecorded} km/h`;
      }

      // Distance increment
      totalDistance += (displaySpeed * 0.0003);
      telemDist.textContent = `${totalDistance.toFixed(1)} km`;

      // Overspeed alert check
      if (displaySpeed > speedLimit) {
        speedNum.classList.add('overspeed');
        overspeedPill.classList.remove('hidden');
        alertBanner.style.borderColor = '#ff2233';
        alertBanner.style.boxShadow = '0 0 20px rgba(255, 34, 51, 0.6)';
        if (!hasAlertedOverspeed) {
          hasAlertedOverspeed = true;
          speakVoice(`Cảnh báo! Bạn đang vượt quá tốc độ ${speedLimit} km/h.`);
        }
        if (simStep % 3 === 0) playBeep(980, 0.12, 'sawtooth');
      } else {
        speedNum.classList.remove('overspeed');
        overspeedPill.classList.add('hidden');
        alertBanner.style.borderColor = 'rgba(255, 152, 0, 0.7)';
        alertBanner.style.boxShadow = '0 0 16px rgba(255, 152, 0, 0.25)';
      }

      // Rotate dynamic traffic alerts
      const alertIdx = Math.floor((simStep / 12) % DYNAMIC_ALERTS.length);
      alertDist.textContent = DYNAMIC_ALERTS[alertIdx].dist;
      alertMsg.textContent = DYNAMIC_ALERTS[alertIdx].msg;

      // Heading rotation
      const headings = ['BẮC (0°)', 'ĐÔNG BẮC (45°)', 'ĐÔNG (90°)', 'ĐÔNG NAM (135°)', 'NAM (180°)'];
      const hIdx = Math.floor((simStep / 10) % headings.length);
      telemHeading.textContent = `🧭 ${headings[hIdx]}`;

    }, 220);
  }

  function stopSimulation() {
    if (simInterval) clearInterval(simInterval);
    isSimulating = false;
    currentSpeed = 0;
    speedNum.textContent = 0;
    speedNum.classList.remove('overspeed');
    speedFill.style.width = '0%';
    overspeedPill.classList.add('hidden');
    roadTrack.classList.remove('moving');

    btnSimulate.textContent = '⚡ Thử';
    btnSimulate.style.background = '#252416';
    btnSimulate.style.borderColor = '#786419';
    btnSimulate.style.color = '#ffd043';

    gpsStatus.innerHTML = '<span class="pulse-dot amber"></span> Đang đợi...';
    gearStatus.innerHTML = '<span class="gear-dot park"></span> PARK • XE ĐANG ĐỖ';
    alertDist.textContent = 'Đang cập nhật cung đường';
    alertMsg.textContent = 'Vào khu đông dân cư';

    playBeep(350, 0.2, 'sine');
    speakVoice('Đã dừng xe an toàn.');

    // Save profile stats
    const profile = { name: profileName.textContent, avatar: profileAvatar.textContent, maxSpeed: maxSpeedRecorded, distance: totalDistance, trips: tripCount + 1 };
    localStorage.setItem(STORAGE.PROFILE, JSON.stringify(profile));
  }

  // ================= 7. LEAFLET GPS MAP & REAL DEVICE GEOLOCATION =================
  // Default coordinates set to Bắc Giang (TP. Bắc Giang: 21.2731, 106.1946)
  let currentLat = 21.2731;
  let currentLng = 106.1946;
  let userMarker = null;
  let userAccuracyCircle = null;
  let hasRealGps = false;
  let weatherFetched = false;
  let activeMapType = 'waze'; // default waze for live traffic & speed camera alerts

  const btnMapWaze = document.getElementById('btnMapWaze');
  const btnMapOSM = document.getElementById('btnMapOSM');
  const btnMapVietMap = document.getElementById('btnMapVietMap');
  const wazeContainer = document.getElementById('wazeContainer');
  const wazeFrame = document.getElementById('wazeFrame');
  const osmSearchBar = document.getElementById('osmSearchBar');
  const osmQuickDest = document.getElementById('osmQuickDest');
  const mapContainer = document.getElementById('mapContainer');
  const osmControls = document.getElementById('osmControls');
  const btnLocBacGiang = document.getElementById('btnLocBacGiang');
  const btnLocHaNoi = document.getElementById('btnLocHaNoi');
  const btnForceGPS = document.getElementById('btnForceGPS');

  let lastWazeLat = null;
  let lastWazeLng = null;
  function updateWazeUrl(lat, lng, force = false) {
    if (!wazeFrame) return;
    if (!force && lastWazeLat !== null && lastWazeLng !== null) {
      const dist = Math.hypot(lat - lastWazeLat, lng - lastWazeLng);
      if (dist < 0.0005) return;
    }
    lastWazeLat = lat;
    lastWazeLng = lng;
    wazeFrame.src = `https://embed.waze.com/vi/iframe?zoom=15&lat=${lat.toFixed(6)}&lon=${lng.toFixed(6)}&ct=livemap&pin=1`;
  }

  function setManualLocation(lat, lng, cityName = 'Bắc Giang') {
    currentLat = lat;
    currentLng = lng;
    hasRealGps = true;
    try {
      localStorage.setItem('duo_cached_lat', currentLat.toString());
      localStorage.setItem('duo_cached_lng', currentLng.toString());
      localStorage.setItem('duo_cached_city', cityName);
    } catch (e) {}

    updateWazeUrl(currentLat, currentLng, true);
    if (leafletMap) {
      leafletMap.setView([currentLat, currentLng], 15);
      if (userMarker) userMarker.setLatLng([currentLat, currentLng]);
    }
    fetchLocalWeather(currentLat, currentLng);
    if (!isSimulating) {
      gpsStatus.innerHTML = `<span class="pulse-dot green"></span> Đã ghim: ${cityName}`;
    }
    playBeep(700, 0.08);
  }

  if (btnLocBacGiang) {
    btnLocBacGiang.addEventListener('click', () => {
      setManualLocation(21.2731, 106.1946, 'Bắc Giang');
      btnLocBacGiang.style.background = 'rgba(0, 242, 254, 0.15)';
      btnLocBacGiang.style.borderColor = 'var(--cyan-accent)';
      btnLocBacGiang.style.color = 'var(--cyan-accent)';
      if (btnLocHaNoi) {
        btnLocHaNoi.style.background = '#1e293b';
        btnLocHaNoi.style.borderColor = 'var(--border-light)';
        btnLocHaNoi.style.color = '#cbd5e1';
      }
    });
  }

  if (btnLocHaNoi) {
    btnLocHaNoi.addEventListener('click', () => {
      setManualLocation(21.0285, 105.8542, 'Hà Nội');
      btnLocHaNoi.style.background = 'rgba(0, 242, 254, 0.15)';
      btnLocHaNoi.style.borderColor = 'var(--cyan-accent)';
      btnLocHaNoi.style.color = 'var(--cyan-accent)';
      if (btnLocBacGiang) {
        btnLocBacGiang.style.background = '#1e293b';
        btnLocBacGiang.style.borderColor = 'var(--border-light)';
        btnLocBacGiang.style.color = '#cbd5e1';
      }
    });
  }

  if (btnForceGPS) {
    btnForceGPS.addEventListener('click', () => {
      startWatchPosition();
      playBeep(800, 0.1);
    });
  }

  // Cache GPS position in localStorage
  function loadCachedGPS() {
    try {
      const cLat = localStorage.getItem('duo_cached_lat');
      const cLng = localStorage.getItem('duo_cached_lng');
      if (cLat && cLng) {
        const parsedLat = parseFloat(cLat);
        const parsedLng = parseFloat(cLng);
        // If it was the old default Hanoi coordinate, migrate to user's location Bắc Giang
        if (parsedLat.toFixed(3) === '21.028' || parsedLat.toFixed(3) === '21.029') {
          currentLat = 21.2731;
          currentLng = 106.1946;
          localStorage.setItem('duo_cached_lat', currentLat.toString());
          localStorage.setItem('duo_cached_lng', currentLng.toString());
        } else {
          currentLat = parsedLat;
          currentLng = parsedLng;
        }
        hasRealGps = true;
        if (!isSimulating) {
          gpsStatus.innerHTML = '<span class="pulse-dot green"></span> GPS đã kết nối';
        }
        updateWazeUrl(currentLat, currentLng);
        fetchLocalWeather(currentLat, currentLng);
        return true;
      }
    } catch (e) {}
    // If no cache, initialize default Bắc Giang
    updateWazeUrl(currentLat, currentLng);
    fetchLocalWeather(currentLat, currentLng);
    return false;
  }

  // Real Geolocation: Chỉ hỏi cấp quyền đúng 1 lần duy nhất, sau đó chạy ngầm không bao giờ hỏi lại
  let watchGpsId = null;

  function initGpsOnce(force = false) {
    if (!('geolocation' in navigator)) return;

    const alreadyPrompted = localStorage.getItem('duo_gps_prompt_done') === 'true';

    if (!force && alreadyPrompted) {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then(result => {
          if (result.state === 'granted') {
            startWatchPosition();
          } else {
            loadCachedGPS();
          }
        }).catch(() => {
          loadCachedGPS();
        });
      } else {
        loadCachedGPS();
      }
      return;
    }

    try {
      localStorage.setItem('duo_gps_prompt_done', 'true');
    } catch (e) {}
    startWatchPosition();
  }

  function startWatchPosition() {
    if (!('geolocation' in navigator)) return;
    if (watchGpsId !== null) return; // Đã đang theo dõi, tuyệt đối không tạo thêm listener trùng lặp

    const gpsOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000
    };

    try {
      watchGpsId = navigator.geolocation.watchPosition(
        (pos) => onGpsSuccess(pos),
        (err) => onGpsError(err),
        gpsOptions
      );
    } catch (e) {}
  }

  function onGpsError(err) {
    console.warn('Geolocation Error:', err.code, err.message);
    if (err.code === 1) { // PERMISSION_DENIED
      if (!isSimulating) {
        gpsStatus.innerHTML = '<span class="pulse-dot gray"></span> GPS thủ công';
      }
    } else if (err.code === 2 || err.code === 3) {
      if (!isSimulating && !hasRealGps) {
        gpsStatus.innerHTML = '<span class="pulse-dot amber"></span> Đang chờ GPS...';
      }
    }
  }

  function requestRealGPS(force = false) {
    initGpsOnce(force);
  }

  function onGpsSuccess(pos) {
    hasRealGps = true;
    const coords = pos.coords;
    currentLat = coords.latitude;
    currentLng = coords.longitude;
    const accuracy = Math.round(coords.accuracy || 10);

    try {
      localStorage.setItem('duo_cached_lat', currentLat.toString());
      localStorage.setItem('duo_cached_lng', currentLng.toString());
    } catch (e) {}

    // Hide permission warning if previously shown
    const banner = document.getElementById('gpsAlertBanner');
    if (banner) banner.style.display = 'none';

    // Update GPS status on HUB panel
    if (!isSimulating) {
      gpsStatus.innerHTML = `<span class="pulse-dot green"></span> GPS thực tế: ${currentLat.toFixed(4)}, ${currentLng.toFixed(4)} (±${accuracy}m)`;
    }

    // Update Waze live traffic map position
    updateWazeUrl(currentLat, currentLng);

    // Update OSM leaflet map if active
    if (leafletMap && activeMapType === 'osm') {
      updateMapMarker(currentLat, currentLng, accuracy);
    }

    // Real weather from Open-Meteo using real GPS coords
    fetchLocalWeather(currentLat, currentLng);

    // Real speed from GPS (converted from m/s to km/h)
    if (coords.speed !== null && !isNaN(coords.speed) && !isSimulating) {
      const realSpeedKmh = Math.round(coords.speed * 3.6);
      const displaySpeed = Math.max(0, realSpeedKmh + gpsOffset);
      speedNum.textContent = displaySpeed;
      speedFill.style.width = `${Math.min(100, (displaySpeed / 120) * 100)}%`;
      if (displaySpeed > 0) {
        gearStatus.innerHTML = '<span class="gear-dot drive"></span> DRIVE • XE ĐANG CHẠY';
        roadTrack.classList.add('moving');
      } else {
        gearStatus.innerHTML = '<span class="gear-dot park"></span> PARK • XE ĐANG ĐỖ';
        roadTrack.classList.remove('moving');
      }
    }

    // Real compass heading if available
    if (coords.heading !== null && !isNaN(coords.heading) && !isSimulating) {
      const deg = Math.round(coords.heading);
      const dirs = ['BẮC', 'ĐÔNG BẮC', 'ĐÔNG', 'ĐÔNG NAM', 'NAM', 'TÂY NAM', 'TÂY', 'TÂY BẮC'];
      const dir = dirs[Math.round(deg / 45) % 8];
      telemHeading.textContent = `🧭 ${dir} (${deg}°)`;
    }
  }

  // Click on GPS text to re-trigger prompt if needed
  gpsStatus.style.cursor = 'pointer';
  gpsStatus.addEventListener('click', () => {
    requestRealGPS(true);
    playBeep(650, 0.08);
  });

  // Switch between Waze, OSM, and VietMap Live
  btnMapWaze.addEventListener('click', () => {
    activeMapType = 'waze';
    btnMapWaze.classList.add('active');
    btnMapOSM.classList.remove('active');
    btnMapVietMap.classList.remove('active');

    wazeContainer.classList.remove('hidden');
    osmSearchBar.classList.add('hidden');
    osmQuickDest.classList.add('hidden');
    mapContainer.classList.add('hidden');
    osmControls.classList.add('hidden');

    updateWazeUrl(currentLat, currentLng);
    playBeep(700, 0.08);
  });

  btnMapOSM.addEventListener('click', () => {
    activeMapType = 'osm';
    btnMapOSM.classList.add('active');
    btnMapWaze.classList.remove('active');
    btnMapVietMap.classList.remove('active');

    wazeContainer.classList.add('hidden');
    osmSearchBar.classList.remove('hidden');
    osmQuickDest.classList.remove('hidden');
    mapContainer.classList.remove('hidden');
    osmControls.classList.remove('hidden');

    initLeafletMap();
    playBeep(650, 0.08);
  });

  btnMapVietMap.addEventListener('click', () => {
    playBeep(850, 0.12);
    speakVoice('Đang mở ứng dụng VietMap Live dẫn đường.');
    window.open('vietmaplive://', '_blank');
    setTimeout(() => {
      window.open('https://vietmap.vn/vietmap-live', '_blank');
    }, 500);
  });

  function fetchLocalWeather(lat, lng) {
    if (weatherFetched) return;
    weatherFetched = true;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
      .then(r => r.json())
      .then(d => {
        if (d && d.current_weather) {
          const temp = Math.round(d.current_weather.temperature);
          const wind = Math.round(d.current_weather.windspeed);
          const wcTemp = document.querySelector('.wc-temp');
          const wcWind = document.querySelector('.wc-wind');
          if (wcTemp) wcTemp.textContent = `${temp}°C`;
          if (wcWind) wcWind.textContent = `💨 ${wind}km/h`;
        }
      })
      .catch(() => {});
  }

  function updateMapMarker(lat, lng, accuracy = 20) {
    if (!leafletMap) return;
    const carIcon = L.divIcon({
      className: 'map-car-marker',
      html: '<div style="font-size: 26px; transform: rotate(-45deg); filter: drop-shadow(0 0 8px #00e5ff);">🏎️</div>',
      iconSize: [30, 30]
    });

    if (!userMarker) {
      userMarker = L.marker([lat, lng], { icon: carIcon }).addTo(leafletMap);
      userMarker.bindPopup('<b>Vị trí GPS xe của bạn</b><br>Đang định vị thực tế').openPopup();
      leafletMap.setView([lat, lng], 16);
    } else {
      userMarker.setLatLng([lat, lng]);
    }

    if (!userAccuracyCircle) {
      userAccuracyCircle = L.circle([lat, lng], { radius: accuracy, color: '#00e5ff', fillOpacity: 0.15 }).addTo(leafletMap);
    } else {
      userAccuracyCircle.setLatLng([lat, lng]);
      userAccuracyCircle.setRadius(accuracy);
    }
  }

  function initLeafletMap() {
    if (mapInitialized) {
      setTimeout(() => leafletMap.invalidateSize(), 200);
      return;
    }
    if (typeof L === 'undefined') return;
    try {
      leafletMap = L.map('mapContainer', { zoomControl: false }).setView([currentLat, currentLng], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(leafletMap);

      updateMapMarker(currentLat, currentLng);
      mapInitialized = true;

      // Controls
      document.getElementById('btnZoomIn').addEventListener('click', () => leafletMap.zoomIn());
      document.getElementById('btnZoomOut').addEventListener('click', () => leafletMap.zoomOut());
      document.getElementById('btnLocate').addEventListener('click', () => {
        requestRealGPS(true);
        leafletMap.setView([currentLat, currentLng], 16);
        if (userMarker) userMarker.openPopup();
        playBeep(700, 0.08);
      });
      document.getElementById('btn3D').addEventListener('click', () => {
        playBeep(800, 0.08);
        alert('Chế độ góc nhìn 3D dẫn đường đã kích hoạt.');
      });

      // Quick destinations
      document.querySelectorAll('.dest-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          playBeep(650, 0.08);
          const destName = pill.textContent.trim();
          alert(`Đang dẫn đường từ vị trí GPS hiện tại đến: ${destName}`);
        });
      });

      // Search place with OpenStreetMap Nominatim
      const mapSearchInput = document.getElementById('mapSearchInput');
      const btnMapSearch = document.getElementById('btnMapSearch');
      function searchLocation() {
        const query = mapSearchInput.value.trim();
        if (!query) return;
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.length > 0) {
              const item = data[0];
              const lat = parseFloat(item.lat);
              const lon = parseFloat(item.lon);
              leafletMap.setView([lat, lon], 15);
              L.marker([lat, lon]).addTo(leafletMap)
                .bindPopup(`<b>${item.display_name}</b>`).openPopup();
              playBeep(880, 0.15);
            } else {
              alert('Không tìm thấy địa điểm này. Vui lòng thử lại!');
            }
          })
          .catch(() => alert('Không thể tìm kiếm lúc này.'));
      }
      btnMapSearch.addEventListener('click', searchLocation);
      mapSearchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') searchLocation(); });

    } catch (e) {
      console.warn('Map init error:', e);
    }
  }

  // ================= 8. MEDIA PLAYER & CATALOG =================
  const mediaTabs = document.querySelectorAll('.media-tab[data-mtab]');
  const viewCatalog = document.getElementById('viewCatalog');
  const viewPlaying = document.getElementById('viewPlaying');
  const viewTv = document.getElementById('viewTv');
  const catalogList = document.getElementById('catalogList');

  mediaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mediaTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mtab = tab.getAttribute('data-mtab');
      playBeep(600, 0.08);

      viewCatalog.classList.add('hidden');
      viewPlaying.classList.add('hidden');
      viewTv.classList.add('hidden');

      if (mtab === 'catalog') {
        viewCatalog.classList.remove('hidden');
        renderCatalog(mediaSearch ? mediaSearch.value.trim() : '');
      } else if (mtab === 'playing') {
        viewPlaying.classList.remove('hidden');
        sendYtCommand('playVideo');
        isPlaying = true;
        btnPlay.textContent = '⏸';
        eqBars.querySelectorAll('.eq').forEach(b => b.classList.add('playing'));
        tickerText.textContent = `Đang phát: ${pbTitle.textContent}`;
      } else if (mtab === 'tv') {
        viewTv.classList.remove('hidden');
      }
    });
  });

  // ================= STORAGE HELPERS FOR KHO BÀI =================
  function escapeHtml(str) {
    if (!str) return '';
    return str.toString().replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  }

  function getActiveTracks() {
    try {
      const q = getActiveQueryName();
      const data = localStorage.getItem(STORAGE.ACTIVE_TRACKS);
      if (data && q) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_TRACKS;
  }

  function getActiveQueryName() {
    try {
      return localStorage.getItem(STORAGE.ACTIVE_QUERY) || '';
    } catch (e) {
      return '';
    }
  }

  function setActiveTracks(newTracks, queryName = '') {
    if (!newTracks || !Array.isArray(newTracks) || newTracks.length === 0) return;
    try {
      localStorage.setItem(STORAGE.ACTIVE_TRACKS, JSON.stringify(newTracks));
      if (queryName) {
        localStorage.setItem(STORAGE.ACTIVE_QUERY, queryName);
      }
      // Also automatically save searched tracks into saved storage
      newTracks.forEach(t => saveTrackToStorage(t));
      updateCounts();
    } catch (e) {}
    updateCatalogTabLabel();
  }

  function resetToDefaultTracks() {
    try {
      localStorage.removeItem(STORAGE.ACTIVE_TRACKS);
      localStorage.removeItem(STORAGE.ACTIVE_QUERY);
      localStorage.removeItem('duo_current_track_idx');
    } catch (e) {}
    updateCatalogTabLabel();
    const mediaSearch = document.getElementById('mediaSearch');
    if (mediaSearch) mediaSearch.value = '';
    renderCatalog('');
    playTrackByIndex(0);
    playBeep(650, 0.1);
  }

  function updateCatalogTabLabel() {
    const catTabCurated = document.getElementById('catTabCurated');
    if (!catTabCurated) return;
    const q = getActiveQueryName();
    const tracks = getActiveTracks();
    if (q) {
      catTabCurated.innerHTML = `🔥 Kho bài: <b>${escapeHtml(q)}</b> (${tracks.length} bài)`;
    } else {
      catTabCurated.textContent = `🔥 Tuyển tập Territory (30 bài)`;
    }
  }

  function getSavedTracks() {
    try {
      const data = localStorage.getItem(STORAGE.SAVED_TRACKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveTrackToStorage(track) {
    if (!track || !track.id) return;
    try {
      const list = getSavedTracks();
      const existingIdx = list.findIndex(t => t.id === track.id);
      if (existingIdx !== -1) {
        list[existingIdx] = track;
      } else {
        list.unshift(track);
      }
      localStorage.setItem(STORAGE.SAVED_TRACKS, JSON.stringify(list));
      updateCounts();
    } catch (e) {}
  }

  function removeTrackFromStorage(trackId) {
    try {
      const list = getSavedTracks().filter(t => t.id !== trackId);
      localStorage.setItem(STORAGE.SAVED_TRACKS, JSON.stringify(list));
      updateCounts();
    } catch (e) {}
  }

  function getHistoryTracks() {
    try {
      const data = localStorage.getItem(STORAGE.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function addToHistory(track) {
    if (!track || !track.id) return;
    try {
      let list = getHistoryTracks();
      list = list.filter(t => t.id !== track.id);
      list.unshift(track);
      if (list.length > 30) list = list.slice(0, 30);
      localStorage.setItem(STORAGE.HISTORY, JSON.stringify(list));
      updateCounts();
    } catch (e) {}
  }

  function updateCounts() {
    const saved = getSavedTracks();
    const hist = getHistoryTracks();
    const savedCountEl = document.getElementById('savedCount');
    const historyCountEl = document.getElementById('historyCount');
    if (savedCountEl) savedCountEl.textContent = saved.length;
    if (historyCountEl) historyCountEl.textContent = hist.length;
  }

  let activeCatalogTab = 'curated';
  const catTabs = document.querySelectorAll('.cat-tab[data-cat]');
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCatalogTab = tab.getAttribute('data-cat');
      playBeep(600, 0.08);

      if (activeCatalogTab === 'curated') {
        renderCatalog('');
      } else if (activeCatalogTab === 'saved') {
        const saved = getSavedTracks();
        if (saved.length === 0) {
          catalogList.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px 16px; color: var(--text-muted); font-size: 13px;">
              <div style="font-size: 36px; margin-bottom: 8px;">⭐</div>
              <div>Kho bài đã lưu đang trống</div>
              <p style="font-size: 11px; margin-top: 6px; color: #64748b;">Tìm kiếm bài hát bất kỳ và bấm "⭐ Lưu" để lưu lại vĩnh viễn trên xe</p>
            </div>
          `;
        } else {
          renderCardsList(saved, '', true);
        }
      } else if (activeCatalogTab === 'history') {
        const hist = getHistoryTracks();
        if (hist.length === 0) {
          catalogList.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px 16px; color: var(--text-muted); font-size: 13px;">
              <div style="font-size: 36px; margin-bottom: 8px;">🕐</div>
              <div>Chưa có bài hát nào trong lịch sử nghe</div>
            </div>
          `;
        } else {
          renderCardsList(hist, '', false);
        }
      }
    });
  });

  function renderCatalog(filterQuery = '') {
    catalogList.innerHTML = '';

    if (!filterQuery) {
      if (activeCatalogTab === 'saved') {
        const saved = getSavedTracks();
        if (saved.length > 0) renderCardsList(saved, '', true);
        else renderCardsList(getActiveTracks(), '', false);
      } else {
        const currentActiveTracks = getActiveTracks();
        const activeQuery = getActiveQueryName();
        if (activeQuery) {
          const banner = document.createElement('div');
          banner.style.cssText = 'grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; background: rgba(0, 242, 254, 0.08); border: 1px solid rgba(0, 242, 254, 0.25); padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; font-size: 12px; color: #fff; flex-wrap: wrap; gap: 8px;';
          banner.innerHTML = `
            <div>🎵 Kho bài hiện tại: <b style="color: var(--cyan-accent);">${escapeHtml(activeQuery)}</b> (${currentActiveTracks.length} bài)</div>
            <button id="btnResetToCurated" style="background: #1e293b; border: 1px solid var(--border-light); color: #cbd5e1; font-size: 11px; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-weight: 700;">↺ Về 30 bài gốc Territory</button>
          `;
          catalogList.appendChild(banner);
          banner.querySelector('#btnResetToCurated').addEventListener('click', () => {
            resetToDefaultTracks();
          });
        }
        renderCardsList(currentActiveTracks, '', false);
      }
      return;
    }

    // Show loading state while searching YouTube
    catalogList.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 16px; color: var(--cyan-accent); font-size: 13px;">
        <div style="font-size: 28px; margin-bottom: 8px;">🔍</div>
        <div>Đang tìm kiếm "<b>${escapeHtml(filterQuery)}</b>" trên YouTube...</div>
      </div>
    `;

    // First check local active tracks
    const qLower = filterQuery.toLowerCase();
    const localMatches = getActiveTracks().filter(t => 
      t.title.toLowerCase().includes(qLower) || 
      t.channel.toLowerCase().includes(qLower)
    );

    // Call live YouTube search endpoint from local server
    fetch(`/api/search?q=${encodeURIComponent(filterQuery)}`)
      .then(res => res.json())
      .then(apiResults => {
        catalogList.innerHTML = '';
        let combined = [];
        if (apiResults && Array.isArray(apiResults) && apiResults.length > 0) {
          combined = apiResults;
        } else if (localMatches.length > 0) {
          combined = localMatches;
        }

        if (combined.length === 0) {
          showEmptySearch(filterQuery);
        } else {
          // KEY REQUIREMENT: Khi tìm kiếm, kho bài được update ngay lập tức và lưu vĩnh viễn cho những lần mở sau!
          setActiveTracks(combined, filterQuery);

          renderSearchResultsHeader(filterQuery, combined.length, combined);
          renderCardsList(combined, filterQuery, false);
        }
      })
      .catch(err => {
        console.warn('Live search error:', err);
        catalogList.innerHTML = '';
        if (localMatches.length > 0) {
          setActiveTracks(localMatches, filterQuery);
          renderSearchResultsHeader(filterQuery, localMatches.length, localMatches);
          renderCardsList(localMatches, filterQuery, false);
        } else {
          showEmptySearch(filterQuery);
        }
      });
  }

  function renderSearchResultsHeader(filterQuery, count, resultsList) {
    const searchHeader = document.createElement('div');
    searchHeader.style.cssText = 'grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; background: #131d33; padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; font-size: 12px; color: #fff; border: 1px solid var(--border-light); flex-wrap: wrap; gap: 8px;';
    searchHeader.innerHTML = `
      <div>🔍 Kết quả YouTube: <b style="color: var(--cyan-accent);">${filterQuery}</b> (${count} bài)</div>
      <div style="display: flex; gap: 6px;">
        <button id="btnSaveAllSearch" style="background: var(--cyan-accent); border: none; color: #000; font-size: 11px; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-weight: 700;">⭐ Lưu tất cả vào kho bài</button>
        <button id="btnClearSearch" style="background: #25334d; border: 1px solid var(--border-light); color: #cbd5e1; font-size: 11px; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-weight: 700;">✕ Xem kho bài</button>
      </div>
    `;
    catalogList.appendChild(searchHeader);

    searchHeader.querySelector('#btnSaveAllSearch').addEventListener('click', () => {
      if (resultsList && Array.isArray(resultsList)) {
        resultsList.forEach(t => saveTrackToStorage(t));
        const btn = searchHeader.querySelector('#btnSaveAllSearch');
        btn.textContent = '✓ Đã lưu toàn bộ!';
        btn.style.background = 'var(--green-accent)';
        btn.style.color = '#fff';
        playBeep(880, 0.15);
      }
    });

    searchHeader.querySelector('#btnClearSearch').addEventListener('click', () => {
      mediaSearch.value = '';
      const curTab = document.getElementById('catTabCurated');
      if (curTab) curTab.click();
      else renderCatalog('');
    });
  }

  function showEmptySearch(filterQuery) {
    const emptyMsg = document.createElement('div');
    emptyMsg.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 36px 16px; color: var(--text-muted); font-size: 13px;';
    emptyMsg.innerHTML = `
      <div style="font-size: 36px; margin-bottom: 8px;">🎵</div>
      <div>Không tìm thấy bài hát nào khớp với "<b>${filterQuery}</b>"</div>
      <div style="display: flex; justify-content: center; gap: 8px; margin-top: 14px;">
        <button id="btnSearchDirectYt" style="background: #e50914; border: none; color: #fff; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 8px; cursor: pointer;">▶ Phát kết quả tìm kiếm YouTube</button>
        <button id="btnResetSearch" style="background: var(--blue-accent); border: none; color: #fff; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 8px; cursor: pointer;">Xem lại kho bài</button>
      </div>
    `;
    catalogList.appendChild(emptyMsg);

    emptyMsg.querySelector('#btnResetSearch').addEventListener('click', () => {
      mediaSearch.value = '';
      renderCatalog('');
    });

    emptyMsg.querySelector('#btnSearchDirectYt').addEventListener('click', () => {
      playCustomSearch(filterQuery);
    });
  }

  function playCustomSearch(query) {
    const origin = window.location.origin || 'http://localhost:5000';
    const ytPlayerContainer = document.getElementById('ytPlayer');
    ytPlayerContainer.innerHTML = `
      <iframe id="mainYtFrame" width="100%" height="100%" 
        src="https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}&autoplay=1&enablejsapi=1&rel=0&playsinline=1&origin=${origin}" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
    ytTitle.textContent = `Tìm kiếm: ${query}`;
    ytAuthor.textContent = 'YouTube Search';
    pbTitle.textContent = `Tìm kiếm: ${query}`;
    pbArtist.textContent = 'YouTube';
    tickerText.textContent = `Đang phát tìm kiếm: ${query}`;
    isPlaying = true;
    btnPlay.textContent = '⏸';
    btnPlay.title = 'Tạm dừng';
    eqBars.querySelectorAll('.eq').forEach(b => b.classList.add('playing'));
    document.querySelector('.media-tab[data-mtab="playing"]').click();
  }

  function renderCardsList(listToRender, filterQuery = '', isSavedList = false) {
    catalogList.innerHTML = '';
    listToRender.forEach((track) => {
      const card = document.createElement('div');
      card.className = 'catalog-card';
      card.innerHTML = `
        <div class="card-thumb-wrap">
          <img src="${track.thumb}" class="card-thumb-img" alt="${track.title}" onerror="this.src='https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80'">
          <span class="card-duration">${track.time}</span>
        </div>
        <div class="card-body">
          <div class="card-title">${track.title}</div>
          <div class="card-channel">${track.channel} ${track.views ? '• ' + track.views : ''}</div>
          <div class="card-footer-action" style="display: flex; justify-content: flex-end; margin-top: 6px;">
            ${isSavedList 
              ? `<button class="card-action-btn btn-delete" style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #ef4444; font-size: 10px; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-weight: 700;">🗑️ Xóa</button>`
              : `<button class="card-action-btn btn-save" style="background: #1e293b; border: 1px solid var(--border-light); color: #cbd5e1; font-size: 10px; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-weight: 700;">⭐ Lưu kho</button>`
            }
          </div>
        </div>
      `;

      // Save button click
      const saveBtn = card.querySelector('.btn-save');
      if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          saveTrackToStorage(track);
          saveBtn.textContent = '✓ Đã lưu';
          saveBtn.style.color = 'var(--green-accent)';
          saveBtn.style.borderColor = 'var(--green-accent)';
          playBeep(880, 0.1);
        });
      }

      // Delete button click
      const deleteBtn = card.querySelector('.btn-delete');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          removeTrackFromStorage(track.id);
          card.remove();
          playBeep(500, 0.08);
        });
      }

      // Play video when card is clicked
      card.addEventListener('click', () => {
        // Automatically save to library and history
        saveTrackToStorage(track);
        addToHistory(track);

        const currentTracks = getActiveTracks();
        const originalIdx = currentTracks.findIndex(t => t.id === track.id);
        if (originalIdx !== -1) {
          playTrackByIndex(originalIdx);
        } else {
          const updated = [track, ...currentTracks.filter(t => t.id !== track.id)];
          setActiveTracks(updated, getActiveQueryName() || 'Bài hát đã chọn');
          playTrackByIndex(0);
        }
        document.querySelector('.media-tab[data-mtab="playing"]').click();
      });

      catalogList.appendChild(card);
    });
  }

  // Suggestion Pills
  const suggPills = document.querySelectorAll('.sugg-pill');
  suggPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      suggPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const vid = pill.getAttribute('data-vid');
      const title = pill.getAttribute('data-title');
      const currentTracks = getActiveTracks();
      const foundIdx = currentTracks.findIndex(t => t.id === vid);
      if (foundIdx !== -1) {
        playTrackByIndex(foundIdx);
      } else if (vid) {
        playCustomVideo(vid, title, 'YouTube Music');
      }
      document.querySelector('.media-tab[data-mtab="playing"]').click();
    });
  });

  // Playback Controls
  const btnPlay = document.getElementById('btnPlay');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnReplay = document.getElementById('btnReplay');
  const btnMute = document.getElementById('btnMute');
  const volSlider = document.getElementById('volSlider');
  const ytTitle = document.getElementById('ytTitle');
  const ytAuthor = document.getElementById('ytAuthor');
  const pbTitle = document.getElementById('pbTitle');
  const pbArtist = document.getElementById('pbArtist');
  const tickerText = document.getElementById('tickerText');
  const tickerIdx = document.getElementById('tickerIdx');
  const eqBars = document.getElementById('eqBars');

  function sendYtCommand(func, args = '') {
    const iframe = document.getElementById('mainYtFrame');
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage('{"event":"listening"}', '*');
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: func, args: args ? [args] : [] }), '*');
        iframe.contentWindow.postMessage(`{"event":"command","func":"${func}","args":""}`, '*');
      } catch (e) {}
    }
  }

  function playTrackByIndex(idx, autoStart = true) {
    const tracks = getActiveTracks();
    if (!tracks || tracks.length === 0) return;
    currentTrackIdx = (idx + tracks.length) % tracks.length;
    try {
      localStorage.setItem('duo_current_track_idx', currentTrackIdx.toString());
    } catch (e) {}

    const t = tracks[currentTrackIdx];
    playCustomVideo(t.id, t.title, t.channel, `[${currentTrackIdx + 1}/${tracks.length}]`, autoStart);

    // Synchronize suggestion pills
    suggPills.forEach(p => {
      if (p.getAttribute('data-vid') === t.id) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }

  function playCustomVideo(id, title, channel = 'YouTube Music', idxText = '', autoStart = true) {
    ytTitle.textContent = title;
    ytAuthor.textContent = channel;
    pbTitle.textContent = title;
    pbArtist.textContent = channel;
    tickerText.textContent = autoStart ? `Đang phát: ${title}` : `Sẵn sàng: ${title}`;
    if (idxText) tickerIdx.textContent = idxText;

    const origin = window.location.origin || 'http://localhost:5000';
    const autoParam = autoStart ? 1 : 0;
    // Embed/update YouTube iframe inside ytPlayer stage
    const ytPlayerContainer = document.getElementById('ytPlayer');
    ytPlayerContainer.innerHTML = `
      <iframe id="mainYtFrame" width="100%" height="100%" 
        src="https://www.youtube.com/embed/${id}?autoplay=${autoParam}&enablejsapi=1&rel=0&playsinline=1&origin=${origin}" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

    isPlaying = autoStart;
    btnPlay.textContent = isPlaying ? '⏸' : '▶';
    btnPlay.title = isPlaying ? 'Tạm dừng' : 'Phát video';
    if (isPlaying) {
      eqBars.querySelectorAll('.eq').forEach(b => b.classList.add('playing'));
    } else {
      eqBars.querySelectorAll('.eq').forEach(b => b.classList.remove('playing'));
    }
    playBeep(700, 0.1);

    // Ensure playback command & event listeners are registered when iframe finishes loading
    const iframe = document.getElementById('mainYtFrame');
    if (iframe) {
      iframe.onload = () => {
        try {
          iframe.contentWindow.postMessage('{"event":"listening"}', '*');
          iframe.contentWindow.postMessage('{"event":"command","func":"addEventListener","args":["onStateChange"]}', '*');
          if (autoStart) {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          }
        } catch (e) {}
      };
    }
  }

  // AUTO-NEXT & STATE SYNC: Keep Play/Pause button in sync with YouTube player
  window.addEventListener('message', (event) => {
    try {
      let data = event.data;
      if (typeof data === 'string') {
        try { data = JSON.parse(data); } catch (e) { return; }
      }
      if (!data) return;

      let state = null;
      if (data.event === 'onStateChange') {
        state = data.info;
      } else if (data.info && typeof data.info.playerState !== 'undefined') {
        state = data.info.playerState;
      }

      if (state === 1 || state === '1') {
        // Playing
        isPlaying = true;
        btnPlay.textContent = '⏸';
        btnPlay.title = 'Tạm dừng';
        eqBars.querySelectorAll('.eq').forEach(b => b.classList.add('playing'));
        tickerText.textContent = `Đang phát: ${pbTitle.textContent}`;
      } else if (state === 2 || state === '2') {
        // Paused
        isPlaying = false;
        btnPlay.textContent = '▶';
        btnPlay.title = 'Phát video';
        eqBars.querySelectorAll('.eq').forEach(b => b.classList.remove('playing'));
        tickerText.textContent = `Tạm dừng: ${pbTitle.textContent}`;
      } else if (state === 0 || state === '0') {
        // Ended
        console.log('Video kết thúc, tự động chuyển sang video tiếp theo...');
        speakVoice('Bài hát đã kết thúc, đang chuyển bài kế tiếp.');
        playTrackByIndex(currentTrackIdx + 1, true);
      }
    } catch (e) {}
  });

  // Handle Play/Pause toggle with postMessage directly to YouTube iframe
  btnPlay.addEventListener('click', () => {
    if (!isPlaying) {
      sendYtCommand('playVideo');
      isPlaying = true;
      btnPlay.textContent = '⏸';
      btnPlay.title = 'Tạm dừng';
      eqBars.querySelectorAll('.eq').forEach(b => b.classList.add('playing'));
      tickerText.textContent = `Đang phát: ${pbTitle.textContent}`;
    } else {
      sendYtCommand('pauseVideo');
      isPlaying = false;
      btnPlay.textContent = '▶';
      btnPlay.title = 'Phát video';
      eqBars.querySelectorAll('.eq').forEach(b => b.classList.remove('playing'));
      tickerText.textContent = `Tạm dừng: ${pbTitle.textContent}`;
    }
    playBeep(600, 0.08);
  });

  btnNext.addEventListener('click', () => playTrackByIndex(currentTrackIdx + 1));
  btnPrev.addEventListener('click', () => playTrackByIndex(currentTrackIdx - 1));
  btnReplay.addEventListener('click', () => playTrackByIndex(currentTrackIdx));

  btnMute.addEventListener('click', () => {
    if (volSlider.value > 0) {
      volSlider.value = 0;
      btnMute.textContent = '🔇';
    } else {
      volSlider.value = 75;
      btnMute.textContent = '🔊';
    }
    playBeep(500, 0.08);
  });

  volSlider.addEventListener('input', (e) => {
    btnMute.textContent = e.target.value == 0 ? '🔇' : '🔊';
  });

  // Open on YouTube Link
  document.getElementById('btnYtLink').addEventListener('click', () => {
    const tracks = getActiveTracks();
    const t = tracks[currentTrackIdx] || tracks[0];
    if (t) window.open(`https://www.youtube.com/watch?v=${t.id}`, '_blank');
  });

  // Media Search: Displays search results directly inside Kho bài (never opens external YouTube tab)
  const mediaSearch = document.getElementById('mediaSearch');
  const btnMediaSearch = document.getElementById('btnMediaSearch');
  function doMediaSearch() {
    const q = mediaSearch.value.trim();
    if (!q) return;

    // If user pasted a direct YouTube URL, play it immediately in the player
    const match = q.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      playCustomVideo(match[1], 'Video YouTube Đã Dán', 'YouTube Link');
      document.querySelector('.media-tab[data-mtab="playing"]').click();
      mediaSearch.value = '';
      return;
    }

    // Otherwise, switch to "Kho bài" and display matching song cards directly inside the app!
    playBeep(700, 0.08);
    document.querySelector('.media-tab[data-mtab="catalog"]').click();
    renderCatalog(q);
  }
  btnMediaSearch.addEventListener('click', doMediaSearch);
  mediaSearch.addEventListener('keypress', (e) => { if (e.key === 'Enter') doMediaSearch(); });

  // Live TV Channel Selector
  const tvChannels = document.querySelectorAll('.tv-ch');
  const tvFrame = document.getElementById('tvFrame');
  const TV_URLS = {
    vtv1: 'https://vtvgo.vn/xem-truc-tuyen-kenh-vtv1-1.html',
    vtv3: 'https://vtvgo.vn/xem-truc-tuyen-kenh-vtv3-2.html',
    vtv2: 'https://vtvgo.vn/xem-truc-tuyen-kenh-vtv2-3.html',
    vtvcantho: 'https://vtvgo.vn/xem-truc-tuyen-kenh-vtv-can-tho-6.html'
  };

  tvChannels.forEach(ch => {
    ch.addEventListener('click', () => {
      tvChannels.forEach(c => c.classList.remove('active'));
      ch.classList.add('active');
      const channelKey = ch.getAttribute('data-ch');
      if (TV_URLS[channelKey]) tvFrame.src = TV_URLS[channelKey];
      playBeep(650, 0.08);
    });
  });

  // Playlist Save Modal
  const playlistModal = document.getElementById('playlistModal');
  const btnSave = document.getElementById('btnSave');
  const btnClosePlaylist = document.getElementById('btnClosePlaylist');
  const btnChoose = document.getElementById('btnChoose');

  btnSave.addEventListener('click', () => {
    playlistModal.classList.remove('hidden');
    playBeep(650, 0.08);
  });
  btnClosePlaylist.addEventListener('click', () => playlistModal.classList.add('hidden'));

  document.querySelectorAll('.playlist-item').forEach(item => {
    item.addEventListener('click', () => {
      item.querySelector('.pl-add').textContent = '✓ Đã thêm';
      item.style.borderColor = 'var(--green-accent)';
      playBeep(880, 0.15);
      setTimeout(() => playlistModal.classList.add('hidden'), 800);
    });
  });

  btnChoose.addEventListener('click', () => {
    document.querySelector('.media-tab[data-mtab="catalog"]').click();
  });

  // ================= 9. LIVE REALTIME CLOCK =================
  const liveTime = document.getElementById('liveTime');
  const liveDate = document.getElementById('liveDate');

  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    liveTime.innerHTML = `${h}:${m}<span class="cc-sec">:${s}</span>`;

    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const dName = days[now.getDay()];
    const d = String(now.getDate()).padStart(2, '0');
    const mo = String(now.getMonth() + 1).padStart(2, '0');
    const y = now.getFullYear();
    liveDate.textContent = `📅 ${dName}, ${d}/${mo}/${y}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Auto-advance to next song on every page load/open
  function initAutoAdvanceTrack() {
    const tracks = getActiveTracks();
    let savedIdx = null;
    try {
      savedIdx = localStorage.getItem('duo_current_track_idx');
    } catch (e) {}

    let nextIdx = 0;
    if (savedIdx !== null && !isNaN(parseInt(savedIdx, 10)) && tracks.length > 0) {
      // Advance to next song compared to the previous session
      nextIdx = (parseInt(savedIdx, 10) + 1) % tracks.length;
    } else {
      nextIdx = 0;
    }

    try {
      localStorage.removeItem('duo_current_track');
      localStorage.setItem('duo_current_track_idx', nextIdx.toString());
    } catch (e) {}

    playTrackByIndex(nextIdx);
  }

  // Initialize profile, auto-advance to next track, load cached GPS, update counts, and apply default 35:65 ratio
  loadProfile();
  restoreSplitRatio();
  updateCounts();
  updateCatalogTabLabel();
  initAutoAdvanceTrack();
  loadCachedGPS();
  // Chỉ hỏi quyền vị trí đúng 1 lần duy nhất, sau đó chạy ngầm hoàn toàn tự động
  initGpsOnce(false);
});
