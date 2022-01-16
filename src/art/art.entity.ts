import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
@Unique(["title"])
export class Art extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: Number;

    @Column()
    public title: String;

    @Column()
    public artist: String;
    
    @Column()
    public latitude: Number;

    @Column()
    public longitude: Number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

}

