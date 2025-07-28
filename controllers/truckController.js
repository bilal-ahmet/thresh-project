// Truck Controller
const TRUCK_CAPACITY = 8; // ton - maksimum çöp kapasitesi

const getTruckData = () => {
    return [
        {
            id: 1,
            name: 'Kamyon-001',
            plate: '34 ABC 123',
            status: 'active',
            fullness: 75,
            location: 'Kadıköy',
            lastUpdate: '2024-01-15 14:30',
            route: 'Kadıköy - Üsküdar - Maltepe',
            workingHours: 6.5
        },
        {
            id: 2,
            name: 'Kamyon-002',
            plate: '34 DEF 456',
            status: 'active',
            fullness: 45,
            location: 'Beşiktaş',
            lastUpdate: '2024-01-15 14:25',
            route: 'Beşiktaş - Şişli - Kağıthane',
            workingHours: 4.2
        },
        {
            id: 3,
            name: 'Kamyon-003',
            plate: '34 GHI 789',
            status: 'maintenance',
            fullness: 0,
            location: 'Depo',
            lastUpdate: '2024-01-15 10:00',
            route: 'Bakım',
            workingHours: 0
        },
        {
            id: 4,
            name: 'Kamyon-004',
            plate: '34 JKL 012',
            status: 'active',
            fullness: 90,
            location: 'Sarıyer',
            lastUpdate: '2024-01-15 14:35',
            route: 'Sarıyer - Beykoz - Çekmeköy',
            workingHours: 7.8
        },
        {
            id: 5,
            name: 'Kamyon-005',
            plate: '34 MNO 345',
            status: 'active',
            fullness: 30,
            location: 'Bakırköy',
            lastUpdate: '2024-01-15 14:20',
            route: 'Bakırköy - Küçükçekmece - Avcılar',
            workingHours: 3.5
        },
        {
            id: 6,
            name: 'Kamyon-006',
            plate: '34 PQR 678',
            status: 'active',
            fullness: 60,
            location: 'Fatih',
            lastUpdate: '2024-01-15 14:28',
            route: 'Fatih - Eminönü - Sultanahmet',
            workingHours: 5.2
        }
    ];
};

// Çöp ağırlığını hesapla (ton cinsinden)
const calculateWasteWeight = (fullness) => {
    return (fullness * TRUCK_CAPACITY) / 100;
};

// Toplam çöp ağırlığını hesapla
const getTotalWasteWeight = () => {
    const trucks = getTruckData();
    return trucks.reduce((sum, truck) => sum + calculateWasteWeight(truck.fullness), 0);
};

// Aktif kamyonların toplam çöp ağırlığını hesapla
const getActiveTrucksWasteWeight = () => {
    const trucks = getTruckData();
    const activeTrucks = trucks.filter(truck => truck.status === 'active');
    return activeTrucks.reduce((sum, truck) => sum + calculateWasteWeight(truck.fullness), 0);
};

const getTruckById = (id) => {
    const trucks = getTruckData();
    return trucks.find(truck => truck.id == id);
};

const getAllTrucks = (req, res) => {
    const trucks = getTruckData();
    const averageFullness = Math.round(trucks.reduce((sum, t) => sum + t.fullness, 0) / trucks.length);
    const totalWasteWeight = getTotalWasteWeight();
    const activeTrucksWasteWeight = getActiveTrucksWasteWeight();
    
    res.render('dashboard/index', { 
        user: req.session.user,
        trucks: trucks,
        averageFullness: averageFullness,
        totalWasteWeight: totalWasteWeight.toFixed(1),
        activeTrucksWasteWeight: activeTrucksWasteWeight.toFixed(1),
        truckCapacity: TRUCK_CAPACITY
    });
};

const getTruckDetails = (req, res) => {
    const truckId = req.params.id;
    const truck = getTruckById(truckId);
    
    if (!truck) {
        return res.redirect('/dashboard');
    }
    
    // Kamyonun çöp ağırlığını hesapla
    const wasteWeight = calculateWasteWeight(truck.fullness);
    
    res.render('dashboard/truck-details', { 
        user: req.session.user,
        truck: truck,
        wasteWeight: wasteWeight.toFixed(1),
        truckCapacity: TRUCK_CAPACITY
    });
};

module.exports = {
    getAllTrucks,
    getTruckDetails,
    getTruckData,
    getTruckById,
    calculateWasteWeight,
    getTotalWasteWeight,
    getActiveTrucksWasteWeight
};
