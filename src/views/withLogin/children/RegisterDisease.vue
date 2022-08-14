<template>

    <div class="d-flex align-items-center justify-content-center flex-column overflow-auto">
        <h3 class="text-center mt-3">Registra enfermedad</h3>

        <form class="form border border-gray p-4 rounded-2" @submit.prevent>

            <div class="form-group mb-4">

                <label class="form-label">Selecciona la enfermedad</label>

                <v-select v-model="disease" name="disease" :options="diseasesOptions"></v-select>

            </div>

            <div class="form-group my-4">

                <div class="input-group mb-3">

                    <div class="input-group-text">
                        <input v-model="attendedInHospital" type="checkbox" aria-label="Checkbox for following text input">
                    </div>

                    <label class="form-control">¿Has sido atendido en un centro de salud?</label>
                </div>
            </div>

            <div class="form-group my-4">

                <div class="input-group mb-3">

                    <div class="input-group-text">
                        <input v-model="fever" type="checkbox" aria-label="Checkbox for following text input">
                    </div>

                    <label class="form-control">¿Has tenido fiebre?</label>
                </div>
            </div>

            <div class="form-group my-4">

                <div class="input-group mb-3">

                    <div class="input-group-text">
                        <input v-model="skinRashes" type="checkbox" aria-label="Checkbox for following text input">
                    </div>

                    <label class="form-control">¿Has tenido erupciones en la piel?</label>
                </div>
            </div>

            <div class="form-group my-4">

                <div class="input-group mb-3">

                    <div class="input-group-text">
                        <input v-model="cough" type="checkbox" aria-label="Checkbox for following text input">
                    </div>

                    <label class="form-control">¿Has tenido tos?</label>
                </div>
            </div>

            <div class="form-group my-4">

                <div class="input-group mb-3">

                    <div class="input-group-text">
                        <input v-model="muscularPains" type="checkbox" aria-label="Checkbox for following text input">
                    </div>

                    <label class="form-control">¿Has tenido dolores musculares?</label>
                </div>
            </div>

            <div class="form-group my-4">

                <div class="input-group mb-3">

                    <div class="input-group-text">
                        <input v-model="headache" type="checkbox" aria-label="Checkbox for following text input">
                    </div>

                    <label class="form-control">¿Has tenido dolor de cabeza?</label>
                </div>
            </div>

            <div class="form-group my-4">

                <div class="input-group mb-3">

                    <div class="input-group-text">
                        <input v-model="vomit" type="checkbox" aria-label="Checkbox for following text input">
                    </div>

                    <label class="form-control">¿Has tenido vómito?</label>
                </div>
            </div>

            <div class="form-group my-4">

                <div class="input-group mb-3">

                    <BaseInput v-model:value="aditionalSymptoms" label="Ingresa sintomas adicionales"></BaseInput>
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <button @click="saveDisease" class="btn btn-dark">Guardar</button>
            </div>


        </form>
    </div>

</template>

<script>

import BaseInput from "@/components/BaseInput";
import {createDiseases, getDiesesTypes} from "@/services/Diseases";
import {useToast} from "vue-toastification";

export default {
    name: 'RegisterDisease',

    data() {
        return {
            diseasesOptions: [
            ],

            // form information
            disease: "",
            aditionalSymptoms: "",
            attendedInHospital: false,
            fever: false,
            skinRashes: false,
            cough: false,
            muscularPains: false,
            headache: false,
            vomit: false

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
        async saveDisease() {
            // this function save the disease

            const response = await createDiseases({
                diseaseType: this.disease,
                attendedInHospital: this.attendedInHospital,
                symptoms: this.aditionalSymptoms ?? "NO APLICA",
                fever: this.fever,
                skinRashes: this.skinRashes,
                cough: this.cough,
                muscleAche: this.muscularPains,
                headache: this.headache,
                vomiting: this.vomit
            })

            if(response)
                this.toast.success("Registro creado con éxito");

            this.$router.push({ name: "viewNews" })
        }
    },


    async mounted() {
        this.diseasesOptions = await getDiesesTypes();
        this.diseasesOptions = this.diseasesOptions.data.types;
    }

}
</script>

<style lang="sass" scoped>

form
    max-width: 500px

</style>