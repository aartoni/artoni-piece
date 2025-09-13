import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  property: string;

  @IsInt()
  @Min(1)
  pieces: number;
}
