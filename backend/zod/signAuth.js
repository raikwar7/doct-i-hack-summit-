import zod from 'zod'

const signAuth = zod.object({
    username: zod.string().email(),
    password: zod.string(),
}).required()

export default signAuth;