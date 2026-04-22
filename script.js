// Firebase Ayarları
const firebaseConfig = {
  apiKey: "AIzaSyChL5ipjYz22N1Ds2zEEvNw_rk3gi8HUew",
  authDomain: "oozusta-dbd64.firebaseapp.com",
  databaseURL: "https://oozusta-dbd64-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "oozusta-dbd64",
  storageBucket: "oozusta-dbd64.firebasestorage.app",
  messagingSenderId: "1051302970649",
  appId: "1:1051302970649:web:0c69394be08e8230c7f188",
  measurementId: "G-VXXHS8MF46"
};

// Firebase'i Başlat
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Menü Verilerini Firebase'den Çek ve Sayfada Göster
const menuList = document.getElementById('menu-list');

if (menuList) {
    database.ref('menu').on('value', (snapshot) => {
        const data = snapshot.val();
        menuList.innerHTML = '';
        
        for (let id in data) {
            const item = data[id];
            menuList.innerHTML += `
                <div class="menu-item">
                    <h3>${item.ad}</h3>
                    <p>${item.aciklama}</p>
                    <span class="price">${item.fiyat} TL</span>
                </div>
            `;
        }
    });
}