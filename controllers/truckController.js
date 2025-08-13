// Truck Controller - Başiskele Çöp Kamyonu İzleme Sistemi
const TRUCK_CAPACITY = 8000; // kg - maksimum çöp kapasitesi (8 ton = 8000 kg - gerçekçi çöp kamyonu kapasitesi)
const CONTAINER_MIN_WEIGHT = 5; // kg - minimum konteynır ağırlığı
const CONTAINER_MAX_WEIGHT = 120; // kg - maksimum konteynır ağırlığı

// Truck verilerini memory'de sakla (gerçek uygulamada database kullanılmalı)
let truckDataCache = [
    {
        id: 1,
        name: 'Kamyon-00001',
        plate: '41 BAS 001',
        status: 'active',
        fullness: 75,
        location: 'Özel Güzergah Bölgesi',
        lastUpdate: '2024-01-15 14:30',
        route: 'Özel Belirlenen Güzergah',
        workingHours: 6.5,
        currentStreet: 'Güzergah Başlangıcı',
        driver: 'Mehmet Yılmaz',
        fuelLevel: 85,
        speed: 25,
        nextStop: 'Güzergah Nokta 2',
        collectedContainers: 42,
        totalContainers: 100,
        totalDistance: 45.8, // km
        coordinates: {
            lat: 40.713313,
            lng: 29.932394
        }
    },
    {
        id: 2,
        name: 'Kamyon-00002',
        plate: '41 BAS 002',
        status: 'active',
        fullness: 45,
        location: 'Özel Güzergah Bölgesi 2',
        lastUpdate: '2024-01-15 14:25',
        route: 'Özel Belirlenen Güzergah 2',
        workingHours: 4.2,
        currentStreet: 'Güzergah Başlangıcı 2',
        driver: 'Ali Özkan',
        fuelLevel: 70,
        speed: 30,
        nextStop: 'Güzergah Nokta 2',
        collectedContainers: 38,
        totalContainers: 100,
        totalDistance: 38.6, // km
        coordinates: {
            lat: 40.702874,
            lng: 29.933797
        }
    },
    {
        id: 3,
        name: 'Kamyon-00003',
        plate: '41 BAS 003',
        status: 'maintenance',
        fullness: 0,
        location: 'Başiskele Depo',
        lastUpdate: '2024-01-15 10:00',
        route: 'Bakım Durumu',
        workingHours: 0,
        currentStreet: 'Depo',
        driver: 'Bakım Ekibi',
        fuelLevel: 100,
        speed: 0,
        nextStop: 'Bakım Tamamlanacak',
        collectedContainers: 0,
        totalContainers: 0,
        totalDistance: 0, // km
        coordinates: {
            lat: 40.702371,
            lng: 29.931335
        }
    },
    {
        id: 4,
        name: 'Kamyon-00004',
        plate: '41 BAS 004',
        status: 'active',
        fullness: 90,
        location: 'Atatürk Caddesi',
        lastUpdate: '2024-01-15 14:35',
        route: 'Atatürk Caddesi - Cumhuriyet - İstiklal',
        workingHours: 7.8,
        currentStreet: 'Atatürk Caddesi',
        driver: 'Hasan Demir',
        fuelLevel: 45,
        speed: 20,
        nextStop: 'Cumhuriyet Mahallesi',
        collectedContainers: 89,
        totalContainers: 100,
        totalDistance: 52.3, // km
        coordinates: {
            lat: 40.702800,
            lng: 29.931200
        }
    },
    {
        id: 5,
        name: 'Kamyon-00005',
        plate: '41 BAS 005',
        status: 'active',
        fullness: 30,
        location: 'İstiklal Caddesi',
        lastUpdate: '2024-01-15 14:20',
        route: 'İstiklal Caddesi - Fatih - Selimiye',
        workingHours: 3.5,
        currentStreet: 'İstiklal Caddesi',
        driver: 'Osman Kaya',
        fuelLevel: 90,
        speed: 35,
        nextStop: 'Fatih Mahallesi',
        collectedContainers: 25,
        totalContainers: 100,
        totalDistance: 28.4, // km
        coordinates: {
            lat: 40.702600,
            lng: 29.931400
        }
    },
    {
        id: 6,
        name: 'Kamyon-00006',
        plate: '41 BAS 006',
        status: 'active',
        fullness: 60,
        location: 'Selimiye Mahallesi',
        lastUpdate: '2024-01-15 14:28',
        route: 'Selimiye - Merkez - Sahil',
        workingHours: 5.2,
        currentStreet: 'Selimiye Mahallesi',
        driver: 'Mustafa Acar',
        fuelLevel: 60,
        speed: 28,
        nextStop: 'Merkez Mahalle',
        collectedContainers: 56,
        totalContainers: 100,
        totalDistance: 41.7, // km
        coordinates: {
            lat: 40.702000,
            lng: 29.932000
        }
    }
];

