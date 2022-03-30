const db = firebase.firestore()
const storage = firebase.storage()
const dbTracks = []

function runApp () {
    loadScript(`/js/app.js`)
    console.log(`Your App is Ready!`)
}

// firebase user
firebase.auth().onAuthStateChanged(function(user){
    getUser(user.uid)
})

function getUser(uid){
    db.collection(`Users`)
    .doc(uid)
    .get()
    .then(function(doc){
        if(doc.exists){
            console.log(`Oh! It's you, ${doc.data().firstName} 🥳 Welcome...`)
            user = doc.data().user
        }
    }).then(getTracks)
    .catch((err) => console.log(`Error getting user data: `, err))
}

// firebase tracklist
function getTracks() {
    db.collection(`Users/${user}/tracklist`)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           dbTracks.push(doc.data())
        })
    })
    .then(console.log(`Loading your Tracks...`))
    .then(runApp)
    .catch((err) => {
        console.log(`Error receiving tracks: `, err)
    })
}

// firebase storage
function trackCoverURL(coverStatus, index) {
    coverRef = storage.ref(`album_cover/${index}.jpg`)
    coverRef.getDownloadURL()
        .then((downloadURL)=>{
            coverStatus.src = downloadURL
        })
}
