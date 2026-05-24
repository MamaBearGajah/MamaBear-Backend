import {
  Controller, Get, Post, Patch, Body, Param, HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { MembershipService } from './membership.service.js';
import { GetUser, Roles } from '../auth/decorators/index.js';
import { Role } from '../../generated/prisma/enums.js';
import { IsInt, Min } from 'class-validator';
import { DailyLoginResponseDto, MembershipDto, MembershipWithUserDto } from './dto/membership-response.dto.js';
import { BadRequestResponseDto, ForbiddenResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';

class AddPointsDto {
  @ApiProperty({ description: 'Number of points to add', minimum: 1, example: 10 })
  @IsInt()
  @Min(1)
  points!: number;
}

@ApiTags('Membership')
@ApiBearerAuth('access-token')
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get('me')
  @ApiOkResponse({ description: 'Returns the authenticated user\'s membership and points.', type: MembershipDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  getMyMembership(@GetUser('sub') userId: string) {
    return this.membershipService.getMyMembership(userId);
  }

  @Post('me/daily-login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Daily login bonus claimed. Returns updated points.', type: DailyLoginResponseDto })
  @ApiBadRequestResponse({ description: 'Daily login bonus already claimed today.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  claimDailyLogin(@GetUser('sub') userId: string) {
    return this.membershipService.claimDailyLogin(userId);
  }

  @Get('leaderboard')
  @ApiOkResponse({ description: 'Returns the top members ranked by points.', type: [MembershipWithUserDto] })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  getLeaderboard() {
    return this.membershipService.getLeaderboard();
  }

  @Roles(Role.admin, Role.super_admin)
  @Get('admin')
  @ApiOkResponse({ description: 'Returns all member records (admin only).', type: [MembershipWithUserDto] })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  adminGetAll() {
    return this.membershipService.adminGetAll();
  }

  @Roles(Role.admin, Role.super_admin)
  @Patch('admin/:userId/points')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Points added to user successfully.', type: MembershipDto })
  @ApiBadRequestResponse({ description: 'Invalid points value.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'User not found.', type: NotFoundResponseDto })
  adminAddPoints(@Param('userId') userId: string, @Body() dto: AddPointsDto) {
    return this.membershipService.adminAddPoints(userId, dto.points);
  }
}
