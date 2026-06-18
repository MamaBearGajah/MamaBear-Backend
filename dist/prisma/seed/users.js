"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
const bcrypt = __importStar(require("bcrypt"));
async function seedUsers(prisma) {
    const hashedAdmin = await bcrypt.hash("Admin@12345", 10);
    const hashedCustomer = await bcrypt.hash("Customer@123", 10);
    await prisma.user.upsert({
        where: { email: "superadmin@mamabear.id" },
        update: {},
        create: { name: "Super Admin", email: "superadmin@mamabear.id", password: hashedAdmin, role: "super_admin", isVerified: true },
    });
    await prisma.user.upsert({
        where: { email: "admin@mamabear.id" },
        update: {},
        create: { name: "Admin Mamabear", email: "admin@mamabear.id", password: hashedAdmin, role: "admin", isVerified: true },
    });
    const customerData = [
        { name: "Siti Rahayu", email: "siti.rahayu@gmail.com", phone: "081234567001" },
        { name: "Dewi Lestari", email: "dewi.lestari@gmail.com", phone: "081234567002" },
        { name: "Rina Wulandari", email: "rina.wulandari@gmail.com", phone: "081234567003" },
        { name: "Fitria Handayani", email: "fitria.handayani@gmail.com", phone: "081234567004" },
        { name: "Yuni Astuti", email: "yuni.astuti@gmail.com", phone: "081234567005" },
        { name: "Mega Pratiwi", email: "mega.pratiwi@gmail.com", phone: "081234567006" },
        { name: "Indah Permata", email: "indah.permata@gmail.com", phone: "081234567007" },
        { name: "Ayu Setiawati", email: "ayu.setiawati@gmail.com", phone: "081234567008" },
        { name: "Nur Azizah", email: "nur.azizah@gmail.com", phone: "081234567009" },
        { name: "Lina Marlina", email: "lina.marlina@gmail.com", phone: "081234567010" },
    ];
    const customers = await Promise.all(customerData.map((c) => prisma.user.upsert({
        where: { email: c.email },
        update: {},
        create: { ...c, password: hashedCustomer, role: "customer", isVerified: true },
    })));
    const addressData = [
        { label: "Rumah", receiverName: "Siti Rahayu", phone: "081234567001", address: "Jl. Melati No. 12, Kel. Candisari", cityId: "399", provinceId: "14", postalCode: "50254" },
        { label: "Rumah", receiverName: "Dewi Lestari", phone: "081234567002", address: "Jl. Anggrek No. 5, Kel. Banyumanik", cityId: "399", provinceId: "14", postalCode: "50263" },
        { label: "Rumah", receiverName: "Rina Wulandari", phone: "081234567003", address: "Jl. Mawar No. 8, Kel. Pedurungan", cityId: "399", provinceId: "14", postalCode: "50195" },
        { label: "Rumah", receiverName: "Fitria Handayani", phone: "081234567004", address: "Jl. Kenanga No. 3, Kel. Tembalang", cityId: "399", provinceId: "14", postalCode: "50275" },
        { label: "Rumah", receiverName: "Yuni Astuti", phone: "081234567005", address: "Jl. Dahlia No. 21, Kel. Gayamsari", cityId: "399", provinceId: "14", postalCode: "50166" },
        { label: "Rumah", receiverName: "Mega Pratiwi", phone: "081234567006", address: "Jl. Cempaka No. 7, Kel. Ngaliyan", cityId: "399", provinceId: "14", postalCode: "50181" },
        { label: "Rumah", receiverName: "Indah Permata", phone: "081234567007", address: "Jl. Flamboyan No. 15, Kel. Mijen", cityId: "399", provinceId: "14", postalCode: "50216" },
        { label: "Rumah", receiverName: "Ayu Setiawati", phone: "081234567008", address: "Jl. Bougenville No. 9, Kel. Genuk", cityId: "399", provinceId: "14", postalCode: "50117" },
        { label: "Rumah", receiverName: "Nur Azizah", phone: "081234567009", address: "Jl. Teratai No. 4, Kel. Semarang Barat", cityId: "399", provinceId: "14", postalCode: "50149" },
        { label: "Rumah", receiverName: "Lina Marlina", phone: "081234567010", address: "Jl. Seruni No. 11, Kel. Gajahmungkur", cityId: "399", provinceId: "14", postalCode: "50231" },
    ];
    const addresses = await Promise.all(customers.map((customer, i) => prisma.address.create({
        data: { userId: customer.id, ...addressData[i], isDefault: true },
    })));
    console.log("✅ Users & addresses seeded");
    return { customers, addresses };
}
//# sourceMappingURL=users.js.map