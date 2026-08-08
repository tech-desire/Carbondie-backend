import { z} from "zod"

export const registerSchema = z.object({
    name:z.string().min(3),
    email: z.email(),
    otp:z.number().min(4),
    password:z.string().min(5),
    phone:z.string().min(10)
})