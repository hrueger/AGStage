import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { RundownItemType } from "./RundownItemType";

@Entity()
export class RundownItem {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public index: number;

    @Column()
    public name: string;

    @ManyToOne(() => RundownItemType, (type) => type.rundownItems)
    public type: RundownItemType;
}
