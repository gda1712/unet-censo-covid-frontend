<template>
    <button>

    </button>
</template>

<script>

export default {
    name: 'BaseButton',

    props: {
        label: {
            type: String,
            default: ""
        },

        input: {
            type: String,
            required: true
        }
    },

}
</script>


<style lang="sass" scoped>

input


</style>