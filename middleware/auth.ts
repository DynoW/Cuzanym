const user = useSupabaseUser()

export default defineNuxtRouteMiddleware((to, from) => {
    if (user.value)
        if (user.value.email && !user.value.email.endsWith('@laicuza.ro'))
            return navigateTo('/login?wrong_domain=true')
    return navigateTo('/forum')
})
