<template>
    <div class="box">
        <div v-if="boxName" class="names">
            <div class="panelB">
                {{ boxName }}
            </div>
        </div>
        <div class="slots">
            <slot class="slot" name="boxContent"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    props: ['boxName']
})
export default class Box extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles';

.box {
    width: 600px;
    position: relative;
    display: flex;
    background-color: var(--foreground-color);
    top: 0;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    align-items: center;
    border-radius: 12px;
    margin-bottom: 200px;
    .names {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        & div {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            @include DS_Bold;

            justify-content: center;
            font-size: var(--lg-font);
            font-weight: 700;
            color: var(--main-font);
        }

        .inactive {
            background: var(--sub-foreground-color);
            color: var(--main-secondary);

            &:hover {
                cursor: pointer;
                color: var(--main-font);
            }
        }
    }

    .slots {
        width: 100%;

        & > * {
            padding: 20px;
        }
    }
}
</style>
