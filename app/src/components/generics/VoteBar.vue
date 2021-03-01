<template>
    <div class="vote-bar">
        <div class="slider" ref="slider">
            <div :style="{ width: getPercentage(yesVotes) + '%' }" class="yes" ref="yes"></div>
            <div :style="{ width: getPercentage(noVotes) + '%' }" class="no" ref="no"></div>
        </div>
        <span class="threshold"></span>
    </div>
</template>

<script>
export default {
    name: 'VoteBar',
    data() {
        return {
            value: 10,
            width: '',
            color: ''
        };
    },
    props: {
        yesVotes: {
            type: Number,
            default: 0
        },
        noVotes: {
            type: Number,
            default: 0
        }
    },
    methods: {
        submit: function() {
            this.$emit('clicked');
        },
        setValue: function(e) {
            e.preventDefault();
            this.value = e.offsetX;
            this.$emit('collateralSelected', this.getPercentage());
        },
        getSliderWidth: function() {
            this.width = this.$refs['slider'].getBoundingClientRect().width;
        },
        getPercentage: function(value) {
            return Math.floor((value / 100000000) * 100);
        }
    },

    created() {
        window.addEventListener('resize', this.getSliderWidth);
    },
    destroyed() {
        window.removeEventListener('resize', this.getSliderWidth);
    }
};
</script>

<style scoped lang="scss">
@import '@/styles';
.vote-bar {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    margin-top: 25px;
    transition: 0.5s;
    position: relative;
    color: var(--main-secondary);
    text-transform: uppercase;
    font-size: var(--sm-font);
    width: 100%;
    @include DS_Light;
    .threshold {
        position: absolute;
        left: 4%;
        top: 25px;
        width: 1px;
        position: absolute;
        height: 6px;
        display: inline-block;
        bottom: -8px;
        background-color: var(--main-secondary);
    }
    .percentage {
        position: absolute;
        top: 50px;
        transition: 0.2s ease-out;
        color: var(--button-color);
        @include DS_Bold;
    }
    .threshold::before {
        content: 'Quorum';
        position: absolute;
        top: -10px;
        left: -22px;
    }

    .slider {
        width: 100%;
        border-top: 30px solid white;
        border-bottom: 30px solid white;
        height: 10px;
        background-color: var(--main-secondary);
        transition: 0.3s;
        display: flex;
        .yes,
        .no {
            height: 10px;
            transition: 0.2s ease-out;
        }

        .yes {
            background: var(--button-color);
        }

        .no {
            background: #ef476f;
        }
    }
}
</style>
