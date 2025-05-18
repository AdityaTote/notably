import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { Env } from '@server/types/bindings';
import { auth } from '@server/lib/auth';
import { prettyJSON } from 'hono/pretty-json';
import { poweredBy } from 'hono/powered-by';
import { logger } from 'hono/logger';

const app = new Hono<{ Bindings: Env }>();

// middlewares
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
app.use(prettyJSON());
app.use(poweredBy());
app.use(logger());

app.get('/', (c) => {
    return c.text('Hello Hono!');
});

app.on(['POST', 'GET'], '/api/auth/*', (c) => {
    const createAuth = auth(c.env);
    return createAuth.handler(c.req.raw);
});

serve(app);

export default app;
