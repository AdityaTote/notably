import { drizzle } from 'drizzle-orm/libsql';
import { authToken, url } from './constant';

export const db = drizzle({
    connection: {
        url: url,
        authToken: authToken,
    },
});
