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
        <VoteBar :yesVotes="yesVotes" :noVotes="noVotes" />

        <div class="vote-stats">
            <div class="finish-date">
                {{ finishDate }}
            </div>
            <div class="votes">
                <div class="passed">YES: {{ getPercentage(yesVotes) }}%</div>
                <div class="failed">NO: {{ getPercentage(noVotes) }}%</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import VoteBar from '@/components/generics/VoteBar.vue';
@Component({
    components: {
        VoteBar
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
        finishDate: String
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
    height: 200px;
    .vote-stats {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .votes {
            width: 100px;
            display: flex;
            justify-content: space-between;
            @include DS_Bold;
            font-size: var(--sm-font);
        }
        .finish-date {
            color: var(--main-secondary);
            text-transform: uppercase;
            font-size: var(--sm-font);
        }
    }
    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .title {
        text-align: left;
        @include DS_Bold;
    }
    .status {
        width: 100px;
        text-align: right;
        @include DS_Bold;
        font-size: var(--md-font);
    }
    &:hover {
        border: 2px solid var(--button-color);
        cursor: pointer;
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
