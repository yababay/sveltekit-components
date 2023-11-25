import { Schema, Repository } from 'redis-om'
import type { RedisClientType } from 'redis'
import redis from 'redis'

const url = process.env.REDIS_URL ? process.env.REDIS_URL : 'redis://localhost:6379'
const redisClient: RedisClientType = redis.createClient({ url })
const repositories = new Map<string, Repository>()

export const getClient = async () => {
    if(!redisClient.isOpen) await redisClient.connect()
    return redisClient
}

const createRepository = async (schema: Schema) => {
    const repository = new Repository(schema, await getClient())
    await repository.createIndex()
    return repository
}

export const getRepository = async (name: string, schema: Schema): Promise<Repository> => {
    if(!repositories.has(name)) repositories.set(name, await createRepository(schema))
    const repository = repositories.get(name)
    if(typeof repository === 'undefined') throw 'No such repository'
    return repository
}