const getTruckData = () => {
    return truckDataCache;
};

// Çöp ağırlığını hesapla (kg cinsinden) - Gerçekçi miktarlar
const calculateWasteWeight = (fullness) => {
    return (fullness * TRUCK_CAPACITY) / 100;
};

// Konteynır ağırlığı üret (5-120kg arası)
const generateContainerWeight = () => {
    return Math.floor(Math.random() * (CONTAINER_MAX_WEIGHT - CONTAINER_MIN_WEIGHT + 1)) + CONTAINER_MIN_WEIGHT;
};

// Başiskele gerçek cadde koordinatları - Gerçek yol ağını takip eden güzergahlar
const getBasiskeleRoutes = () => {
    return {
        // 1. Kamyon rotası - Kullanıcı tarafından belirlenen güzergah
        truck1Route: [
            [40.713313, 29.932394], // Başlangıç konumu
            [40.712834, 29.932462],
            [40.712349, 29.932484],
            [40.711785, 29.932566],
            [40.711039, 29.932638],
            [40.710175, 29.932803],
            [40.709621, 29.932885],
            [40.708821, 29.932773],
            [40.708359, 29.932696],
            [40.708357, 29.933527],
            [40.708409, 29.934642],
            [40.708094, 29.936617],
            [40.707742, 29.938201],
            [40.707277, 29.939947],
            [40.708815, 29.940577],
            [40.709433, 29.941398],
            [40.709994, 29.942615],
            [40.711657, 29.939671],
            [40.712591, 29.937394],
            [40.713891, 29.936500],
            [40.714399, 29.936520],
            [40.714858, 29.941840],
            [40.712726, 29.941961],
            [40.710792, 29.943275]
        ],
        // 2. Kamyon rotası - Kullanıcı tarafından belirlenen yeni güzergah
        truck2Route: [
            [40.702874, 29.933797], // Başlangıç konumu
            [40.703716, 29.933356],
            [40.704137, 29.932463],
            [40.704804, 29.931902],
            [40.705645, 29.931998],
            [40.707232, 29.932297],
            [40.707106, 29.930805],
            [40.706985, 29.930071],
            [40.708295, 29.929816],
            [40.709751, 29.929554],
            [40.710476, 29.929350],
            [40.710094, 29.926416],
            [40.710172, 29.923915],
            [40.710945, 29.924004]
        ],
        // Konteynır konumları - Cadde kenarlarında gerçekçi yerleşim
        containerLocations: [
            // 1. Kamyon güzergahı konteynırları - Yeni rota boyunca
            [40.713200, 29.932400], [40.712900, 29.932430], [40.712600, 29.932450],
            [40.712000, 29.932500], [40.711500, 29.932550], [40.711000, 29.932600],
            [40.710500, 29.932750], [40.710000, 29.932800], [40.709500, 29.932850],
            [40.708900, 29.932750], [40.708400, 29.932700], [40.708350, 29.933200],
            [40.708380, 29.934000], [40.708200, 29.935500], [40.708000, 29.937000],
            [40.707500, 29.938500], [40.707400, 29.939500], [40.708500, 29.940200],
            [40.709200, 29.941000], [40.709800, 29.942000], [40.711400, 29.940000],
            [40.712300, 29.937800], [40.713500, 29.936700], [40.714200, 29.936600],
            [40.714500, 29.940000], [40.713000, 29.941500], [40.711200, 29.942800],
            
            // 2. Kamyon güzergahı konteynırları - Yeni güncellenen rota boyunca
            [40.703000, 29.933700], [40.703600, 29.933400], [40.704000, 29.932500],
            [40.704700, 29.932000], [40.705500, 29.932000], [40.707100, 29.932200],
            [40.707050, 29.930900], [40.707000, 29.930100], [40.708200, 29.929800],
            [40.709600, 29.929600], [40.710300, 29.929400], [40.710050, 29.926500],
            [40.710150, 29.924000], [40.710800, 29.924000]
        ],
        connecting: [
            // Güzergahlar arası bağlantı yolları
            [40.710000, 29.935000, 40.705000, 29.932000],
            [40.712000, 29.940000, 40.708000, 29.929800]
        ]
    };
};

