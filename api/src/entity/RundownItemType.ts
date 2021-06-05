import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { RundownItem } from "./RundownItem";

@Entity()
export class RundownItemType {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public name: string;

    @Column()
    public description: string;
    
    @Column()
    public color: string;

    @OneToMany(() => RundownItem, (rundownItem) => rundownItem.type)
    public rundownItems: RundownItemType[];

}
