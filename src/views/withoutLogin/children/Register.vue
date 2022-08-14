<template>
    <form class="w-100 h-100 d-flex flex-column p-3" @submit.prevent>
        <h3 class="text-center">Registro</h3>

        <BaseInput v-if="isFirstPage" v-model:value="email" label="Email" type="email"/>

        <BaseInput v-if="isFirstPage" v-model:value="password" label="Contraseña" type="password"/>

        <BaseInput v-if="isFirstPage" v-model:value="firstName" label="Nombre" />

        <BaseInput v-if="isFirstPage" v-model:value="lastName" label="Apellido" />

        <button @click="changePage" v-if="isFirstPage" class="btn btn-primary my-3">Siguiente</button>

        <BaseInput v-if="!isFirstPage" v-model:value="cardId" label="Cédula" />

        <BaseInput v-if="!isFirstPage" v-model:value="address" label="Dirección" />

        <div v-if="!isFirstPage" class="form-group mb-4">

            <label class="form-label">Selecciona tu municipio</label>

            <v-select v-model="municipalityId" name="disease" :options="municipalities" label="name"></v-select>

        </div>

        <BaseInput v-if="!isFirstPage" v-model:value="phone" label="Teléfono fijo" />

        <BaseInput v-if="!isFirstPage" v-model:value="cellPhone" label="Teléfono celular" />

        <div v-if="!isFirstPage" class="form-group mt-3">

            <div class="input-group mb-3">

                <div class="input-group-text">
                    <input v-model="isUnderage" type="checkbox" aria-label="Checkbox for following text input">
                </div>

                <label class="form-control">Eres mayor de edad</label>
            </div>
        </div>

        <button @click="createUser" v-if="!isFirstPage" class="btn btn-primary my-3">Registrarse</button>
    </form>
</template>

<script>

import BaseInput from "@/components/BaseInput";
import { useToast } from "vue-toastification";
import { createUser } from "@/services/AuthServices";
import { getMunicipalities } from "@/services/UserServices";

export default {
    name: 'Register',

    data() {
        return {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            cardId: "",
            address: "",
            phone: "",
            cellPhone: "",
            municipalityId: "",
            isUnderage: true,


            isFirstPage: true,

            municipalities: [],
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
        changePage() {
            if(this.email !== "" && this.password !== "" && this.firstName !== "" && this.lastName !== "")
                this.isFirstPage = !this.isFirstPage;
            else
                this.toast.error("Debes rellenar los campos");
        },


        async createUser() {
            const response = await createUser({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                passwordConfirmation: this.password,
                cardId: this.cardId,
                phone: this.phone,
                cellPhone: this.cellPhone,
                address: this.address,
                municipalityId: this.municipalityId.id,
                isUnderage: this.isUnderage
            });

            if(response) {
                this.toast.success("Registro realizado exitosamente");
                this.$router.push({ name: "login" });
            } else {
                this.toast.error("Error en el registro");
            }
        }
    },

    async mounted() {
        // load the Municipalities

        const municipalities = await getMunicipalities({});

        this.municipalities = municipalities.data.map(mun => {
            return {
                id: mun.id,
                name: mun.attributes.name
            }
        });
    }

}
</script>
