import z from "zod";

const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
});

const registerSchema = z.object({
    email: z.email(),
    password: z.string(),
    name: z.string().min(1, "Name is required")
})

export {loginSchema, registerSchema}; 