import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Field
} from "type-graphql";

import { sign } from "jsonwebtoken";
import { User } from "./entity/User";
import { hash } from "bcryptjs";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return "Hi!";
    }

    @Query(() => [User])
    users() {
        return User.find();
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await user.validPassword(password))) {
            throw new Error("Invalid email or password");
        }

        return {
            accessToken: sign({ userId: user.id }, "kasdnkjasndpkasdjnpoasdn", {
                expiresIn: "15m"
            })
        };
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        const hashedPasword = await hash(password, 12);
        try {
            await User.insert({
                email,
                password: hashedPasword
            });
        } catch (err) {
            return false;
        }
        return true;
    }
}
