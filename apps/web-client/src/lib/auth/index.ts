import { createAuthClient } from 'better-auth/react';
import { env } from '@/lib/config/env';

export const {
    signIn,
    signUp,
    signOut,
    getAccessToken,
    getSession,
    useSession,
} = createAuthClient({
    baseURL: `${env.NEXT_PUBLIC_API_URL}/api/auth`,
});
