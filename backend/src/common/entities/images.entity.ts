import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, AfterLoad, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity('image_details')
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  images?: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', default: null })
  deleted_at: Date;

  @ManyToOne(() => Event, event => event.id)
  event: Event;

  @AfterLoad()
  joinPath(): void {
    this.images =
      this.images !== null
        ? `${process.env.IMAGE_PATH}/uploads${this.images}`
        : this.images;
  }
}
