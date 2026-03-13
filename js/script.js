/* VAR CONTROLS */
const btnLaunch = document.getElementById('btnLaunch');
const btnPause = document.getElementById('btnPause');
const btnPrevious = document.getElementById('btnPrevious');
const btnNext = document.getElementById('btnNext');
const btnVolDown = document.getElementById('volumeDown');
const btnVolUp = document.getElementById('volumeUp');
const volIcon = document.getElementById('volumeIcon');
const player = document.getElementById('player');
const progressBar = document.getElementById('progressBar');
const soundFile = document.getElementById('soundFile');

const playlist = [
    {music:"music/Crystal_Cave.mp3", image: "image/Crystal_Cave.jpg", title: "Crystal Cave ", artist: "cynicmusic", album: "The Cynic Project"},
    {music:"music/Cyberpunk_Moonlight_Sonata.mp3", image: "image/Cyberpunk_Moonlight_Sonata.png", title: "Cyberpunk Moonlight Sonata", artist: "Joth", album: "-Unknown album-"},
    {music:"music/The_Field_of_Dreams.mp3", image: "image/The_Field_of_Dreams.png", title: "The Field Of Dreams", artist: "Paulius Jurgelevièius", album: "Public Domain"},
    {music:"music/Bossa_Nova.mp3", image: "image/Bossa_Nova.png", title: "Bossa Nova", artist: "Joth", album: "-Unknown album-"}
];

/* VAR MUSIC INFO */
const musicTitle = document.getElementById('music-title');
const musicImage = document.getElementById('musicImage');
const musicArtist = document.getElementById('music-artist');
const musicAlbum = document.getElementById('music-album');
var musicVolume = 10;
var musicNb = 0;

/* FUNCTION UPDATE MUSIC INFOS */
function updateMusicInfos() {
    player.src=playlist[musicNb].music;
    musicImage.src = playlist[musicNb].image;
    musicTitle.innerHTML = playlist[musicNb].title;
    musicArtist.innerHTML = playlist[musicNb].artist;
    musicAlbum.innerHTML = playlist[musicNb].album;
};

/* FUNCTION SHOW PAUSE BTN, HIDE PLAY BUTTON */
function showPauseBtn() {
    btnLaunch.hidden = true;
    btnPause.hidden = false;
}

/* FUNCTION SHOW PLAY BTN, HIDE PAUSE BUTTON */
function showPlayBtn() {
    btnLaunch.hidden = false;
    btnPause.hidden = true;
}

/* FUNCTION PREVIOUS & NEXT BUTTON */
function btnPress(btn) {
    if (btn == "prev") {
        if (musicNb > 0) {
            musicNb -= 1;
        } else {
            musicNb = playlist.length-1;
        }
    } else if (btn == "next") {
        if (musicNb < playlist.length -1) {
            musicNb += 1;
        } else {
            musicNb = 0;
        }
    }
    updateMusicInfos();
    player.play();
    showPauseBtn();
}

/* FUNCTION PROGRESS BAR + TIME UPDATE */
function updateProgress() {
    const duration = player.duration;
    const currentTime = player.currentTime;
    const progress = (currentTime / duration) * 100;
    progressBar.max = duration;
    progressBar.value = player.currentTime;
    var min = Math.floor(currentTime / 60);
    var sec = Math.floor(currentTime - min * 60);
    var durmin = Math.floor(duration / 60);
    var dursec = Math.floor(duration - durmin * 60);
    var musicLength = durmin + ":" + dursec;
    var musicProgression = min + ":" + sec;
    if (progress > 0) {
        document.getElementById('musicLength').innerHTML = musicLength;
        document.getElementById('musicProgression').innerHTML = musicProgression + " /";
    }
    console.log(progressBar.max);
    /* SKIP TO NEXT SONG IF FINISHED */
    if (player.currentTime >= player.duration) btnPress("next");
}

/* FUNCTION CREATE CATALOG CARDS FOR EACH MUSIC */
function addElement(muscNb) {
    const newDiv = document.createElement("div");
    newDiv.id = "music" + (muscNb+1);

    const newImg = new Image(150);

    newImg.src = playlist[muscNb].image;
    newDiv.appendChild(newImg);

    const currentDiv = document.getElementById("music-catalog");
    currentDiv.appendChild(newDiv);

    newDiv.addEventListener("click",function() {
        musicNb = muscNb;
        updateMusicInfos();
        player.play();
        showPauseBtn();
    });

    newDiv.addEventListener("mouseover",function() {
        document.getElementById("music" + (muscNb+1)).style.cursor = "pointer";
    });
}

/* MUSIC SET INIT */
updateMusicInfos();

/* PLAY BUTTON */
btnLaunch.addEventListener("click",function() {
    player.play();
    showPauseBtn();
});

/* PAUSE BUTTON */
btnPause.addEventListener("click",function() {
    player.pause();
    showPlayBtn();
});

/* NEXT BUTTON */
btnNext.addEventListener("click",function() {
    btnPress("next");
});

/* PREVIOUS BUTTON */
btnPrevious.addEventListener("click",function() {
    btnPress("prev");
});

/* VOLUME - BUTTON */
btnVolDown.addEventListener("click",function() {
    if (musicVolume > 0) musicVolume -= 1;
    player.volume = musicVolume /10;
    updateVolumeIcon();
});

/* VOLUME + BUTTON */
btnVolUp.addEventListener("click",function() {
    if (musicVolume < 10) musicVolume += 1;
    player.volume = musicVolume /10;
    updateVolumeIcon();
});

/* UPDATE VOLUME ICON */
function updateVolumeIcon() {
    if (player.volume > 0.5) {
        volIcon.innerHTML = "🔊";
    } else if (player.volume > 0) {
        volIcon.innerHTML = "🔉";
    } else {
        volIcon.innerHTML = "🔈";
    }
}

/* UPDATE PLAYER INFOS */
player.addEventListener('timeupdate', updateProgress);

/* PROGRESS BAR CLICK */
progressBar.addEventListener('input', function (e) {
    clickedValue=e.target.value;
    player.currentTime = clickedValue;
});

/* CREATE CATALOG CARDS FOR EACH MUSIC */
for (let i = 0; i < playlist.length; i++) {
    var muscNb = i;
    addElement(muscNb);
}
