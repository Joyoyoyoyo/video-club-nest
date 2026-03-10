import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video-dto';

// PartialType rend TOUS les champs de CreateVideoDto optionnels (?)
// mais garde les validations (@IsString, @IsInt, etc.) si le champ est présent.
export class UpdateVideoDto extends PartialType(CreateVideoDto) {}