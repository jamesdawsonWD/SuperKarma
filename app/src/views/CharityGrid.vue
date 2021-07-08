<template>
    <div class="charity-grid">
        <CharityGridItem
            class="item"
            v-for="(item, index) in SKP_getAll"
            :item="item"
            :key="Object.keys(SKP_getAll).indexOf(index)"
            :charityId="index"
            @click.native="UIM_addDonation({ donationPool: index })"
        />
    </div>
</template>

<script lang="ts">
// @ is an alias to /src

// import HelloWorld from '@/components/HelloWorld.vue';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Box from '@/components/generics/Box.vue';
import CharityGridItem from '@/components/generics/CharityGridItem.vue';

// import Button from '@/components/generics/Button.vue';
export default {
    name: 'CharityGrid',
    data() {
        return {
            charities: [],
            donationRate: '',
            count: 0
        };
    },
    computed: {
        ...mapGetters(['SF_getUser', 'SF_getUserDetails', 'SKP_getAll'])
    },
    methods: {
        ...mapActions(['UIM_addDonation']),
        createFlow() {
            console.log('here');
        }
    },
    components: {
        CharityGridItem
    }
};
</script>
<style lang="scss">
.charity-grid {
    width: 70%;
    height: 100vw;

    & > :not(:first-child) {
        margin-top: 25px;
    }
}
</style>
