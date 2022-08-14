<template>
    <div class="template-container vw-100 vh-100 d-flex justify-content-center align-items-center">

        <div class="content p-3 bg-white rounded-3">
            <router-view>

            </router-view>
        </div>

    </div>
</template>

<script>

export default {
name: 'Template',

}
</script>

<style lang="sass" scoped>

.template-container
    background-color: #002B5B

    & .content
        min-width: 400px
        min-height: 200px

</style>
