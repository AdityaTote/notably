import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@repo/db/client';
import { users } from '@repo/db/schema';
import { Env } from '@server/types/bindings';

export const auth = (env: Env) => {
    return betterAuth({
        database: drizzleAdapter(db, {
            provider: 'sqlite',
            schema: users.userModel,
        }),
        emailAndPassword: {
            enabled: true,
        },
        socialProviders: {
            google: {
                clientId: env.GOOGLE_CLIENT_ID as string,
                clientSecret: env.GOOGLE_CLIENT_SECRET as string,
            },
            github: {
                clientId: env.GITHUB_CLIENT_ID as string,
                clientSecret: env.GITHUB_CLIENT_SECRET as string,
            },
        },
    });
};
