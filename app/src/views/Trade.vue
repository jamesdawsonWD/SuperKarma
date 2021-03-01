<template>
    <div class="trade">
        <Box boxName="Starting project">
            <div slot="boxContent">
                <h3>This is a starting off point for any crypto project</h3>
                <div class="prices">
                    <PriceView :price="TOKENS_getBalance(TOKEN_getAddressBySymbol('TKA'))" asset="TKA" />
                    <PriceView :price="TOKENS_getBalance(TOKEN_getAddressBySymbol('WETH'))" asset="WETH" />
                </div>
            </div>
        </Box>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Box from '@/components/generics/Box.vue';
import PriceView from '@/components/generics/PriceView.vue';

// import Button from '@/components/generics/Button.vue';
export default {
    name: 'Trade',
    computed: {
        ...mapGetters(['ST_getAll', 'Address', 'TOKENS_getBalance', 'TOKEN_getAddressBySymbol'])
    },
    methods: {
        ...mapActions(['TOKENS_balanceOf'])
    },
    components: {
        Box,
        PriceView
    }
};
</script>
<style lang="scss">
.trade {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 150px;

    .prices {
        display: flex;
        justify-content: space-evenly;
        margin-top: 50px;
    }
}

.arrow {
    margin-top: 10px;
    transform: scale(0.6);
    path {
        fill: var(--button-color);
    }
}
</style>
