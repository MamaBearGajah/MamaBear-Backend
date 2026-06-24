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
const enums_1 = require("../../../generated/prisma/enums");
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
            include: { _count: { select: { variants: true } } },
        });
        const csvStringifier = (0, csv_writer_1.createObjectCsvStringifier)({
            header: [
                { id: 'id', title: 'ID' },
                { id: 'name', title: 'NAME' },
                { id: 'slug', title: 'SLUG' },
                { id: 'sku', title: 'SKU' },
                { id: 'basePrice', title: 'BASE_PRICE' },
                { id: 'discountPrice', title: 'DISCOUNT_PRICE' },
                { id: 'stock', title: 'STOCK' },
                { id: 'weight', title: 'WEIGHT' },
                { id: 'status', title: 'STATUS' },
                { id: 'variants', title: 'VARIANT_COUNT' },
                { id: 'description', title: 'DESCRIPTION' },
                { id: 'createdAt', title: 'CREATED_AT' },
            ],
        });
        const records = products.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            sku: p.sku ?? '',
            basePrice: Number(p.basePrice).toFixed(0),
            discountPrice: p.discountPrice ? Number(p.discountPrice).toFixed(0) : '',
            stock: p.stock,
            weight: p.weight,
            status: p.status,
            variants: p._count.variants,
            description: (p.description ?? '').replace(/\n/g, ' '),
            createdAt: p.createdAt.toISOString().slice(0, 10),
        }));
        return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
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
                errors.push({ row: rowNumber, reason: 'Missing required fields (name, slug, basePrice, or stock)' });
                continue;
            }
            try {
                const existingProduct = await this.prisma.product.findUnique({ where: { slug: row.slug } });
                if (existingProduct) {
                    failedCount++;
                    errors.push({ row: rowNumber, reason: `Duplicate skipped. Slug "${row.slug}" already exists.` });
                    continue;
                }
                const status = Object.values(enums_1.ProductStatus).includes(row.status)
                    ? row.status
                    : enums_1.ProductStatus.draft;
                await this.prisma.product.create({
                    data: {
                        name: row.name,
                        slug: row.slug,
                        basePrice: parseFloat(row.basePrice),
                        stock: parseInt(row.stock, 10),
                        description: row.description || null,
                        weight: row.weight ? parseInt(row.weight, 10) : 0,
                        sku: row.sku || `SKU-${Date.now()}-${rowNumber}`,
                        status,
                        mainImage: row.mainImage || row.imageUrl || '',
                    },
                });
                importedCount++;
            }
            catch (error) {
                failedCount++;
                errors.push({ row: rowNumber, reason: error.message || 'Internal database error' });
            }
        }
        return { imported: importedCount, failed: failedCount, errors };
    }
    async bulkUpdateProducts(dto) {
        const { ids, data } = dto;
        const found = await this.prisma.product.findMany({
            where: { id: { in: ids } },
            select: { id: true },
        });
        const foundIds = found.map((p) => p.id);
        const notFound = ids.filter((id) => !foundIds.includes(id));
        const result = await this.prisma.product.updateMany({
            where: { id: { in: foundIds } },
            data: {
                ...(data.status !== undefined && { status: data.status }),
                ...(data.basePrice !== undefined && { basePrice: data.basePrice }),
            },
        });
        return {
            updated: result.count,
            notFound: notFound.length > 0 ? notFound : undefined,
        };
    }
    async duplicateProduct(productId) {
        const source = await this.prisma.product.findUnique({
            where: { id: productId },
            include: {
                images: true,
                variants: true,
            },
        });
        if (!source)
            throw new common_1.NotFoundException('Produk tidak ditemukan');
        const timestamp = Date.now();
        const newSlug = `${source.slug}-copy-${timestamp}`;
        const newSku = `${source.sku}-COPY-${timestamp}`;
        const duplicate = await this.prisma.$transaction(async (tx) => {
            const newProduct = await tx.product.create({
                data: {
                    name: `${source.name} (Copy)`,
                    slug: newSlug,
                    sku: newSku,
                    description: source.description,
                    notes: source.notes,
                    basePrice: source.basePrice,
                    discountPrice: source.discountPrice,
                    weight: source.weight,
                    stock: 0,
                    mainImage: source.mainImage,
                    status: enums_1.ProductStatus.draft,
                    categoryId: source.categoryId,
                },
            });
            if (source.images.length > 0) {
                await tx.productImage.createMany({
                    data: source.images.map((img) => ({
                        productId: newProduct.id,
                        imageUrl: img.imageUrl,
                        publicId: img.publicId,
                        altText: img.altText,
                        imageType: img.imageType,
                        sortOrder: img.sortOrder,
                        isFeatured: img.isFeatured,
                    })),
                });
            }
            if (source.variants.length > 0) {
                await tx.productVariant.createMany({
                    data: source.variants.map((v) => ({
                        productId: newProduct.id,
                        name: v.name,
                        value: v.value,
                        basePrice: v.basePrice,
                        discountPrice: v.discountPrice,
                        priceAdjustment: v.priceAdjustment,
                        stock: 0,
                        weight: v.weight,
                        imageUrl: v.imageUrl,
                        altText: v.altText,
                        sku: v.sku ? `${v.sku}-COPY-${timestamp}` : null,
                        isActive: v.isActive,
                        sortOrder: v.sortOrder,
                    })),
                });
            }
            return newProduct;
        });
        return {
            message: 'Produk berhasil diduplikasi',
            data: { id: duplicate.id, slug: duplicate.slug, sku: duplicate.sku },
        };
    }
};
exports.AdminProductsService = AdminProductsService;
exports.AdminProductsService = AdminProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminProductsService);
//# sourceMappingURL=admin-products.service.js.map