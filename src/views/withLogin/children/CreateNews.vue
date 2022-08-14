<template>

    <div class="d-flex align-items-center justify-content-center flex-column overflow-auto">
        <h3 class="text-center mt-3">Crear Noticia</h3>

        <form class="form border border-gray p-4 rounded-2" @submit.prevent>

            <div class="form-group mb-4">

                <BaseInput v-model:value="title" label="Ingresa un título"></BaseInput>
            </div>

            <div class="form-group mb-4">

                <label>Ingresa el body</label>

                <textarea v-model="body" class="form-control"></textarea>
            </div>

            <div class="d-flex justify-content-center">
                <button @click="createNew" class="btn btn-dark">Crear</button>
            </div>

        </form>
    </div>

</template>

<script>

import BaseInput from "@/components/BaseInput";
import {createNotifications} from "@/services/NewsServices";
import {useToast} from "vue-toastification";

export default {
    name: 'CreateNews',

    data() {
        return {
            title: "",
            body: ""
        }
    },

    components: {
        BaseInput
    },

    setup() {
        // Get toast interface
        const toast = useToast();

        return { toast }
    },

    methods: {

        async createNew() {
            const response = await createNotifications({
                title: this.title,
                description: this.body
            });

            if(response)
                this.toast.success("Noticia creada correctamente");

            this.$router.push({ name: "viewNews" });
        }
    },

}
</script>

<style lang="sass" scoped>

form
    min-width: 500px

    textarea
        height: 150px
        resize: none

</style>