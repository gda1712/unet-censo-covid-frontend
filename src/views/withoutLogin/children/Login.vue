<template>
    <form class="w-100 h-100 d-flex flex-column p-3" @submit.prevent>
        <h3 class="text-center">Login</h3>

        <BaseInput v-model:value="username" type="email" label="Email" />

        <BaseInput v-model:value="password" type="password" label="Contraseña" />

        <button @click="login" class="btn btn-primary my-3">Iniciar Sesión</button>

        <hr class="mt-0 mb-2">

        <p class="text-center my-0 py-0">¿No tienes cuenta?</p>

        <RouterLink :to="{ name: 'register' }" class="btn btn-link my-0 py-0">Registrate aquí</RouterLink>

    </form>
</template>

<script>

import BaseInput from "@/components/BaseInput";
import { login as loginService } from "@/services/AuthServices";
import {useToast} from "vue-toastification";

export default {
    name: 'Login',

    data() {
        return {
            username: "",
            password: ""
        }
    },

    components: {
        BaseInput,
    },


    setup() {
        // Get toast interface
        const toast = useToast();

        return { toast }
    },


    methods: {
        async login() {
            try {
                const login = await loginService({
                    username: this.username,
                    password: this.password
                });

                localStorage.setItem("isAdmin", login.user.attributes.isAdmin);

                this.$router.push({ name: 'viewNews' });
            } catch (e) {
                this.toast.error("Debes rellenar los campos");
            }
        }
    },
    
}
</script>
