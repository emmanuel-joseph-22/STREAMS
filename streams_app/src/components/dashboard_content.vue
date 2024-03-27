<template>
    <div class="content">
        <slot></slot>
    </div>
</template>


<style scoped>
.content{
    position: relative;
    display: flex;
    min-height: 80vh;
    background-color: var(--white);
    padding: 0 calc(5vw + 40px);
}
</style>