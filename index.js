console.log("Welcome To Spotify");

// iniialize the events
let songIndex=0;
let audioElement= new Audio('songs/1.mp3');   // important to provide path
let masterPlay= document.getElementById('masterPlay');
let myProgessBar = document.getElementById('myProgressBar');
let songItem = Array.from(document.getElementsByClassName("songItem"));  /* shallow copy of the array */
let masterSongName = document.getElementById('masterSongName');


let songs=[   //array of objects
    {songName: "Armin Ranft - [NCS Release]" , filePath: "songs/1.mp3" ,  coverPath: "covers/1.jpg"},
    {songName: "Cielo - [NCS Release]" , filePath: "songs/2.mp3" ,  coverPath: "covers/2.jpg"},
    {songName: "Invincible - [NCS Release]" , filePath: "songs/3.mp3" ,  coverPath: "covers/3.jpg"},
    {songName: "My Heart - [NCS Release]" , filePath: "songs/4.mp3" ,  coverPath: "covers/4.jpg"},
    {songName: "Heroes Tonight - [NCS Release]" , filePath: "songs/5.mp3" ,  coverPath: "covers/5.jpg"},
    {songName: "Invincible - [NCS Release]" , filePath: "songs/6.mp3" ,  coverPath: "covers/6.jpg"},
    {songName: "Heroes Tonight - [NCS Release]" , filePath: "songs/7.mp3" ,  coverPath: "covers/7.jpg"},
    {songName: "Armin Ranft - [NCS Release]" , filePath: "songs/8.mp3" ,  coverPath: "covers/8.jpg"},
    {songName: "Heroes Tonight - [NCS Release]" , filePath: "songs/9.mp3" ,  coverPath: "covers/9.jpg"},
    {songName: "My Heart - [NCS Release]" , filePath: "songs/10.mp3" , coverPath: "covers/10.jpg"}
]


// Iterating though the songItem array and setting the song/path/banner accordingly
songItem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

})

// handle play/pause click
masterPlay.addEventListener("click", ()=>{

    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        document.getElementById('gif').style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        document.getElementById('gif').style.opacity=0;
    }
});


// Listening to events 
audioElement.addEventListener('timeupdate',()=>{
    //console.log('timeUpdate');
    //  update seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100); // % of song played
    //console.log(progress);
    myProgessBar.value=progress;
})

// skip to a part of the song using progress bar
myProgessBar.addEventListener("change",()=>{  
    audioElement.currentTime = myProgessBar.value* audioElement.duration/100;
} )



const makeAllPlayIcons=()=>{
    Array.from(document.querySelectorAll(".songItemPlayIcon")).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })

};


Array.from(document.getElementsByClassName("songItemPlayIcon")).forEach((element)=>{
    element.addEventListener('click',(e)=>{

        if(audioElement.paused){
            // console.log(e.target); - fetches the element which is clicked
            makeAllPlayIcons();
            songIndex= parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src= `songs/${songIndex+1}.mp3`;   //identify which song is to be played 
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            masterSongName.innerText= songs[songIndex].songName;
            document.getElementById('gif').style.opacity=1;
        }

        else{
            makeAllPlayIcons();
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            document.getElementById('gif').style.opacity=0;
        }
    })
})


//handle previous button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9)
        songIndex=0;
    else 
        songIndex+=1;

    audioElement.src= `songs/${songIndex+1}.mp3`;   //identify which song is to be played 
    audioElement.currentTime=0;  // when song changes it begins from 0 again
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText= songs[songIndex].songName;
    document.getElementById('gif').style.opacity=1;
})


//handle next button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
        songIndex=9;
    else 
        songIndex-=1;

    audioElement.src= `songs/${songIndex+1}.mp3`;   //identify which song is to be played 
    audioElement.currentTime=0;  // when song changes it begins from 0 again
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText= songs[songIndex].songName;
    document.getElementById('gif').style.opacity=1;
})


