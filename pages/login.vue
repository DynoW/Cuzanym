<script setup lang="ts">
const supabase = useSupabaseClient()
supabase.auth.signInWithOAuth({
  provider: 'google',
})

</script>

<template>
<div id="g_id_onload"
     data-client_id="642198305698-1t92r9k3u12lf3jl5naoeovudj6s5gn0.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-auto_select="true"
     data-itp_support="true"
     data-login_uri="https://login-system.cuzanym.pages.dev/login"
     data-auto_prompt="false">
</div>

<div class="g_id_signin"
     data-type="standard"
     data-shape="pill"
     data-theme="outline"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left">
</div>

<component :is="'script'" src="https://accounts.google.com/gsi/client" async></component>
</template>
