export default defineEventHandler(async (event) => {
    
    const { authToken } = await readBody(event);

    const response = await useFetch('https://nlcgmuwupgqpxcurbmbi.supabase.co/auth/v1/callback', {
        method: 'post',
        body: {
            authToken: authToken
        }
    })

    return response.data;

});
