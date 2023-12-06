import mongoose from 'mongoose'

mongoose.set("strictQuery", false)
let isConnected = false

export const initMongo = async (url: string) => {
    if(!isConnected) await mongoose.connect(url)
    isConnected = true
    return mongoose
}

export const getModel = async (url: string, name: string) => {
    await initMongo(url)
    return mongoose.models[name]
}

