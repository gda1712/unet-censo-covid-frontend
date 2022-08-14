<template>

    <div class="d-flex align-items-center justify-content-center flex-column overflow-auto">
        <h3 class="text-center mt-3">Noticias</h3>

        <Pagination :total-pages="totalPages" :actual-page="actualPage" @goToPage="setActualPage" />

        <div  v-for="notification in notifications" :key="notification.id" class="card my-3 custom-card">
            <div class="card-header">

                {{ notification.attributes.title }}
            </div>
            <div class="card-body">
                <p class="card-text">{{ notification.attributes.description }}</p>

            </div>
        </div>

    </div>

</template>

<script>

import BaseInput from "@/components/BaseInput";
import Pagination from "@/components/Pagination";
import {getNotifications} from "@/services/NewsServices";

export default {
    name: 'ViewNews',

    data() {
        return {
            notifications: [],

            totalPages: 0,
            actualPage: 1
        }
    },

    components: {
        BaseInput,
        Pagination
    },


    methods: {
        async searchNews() {
            this.notifications = await getNotifications({
                page: this.actualPage
            });

            this.totalPages = Math.ceil(this.notifications.paginate.total /this.notifications.paginate.perPage)

            this.notifications = this.notifications.data;
        },


        async setActualPage(newPage) {
            this.actualPage = newPage;

            await this.searchNews();
        }
    },


   async mounted() {
        // get the notifications
        this.searchNews();
    }


}
</script>

<style lang="sass" scoped>

.custom-card
    width: 800px

</style>