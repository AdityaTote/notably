import { auth } from '@server/lib/auth';
import { Context, Next } from 'hono';

export const authMiddleware = async (c: Context, next: Next) => {
    const createAuth = auth(c.env);
    const session = await createAuth.api.getSession({
        headers: c.req.raw.headers,
    });

    if (!session) {
        c.set('user', null);
        c.set('session', null);
    }

    c.set('session', session);
    c.set('userId', session?.user.id);

    return next();
};
