import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../../events/entities/event.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;
  
  @Column()
  password: string;

  @OneToMany(() => Event,  event => event.creator)
  events: Event[];
}
