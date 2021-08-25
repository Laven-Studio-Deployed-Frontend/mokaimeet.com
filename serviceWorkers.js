importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBfgoTKfA17mZPShR4cHc8SAipdD1UVcPo",
    authDomain: "laven-meet.firebaseapp.com",
    projectId: "laven-meet",
    storageBucket: "laven-meet.appspot.com",
    messagingSenderId: "445914571680",
    appId: "1:445914571680:web:19d07709b48973d1473ac5",
    measurementId: "G-CTFYRTF2CQ"
})

const messaging = firebase.messaging();

// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
  self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    try {
      const applicationServerKey = urlB64ToUint8Array(
        'BDyuz6dhluPhjgRmw1r9qbiRbRvYAmlCHv2nFRod0hjw9QYTOSFX81WzmDhLwVVTr8156iMS0FcZlwMcSI6gfp8'
      )
      const options = { applicationServerKey, userVisibleOnly: true }
      const subscription = await self.registration.pushManager.subscribe(options)
      //console.log(JSON.stringify(subscription))
    } catch (err) {
      console.log('Error', err)
    }
  })