import { v4 as uuid } from 'uuid';
import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Money } from './Money';
import { Bag } from './Bag';

@Entity('user')
class User {
    @PrimaryColumn()
    id?: string;

    @OneToOne(() => Money)
    @JoinColumn()
    money: Money;

    @OneToOne(() => Bag)
    @JoinColumn()
    bag: Bag;

    @CreateDateColumn()
    created_at: string;

    @CreateDateColumn()
    updated_at: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User };