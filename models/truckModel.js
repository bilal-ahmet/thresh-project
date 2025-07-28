// Truck Model
class Truck {
    static CAPACITY = 8; // ton - maksimum çöp kapasitesi

    constructor(id, name, plate, status, fullness, location, lastUpdate, route, workingHours) {
        this.id = id;
        this.name = name;
        this.plate = plate;
        this.status = status;
        this.fullness = fullness;
        this.location = location;
        this.lastUpdate = lastUpdate;
        this.route = route;
        this.workingHours = workingHours;
    }

    // Çöp ağırlığını hesapla (ton cinsinden)
    getWasteWeight() {
        return (this.fullness * Truck.CAPACITY) / 100;
    }

    static getAll() {
        return [
            new Truck(1, 'Kamyon-001', '34 ABC 123', 'active', 75, 'Kadıköy', '2024-01-15 14:30', 'Kadıköy - Üsküdar - Maltepe', 6.5),
            new Truck(2, 'Kamyon-002', '34 DEF 456', 'active', 45, 'Beşiktaş', '2024-01-15 14:25', 'Beşiktaş - Şişli - Kağıthane', 4.2),
            new Truck(3, 'Kamyon-003', '34 GHI 789', 'maintenance', 0, 'Depo', '2024-01-15 10:00', 'Bakım', 0),
            new Truck(4, 'Kamyon-004', '34 JKL 012', 'active', 90, 'Sarıyer', '2024-01-15 14:35', 'Sarıyer - Beykoz - Çekmeköy', 7.8),
            new Truck(5, 'Kamyon-005', '34 MNO 345', 'active', 30, 'Bakırköy', '2024-01-15 14:20', 'Bakırköy - Küçükçekmece - Avcılar', 3.5),
            new Truck(6, 'Kamyon-006', '34 PQR 678', 'active', 60, 'Fatih', '2024-01-15 14:28', 'Fatih - Eminönü - Sultanahmet', 5.2)
        ];
    }

    static findById(id) {
        const trucks = Truck.getAll();
        return trucks.find(truck => truck.id == id);
    }

    static getActiveCount() {
        const trucks = Truck.getAll();
        return trucks.filter(truck => truck.status === 'active').length;
    }

    static getMaintenanceCount() {
        const trucks = Truck.getAll();
        return trucks.filter(truck => truck.status === 'maintenance').length;
    }

    static getAverageFullness() {
        const trucks = Truck.getAll();
        const totalFullness = trucks.reduce((sum, truck) => sum + truck.fullness, 0);
        return Math.round(totalFullness / trucks.length);
    }

    // Toplam çöp ağırlığını hesapla
    static getTotalWasteWeight() {
        const trucks = Truck.getAll();
        return trucks.reduce((sum, truck) => sum + truck.getWasteWeight(), 0);
    }

    // Aktif kamyonların toplam çöp ağırlığını hesapla
    static getActiveTrucksWasteWeight() {
        const trucks = Truck.getAll();
        const activeTrucks = trucks.filter(truck => truck.status === 'active');
        return activeTrucks.reduce((sum, truck) => sum + truck.getWasteWeight(), 0);
    }
}

module.exports = Truck;
