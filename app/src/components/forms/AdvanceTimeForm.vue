<template>
    <form @submit="submit">
        <h1>Amount:</h1>
        <input type="amount" v-model="amount" />
        <input type="submit" value="Submit" />
    </form>
</template>

<script>
export default {
    name: 'AdvanceTimeForm',

    methods: {
        submit: function(e) {
            const deposit = {
                amount: this.amount
            };
            this.$emit('submitted', deposit);
            e.preventDefault();
        }
    }
};
</script>
