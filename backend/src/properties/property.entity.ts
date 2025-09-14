import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PropertyStatus {
  AVAILABLE = 'available',
  NOT_AVAILABLE = 'not_available',
  HIDDEN = 'hidden',
}

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ nullable: false, length: 40 })
  city: string;

  @Column({ nullable: false, length: 200 })
  address: string;

  @Column({ type: 'int', nullable: false })
  totalPieces: number;

  @Column({ type: 'int', default: 0 })
  soldPieces: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  unitPrice: number;

  @Column({ nullable: true, length: 40 })
  image?: string;

  @Index()
  @Column({
    type: 'enum',
    enum: PropertyStatus,
    default: PropertyStatus.HIDDEN,
    nullable: false,
  })
  status: PropertyStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  get availablePieces(): number {
    return this.totalPieces - this.soldPieces;
  }
}
