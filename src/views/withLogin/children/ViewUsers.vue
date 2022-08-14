<template>

    <div class="d-flex align-items-center p-3 justify-content-center flex-column overflow-auto">
        <h3 class="text-center mt-3">Revisar usuarios</h3>

        <form class="form mb-2" @submit.prevent>

            <div class="form-group d-flex">

                <BaseInput v-model:value="search" ></BaseInput>

                <button @click="searchUsers" class="btn btn-secondary mx-4">Buscar</button>

            </div>

        </form>

        <Pagination :total-pages="totalPages" :actual-page="actualPage" @goToPage="setActualPage" />

        <div class="d-flex flex-wrap">
            <div class="card my-3 mx-2 card-data" v-for="user in users" :key="user.attributes.id" >
                <div class="card-header">
                    <p class="card-text">{{ user.attributes.firstName }} {{ user.attributes.lastName }} V{{ user.attributes.cardId }}</p>

                    <p class="card-text">Email: {{ user.attributes.email }}</p>

                    <p class="card-text">Cédula: {{ user.attributes.cardId }}</p>

                    <p class="card-text">¿Es menor de edad?: {{ user.attributes.isUnderage ? "Si" : "No" }}</p>

                    <p class="card-text">Teléfono: {{ user.attributes.phone }}</p>

                    <p class="card-text">Teléfono celular: {{ user.attributes.cellPhone }}</p>

                    <p class="card-text">Dirección: {{ user.attributes.address }}</p>

                    <p class="card-text">Municipio: {{ user.attributes.municipality }}</p>

                </div>
                <div v-if="!Array.isArray(user.attributes.diseases)" class="card-body">

                    <p class="card-text">Enfermedad: {{ user.attributes.diseases.attributes.diseaseType ? "Si" : "No" }}</p>
                    <p class="card-text">Sintomas adicionales: {{ user.attributes.diseases.attributes.aditionalSymptoms }}</p>
                    <p class="card-text">¿Atendido en hospital?: {{ user.attributes.diseases.attributes.attendedInHospital ? "Si" : "No" }}</p>
                    <p class="card-text">Fiebre: {{ user.attributes.diseases.attributes.fever }}</p>
                    <p class="card-text">Erupciones en la piel: {{ user.attributes.diseases.attributes.skinRashes ? "Si" : "No" }}</p>
                    <p class="card-text">Tos: {{ user.attributes.diseases.attributes.cough }}</p>
                    <p class="card-text">Dolores musculares: {{ user.attributes.diseases.attributes.muscularPains ? "Si" : "No" }}</p>
                    <p class="card-text">Dolor de cabeza: {{ user.attributes.diseases.attributes.headache ? "Si" : "No" }}</p>
                    <p class="card-text">Vómito: {{ user.attributes.diseases.attributes.vomiting ? "Si" : "No" }}</p>

                </div>

                <div v-else class="card-body">

                    <p class="card-text">No existe información del usuario</p>

                </div>
            </div>
        </div>


    </div>

</template>

<script>

import BaseInput from "@/components/BaseInput";
import Pagination from "@/components/Pagination";
import {getUsers} from "@/services/UserServices";

export default {
    name: 'CheckUsers',

    data() {
        return {
            search: "",
            totalPages: 0,
            actualPage: 1,

            users: []
        }
    },

    components: {
        BaseInput,
        Pagination
    },

    methods: {
        async searchUsers() {
            let payload = {
                page: this.actualPage
            };

            if(this.search !== "")
                payload.search = this.search;

            const usersData = await getUsers(payload);

            this.users = usersData.data;

            this.totalPages = Math.ceil(usersData.paginate.total / usersData.paginate.perPage)

        },


        async setActualPage(newPage) {
            this.actualPage = newPage;

            await this.searchUsers();
        }
    },

    mounted() {
        this.searchUsers();
    }

}
</script>

<style lang="sass" scoped>

form
    max-width: 500px

.card-data
    width: 300px
</style>