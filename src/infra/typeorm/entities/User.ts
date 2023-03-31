import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({default: false})
  is_admin: boolean;

  @Column({nullable: true})
  avatar: string;

  @CreateDateColumn()
  created_at: Date;
}

export { User };