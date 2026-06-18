"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const csv_writer_1 = require("csv-writer");
const node_stream_1 = require("node:stream");
const csv_parser_1 = __importDefault(require("csv-parser"));
let AdminProductsService = class AdminProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async exportProductsToCsv() {
        const products = await this.prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
        const csvStringifier = (0, csv_writer_1.createObjectCsvStringifier)({
            header: [
                { id: 'id', title: 'ID' },
                { id: 'name', title: 'NAME' },
                { id: 'slug', title: 'SLUG' },
                { id: 'price', title: 'PRICE' },
                { id: 'stock', title: 'STOCK' },
                { id: 'description', title: 'DESCRIPTION' },
            ]
        });
        const headerString = csvStringifier.getHeaderString();
        const recordString = csvStringifier.stringifyRecords(products.map((p) => ({
            ...p,
            price: p.basePrice ? p.basePrice.toString : '0',
        })));
        return headerString + recordString;
    }
    async importProductsFromCsv(fileBuffer) {
        const results = [];
        const stream = node_stream_1.Readable.from(fileBuffer);
        await new Promise((resolve, reject) => {
            stream
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => results.push(data))
                .on('end', resolve)
                .on('error', reject);
        });
        let importedCount = 0;
        let failedCount = 0;
        const errors = [];
        for (let i = 0; i < results.length; i++) {
            const row = results[i];
            const rowNumber = i + 1;
            if (!row.name || !row.slug || !row.basePrice || !row.stock) {
                failedCount++;
                errors.push({
                    row: rowNumber,
                    reason: 'Missing required fields (name, slug, price, or stock)'
                });
                continue;
            }
            try {
                const existingProduct = await this.prisma.product.findUnique({
                    where: { slug: row.slug },
                });
                if (existingProduct) {
                    failedCount;
                    errors.push({
                        row: rowNumber,
                        reason: `Duplicate product skipped. Slug "${row.slug}" already exists.`,
                    });
                    continue;
                }
                await this.prisma.product.create({
                    data: {
                        name: row.name,
                        slug: row.slug,
                        basePrice: parseFloat(row.basePrice),
                        stock: parseInt(row.stock, 10),
                        description: row.description || null,
                        weight: row.weight ? parseInt(row.weight, 10) : 0,
                        sku: row.sku || `SKU-${Date.now()}-${rowNumber}`,
                    },
                });
                importedCount++;
            }
            catch (error) {
                failedCount++;
                errors.push({
                    row: rowNumber,
                    reason: error.message || 'Internal database saving error',
                });
            }
        }
        return {
            imported: importedCount,
            failed: failedCount,
            errors: errors,
        };
    }
};
exports.AdminProductsService = AdminProductsService;
exports.AdminProductsService = AdminProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminProductsService);
//# sourceMappingURL=admin-products.service.js.map