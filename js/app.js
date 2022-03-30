firebase.auth().onAuthStateChanged(function(user){
    if (!user) window.location = `index.html`
})

const allTracks = dbTracks.sort((a, b) => (a.trackID > b.trackID) ? 1 : -1)
const playOrPause = document.getElementById(`playBttn`)
const getList = document.getElementById(`queueBttn`)
const closeQueueBttn = document.getElementById(`closeQueueBttn`)
const tracklist = document.getElementById(`tracks`)
const currentCoverImg = document.getElementById(`currentCoverImg`)
const prevCoverImg = document.getElementById(`prevCoverImg`)
const nextCoverImg = document.getElementById(`nextCoverImg`)

const getPrev = [
    document.getElementById(`prevBttn`),
    document.getElementById(`prevShape`),
    document.getElementById(`prevInfo`),
]

const getNext = [
    document.getElementById(`nextBttn`),
    document.getElementById(`nextShape`),
    document.getElementById(`nextInfo`),
]

let playingIndex = 0
const currentTrack = new Audio()
currentTrack.src = allTracks[playingIndex].src

//PRINT FULL TRACKLIST

const appendTrackEle = function(item, index) {
	tracklist.innerHTML += `
    <li data-index="${index}" class="track-list"">
        <h1 data-index="${index}" class="title-list">${item.title}</h1>
        <h2 data-index="${index}" class="artist-list">${item.artist}</h2>
        <h3 data-index="${index}" class="album-list"> ${item.album ? `• ${item.album}` : ``}</h3>
    </li>
    `
}

allTracks.forEach(appendTrackEle)

//SET CURRENT VIEW

function setNewCurrent() {    
    trackCoverURL(currentCoverImg, allTracks[playingIndex].trackID)
    document.getElementById(`currentTitle`).textContent = `${allTracks[playingIndex].title}`
    document.getElementById(`currentArtist`).textContent = `${allTracks[playingIndex].artist}`
}
function setNewPrev() {
    prevTrackIndex = (playingIndex - 1) < 0 ? (allTracks.length - 1) : playingIndex - 1
    trackCoverURL(prevCoverImg, allTracks[prevTrackIndex].trackID)
    document.getElementById(`prevTitle`).textContent = `${allTracks[prevTrackIndex].title}`
    document.getElementById(`prevArtist`).textContent = `${allTracks[prevTrackIndex].artist}`
}
function setNewNext() {
    nextTrackIndex = (playingIndex + 1) > (allTracks.length - 1) ? 0 : playingIndex + 1
    trackCoverURL(nextCoverImg, allTracks[nextTrackIndex].trackID)
    document.getElementById(`nextTitle`).textContent = `${allTracks[nextTrackIndex].title}`
    document.getElementById(`nextArtist`).textContent = `${allTracks[nextTrackIndex].artist}`
}
function setNewAll() {
    setNewCurrent()
    setNewPrev()
    setNewNext()
}

setNewAll()


//PLAY BUTTON ACTIONS
function setPauseBttn() {
    document.getElementById(`playBttn`).style.background = `url(assets/icons_pause.svg)`
    document.getElementById(`nowPlayingLegend`).textContent = `Now Playing`
}
function setPlayBttn() {
    document.getElementById(`playBttn`).style.background = `url(assets/icons_play.svg)`
    document.getElementById(`nowPlayingLegend`).textContent = `Paused`
}
playOrPause.addEventListener(`click`, function(event) {

    if (currentTrack.paused) {
        currentTrack.play()
        setPauseBttn()
        console.log(`NOW PLAYING Index: ${playingIndex}, TrackID: ${allTracks[playingIndex].trackID}`)
    } else {
        currentTrack.pause()
        setPlayBttn()
        console.log(`PAUSED Index: ${playingIndex}, TrackID: ${allTracks[playingIndex].trackID}`)
    }
})

