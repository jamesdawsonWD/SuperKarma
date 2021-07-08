<template>
    <div class="trade">
        <CharityGrid />
        <div class="side-actions">
            <Box boxName="Create Donation Flow" class="donate">
                <div slot="boxContent">
                    <div slot="boxContent">
                        <SelectCurrencyInput
                            label="AMOUNT"
                            id="toToken"
                            placeHolder="0.000"
                            placeholderCurrency="USDT"
                            :tokens="tokens"
                            :amount.sync="donationRate"
                        />
                    </div>

                    <div class="flow-options">
                        <Button
                            title="WEEK"
                            buttonStyle="gray"
                            @clicked="flowOption = 'week'"
                            :highlight="flowOption == 'week'"
                        />
                        <Button
                            title="MONTH"
                            buttonStyle="gray"
                            @clicked="flowOption = 'month'"
                            :highlight="flowOption == 'month'"
                        />
                        <Button
                            title="YEAR"
                            buttonStyle="gray"
                            @clicked="flowOption = 'year'"
                            :highlight="flowOption == 'year'"
                        />
                    </div>
                    <h4 class="donation-pool-title" v-if="SKP_getName(UIM_getDonationAddress)">
                        {{ SKP_getName(UIM_getDonationAddress) }}
                    </h4>
                    <Button title="DONATE" buttonStyle="primary" @clicked="createFlow" />
                </div>
            </Box>
        </div>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Box from '@/components/generics/Box.vue';
import Button from '@/components/generics/Button.vue';
import CharityGrid from '@/views/CharityGrid.vue';
import SelectCurrencyInput from '@/components/forms/SelectCurrencyInput.vue';
import web3 from 'web3';
// import Button from '@/components/generics/Button.vue';
export default {
    name: 'Trade',
    data() {
        return {
            tokens: {
                1: {
                    symbol: 'DAIx',
                    name: 'DAIx Token'
                }
            },
            flowOption: 'week',
            scrollY: '0',
            donationRate: ''
        };
    },
    computed: {
        ...mapGetters([
            'SF_getUser',
            'SF_getUserDetails',
            'UIM_getDonations',
            'UIM_getDonationAddress',
            'SKP_getName'
        ]),
        scrollFromTop() {
            return document.documentElement.scrollTop;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        ...mapActions(['TOKENS_balanceOf', 'SF_flow']),
        createFlow() {
            this.SF_flow({
                recipient: this.UIM_getDonationAddress,
                flowRate: web3.utils.toWei('0.001', 'ether')
            });
        },
        handleScroll() {
            console.log('here');
        }
    },
    components: {
        Box,
        SelectCurrencyInput,
        Button,
        CharityGrid
    }
};
</script>
<style lang="scss">
.trade {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 150px;
    margin-bottom: 150px;
    & > :first-child {
        margin-right: 50px;
    }

    .side-actions {
        position: relative;
        width: 400px;
    }
    .donation-pool-title {
        margin-top: 25px;
    }
    .donate {
        position: fixed;
        width: 400px;
        top: 150px;
        .flow-options {
            display: flex;
            :not(:last-child) {
                margin-right: 20px;
            }
        }

        .donation-display {
            display: flex;
            height: 50px;
            align-items: center;
            padding: 0 15px;
            h4 {
                font-size: 12pt;
                width: 65%;
                text-align: left;
            }
            input {
                text-align: right;
                width: 30%;
            }
        }
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
