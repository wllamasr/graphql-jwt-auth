import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { compare } from "bcryptjs";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(() => String)
    @ObjectIdColumn()
    id: ObjectID;

    @Field(() => String)
    @Column()
    email: string;

    @Column()
    password: string;

    async validPassword(password: string) {
        return await compare(password, this.password);
    }
}
