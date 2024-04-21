export default defineNuxtRouteMiddleware(() => {
    const user = useSupabaseUser();

    if (user.value?.email && !user.value.email.endsWith('@laicuza.ro')) {
        return navigateTo('/error_email');
    }
});