document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const playlist = document.getElementById('playlist');
    const audioPlayer = document.getElementById('audioPlayer');
    const trackInfo = document.getElementById('trackInfo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTimeElement = document.getElementById('currentTime');
    const durationElement = document.getElementById('duration');

    playlist.innerHTML = ''; // Clear the playlist

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const li = document.createElement('li');
        li.textContent = file.name;
        li.addEventListener('click', function() {
            playTrack(file);
            updateActiveTrack(li);
        });
        playlist.appendChild(li);
    }

    function playTrack(file) {
        const url = URL.createObjectURL(file);
        audioPlayer.src = url;
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
        trackInfo.textContent = `Now playing: ${file.name}`;

        audioPlayer.addEventListener('loadedmetadata', function() {
            durationElement.textContent = formatTime(audioPlayer.duration);
            progressBar.max = Math.floor(audioPlayer.duration);
        });

        audioPlayer.addEventListener('timeupdate', function() {
            progressBar.value = Math.floor(audioPlayer.currentTime);
            currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
        });
    }

    function updateActiveTrack(activeLi) {
        const listItems = playlist.getElementsByTagName('li');
        for (let item of listItems) {
            item.classList.remove('active');
        }
        activeLi.classList.add('active');
    }

    playPauseBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    progressBar.addEventListener('input', function() {
        audioPlayer.currentTime = progressBar.value;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = Math.floor(seconds % 60);
        return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    }
});

// Custom Context Menu Functionality
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    const contextMenu = document.getElementById('customContextMenu');
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;
});

document.addEventListener('click', function(event) {
    const contextMenu = document.getElementById('customContextMenu');
    if (contextMenu.style.display === 'block') {
        contextMenu.style.display = 'none';
    }
});

// Custom Modal Functionality
const customModal = document.getElementById('customModal');
const closeModal = document.querySelector('.modal-close');

function showModal() {
    customModal.style.display = 'block';
}

function hideModal() {
    customModal.style.display = 'none';
}

closeModal.addEventListener('click', hideModal);
window.addEventListener('click', function(event) {
    if (event.target === customModal) {
        hideModal();
    }
});

// Prevent Ctrl/Cmd + U and Ctrl/Cmd + Shift + I with a custom message
document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && (event.key === 'u' || (event.shiftKey && event.key === 'I'))) {
        event.preventDefault();
        showModal();
    }
});
