<template>
    <div class="vw-100 vh-100">

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-2">

            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">

                    <li class="nav-item">
                        <router-link :to="{ name: 'viewNews' }" class="nav-link active">Noticias</router-link>
                    </li>

                    <li v-if="!isAdmin" class="nav-item">
                        <router-link :to="{ name: 'registerDisease' }" class="nav-link">Registrar Enfermedad</router-link>
                    </li>

                    <li v-if="isAdmin" class="nav-item">
                        <router-link :to="{ name: 'checkUsers' }" class="nav-link">Revisar Usuarios</router-link>
                    </li>

                    <li v-if="isAdmin" class="nav-item">
                        <router-link :to="{ name: 'createNews' }" class="nav-link">Crear noticias</router-link>
                    </li>

                    <li v-if="isAdmin" class="nav-item">
                        <router-link :to="{ name: 'viewReports' }" class="nav-link">Reportes</router-link>
                    </li>

                    <li class="nav-item">
                        <button @click="endSession" class="nav-link btn btn-dark">Cerrar sesión</button>
                    </li>
                </ul>
            </div>

        </nav>

        <router-view></router-view>

    </div>
</template>

<script>

export default {
    name: 'Template',

    data() {
        return {
            isAdmin: false
        }
    },


    mounted() {
        // load the isAdmin

        if(localStorage.getItem("token") === "")
            this.$router.push({ name: "login" });

        this.isAdmin = localStorage.getItem("isAdmin") === "true" ? true : false

    },


    methods: {
        endSession() {
            localStorage.setItem("token", "");

            this.$router.push({ name: "login" });
        }
    },

}
</script>

<style lang="sass" scoped>

</style>