// Konteynır verileri oluştur
const generateContainerData = (count = 200) => {
    const locations = [
        'Emir Sultan Caddesi No: 12', 'Emir Sultan Caddesi No: 24', 'Emir Sultan Caddesi No: 36',
        'Emir Sultan Caddesi No: 48', 'Emir Sultan Caddesi No: 60', 'Emir Sultan Caddesi No: 72',
        'Millet Caddesi No: 8', 'Millet Caddesi No: 16', 'Millet Caddesi No: 28',
        'Millet Caddesi No: 40', 'Millet Caddesi No: 52', 'Millet Caddesi No: 64',
        'Bahçelievler Mahallesi No: 5', 'Bahçelievler Mahallesi No: 15', 'Bahçelievler Mahallesi No: 25',
        'Yenimahalle No: 3', 'Yenimahalle No: 13', 'Yenimahalle No: 23',
        'Merkez Mahalle No: 7', 'Merkez Mahalle No: 17', 'Merkez Mahalle No: 27',
        'Cumhuriyet Mahallesi No: 9', 'Cumhuriyet Mahallesi No: 19', 'Cumhuriyet Mahallesi No: 29',
        'Atatürk Mahallesi No: 11', 'Atatürk Mahallesi No: 21', 'Atatürk Mahallesi No: 31',
        'İstiklal Mahallesi No: 4', 'İstiklal Mahallesi No: 14', 'İstiklal Mahallesi No: 24',
        'Fatih Mahallesi No: 6', 'Fatih Mahallesi No: 16', 'Fatih Mahallesi No: 26',
        'Selimiye Mahallesi No: 10', 'Selimiye Mahallesi No: 20', 'Selimiye Mahallesi No: 30'
    ];
    
    const streets = [
        'Emir Sultan Caddesi', 'Millet Caddesi', 'Atatürk Caddesi', 'İstiklal Caddesi',
        'Cumhuriyet Caddesi', 'Fatih Caddesi', 'Selimiye Caddesi', 'Merkez Caddesi'
    ];
    
    const statuses = ['completed', 'in-progress', 'pending'];
    const statusWeights = [0.6, 0.25, 0.15]; // %60 tamamlandı, %25 devam ediyor, %15 bekliyor
    
    const containers = [];
    const routes = getBasiskeleRoutes();
    
    for (let i = 1; i <= count; i++) {
        const weight = generateContainerWeight();
        const location = locations[Math.floor(Math.random() * locations.length)];
        const street = streets[Math.floor(Math.random() * streets.length)];
        
        // Ağırlıklı durum seçimi
        const rand = Math.random();
        let status;
        if (rand < statusWeights[0]) {
            status = statuses[0]; // completed
        } else if (rand < statusWeights[0] + statusWeights[1]) {
            status = statuses[1]; // in-progress
        } else {
            status = statuses[2]; // pending
        }
        
        const truck = Math.random() > 0.5 ? 'Kamyon-00001' : 'Kamyon-00002';
        
        let arrivalTime = '-', departureTime = '-';
        if (status === 'completed') {
            const hour = Math.floor(Math.random() * 8) + 8; // 8-16 arası
            const minute = Math.floor(Math.random() * 60);
            const duration = Math.floor(Math.random() * 10) + 5; // 5-15 dakika arası
            arrivalTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            departureTime = `${hour.toString().padStart(2, '0')}:${(minute + duration).toString().padStart(2, '0')}`;
        } else if (status === 'in-progress') {
            const hour = Math.floor(Math.random() * 2) + 14; // 14-16 arası
            const minute = Math.floor(Math.random() * 60);
            arrivalTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        }

        // Koordinatları caddeye göre ayarla
        let coordinates;
        if (street.includes('Emir Sultan')) {
            const routeIndex = Math.floor(Math.random() * routes.truck1Route.length);
            coordinates = {
                lat: routes.truck1Route[routeIndex][0] + (Math.random() - 0.5) * 0.001,
                lng: routes.truck1Route[routeIndex][1] + (Math.random() - 0.5) * 0.001
            };
        } else if (street.includes('Millet')) {
            const routeIndex = Math.floor(Math.random() * routes.truck2Route.length);
            coordinates = {
                lat: routes.truck2Route[routeIndex][0] + (Math.random() - 0.5) * 0.001,
                lng: routes.truck2Route[routeIndex][1] + (Math.random() - 0.5) * 0.001
            };
        } else {
            // Diğer caddeler için konteynır konumlarından seç
            const containerIndex = Math.floor(Math.random() * routes.containerLocations.length);
            coordinates = {
                lat: routes.containerLocations[containerIndex][0] + (Math.random() - 0.5) * 0.0005,
                lng: routes.containerLocations[containerIndex][1] + (Math.random() - 0.5) * 0.0005
            };
        }

        containers.push({
            id: i,
            location: `${location}`,
            street: street,
            arrivalTime: arrivalTime,
            departureTime: departureTime,
            weight: weight,
            truck: truck,
            status: status,
            coordinates: coordinates
        });
    }
    
    return containers;
};

