import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, AfterLoad, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';  
import { Images } from '../../common/entities/images.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Column({ nullable: true })
  totalGuests: number;

  @ManyToOne(() => User, user => user.events)
  creator: User;
  
  @OneToMany(()=> Images, image=> image.event)
  images: Images[]
}
