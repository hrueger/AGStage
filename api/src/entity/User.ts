import * as bcrypt from "bcryptjs";
import {
Column,
CreateDateColumn,
Entity,
PrimaryGeneratedColumn,
Unique,
} from "typeorm";

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public username: string;

  @Column()
  public isProducer: boolean;

  @Column({select: false})
  public password: string;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      if (unencryptedPassword) {
          return bcrypt.compareSync(unencryptedPassword, this.password);
      } else {
          return false;
      }
  }
}
