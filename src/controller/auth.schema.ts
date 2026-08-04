import {email, z} from "zod"

export const registerSchema = z.object({
    email: z.email(),
    password:z.string().min(5),
    phone:z.string().min(10)
})