import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

const DAILY_LOGIN_POINTS = 5;

@Injectable()
export class MembershipService {
  constructor(private prisma: PrismaService) {}

  async getMyMembership(userId: string) {
    let membership = await this.prisma.membership.findUnique({ where: { userId } });
    if (!membership) {
      membership = await this.prisma.membership.create({ data: { userId } });
    }
    return membership;
  }

  async claimDailyLogin(userId: string) {
    const membership = await this.getMyMembership(userId);

    const now = new Date();
    const lastClaim = membership.lastDailyLoginAt;

    if (lastClaim) {
      const sameDay =
        lastClaim.getFullYear() === now.getFullYear() &&
        lastClaim.getMonth() === now.getMonth() &&
        lastClaim.getDate() === now.getDate();
      if (sameDay) return { message: 'Daily login sudah diklaim hari ini', membership };
    }

    const updated = await this.prisma.membership.update({
      where: { userId },
      data: {
        points: { increment: DAILY_LOGIN_POINTS },
        lastDailyLoginAt: now,
      },
    });

    return { message: `+${DAILY_LOGIN_POINTS} poin dari daily login`, membership: updated };
  }

  async getLeaderboard() {
    return this.prisma.membership.findMany({
      orderBy: { points: 'desc' },
      take: 20,
      include: { user: { select: { name: true } } },
    });
  }

  async adminGetAll() {
    return this.prisma.membership.findMany({
      orderBy: { points: 'desc' },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }

  async adminAddPoints(userId: string, points: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User tidak ditemukan');

    return this.prisma.membership.upsert({
      where: { userId },
      create: { userId, points },
      update: { points: { increment: points } },
    });
  }
}
