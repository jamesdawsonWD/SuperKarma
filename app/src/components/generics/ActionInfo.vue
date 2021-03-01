<template>
    <div class="action-info">
        <div class="info" v-for="(item, index) in actionInfo" :key="index">
            <div class="key">{{ item.key }}</div>
            <div class="item">{{ item.value }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ActionInfo',
    props: ['actionInfo'],
    methods: {
        submit: function() {
            this.$emit('clicked');
        }
    }
};
</script>

<style scoped lang="scss">
@import '@/styles';
.action-info {
    display: flex;
    flex-direction: column;
    padding: 25px 25px 25px 26px;
    background: var(--sub-foreground-color);
    border-radius: 10px;
    margin-top: 25px;
    transition: 0.5s;
    .info {
        font-size: var(--md-font);
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;

        &:first-child {
            margin-top: 0;
        }
        .key {
            color: var(--main-secondary);
            color: var(--main-secondary);
            text-transform: uppercase;
            font-size: var(--sm-font);

            font-weight: 600;
        }
        .item {
            @include DS_Bold;
        }
    }
}
</style>
