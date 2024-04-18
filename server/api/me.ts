import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    if(!user) 
        return 'user not found'
    else 
        return user
})