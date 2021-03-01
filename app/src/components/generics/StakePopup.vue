<template>
    <PaneledBox class="stake-popup" namePanelA="Stake" namePanelB="Unstake">
        <form class="stake-form" slot="panelA">
            <div class="title">{{ asset0 }}-{{ asset1 }}</div>
            <ImageCombo class="token-icons" :firstCombo="asset0" :secondCombo="asset1" />
            <StandardCurrencyInput
                label="Amount"
                id="fromUSDT"
                :amount.sync="deposit.amount"
                placeHolder="0.000"
                currency="LP"
            />
            <Button title="APPROVE" @clicked="approve" v-if="!approved" buttonStyle="primary"></Button>
            <Button title="STAKE" @clicked="depositLP" v-if="approved" buttonStyle="primary"></Button>
        </form>
        <form class="unstake-form" slot="panelB">
            <div class="title">{{ asset0 }}-{{ asset1 }}</div>
            <ImageCombo class="token-icons" :firstCombo="asset0" :secondCombo="asset1" />
            <StandardCurrencyInput
                label="Amount"
                :amount.sync="withdraw.amount"
                id="fromUSDT"
                placeHolder="0.000"
                currency="LP"
            />
            <Button title="UNSTAKE" @clicked="withdrawLP" buttonStyle="primary"></Button>
        </form>
    </PaneledBox>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import StandardCurrencyInput from '@/components/forms/StandardCurrencyInput.vue';
import PaneledBox from '@/components/generics/PaneledBox.vue';
import Button from '@/components/generics/Button.vue';
import ImageCombo from '@/components/generics/ImageCombo.vue';
import web3 from 'Web3';
@Component({
    props: ['pid', 'poolAddress', 'asset0', 'asset1'],
    data() {
        return {
            withdraw: {
                amount: ''
            },
            deposit: {
                amount: ''
            },
            approved: false
        };
    },
    components: {
        StandardCurrencyInput,
        PaneledBox,
        Button,
        ImageCombo
    },
    computed: {
        ...mapGetters(['StakePools', 'PAIRS_getLpBalance'])
    },
    methods: {
        ...mapActions(['POOL_deposit', 'ST_approve', 'ST_allowance', 'UIM_closeModal', 'POOL_withdraw']),
        approve() {
            console.log(this.StakePools);
            this.ST_approve({
                tokenAddress: this.poolAddress,
                amount: web3.utils.toWei('1000000', 'ether'),
                spender: this.StakePools._address
            });
            this.approved = true;
        },
        async depositLP() {
            console.log(this.withdraw.amount, this.pid);
            this.ST_allowance({ tokenAddress: this.poolAddress, spender: this.StakePools._address });
            await this.POOL_deposit({
                amount: web3.utils.toWei(this.deposit.amount.toString(), 'ether'),
                pid: this.pid.toString(),
                asset0: this.asset0,
                asset1: this.asset1
            });
        },
        async withdrawLP() {
            console.log(this.withdraw.amount, this.pid);
            await this.POOL_withdraw({
                amount: web3.utils.toWei(this.withdraw.amount.toString(), 'ether'),
                pid: this.pid.toString(),
                asset0: this.asset0,
                asset1: this.asset1
            });
        }
    }
})
export default class StakeAsset extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles';

.stake-form,
.unstake-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
        @include DS_Bold;
        margin-bottom: 10px;
    }
}
.token-icons {
    margin: 20px 10px;
    width: 350px;
}
</style>
