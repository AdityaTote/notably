import { drizzle } from 'drizzle-orm/libsql'
import { authToken, url } from './constant'

const db = drizzle({
    connection: {
        url: url,
        authToken: authToken,
    },
})

export default db
