import { z } from "zod"

export const UserModel = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().min(2).max(100),
})

export type User = z.infer<typeof UserModel>
