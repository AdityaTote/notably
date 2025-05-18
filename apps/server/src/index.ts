import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { Env } from '@server/types/bindings';
import { auth } from '@server/lib/auth';

const app = new Hono<{ Bindings: Env }>();

app.use(
    '/api/*',
    cors({
        origin: ['http://localhost:3000'],
        allowHeaders: ['Content-Type', 'Authorization'],
        allowMethods: ['POST', 'GET', 'OPTIONS'],
        exposeHeaders: ['Content-Length'],
        maxAge: 600,
        credentials: true,
    })
);

app.get('/', (c) => {
    return c.text('Hello Hono!');
});

app.on(['POST', 'GET'], '/api/auth/*', (c) => {
    const createAuth = auth(c.env);
    return createAuth.handler(c.req.raw);
});

serve(app);

export default app;
