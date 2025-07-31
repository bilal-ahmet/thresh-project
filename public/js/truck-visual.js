// Yeni Kamyon Görsel Sistemi
// Kamyon kasası boyama sistemi kaldırıldı, yeni görsel sistemi uygulandı

function initializeTruckVisual(container, fullnessLevel = 0, truckId = null) {
    if (!container) return;
    
    // Container içini temizle
    container.innerHTML = '';
    
    // Kamyon ID'sine göre görsel seç
    let imageSrc = '/img/truckAll.png'; // Varsayılan görsel
    
    if (truckId) {
        // Kamyon ID'sini kontrol et
        if (truckId === 1 || truckId === '1' || truckId === 'Kamyon-00001') {
            imageSrc = '/img/truck1.png';
        } else if (truckId === 2 || truckId === '2' || truckId === 'Kamyon-00002') {
            imageSrc = '/img/truck2.png';
        }
    }
    
    // Eğer truckId yoksa, container'dan data-truck-id attribute'unu al
    if (!truckId && container) {
        const dataTruckId = container.getAttribute('data-truck-id');
        if (dataTruckId) {
            if (dataTruckId === '1' || dataTruckId === 'Kamyon-00001') {
                imageSrc = '/img/truck1.png';
            } else if (dataTruckId === '2' || dataTruckId === 'Kamyon-00002') {
                imageSrc = '/img/truck2.png';
            }
        }
    }
    
    // Kamyon resmini ekle
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Garbage truck';
    img.style.display = 'block';
    img.style.width = '100%';
    img.style.height = 'auto';
    container.appendChild(img);
    
    // Renk class'ını belirle (her durumda gerekli)
    const colorClass = getFillColorClass(fullnessLevel);
    
    // Doluluk badge'i kaldırıldı - Sadece kamyon görseli göster
    
    console.log(`🚛 Kamyon görseli yüklendi: ${fullnessLevel}% (${colorClass}) - Görsel: ${imageSrc}`);
    return container;
}

// Doluluk seviyesine göre renk class'ını belirle
function getFillColorClass(fullnessLevel) {
    if (fullnessLevel < 30) return 'low-fill';        // Yeşil
    if (fullnessLevel < 60) return 'medium-fill';     // Turuncu
    if (fullnessLevel < 80) return 'high-fill';       // Turuncu-kırmızı
    return 'critical-fill';                           // Kırmızı + animasyon
}

// Kamyon görselini güncelleme fonksiyonu
function updateTruckFullness(containerId, newFullnessLevel, truckId = null) {
    const container = document.querySelector(containerId);
    if (!container) {
        console.error(`Kamyon container bulunamadı: ${containerId}`);
        return;
    }

    // Badge kaldırıldığı için sadece log mesajı
    const newColorClass = getFillColorClass(newFullnessLevel);
    console.log(`🚛 Kamyon ${containerId} güncellendi: ${newFullnessLevel}% (${newColorClass})`);
}

// Tüm kamyonları bulup doluluk seviyelerini ayarlama
function updateAllTruckVisuals() {
    // Küçük kamyonlar (dashboard)
    const smallTrucks = document.querySelectorAll('.truck-visual-small');
    smallTrucks.forEach((truck, index) => {
        const fullnessClass = Array.from(truck.classList).find(cls => cls.startsWith('fullness-'));
        const fullnessLevel = fullnessClass ? parseInt(fullnessClass.replace('fullness-', '')) : 0;
        
        // Kamyon ID'sini data attribute'dan al
        const truckId = truck.getAttribute('data-truck-id');
        
        // ID ver
        truck.id = truck.id || `truck-small-${index}`;
        
        // Initialize et
        initializeTruckVisual(truck, fullnessLevel, truckId);
        
        // Container'ı görünür yap
        setTimeout(() => {
            truck.style.opacity = '1';
        }, 100 + index * 100);
    });

    // Büyük kamyonlar (detay sayfası) 
    const largeTrucks = document.querySelectorAll('.truck-container-visual');
    largeTrucks.forEach((truck, index) => {
        const fullnessClass = Array.from(truck.classList).find(cls => cls.startsWith('fullness-'));
        const fullnessLevel = fullnessClass ? parseInt(fullnessClass.replace('fullness-', '')) : 0;
        
        // Kamyon ID'sini data attribute'dan al
        const truckId = truck.getAttribute('data-truck-id');
        
        // ID ver
        truck.id = truck.id || `truck-large-${index}`;
        
        // Initialize et
        initializeTruckVisual(truck, fullnessLevel, truckId);
        
        // Container'ı görünür yap
        setTimeout(() => {
            truck.style.opacity = '1';
        }, 300);
    });
}

// Auto-init: Sayfa yüklendiğinde mevcut truck container'ları yeni sistemi ile başlat
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚛 Yeni Kamyon Görsel Sistemi başlatılıyor...');
    
    // Tüm kamyon görsellerini güncelle
    updateAllTruckVisuals();
    
    // Debug için mevcut kamyonları listele
    const allTrucks = document.querySelectorAll('.truck-visual-small, .truck-container-visual');
    console.log(`Toplam ${allTrucks.length} kamyon görseli bulundu`);
    
    allTrucks.forEach((truck, index) => {
        const fullnessClass = Array.from(truck.classList).find(cls => cls.startsWith('fullness-'));
        const fullnessLevel = fullnessClass ? parseInt(fullnessClass.replace('fullness-', '')) : 0;
        console.log(`Kamyon #${truck.id}: ${fullnessLevel}% doluluk (CSS: ${fullnessClass || 'fullness-0'})`);
    });
});

// Global fonksiyon olarak dışa aktar  
window.initializeTruckVisual = initializeTruckVisual;
window.updateTruckFullness = updateTruckFullness;
window.updateAllTruckVisuals = updateAllTruckVisuals;