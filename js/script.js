document.addEventListener("DOMContentLoaded", () => {
    const main = async () => {
        try {
            const songs = await getSongs();
            const Chhathsongs = await getChhathSongs();
            const Nepalisongs = await getNepaliSongs();
            const Shivsongs = await getShivSongs();
            const Ganeshsongs = await getGaneshSongs();
            // length = songs.length + Chhathsongs.length + Nepalisongs.length + Ganeshsongs.length + Shivsongs.length; 
            if (songs.length === 0 && Chhathsongs.length === 0) {
                console.log("No songs found.");
                return;
            }
            //    console.log(Ganeshsongs)
            // Populate attitude songs section
            const attitudeSong = document.getElementById("attitude-song");
            const attitudeSongContainer = attitudeSong.querySelector(".card");
            if (!attitudeSongContainer) {
                console.error("Attitude song container not found.");
                return;
            }

            // Render song cards dynamically
            attitudeSongContainer.innerHTML = songs.map((song) => createCardHTML(song)).join("");
            // Populate attitude songs section
            const ChhathSong = document.getElementById("Chhath-Puja-Bhajans");
            const ChhathSongContainer = ChhathSong.querySelector(".card");
            if (!ChhathSongContainer) {
                console.error("Chhath song container not found.");
                return;
            }
            // Render song cards dynamically
            ChhathSongContainer.innerHTML = Chhathsongs.map((song) => createCardHTML(song)).join("");
            const NepaliSong = document.getElementById("Nepali-Songs");
            const NepaliSongContainer = NepaliSong.querySelector(".card");
            if (!NepaliSongContainer) {
                console.error("Chhath song container not found.");
                return;
            }
            // Render song cards dynamically
            NepaliSongContainer.innerHTML = Nepalisongs.map((song) => createCardHTML(song)).join("");

            const ShivSong = document.getElementById("Shiv-Bhajans");
            const ShivSongContainer = ShivSong.querySelector(".card");
            if (!ShivSongContainer) {
                console.error("Chhath song container not found.");
                return;
            }
            // Render song cards dynamically
            ShivSongContainer.innerHTML = Shivsongs.map((song) => createCardHTML(song)).join("");

            const GaneshSong = document.getElementById("Ganesh-Bhajans");
            const GaneshSongContainer = GaneshSong.querySelector(".card");
            if (!GaneshSongContainer) {
                console.error("Chhath song container not found.");
                return;
            }
            // Render song cards dynamically
            GaneshSongContainer.innerHTML = Ganeshsongs.map((song) => createCardHTML(song)).join("");

            // Create a single audio player
            const audioPlayerContainer = document.getElementsByClassName("audio-players")[0];
            if (!audioPlayerContainer) {
                console.error("Audio player container not found.");
                return;
            }

            // Render single audio player
            audioPlayerContainer.innerHTML = createSingleAudioPlayerHTML();

            // Initialize audio controls
            initializeAudioControls([...songs, ...Chhathsongs, ...Nepalisongs, ...Shivsongs, ...Ganeshsongs]);

            // console.log(`Loaded ${songs.length + Chhathsongs.length + Nepalisongs.length + Ganeshsongs.length  + Shivsongs.length} songs.`,"Attitude Song length " + songs.length, " Chhath Song length " + Chhathsongs.length, " Nepali Song Length " + Nepalisongs.length + " Ganesh Bhajan length " + Ganeshsongs.length + " Shiv Bhajan length " + Shivsongs.length);
        } catch (error) {
            console.error("Error in main function:", error);
        }
    };
    // Helper function to create card HTML
    const createCardHTML = (song) => {
         NamefontSize = song.name.length >= 20 ? "1rem" : "0.6rem";
         fontSize = song.artist.length >= 20 ? "1rem" : "0.5rem";
        return `
<div class="card-player p-1">
    <div class="song-img">
        <img src="${song.img}" alt="Image" />
    </div>
     <div class="play">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
            <circle cx="24" cy="24" r="22" fill="#1DB954" />
            <path d="M18 32V16L32 24L18 32Z" fill="#000000" />
        </svg>
    </div>
    <div class="song-name">
        <p class = "${song.name}" style="font-size:${NamefontSize}">${song.name}</p>
        <div class="singer-name">
        <span style=" font-size: ${fontSize};">Artist:${song.artist}</span>
        </div>
    </div>
</div>
`;
    };

    // Helper function to create single audio player HTML
    const createSingleAudioPlayerHTML = () => `
<div id="audioPlayer" class="audio-player">
<div style="width: 100%;" class="audios-info flex justify-space-between">
<div class="audio-info">
<img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/empty-album.jpg" alt="Song Image" class="song-image" />
<div class="song-details">
<h3 class="song-title"style=" font-size: ${NamefontSize};">No Song Playing</h3>
<p class="song-artist" style=" font-size: ${fontSize};">Artist: Unknown</p>
</div>
</div>
<div class="download">
    <svg   class="w-6 h-6 text-gray-800 dark:text-white  download-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"/>
</svg>

</div>
</div>
<div class="audio-controls">
<img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/prevsong.svg" alt="Previous Song" class="control-btn prev-btn" />
<img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/play.svg" alt="Play Song" class="control-btn play-btn" />
<img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/nextsong.svg" alt="Next Song" class="control-btn next-btn" />
<img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/volume.svg" alt="Volume Control" class="control-btn volume-btn" />
<input type="range" class="volume-slider" min="0" max="1" step="0.01" value="1" />
</div>
<div class="audio-timer">
<span class="current-time">0:00</span>
<input type="range" class="progress-bar" min="0" max="100" value="0" />
<span class="duration">0:00</span>
</div>
</div>
`;
    const initializeAudioControls = (allSongs) => {
        //    console.log(allSongs, allSongs.length)
        let currentSongIndex = 0;
        const audio = new Audio(allSongs[currentSongIndex].song);
        const playButton = document.querySelector(".play-btn");
        const prevButton = document.querySelector(".prev-btn");
        const nextButton = document.querySelector(".next-btn");
        const progressBar = document.querySelector(".progress-bar");
        const currentTimeDisplay = document.querySelector(".current-time");
        const durationDisplay = document.querySelector(".duration");
        const volumeSlider = document.querySelector(".volume-slider");
        const songTitle = document.querySelector(".song-title");
        const songArtist = document.querySelector(".song-artist");
        const songImage = document.querySelector(".song-image");
        let isPlaying = false;
        const downloadIcon = document.querySelector('.download-icon');
        downloadIcon.addEventListener('click', () => {
            const audioFile = allSongs[currentSongIndex].song; // Get the current audio file URL
            fetch(audioFile)
                .then(response => response.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob); // Create a blob URL
                    const link = document.createElement('a'); // Create a link element
                    link.href = url; // Set the link's href to the blob URL
                    link.download = allSongs[currentSongIndex].name; // Set the download attribute with the song name
                    document.body.appendChild(link); // Append the link to the body
                    link.click(); // Programmatically click the link to trigger the download
                    document.body.removeChild(link); // Remove the link from the document
                    URL.revokeObjectURL(url); // Release the blob URL 
                })
                .catch(error => {
                    console.error('Error downloading audio:', error);
                });
        });
        // Helper to format time
        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
        };

        // Play song
        const playSong = (index) => {
            if (index < 0 || index >= allSongs.length) {
                console.error("Invalid song index");
                return;
            }
            currentSongIndex = index;
            const song = allSongs[currentSongIndex];
            audio.src = song.song;
            audio.pause();
            isPlaying = true;
            playButton.src = "https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/play.svg";

            // Update UI with current song details
            songTitle.textContent = song.name;
            songArtist.textContent = `Artist: ${song.artist}`;
            songImage.src = song.img;
            console.log(`Playing: ${song.name}`);
        };

        // Event listeners
        playButton.addEventListener("click", () => {
            if (isPlaying) {
                audio.pause();
                playButton.src = "https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/play.svg";
            } else {
                audio.play();
                playButton.src = "https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/pause.svg";
            }
            isPlaying = !isPlaying;
        });

        prevButton.addEventListener("click", () => {
            if (currentSongIndex > 0) playSong(currentSongIndex - 1);
        });

        nextButton.addEventListener("click", () => {
            if (currentSongIndex < allSongs.length - 1) playSong(currentSongIndex + 1);
        });

        audio.addEventListener("timeupdate", () => {
            progressBar.value = (audio.currentTime / audio.duration) * 100;
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
            durationDisplay.textContent = formatTime(audio.duration || 0);
        });

        progressBar.addEventListener("input", (e) => {
            audio.currentTime = (e.target.value / 100) * audio.duration;
        });

        volumeSlider.addEventListener("input", (e) => {
            audio.volume = e.target.value;
        });

        audio.addEventListener("ended", () => {
            if (currentSongIndex < allSongs.length - 1) playSong(currentSongIndex + 1);
            else {
                isPlaying = false;
                playButton.src = "https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/play.svg";
            }
        });

        // Add event listeners to song cards
        const cardPlayers = document.querySelectorAll(".card-player");
        cardPlayers.forEach((cardPlayer, index) => {
            const playElement = cardPlayer.querySelector(".play");

            playElement.addEventListener('click', () => {
                const songName = cardPlayer.querySelector('.song-name p').textContent; // Get the song name from the card
                const songIndex = allSongs.findIndex(song => song.name === songName);  // Get the song index from the data attribute
                if (songIndex !== -1) {
                    playSong(index); // Play the song if found
                } else {
                    console.error("Song not found in the array");
                }
            });
            cardPlayer.addEventListener('mouseenter', () => {
                playElement.classList.add('active');
            });

            cardPlayer.addEventListener('mouseleave', () => {
                playElement.classList.remove('active');
            });
        });

        playSong(Math.floor(Math.random() * allSongs.length)); // Play the first song initially
    };

    const getSongsByCategory = async (category) => {
        try {
            const response = await fetch("https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/songs.json");
            if (!response.ok) {
                throw new Error("Failed to fetch songs.json");
            }
            const data = await response.json();
            return data[category] || [];
        } catch (error) {
            console.error("Error fetching song data:", error);
            return [];
        }
    };

    // Fetch all song categories
    const getSongs = () => getSongsByCategory("Attitude Songs");
    const getChhathSongs = () => getSongsByCategory("Chhath Puja Bhajans");
    const getNepaliSongs = () => getSongsByCategory("Nepali Songs");
    const getShivSongs = () => getSongsByCategory("Shiv Bhajans");
    const getGaneshSongs = () => getSongsByCategory("Nonstop Ganesh Bhajan");

    main();


    const hamburgerMenu = document.querySelector('.hamburger');
    const container = document.querySelector('.container ');
    const sidebar = document.querySelector('.left');

    hamburgerMenu.addEventListener('click', () => {
        sidebar.classList.toggle('activated');
        sidebar.style.position = 'absolute';
    });
    function checkSidebarState() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('activated');
            container.classList.add('flex');
            sidebar.style.position = 'relative';
        } else {
            sidebar.classList.add('activated');
            sidebar.style.position = 'absolute';
            // sidebar.style.width = '100vw';
        }
    }
    window.addEventListener('load', checkSidebarState);
});


