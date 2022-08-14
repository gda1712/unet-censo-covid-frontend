<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li @click="goToPage(actualPage - 1)" class="page-item"><a class="page-link" href="#">Anterior</a></li>

            <li v-for="number in [...Array(totalPages).keys()].map(i => i + 1)" :key="number.id" class="page-item">
                <a @click="goToPage(number)" class="page-link" href="#">{{number}}</a>
            </li>
            <li @click="goToPage(actualPage + 1)" class="page-item"><a class="page-link" href="#">Siguiente</a></li>
        </ul>
    </nav>
</template>

<script>

import {useToast} from "vue-toastification";

export default {
    name: 'Pagination',

    data() {
        return {
            range: []
        }
    },

    setup() {
        // Get toast interface
        const toast = useToast();

        return { toast }
    },

    props: {
        totalPages: {
            type: Number,
            required: true
        },

        actualPage: {
            type: Number,
            required: true
        }
    },

    methods: {
        goToPage(page) {
            if(page > 0 && page <= this.totalPages)
                this.$emit("goToPage", page);
            else
                this.toast.warning("Elige una página válida")
        }
    }
}
</script>


<style lang="sass">


</style>