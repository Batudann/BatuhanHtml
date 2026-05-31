// Firebase Ayarları
const firebaseConfig = {
  apiKey: "AIzaSyCywSoT8L0hOcVAMyfwMKySogGp75fsEDA",
  authDomain: "oozusta-c2947.firebaseapp.com",
  databaseURL: "https://oozusta-c2947-default-rtdb.firebaseio.com",
  projectId: "oozusta-c2947",
  storageBucket: "oozusta-c2947.firebasestorage.app",
  messagingSenderId: "343190328587",
  appId: "1:343190328587:web:26e103e0dacce9ecfbfe0e",
  measurementId: "G-QH3NKRHTBV"
};
// Firebase'i Başlat
firebase.initializeApp(firebaseConfig);
const database = typeof firebase.database === 'function' ? firebase.database() : null;

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

// Admin Panelinden Yemek Ekleme


function saveMenu() {
    const ad = document.getElementById('food-name').value;
    const aciklama = document.getElementById('food-desc').value;
    const fiyat = document.getElementById('food-price').value;
    const status = document.getElementById('status');

    if (ad && aciklama && fiyat) {
        database.ref('menu').push({
            ad: ad,
            aciklama: aciklama,
            fiyat: fiyat
        }).then(() => {
            status.style.display = 'block';
            // Formu temizle
            document.getElementById('food-name').value = '';
            document.getElementById('food-desc').value = '';
            document.getElementById('food-price').value = '';
            
            setTimeout(() => { status.style.display = 'none'; }, 3000);
        }).catch((error) => {
            alert("Hata: " + error.message);
        });
    } else {
        alert("Lütfen tüm alanları doldurun!");
    }
}