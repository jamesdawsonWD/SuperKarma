<template>
    <header class="header">
        <div class="content">
            <div class="logo-container">
                <h2>Test<span class="dot">.</span></h2>
            </div>
            <div class="nav">
                <router-link to="/">Home</router-link>
                <router-link to="/map">Map</router-link>
                <button v-if="Address == emptyAddress" class="connect" @click="connectWallet()">
                    Connect
                </button>
                <button v-if="Address != emptyAddress" class="address">{{ Address | shortAddress }}</button>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
// <div v-if="Address != emptyAddress" class="balance-wallet">
//     <h4>SIG: {{ SIG_getBalance | fromWeiToReadable | toFixed(4) }}</h4>
// </div>
import { mapGetters, mapActions } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import DepositForm from '@/components/forms/DepositForm.vue';
import Button from '@/components/generics/Button.vue';

@Component({
    components: {
        DepositForm,
        Button
    },
    methods: {
        ...mapActions(['bootstrapContracts']),
        async connectWallet() {
            await this.bootstrapContracts();
        }
    },
    computed: {
        ...mapGetters(['Address'])
    },

    data() {
        return {
            emptyAddress: '0x0000000000000000000000000000000000000000'
        };
    }
})
export default class Header extends Vue {
    @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
    width: 100vw;
    height: auto;
    position: fixed;
    z-index: 10;
    position: relative;

    .balance-wallet {
        position: absolute;
        right: 300px;
        height: 55px;
        background: var(--main-font);
        display: flex;
        z-index: 9;
        padding: 0 20px;
        top: 60px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;

        h4 {
            color: var(--button-color);
            font-size: 12pt;
        }
    }

    h2 {
        font-size: 20pt;
        .dot {
            color: var(--button-color);
        }
        .finance {
            color: var(--main-secondary);
        }
    }

    .content {
        padding: 0 300px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 10;
        background-color: var(--foreground-color);
        top: 0;
        -webkit-box-shadow: -1px 10px 5px -4px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: -1px 10px 5px -4px rgba(0, 0, 0, 0.05);
        box-shadow: -1px 10px 5px -4px rgba(0, 0, 0, 0.05);

        .logo-container {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            h2 {
                line-height: 20px;
            }
        }
        .logo {
            margin-right: 10px;
            top: 10px;
            height: 28px;
        }

        .nav {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .connect,
        .address {
            width: 100px;
            border: none;
            padding: 10px;
            margin: 0 0 0 50px;
            border-radius: 12px;
            background: transparent;
            transition: 0.2s;
            font-size: var(--md-font);
            color: var(--button-color);
            border: 3px solid var(--button-color);
            font-weight: 700;
            outline: none;
            &:hover {
                cursor: pointer;
                background: var(--button-color);
                color: white;
            }
        }

        .address {
            width: auto;
            color: white;
            background: var(--button-color);
        }
        a {
            font-weight: bold;
            color: #2c3e50;
            text-decoration: none;
            display: flex;
            font-size: var(--md-font);
            align-items: center;
            height: 50px;
            min-width: 100px;

            padding: 0 10px;
            padding-top: 9px;
            justify-content: center;
            border-bottom: 9px solid var(--foreground-color);
            &.router-link-exact-active {
                color: var(--main-font);
            }

            &:hover,
            &:active,
            &:focus {
                color: var(--main-font);
                border-bottom: 9px solid var(--button-color);
            }
        }
    }
}
</style>
