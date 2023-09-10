import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('leave')
class Leave {
    @PrimaryColumn()
    id?: string;

    @Column()
    guild: string;

    @Column()
    channel: string;

    @Column()
    message: string;

    @Column()
    description?: string;

    @Column()
    role?: string;

    @Column()
    image?: string;

    @Column()
    reason?: string;

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

export { Leave };