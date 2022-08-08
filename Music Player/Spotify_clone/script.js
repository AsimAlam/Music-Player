console.log("Welcome");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('gif');
const text = document.getElementById('masterSongName');
let progress = 0
// let songItem = Array.from(document.getElementsByClassName('masterSongName'));

let songs = [
    {songName: "let me love you", filePath: "songs/1.mp3", coverPath: ""},
    {songName: "Taking to the Moon", filePath: "songs/2.mp3", coverPath: ""},
    {songName: "Hymn for the Weekend", filePath: "songs/3.mp3", coverPath: ""},
    {songName: "Peaches", filePath: "songs/4.mp3", coverPath: ""},
    {songName: "We Dont't Talk Anymore", filePath: "songs/5.mp3", coverPath: ""},
    {songName: "Watermelon Sugar", filePath: "songs/6.mp3", coverPath: ""},
    {songName: "Senorita", filePath: "songs/7.mp3", coverPath: ""},
]

// songItem.forEach((element, i)=>{ 
//     element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
// })


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime ==0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        text.innerText = songs[songIndex].songName;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((e)=>{
            if(e.id == songIndex){
                e.classList.remove('fa-circle-play');
                e.classList.add('fa-circle-pause');
            }
            
        })
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((e)=>{
            if(e.id == songIndex){
                e.classList.remove('fa-circle-pause');
                e.classList.add('fa-circle-play');
            }
            
        })
    }
})


myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value *audioElement.duration)/100;
})

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt(((audioElement.currentTime/audioElement.duration))*100);
    // console.log(progress);
    myProgressBar.value = progress;
    if(progress == 100){
        audioElement.currentTime = 0;
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        makeAllPlays();
        gif.style.opacity = 0;
    }
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element)=>{
    Element.addEventListener('click', (e)=>{
        makeAllPlays();
        let ss = songIndex;
        songIndex = parseInt(e.target.id);
        text.innerText = songs[songIndex].songName;
        if(ss == songIndex){
            if(audioElement.paused || audioElement.currentTime ==0){
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            }else{
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                audioElement.pause();
                gif.style.opacity = 0;
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
            }
        }else{
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        
        
    })
})

document.getElementById('next').addEventListener('click' , ()=>{
    makeAllPlays();
    if(songIndex >=6){
        songIndex = 0;
    }else{
        songIndex+=1;
    }

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((e)=>{
        if(e.id == songIndex){
            e.classList.remove('fa-circle-play');
            e.classList.add('fa-circle-pause');
        }
        
    })
    
    text.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex <=0){
        songIndex = 6;
    }else{
        songIndex-=1;
    }
    makeAllPlays();
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((e)=>{
        if(e.id == songIndex){
            e.classList.remove('fa-circle-play');
            e.classList.add('fa-circle-pause');
        }
        
    })
    text.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})