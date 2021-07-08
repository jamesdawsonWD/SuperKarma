<template>
    <div class="selected-currency-input" :style="{ height: dropDownActive ? '380px' : 'auto' }">
        <div :class="{ dropdownVisible: dropDownActive }" class="dropdown">
            <div :style="{ opacity: dropDownActive ? '1' : '0' }" class="search">
                <input v-if="dropDownActive" v-model="search" class="search-bar" />
                <Search v-if="dropDownActive" class="search-icon" />
            </div>
            <div :style="{ opacity: dropDownActive ? '1' : '0' }" class="select-list">
                <article v-for="(item, key) in filteredTokens" :key="key" @click="select(key, item)">
                    <div class="item">
                        <div class="symbol">{{ item[1].symbol }}</div>
                        <div class="name">{{ item[1].name }}</div>
                    </div>
                    <div class="price">{{ item[1].price }} {{ currency }}</div>
                </article>
            </div>
        </div>
        <div :class="{ shadow: dropDownActive, error: error }" class="form-row">
            <label>{{ label }}</label>
            <span @click="flipDropdown" class="currency"
                ><DownCaret class="caret" />{{ selected ? selected.symbol : 'CONNECT YOUR WALLET' }}
            </span>
            <input
                v-model="amount"
                @input="
                    $emit('update:amount', amount);
                    $emit('changed', amount);
                "
                type="number"
                :id="inputId"
                pattern="^\d+(?:\.\d{1,2})?$"
                step="0.01"
                :placeholder="placeHolder"
            />
        </div>
    </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';

import Button from '@/components/generics/Button.vue';
import DownCaret from '@/assets/svg/down-caret.svg';
import Search from '@/assets/svg/search.svg';

export default {
    components: {
        DownCaret,
        Search
    },
    data() {
        return {
            selected: this.tokens[Object.keys(this.tokens)[0]],
            dropDownActive: false,
            newAmount: '',
            search: ''
        };
    },
    computed: {
        filteredTokens() {
            if (this.search == undefined) return;
            return Object.entries(this.tokens).filter(token => {
                const [key, value] = token;
                return (
                    value.name.toLowerCase().includes(this.search.toLowerCase()) ||
                    value.symbol.toLowerCase().includes(this.search.toLowerCase())
                );
            });
        }
    },
    props: ['tokenId', 'label', 'inputId', 'placeHolder', 'currency', 'tokens', 'amount', 'error', 'disable'],
    watch: {
        tokens: function(val) {
            this.selected = this.tokens[Object.keys(this.tokens)[0]];
        }
    },
    methods: {
        flipDropdown() {
            if (this.disable) return;
            this.dropDownActive = this.dropDownActive ? false : true;
        },
        select(index, item) {
            this.selected = item[1];
            this.dropDownActive = false;
            const key = `${Object.keys(this.tokens)[index]}`;
            this.$emit('assetSelected', { [key]: this.selected });
        }
    }
};
</script>
<style scoped lang="scss">
@import '@/styles';

.shadow {
    -webkit-box-shadow: -1px 10px 5px -4px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: -1px 10px 5px -4px rgba(0, 0, 0, 0.15);
    box-shadow: -1px 10px 5px -4px rgba(0, 0, 0, 0.15);
}
.selected-currency-input {
    position: relative;
    height: auto;
    .currency {
        position: absolute;
        font-size: var(--md-font);
        color: var(--main-font);
        right: 25px;
        bottom: 0;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        @include DS_Bold;
        &:hover {
            cursor: pointer;
        }
    }
    .error input {
        border: var(--danger-color) 2px solid !important;
    }
    .dropdownVisible {
        height: 300px !important;
        overflow-y: scroll !important;
        transition: 0.3s !important;
        transition-timing-function: ease-out;
        padding-right: 0 !important;
    }
    .dropdown {
        position: absolute;
        transition: 0;
        height: 0;
        top: 50px;
        width: 100%;
        padding-top: 30px;
        background: var(--sub-foreground-color);
        border-radius: 10px;
        box-sizing: border-box;
        overflow-x: hidden;
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        scrollbar-width: none; /* Firefox */

        &::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
        }
        .search {
            position: relative;
            padding: 20px 25px 0 25px;
            transition: 0.4s;
            .search-bar {
                width: 100%;
                height: 40px;
                padding: 0;
                font-size: 14pt;
                color: var(--main-secondary);
                background: var(--main-font);

                border-radius: 5px;
                padding-left: 50px;
                box-sizing: border-box;
            }

            .search-icon {
                position: absolute;
                left: 25px;
                transform: scale(0.5);
                fill: var(--main-secondary);
            }
        }

        .select-list {
            height: 200px;
            width: 100%;
            margin-top: 10px;
            transition: 0.45s;
            article {
                display: flex;
                justify-content: space-between;
                padding: 10px 30px;
                border-bottom: 1px solid var(--main-font);
                box-sizing: border-box;
                .item {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    text-align: left;
                }
                .name {
                    text-transform: uppercase;
                    font-size: var(--sm-font);
                    color: var(--main-font);
                    font-weight: 600;
                    margin-top: 10px;
                }
                .symbol {
                    font-size: var(--md-font);
                    color: var(--main-secondary);
                }
                .price {
                    font-size: var(--md-font);
                    color: var(--main-secondary);
                    align-self: center;
                    font-weight: 700;
                }
                &:hover {
                    background: var(--button-color);
                    cursor: pointer;

                    .symbol,
                    .price {
                        color: var(--main-font);
                    }
                }
            }
        }
    }

    .caret {
        margin-right: 10px;
        path {
            fill: var(--main-font);
        }
    }
}
</style>
