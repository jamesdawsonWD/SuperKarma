<template>
    <div class="priceView" :class="{ brown: type == 'brown', navy: type == 'navy' }">
        <div class="title">
            {{ asset }}
        </div>
        <div class="price">
            {{ price | fromWeiToReadable }}
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    props: ['price', 'asset', 'type']
})
export default class PriceView extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles';

.priceView {
    display: flex;
    position: relative;
    flex-direction: column;
    overflow: hidden;
    .title {
        text-align: left;
        z-index: 1;
        @include DS_Bold;
    }
    .price {
        text-align: left;
        margin-top: 20px;
        z-index: 1;

        @include DS_Bold;
        font-size: var(--lg-font);
        color: var(--button-color);
    }
    .logo {
        height: 150px;
        position: absolute;
        right: 0;
        top: -15px;
    }
}

.brown {
    background: var(--brown-color);

    .title {
        color: var(--button-color);
    }

    .price {
        color: white;
    }
}
.navy {
    background: var(--background-color);

    .title {
        color: var(--button-color);
    }

    .price {
        color: white;
    }
}
</style>
