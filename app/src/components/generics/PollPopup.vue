<template>
    <div class="poll">
        <div class="header">
            <div class="title">
                {{ title }}
            </div>
            <div
                class="status"
                :class="{
                    'in-progress': status == 'In Progress',
                    passed: status == 'Passed',
                    failed: status == 'Failed'
                }"
            >
                {{ status }}
            </div>
        </div>
        <div class="scroll-wrapper">
            <div class="info-set">
                <div class="label">Description</div>
                <div class="content">{{ description }}</div>
            </div>
            <div class="info-set">
                <div class="label">Link</div>
                <a :href="link" class="content">{{ link }}</a>
            </div>
            <div class="info-set">
                <div class="label">Completion</div>
                <div class="content">{{ finishDate }}</div>
            </div>
            <VoteBar class="vote-bar" :yesVotes="yesVotes" :noVotes="noVotes" />
            <div class="vote-stats">
                <div class="votes">
                    <div class="passed">YES: {{ getPercentage(yesVotes) }}%</div>
                    <div class="failed">NO: {{ getPercentage(noVotes) }}%</div>
                </div>
            </div>

            <div class="table-wrapper">
                <table class="vote-list">
                    <tr class="titles">
                        <td>Voter</td>
                        <td>Cast</td>
                        <td>Amount</td>
                    </tr>
                    <tr class="vote-item" v-for="(item, index) in votes" :key="index">
                        <td class="address">
                            <a :href="'https://www.etherscan.io/address/' + item.address">{{
                                item.address
                            }}</a>
                        </td>
                        <td class="cast">{{ item.cast }}</td>
                        <td class="amount">{{ item.amount }}</td>
                    </tr>
                </table>
            </div>
        </div>
        <Button v-if="status == 'In Progress'" class="vote" title="VOTE" buttonStyle="primary" />
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import VoteBar from '@/components/generics/VoteBar.vue';
import Button from '@/components/generics/Button.vue';
@Component({
    components: {
        VoteBar,
        Button
    },
    props: {
        title: String,
        yesVotes: {
            type: Number,
            default: 0
        },
        noVotes: {
            type: Number,
            default: 0
        },
        status: String,
        finishDate: String,
        description: String,
        votes: Object,
        link: String
    },
    methods: {
        getPercentage: function(value) {
            return Math.floor((value / 100000000) * 100);
        }
    }
})
export default class Poll extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles';

.poll {
    position: relative;
    display: flex;
    background-color: var(--foreground-color);
    top: 0;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    align-items: flex-start;
    border-radius: 12px;
    padding: 20px 30px;
    border: 2px solid var(--bg-color);
    transition: 0.2s;
    a {
        @include DS_Bold;
        color: var(--button-color);
    }
    .vote-stats {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .votes {
            width: inherit;

            display: flex;
            justify-content: space-evenly;
            @include DS_Bold;
            font-size: var(--lg-font);
        }
        .finish-date {
            color: var(--main-secondary);
            text-transform: uppercase;
            font-size: var(--sm-font);
        }
    }

    .scroll-wrapper {
        height: 500px;
        width: 100%;
        overflow-y: scroll !important;
        position: relative;
    }
    .gradient-wrapper {
        width: 100%;
        position: relative;
        .gradientback {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            height: 50px;
            background: -moz-linear-gradient(
                top,
                var(--foreground-color) 0%,
                rgba(0, 0, 0, 1) 100%
            ); /* FF3.6+ */
            background: -webkit-gradient(
                linear,
                left top,
                left bottom,
                color-stop(0%, var(--foreground-color)),
                color-stop(100%, rgba(0, 0, 0, 1))
            ); /* Chrome,Safari4+ */
            background: -webkit-linear-gradient(
                top,
                var(--foreground-color) 0%,
                rgba(0, 0, 0, 1) 100%
            ); /* Chrome10+,Safari5.1+ */
            background: -o-linear-gradient(
                top,
                var(--foreground-color) 0%,
                rgba(0, 0, 0, 1) 100%
            ); /* Opera 11.10+ */
            background: -ms-linear-gradient(
                top,
                var(--foreground-color) 0%,
                rgba(0, 0, 0, 1) 100%
            ); /* IE10+ */
            background: linear-gradient(
                to bottom,
                var(--foreground-color) 0%,
                rgba(255, 255, 255, 1) 100%
            ); /* W3C */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0089fff1', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
        }
    }
    .table-wrapper {
        margin-top: 50px;
    }
    .vote-list {
        width: 100%;
        text-align: left;
        position: relative;
        td {
            vertical-align: middle;
        }
        .titles {
            height: 40px;
            @include DS_Bold;
            font-size: var(--md-font);
            text-align: center;

            & :last-child {
                text-align: right;
            }

            & :first-child {
                text-align: left;
            }
        }
        .vote-item {
            height: 50px;
            width: inherit;
            font-size: var(--sm-font);
            border-bottom: 1px solid var(--bg-color);
            .address {
            }

            .cast {
                font-size: var(--sm-font);
                text-transform: uppercase;
                text-align: center;
                @include DS_Medium;
            }

            .amount {
                text-align: right;
                @include DS_Medium;
            }
        }
    }
    .description {
        text-align: left;
        @include DS_Light;
        margin-top: 25px;
        line-height: 25px;
    }
    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 40px;
        .title {
            text-align: left;
            @include DS_Bold;
            font-size: var(--lg-font);
        }
    }
    .info-set {
        display: flex;
        flex-direction: column;
        @include DS_Light;
        margin-top: 20px;
        text-align: left;
        .label {
            @include DS_Bold;
        }
        .content {
            margin-top: 10px;
        }
    }
    .status {
        width: 100px;
        text-align: right;
        @include DS_Bold;
        font-size: var(--md-font);
    }

    .in-progress {
        color: var(--warning-color);
    }

    .passed {
        color: var(--button-color);
    }
    .failed {
        color: var(--danger-color);
    }
}
</style>
