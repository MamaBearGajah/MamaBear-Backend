import { prisma } from './../../../prisma/seed/index';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { createObjectCsvStringifier } from 'csv-writer';
import { Readable } from 'node:stream';
import csvParser from 'csv-parser';

@Injectable()
export class AdminProductsService {
    constructor(private prisma: PrismaService) {}

    async exportProductsToCsv(): Promise<string> {
        const products = await this.prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        })

        const csvStringifier = createObjectCsvStringifier({
            header: [
                { id: 'id', title: 'ID' },
                { id: 'name', title: 'NAME' },
                { id: 'slug', title: 'SLUG' },
                { id: 'price', title: 'PRICE' },
                { id: 'stock', title: 'STOCK' },
                { id: 'description', title: 'DESCRIPTION' },
            ]
        })

        const headerString = csvStringifier.getHeaderString()
        const recordString = csvStringifier.stringifyRecords(
            products.map((p) => ({
                ...p,
                price: p.basePrice ? p.basePrice.toString : '0',
            })),
        )

        return headerString + recordString
    }

    async importProductsFromCsv(fileBuffer: Buffer) {
        const results: any[] = []
        const stream = Readable.from(fileBuffer)

        await new Promise((resolve, reject) => {
            stream
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', resolve)
                .on('error', reject)
        })

        let importedCount = 0
        let failedCount = 0
        const errors: Array<{ row: number; reason: string }> = []

        for (let i = 0; i < results.length; i++) {
            const row = results[i]
            const rowNumber = i + 1
            
            if (!row.name || !row.slug || !row.basePrice || !row.stock) {
                failedCount++
                errors.push({
                    row: rowNumber,
                    reason: 'Missing required fields (name, slug, price, or stock)'
                })
                continue
            }

            try {
                const existingProduct = await this.prisma.product.findUnique({
                    where: { slug: row.slug },
                })
    
                if (existingProduct) {
                    failedCount
                    errors.push({
                        row: rowNumber,
                        reason: `Duplicate product skipped. Slug "${row.slug}" already exists.`,
                    })
                    continue
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
                })
    
                importedCount++
            }
            catch (error) {
                failedCount++
                errors.push({
                    row: rowNumber,
                    reason: error.message || 'Internal database saving error',
                })
            }
        }

        return {
            imported: importedCount,
            failed: failedCount,
            errors: errors,
        }
    }
}