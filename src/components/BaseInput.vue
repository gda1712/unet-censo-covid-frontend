<template>
    <div class="w-100 h-100 my-2 d-flex flex-column">

        <label :for="label">{{label}}</label>

        <input
            class="p-2 rounded-2 base-input"
            :name="label"
            :type="type"
            :placeholder="label"
            :value="value"
            @input="updateInput"
        >
    </div>
</template>

<script>

export default {
    name: 'BaseInput',

    props: {
        label: {
            type: String,
            default: ""
        },

        value: {
            type: [String, Number],
            default: "",
        },

        type: {
            type: String,
            default: "text"
        }
    },

    methods: {
        updateInput(event) {
            this.$emit("update:value", event.target.value);
        }
    }

}
</script>


<style lang="sass">

.base-input
    border: 1px solid rgba(0, 0, 0, .4)


</style>