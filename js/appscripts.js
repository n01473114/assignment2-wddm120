function loadScript(src) {
    let script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.body.append(script);
}
// firebase setup
loadScript(`https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js`)
loadScript(`https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js`)
loadScript(`https://www.gstatic.com/firebasejs/8.10.1/firebase-storage.js`)
loadScript(`https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js`)
loadScript(`/js/firebaseconfig.js`)

loadScript(`/js/appdata.js`)