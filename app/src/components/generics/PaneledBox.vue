<template>
    <div class="panels">
        <div class="names">
            <div
                @click="activatePanel(namePanelA)"
                :class="{
                    inactive: isInactive(namePanelA)
                }"
                class="panelA"
            >
                {{ namePanelA }}
            </div>
            <div
                @click="activatePanel(namePanelB)"
                :class="{
                    inactive: isInactive(namePanelB)
                }"
                class="panelB"
            >
                {{ namePanelB }}
            </div>
        </div>
        <div class="slots">
            <slot class="slot" v-if="!isInactive(namePanelA)" name="panelA"></slot>
            <slot class="slot" v-if="!isInactive(namePanelB)" name="panelB"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import DepositForm from '@/components/forms/DepositForm.vue';
import Button from '@/components/generics/Button.vue';

@Component({
    components: {
        DepositForm,
        Button
    },
    data() {
        return {
            activePanel: this.namePanelA
        };
    },
    props: ['namePanelA', 'namePanelB'],
    methods: {
        activatePanel(panel): void {
            if (panel == this.activePanel) return;
            this.activePanel = panel;
            this.$emit('panelSwapped', panel);
        },
        isInactive(panel): boolean {
            return this.activePanel != panel;
        }
    }
})
export default class PaneledBox extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles';

.panels {
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
    .names {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        & div {
            width: 50%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--lg-font);
            @include DS_Bold;
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
