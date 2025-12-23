import z from "zod"



export const signUpSchema = z.object({
    name  : z.string(),
    password  : z.string(),
    email     : z.string().email(),
    photo : z.string()

})

export const signInSchema = z.object({
    username : z.string,
    password : z.string
})

export const createRoom = z.object({
    username : z.string,
    password : z.string
})