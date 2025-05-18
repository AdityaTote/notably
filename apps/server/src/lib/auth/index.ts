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

        trustedOrigins: [env.FRONTEND_URL],

        account: {
            modelName: 'users',
            fields: {
                accountId: 'providerAccountId',
                refreshToken: 'refresh_token',
                accessToken: 'access_token',
                accessTokenExpiresAt: 'access_token_expires',
                idToken: 'id_token',
            },
            updateAccountOnSignIn: true,
        },

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

        advanced: {
            cookiePrefix: 'ssid',
            crossSubDomainCookies: {
                enabled: true,
                cookieName: 'ssid',
            },
        },

        rateLimit: {
            window: 10,
            max: 100,
        },
    });
};
