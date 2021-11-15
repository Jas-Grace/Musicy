console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('music/courage.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('mySlider');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Courage to Change - Sia", filePath: "music/courage.mp3", coverPath: "covers/sia.png"},
    {songName: "Diamond Heart - Alan Walker", filePath: "music/diamond.mp3", coverPath: "covers/alan.png"},
    {songName: "El Bano - Enrique Eglesias", filePath: "music/El_bano.mp3", coverPath: "covers/enrique.png"},
    {songName: "Friends - Annie Mary & Marshamello", filePath: "music/Friends.mp3", coverPath: "covers/marshamallo.png"},
    {songName: "On My Way - Alan Walker", filePath: "music/my_way.mp3", coverPath: "covers/alan.png"},
    {songName: "We Own It - Baha Men", filePath: "music/own_it.mp3", coverPath: "covers/2chainz.png"},
    {songName: "Duele El Corazon - Enrique Eglesias", filePath: "music/el_corazon.mp3", coverPath: "covers/enrique.png"},
    {songName: "It's My Life - Bon Jovi", filePath: "music/my_life.mp3", coverPath: "covers/jovi.png"},
    {songName: "Bailamos - Enrique Eglesias", filePath: "music/bailamos.mp3", coverPath: "covers/enrique.png"}
]

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{ 
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

const check_over = ()=>{
    if (myProgressBar.value > 95) {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
}

i = 0
while(i < songs.length){
    html_to = `<div class="songItem" ><img src="${songs[i].coverPath}" alt=""><span class="songName">${songs[i].songName}</span><span class="songlistplay"><i class="fas fa-play songItemPlay" id="${i}"></i></span></div>`
    document.getElementById('songlist').innerHTML += html_to
    i += 1
}

// Main logic starts********************************
document.getElementById("mySlider").oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100;
    this.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + value + '%, #fff ' + value + '%, white 100%)';
}

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        makeAllPlays()
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');

        // if(songIndex === 0){
        //     audioElement.src = 'music/courage.mp3';
        //     masterSongName.innerText = 'Courage to Change - Sia'
        // }
        
        audioElement.src = songs[songIndex].filePath
        masterSongName.innerText = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    })
})

document.getElementById('next').addEventListener('click', ()=>{ 
    if (songIndex>=songs.length){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }

    audioElement.src = songs[songIndex].filePath
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1; 
    makeAllPlays()
})

document.getElementById('previous').addEventListener('click', ()=>{ 
    if (songIndex<=0){
        songIndex = songs.length;
    }
    else{
        songIndex -= 1;
    }

    audioElement.src = songs[songIndex].filePath
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1; 
    makeAllPlays()
})

document.getElementById('submit_song').addEventListener('click', ()=>{ 
    song_to_save = document.getElementById('song_usr').value
})