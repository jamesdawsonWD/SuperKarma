<template>
    <form @submit="submit">
        <h1>Amount:</h1>
        <input type="amount" v-model="amount" />
        <h1>Length:</h1>
        <input type="length" v-model="length" />
        <input type="submit" value="Submit" />
    </form>
</template>

<script>
export default {
    name: 'DepositForm',
    methods: {
        submit: function(e) {
            const deposit = {
                amount: this.amount,
                length: this.length
            };
            this.$emit('submitted', deposit);
            e.preventDefault();
        }
    }
};
</script>
