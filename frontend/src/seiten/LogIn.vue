<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="submitForm" id="Form">
            <div>
                <label for="username">Benutzername:</label>
                <input type="text" id="username" v-model="username">
            </div>
            <div>
                <label for="password">Passwort:</label>
                <input type="password" id="password" v-model="password">
            </div>
            <button type="submit">Abschicken</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        submitForm() {
            this.$store.dispatch('login', {
                benutzername: this.username,
                passwort: this.password
            })
            .then(
                setTimeout(function(){
                    window.location.replace('/')
                }, 5000)
                
            )
            .catch(error => {
                alert(error)
                });
        },
    }
};
</script>
