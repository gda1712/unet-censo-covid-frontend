<template>

    <div class="d-flex align-items-center justify-content-center flex-column overflow-auto">
        <h3 class="text-center mt-3">Reportes</h3>

        <div class="d-flex justify-content-around w-100 p-4">
            <BarChart :chart-data="diseasesReport.chartData"/>

            <BarChart :chart-data="symptomsReport.chartData"/>
        </div>

    </div>

</template>

<script>

import {createNotifications} from "@/services/NewsServices";
import BarChart from '@/components/BarChart';

import {useToast} from "vue-toastification";
import {getReportCountDiseases, getReportCountSymptoms} from "@/services/ReportsServices";

export default {
    name: 'ViewReports',

    components: {
        BarChart,
    },

    data() {
        return {

            diseasesReport: {
                chartData: {
                    labels: [],

                    datasets: [{
                        data: [],
                        label: 'Casos registrados',
                    }],
                },
            },

            symptomsReport: {
                chartData: {
                    labels: [],
                    datasets: [],
                },
            },
        }
    },

    setup() {
        // Get toast interface
        const toast = useToast();

        return { toast }
    },

    async mounted() {

        // load the data
        //------------------------------LOAD COUNT DISEASES---------------------------------
        const diseasesReport = await getReportCountDiseases({});

        const arrayAux = [];
        // load the report data
        diseasesReport.data.forEach(report => {
            this.diseasesReport.chartData.labels.push(report.type);

            arrayAux.push(report.count);
        })

        this.diseasesReport.chartData.datasets[0].data = arrayAux;

        //---------------------------LOAD COUNT SYMPTOMS-----------------------------
        let symtopmsReport = await getReportCountSymptoms({});
        symtopmsReport = symtopmsReport.data;

        // get the symtopms names
        this.symptomsReport.chartData.labels = Object.keys(symtopmsReport[Object.keys(symtopmsReport)[0]]);

        // Search the data
        this.symptomsReport.chartData.datasets = Object.keys(symtopmsReport).map(diseaseKey => {
            let symptomData = {
                data: [],
                label: diseaseKey
            };

            // get the counts
            Object.keys(symtopmsReport[diseaseKey]).forEach(symptomKey => {
                symptomData.data.push(symtopmsReport[diseaseKey][symptomKey]);
            })

            return symptomData;
        });
    }

}
</script>

<style lang="sass" scoped>

form
    min-width: 500px

    textarea
        height: 150px
        resize: none

</style>