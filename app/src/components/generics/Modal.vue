<template>
    <transition name="modal" appear>
        <div class="modal-mask" @click="checkClick">
            <div class="modal-wrapper">
                <div class="modal-container" ref="container">
                    Just a popup
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Button from '@/components/generics/Button.vue';
import Box from '@/components/generics/Modal.vue';
@Component({
    components: {
        Button
    },
    computed: {
        ...mapGetters(['Modal'])
    },
    methods: {
        ...mapActions(['UIM_closeModal']),
        checkClick(event) {
            const modalRect = this.$refs['container'].getBoundingClientRect();
            const mousePos = {
                x: event.x,
                y: event.y
            };

            if (
                mousePos.x <= modalRect.x ||
                mousePos.x >= modalRect.x + modalRect.width ||
                mousePos.y <= modalRect.y ||
                mousePos.y >= modalRect.y + modalRect.height
            )
                this.UIM_closeModal();
        }
    }
})
export default class Modal extends Vue {
    @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: table;
    transition: opacity 0.3s ease;

    h2,
    h3 {
        color: var(--main-black);
    }
}
.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}
.modal-container {
    min-width: 300px;
    width: 600px;
    margin: 0px auto;
    background-color: var(--foreground-color);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    border-radius: 25px;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
    margin: 35px;
    color: #42b983;
}
.modal-body {
    margin: 20px 0;
    height: 80%;
    display: flex;
    justify-content: center;
}
.modal-default-button {
    float: right;
}
.modal-enter {
    opacity: 0;
}
.modal-enter-active {
    opacity: 1;
}

.modal-leave-active {
    opacity: 0;
}

.modal-leave-active .modal-container {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
}
</style>