//PREVIOUS BUTTON ACTIONS
getPrev.forEach(function(prev){

    prev.addEventListener(`click`, function() {
        prevTrackIndex = (playingIndex - 1) < 0 ? (allTracks.length - 1) : playingIndex - 1
        playingIndex = prevTrackIndex

        if (!currentTrack.paused) {
            currentTrack.src = allTracks[playingIndex].src
            currentTrack.play()
            setNewAll()
            console.log(`NOW PLAYING Index: ${playingIndex}, TrackID: ${allTracks[playingIndex].trackID}`)
        } else {
            currentTrack.src = allTracks[playingIndex].src
            setNewAll()
            console.log(`PAUSED Index: ${playingIndex}, TrackID: ${allTracks[playingIndex].trackID}`)
        }
    })
})

//NEXT BUTTON ACTIONS
getNext.forEach(function(next) {
    next.addEventListener(`click`, function() {
        nextTrackIndex = (playingIndex + 1) > (allTracks.length - 1) ? 0 : playingIndex + 1
        playingIndex = nextTrackIndex
    
        if (!currentTrack.paused) {
            currentTrack.src = allTracks[playingIndex].src
            currentTrack.play()
            setNewAll()
            console.log(`NOW PLAYING Index: ${playingIndex}, TrackID: ${allTracks[playingIndex].trackID}`)
        } else {
            currentTrack.src = allTracks[playingIndex].src
            setNewAll()
            console.log(`PAUSED Index: ${playingIndex}, TrackID: ${allTracks[playingIndex].trackID}`)
        }
    })
})

//GET TRACKLIST BUTTON (QUEUE BUTTON) ACTIONS
getList.addEventListener(`click`, function(event) {
    document.getElementById(`queueView`).style.display = `initial`
})


//Hide queue
function hideQueue() {
    document.getElementById(`queueView`).style.display = `none`
}
closeQueueBttn.addEventListener(`click`, function(event) {
    hideQueue()
})

//track ended
currentTrack.addEventListener(`ended`, function() {
    playingIndex = playingIndex + 1 > (allTracks.length - 1) ? 0 : playingIndex + 1
    currentTrack.src = allTracks[playingIndex].src
    currentTrack.play()
    setNewAll()
    setPauseBttn()
    console.log(`NOW PLAYING Index: ${playingIndex}, TrackID: ${allTracks[playingIndex].trackID}`)
})

//TIME
const trackTime = document.getElementById(`trackTime`)
const trackDuration = document.getElementById(`trackDuration`)
const trackProgress = document.getElementById(`trackProgress`)

currentTrack.addEventListener(`durationchange`, function() {
    trackDuration.textContent = currentTrack.duration
})

currentTrack.addEventListener(`timeupdate`, function() {
    trackTime.textContent = currentTrack.currentTime
    if (amDragProgress) return
    trackProgress.value = currentTrack.currentTime / currentTrack.duration
})

let amDragProgress = false

trackProgress.addEventListener(`input`, function() {
    amDragProgress = true
})

trackProgress.addEventListener(`change`, function() {
    amDragProgress = false
    currentTrack.currentTime = trackProgress.value * currentTrack.duration
})

//SELECT FROM LIST
tracklist.addEventListener(`click`, function(event) {
    const trackToPlay = event.target 
    if (trackToPlay.matches(`li`)) {
        trackSelected = trackToPlay
        playFromList()
    } else if (trackToPlay.matches(`h1`)) {
        trackSelected = trackToPlay
        playFromList()
    } else if (trackToPlay.matches(`h2`)) {
        trackSelected = trackToPlay
        playFromList()
    } else if (trackToPlay.matches(`h3`)) {
        trackSelected = trackToPlay
        playFromList()
    }
})

function playFromList() {   
    playingIndex = Number(trackSelected.dataset.index)
    currentTrack.src = allTracks[playingIndex].src
    currentTrack.play()
    setNewAll()
    setPauseBttn()
    hideQueue()
    console.log(`NOW PLAYING Index: ${playingIndex}, TrackID: ${allTracks[playingIndex].trackID}`)
}
