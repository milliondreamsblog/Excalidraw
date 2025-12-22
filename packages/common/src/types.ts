import z from "zod"



export const signUpSchema = z.object({
    username  : z.string(),
    password  : z.string(),
    email     : z.string().email()
})

export const signInSchema = z.object({
    username : z.string,
    password : z.string
})

export const createRoom = z.object({
    username : z.string,
    password : z.string
})