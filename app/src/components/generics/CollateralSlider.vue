<template>
    <div class="collateral-slider">
        <div @click="setValue" class="slider" ref="slider">
            <div
                :style="{ width: value + 'px', background: getWarningColor() }"
                class="progress"
                ref="progress"
            ></div>
        </div>
        <span class="min-collateral"></span>
        <span class="recommended-collateral"></span>
        <span class="percentage" :style="{ left: value - 5 + 'px', color: getWarningColor() }">{{
            getPercentage()
        }}</span>
    </div>
</template>

<script>
export default {
    name: 'CollateralSlider',
    data() {
        return {
            value: 66.67,
            width: '',
            color: ''
        };
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
        getPercentage: function() {
            return Math.floor((this.value / this.width) * 300);
        },
        getWarningColor: function() {
            const percentage = this.getPercentage();
            return this.getPercentage() >= 200
                ? `${this.color}`
                : this.getPercentage() >= 150
                ? '#ffd166'
                : '#ef476f';
        }
    },
    mounted() {
        this.getSliderWidth();
        this.value = (this.width / 100) * 66.67;
        this.color = this.$refs['progress'].style.background;
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
.collateral-slider {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    border-radius: 10px;
    margin-top: 25px;
    transition: 0.5s;
    position: relative;
    color: var(--main-secondary);
    text-transform: uppercase;
    font-size: var(--sm-font);
    @include DS_Light;
    .min-collateral {
        position: absolute;
        left: 50%;
        top: 25px;
        width: 1px;
        position: absolute;
        height: 6px;
        display: inline-block;
        bottom: -8px;
        background-color: var(--main-secondary);
    }
    .recommended-collateral {
        position: absolute;
        left: 67%;
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
    .recommended-collateral::before {
        content: '200%';
        position: absolute;
        top: -10px;
        left: -10px;
    }
    .min-collateral::before {
        content: '150%';
        position: absolute;
        top: -10px;
        left: -10px;
    }
    .slider {
        width: 100%;
        border-top: 30px solid white;
        border-bottom: 30px solid white;
        height: 10px;
        background-color: var(--main-secondary);
        cursor: crosshair;
        transition: 0.3s;

        .progress {
            height: 10px;
            width: 50%;
            background: var(--button-color);
            transition: 0.2s ease-out;
        }
    }
}
</style>
