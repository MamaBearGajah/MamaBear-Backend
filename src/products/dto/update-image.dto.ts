import { PartialType } from "@nestjs/swagger";
import { CreateImageDto } from './create-image.dto.js';

export class UpdateImageDto extends PartialType(CreateImageDto) {}