// Toplam çöp ağırlığını hesapla (kg)
const getTotalWasteWeight = () => {
    const trucks = getTruckData();
    return trucks.reduce((sum, truck) => sum + calculateWasteWeight(truck.fullness), 0);
};

// Aktif kamyonların toplam çöp ağırlığını hesapla (kg)
const getActiveTrucksWasteWeight = () => {
    const trucks = getTruckData();
    const activeTrucks = trucks.filter(truck => truck.status === 'active');
    return activeTrucks.reduce((sum, truck) => sum + calculateWasteWeight(truck.fullness), 0);
};

// Günlük istatistikleri hesapla
const getDailyStats = () => {
    const containers = generateContainerData();
    const completedContainers = containers.filter(c => c.status === 'completed');
    const totalWasteCollected = completedContainers.reduce((sum, c) => sum + c.weight, 0);
    
    return {
        totalContainers: containers.length,
        completedContainers: completedContainers.length,
        pendingContainers: containers.filter(c => c.status === 'pending').length,
        inProgressContainers: containers.filter(c => c.status === 'in-progress').length,
        totalWasteCollected: totalWasteCollected, // kg cinsinden
        averageContainerWeight: totalWasteCollected / completedContainers.length || 0,
        completionRate: (completedContainers.length / containers.length) * 100
    };
};

const getTruckById = (id) => {
    const trucks = getTruckData();
    return trucks.find(truck => truck.id == id);
};

// Kamyon durumunu kalıcı olarak güncelle
const updateTruckStatus = (id, newStatus) => {
    const truckIndex = truckDataCache.findIndex(t => t.id == id);
    if (truckIndex !== -1) {
        truckDataCache[truckIndex].status = newStatus;
        truckDataCache[truckIndex].lastUpdate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        return truckDataCache[truckIndex];
    }
    return null;
};

const getAllTrucks = (req, res) => {
    const trucks = getTruckData();
    const activeTrucks = trucks.filter(t => t.status === 'active');
    const averageFullness = Math.round(activeTrucks.reduce((sum, t) => sum + t.fullness, 0) / activeTrucks.length);
    const totalWasteWeight = getTotalWasteWeight();
    const activeTrucksWasteWeight = getActiveTrucksWasteWeight();
    const dailyStats = getDailyStats();
    
    res.render('dashboard/index', { 
        user: req.user,
        trucks: trucks,
        activeTrucks: activeTrucks.length,
        averageFullness: averageFullness,
        totalWasteWeight: (totalWasteWeight / 1000).toFixed(1), // ton cinsinden göster
        activeTrucksWasteWeight: (activeTrucksWasteWeight / 1000).toFixed(1), // ton cinsinden göster
        truckCapacity: TRUCK_CAPACITY,
        dailyStats: dailyStats,
        region: 'Başiskele'
    });
};

const getTruckDetails = (req, res) => {
    const truckId = req.params.id;
    const truck = getTruckById(truckId);
    
    if (!truck) {
        return res.redirect('/dashboard');
    }
    
    // Kamyonun çöp ağırlığını hesapla (kg)
    const wasteWeight = calculateWasteWeight(truck.fullness);
    const containers = generateContainerData();
    const dailyStats = getDailyStats();
    const routes = getBasiskeleRoutes();
    
    res.render('dashboard/truck-details', { 
        user: req.user,
        truck: truck,
        wasteWeight: (wasteWeight / 1000).toFixed(1), // ton cinsinden göster (çok küçük olacak)
        wasteWeightKg: wasteWeight.toFixed(0), // kg cinsinden
        truckCapacity: TRUCK_CAPACITY,
        truckCapacityTon: (TRUCK_CAPACITY / 1000).toFixed(1), // ton
        containers: containers,
        dailyStats: dailyStats,
        region: 'Başiskele',
        containerMinWeight: CONTAINER_MIN_WEIGHT,
        containerMaxWeight: CONTAINER_MAX_WEIGHT,
        routes: routes
    });
};

// POST route for updating truck status
const updateTruckStatusRoute = (req, res) => {
    const truckId = req.params.id;
    const { status } = req.body;
    
    const updatedTruck = updateTruckStatus(truckId, status);
    if (updatedTruck) {
        res.json({ success: true, truck: updatedTruck });
    } else {
        res.json({ success: false, message: 'Kamyon bulunamadı' });
    }
};

module.exports = {
    getAllTrucks,
    getTruckDetails,
    updateTruckStatusRoute,
    getTruckData,
    getTruckById,
    calculateWasteWeight,
    getTotalWasteWeight,
    getActiveTrucksWasteWeight,
    generateContainerData,
    getDailyStats,
    generateContainerWeight,
    getBasiskeleRoutes,
    updateTruckStatus
};
