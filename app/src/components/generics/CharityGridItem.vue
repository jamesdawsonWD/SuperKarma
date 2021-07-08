<template>
    <div class="charity-grid-item">
        <div class="logo" :style="{ background: gradients[getRandomInt(0, 1)] }"></div>
        <div class="body">
            <div class="headers">
                <h3 class="title">{{ item.name }}</h3>
                <Plus class="plus" />
            </div>
            <div class="contents">
                <div class="info-block">
                    <h2>22M</h2>
                    <h5>Total Donation Pool</h5>
                </div>
                <div class="info-block">
                    <h2>15M</h2>
                    <h5>Currently Staked</h5>
                </div>
                <div class="info-block">
                    <h2>7.3M</h2>
                    <h5>Donated to Charity</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Plus from '@/assets/svg/plus.svg';

export default {
    name: 'CharityGridItem',
    props: ['title', 'buttonStyle', 'disabled', 'charityId', 'item'],
    methods: {
        submit: function() {
            this.$emit('clicked');
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        }
    },
    data() {
        return {
            gradients: [
                'linear-gradient(30deg, rgba(255, 175, 189, 1) 0%, rgba(255, 195, 160, 1) 100%)',
                'linear-gradient(36deg, rgba(33,147,176,1) 0%, rgba(109,213,237,1) 100%)'
            ]
        };
    },
    components: {
        Plus
    }
};
</script>

<style scoped lang="scss">
.charity-grid-item {
    width: 100%;
    height: 200px;
    background: white;
    border-radius: 12px;
    display: flex;
    position: relative;
    transition: 0.2s;
    &:hover {
        transform: translate(0px, -10px);
        cursor: pointer;
    }
    .logo {
        background: rgb(33, 147, 176);
        height: 100%;
        width: 200px;
        position: absolute;
        border-radius: 12px 0 0 12px;
    }
    .body {
        margin: 25px 25px 25px 225px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .headers {
            display: flex;
            justify-content: space-between;
            .title {
                text-align: left;
            }

            .plus {
                height: 30px;
                transform: scale(0.6);
                path {
                    fill: var(--button-color);
                }
            }
        }

        .contents {
            width: inherit;
            display: flex;
            justify-content: space-between;

            .info-block {
                h2 {
                    text-align: left;
                }
            }
        }
    }
}
</style>
