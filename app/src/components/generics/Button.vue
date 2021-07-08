<template>
    <button
        class="button"
        :class="[buttonStyle, disabled ? 'disabled' : '', highlight ? 'highlight' : '']"
        @click="submit"
        :disabled="disabled"
    >
        <span>{{ title }}</span>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: ['title', 'buttonStyle', 'disabled', 'loading', 'highlight'],
    methods: {
        submit: function() {
            this.$emit('clicked');
        }
    }
};
</script>

<style scoped lang="scss">
.button {
    margin: 40px 0 10px 0;
    width: 100%;
    border: none;
    padding: 15px;
    border-radius: 12px;
    background: var(--button-color);
    transition: 0.2s;
    font-size: var(--md-font);
    font-weight: 700;
    outline: none;
    &:hover {
        cursor: pointer;
    }
}

.disabled {
    background: var(--sub-foreground-color) !important;
    color: var(--button-color) !important;
    &:hover {
        cursor: initial !important;
    }
}
.danger {
    background: var(--danger-color);
    color: var(--danger-color) !important;
}

.loading {
    padding: 0 !important;
}
.primary {
    background: linear-gradient(33deg, rgba(17, 153, 142, 1) 0%, rgba(56, 239, 125, 1) 100%);
    color: white;
    &:hover {
    }
}

.gray {
    background: var(--sub-foreground-color);
    &:hover {
        background: var(--main-font);
        color: white;
    }
}
.highlight {
    background: var(--main-font);
    color: white;
}
</style>
