import zod from "zod"

export const signupInput = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    name: zod.string().optional()
 })

export const signinInput = zod.object({
   username: zod.string().email(),
   password: zod.string().min(6),
})

export const createBlog = zod.object({
   title: zod.string(),
   content: zod.string(),
})

export const updateBlog = zod.object({
   title: zod.string(),
   content: zod.string(),
   id: zod.string()
})

 //Frontend will need this to know what kind of the inouts he should send
 export type SignupInput = zod.infer<typeof signupInput>
 export type SigninInput = zod.infer<typeof signinInput>
 export type CreateBlog = zod.infer<typeof createBlog>
 export type UpdateBlog = zod.infer<typeof updateBlog>
 