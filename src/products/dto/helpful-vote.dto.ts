import { IsBoolean, IsNotEmpty } from "class-validator";

export class HelpfulVoteDto {
    @IsBoolean()
    @IsNotEmpty()
    isHelpful!: boolean
}