import dotenv from 'dotenv'

dotenv.config()

export const url = process.env.DATABASE_URL as string
export const authToken = process.env.DATABASE_AUTH_TOKEN as string
