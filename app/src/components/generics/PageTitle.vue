<template>
    <div class="page-title">
        <h3 class="title">{{ title }}</h3>
        <button class="button" v-if="buttonName" :class="buttonStyle" @click="submit">
            {{ buttonName }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'Button',
    props: ['title', 'buttonName'],
    methods: {
        submit: function() {
            this.$emit('clicked');
        }
    }
};
</script>

<style scoped lang="scss">
@import '@/styles';
.page-title {
    display: flex;
    width: 100%;
    margin: 50px 0 10px 0;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    .title {
        @include DS_Bold;
        font-size: var(--lg-font);
    }
}
.button {
    width: auto;
    border: none;
    padding: 10px;
    border-radius: 12px;
    background: transparent;
    transition: 0.2s;
    font-size: var(--md-font);
    color: var(--button-color);
    border: 3px solid var(--button-color);
    font-weight: 700;
    outline: none;
    &:hover {
        cursor: pointer;
        background: var(--button-color);
        color: white;
    }
}
</style>
