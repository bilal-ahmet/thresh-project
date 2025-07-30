// Yeni Basit ve Etkili Kamyon Doluluk Sistemi  
// Kullanıcının yaklaşımına dayalı - img + truck-fill div sistemi

function initializeTruckVisual(container, fullnessLevel = 0) {
    if (!container) return;
    
    // Container içini temizle
    container.innerHTML = '';
    
    // Kamyon resmini ekle
    const img = document.createElement('img');
    img.src = '/img/truck.png';
    img.alt = 'Garbage truck';
    img.style.display = 'block';
    img.style.width = '100%';
    img.style.height = 'auto';
    container.appendChild(img);
    
    // Doluluk div'ini ekle
    const fillDiv = document.createElement('div');
    fillDiv.className = 'truck-fill';
    fillDiv.style.height = fullnessLevel + '%';
    
    // Renk class'ını belirle
    const colorClass = getFillColorClass(fullnessLevel);
    fillDiv.classList.add(colorClass);
    
    container.appendChild(fillDiv);
    
    console.log(`🚛 Kamyon inizialize edildi: ${fullnessLevel}% (${colorClass})`);
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
function updateTruckFullness(containerId, newFullnessLevel) {
    const container = document.querySelector(containerId);
    if (!container) {
        console.error(`Kamyon container bulunamadı: ${containerId}`);
        return;
    }

    // truck-fill div'ini bul
    let fillDiv = container.querySelector('.truck-fill');
    if (!fillDiv) {
        console.log('truck-fill div bulunamadı, yeniden initialize ediliyor...');
        initializeTruckVisual(container, newFullnessLevel);
        return;
    }
    
    // Height'i güncelle
    fillDiv.style.height = newFullnessLevel + '%';
    
    // Renk class'ını güncelle
    const newColorClass = getFillColorClass(newFullnessLevel);
    fillDiv.className = 'truck-fill ' + newColorClass;
    
    console.log(`🚛 Kamyon ${containerId} güncellendi: ${newFullnessLevel}% (${newColorClass})`);
}

// Tüm kamyonları bulup doluluk seviyelerini ayarlama
function updateAllTruckVisuals() {
    // Küçük kamyonlar (dashboard)
    const smallTrucks = document.querySelectorAll('.truck-visual-small');
    smallTrucks.forEach((truck, index) => {
        const fullnessClass = Array.from(truck.classList).find(cls => cls.startsWith('fullness-'));
        const fullnessLevel = fullnessClass ? parseInt(fullnessClass.replace('fullness-', '')) : 0;
        
        // ID ver
        truck.id = truck.id || `truck-small-${index}`;
        
        // Initialize et
        initializeTruckVisual(truck, fullnessLevel);
        
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
        
        // ID ver
        truck.id = truck.id || `truck-large-${index}`;
        
        // Initialize et
        initializeTruckVisual(truck, fullnessLevel);
        
        // Container'ı görünür yap
        setTimeout(() => {
            truck.style.opacity = '1';
        }, 300);
    });
}

// Auto-init: Sayfa yüklendiğinde mevcut truck container'ları yeni sistemi ile başlat
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚛 Yeni Basit Kamyon Doluluk Sistemi başlatılıyor...');
    
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