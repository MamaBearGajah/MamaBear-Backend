import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSiteSettingsDto } from './dto/update-site-settings.dto';

const SINGLETON_ID = 'singleton';

@Injectable()
export class SiteSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    // Selalu ada karena di-seed saat migration
    return this.prisma.siteSettings.upsert({
      where: { id: SINGLETON_ID },
      update: {},
      create: { id: SINGLETON_ID },
    });
  }

  async update(dto: UpdateSiteSettingsDto) {
    const settings = await this.prisma.siteSettings.upsert({
      where: { id: SINGLETON_ID },
      update: { ...dto },
      create: { id: SINGLETON_ID, ...dto },
    });
    return { message: 'Settings berhasil disimpan', data: settings };
  }
}
