import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    const user2 = await useSupabaseUser()
    if(!user2) 
        return 'user not found'
    else 
        return user2
})