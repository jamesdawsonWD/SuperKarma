<template>
    <div class="trade">
        <Box boxName="Governance">
            <h3 slot="boxContent" class="governance">
                <iframe
                    src="https://giphy.com/embed/BEob5qwFkSJ7G"
                    width="480"
                    height="355"
                    frameBorder="0"
                    class="giphy-embed"
                    allowFullScreen
                ></iframe>
                <iframe
                    src="https://giphy.com/embed/OPU6wzx8JrHna"
                    width="480"
                    height="355"
                    frameBorder="0"
                    class="giphy-embed margin-top"
                    allowFullScreen
                ></iframe>
            </h3>
        </Box>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import web3 from 'Web3';
import Box from '@/components/generics/Box.vue';

// import Button from '@/components/generics/Button.vue';
export default {
    name: 'Map',
    computed: {
        ...mapGetters(['ST_getAll', 'Address', 'TOKEN_balanceOf', 'UIM_getDonationAddress'])
    },

    methods: {
        ...mapActions(['TOKENS_balanceOf'])
    },
    components: {
        Box
    }
};
</script>
<style lang="scss">
.trade {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: start;
    margin-top: 150px;
}
.governance {
    display: flex;
    justify-content: space-between;
    &:not(:first-child) {
        margin-top: 25px;
    }
}
.margin-top {
    margin-top: 25px;
}
.arrow {
    margin-top: 10px;
    transform: scale(0.6);
    path {
        fill: var(--button-color);
    }
}
</style>
