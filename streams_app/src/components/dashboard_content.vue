<template>
    <div class="content">
        <slot></slot>
    </div>
</template>


<style scoped>
.content{
    position: relative;
    display: flex;
    min-height: calc(100vh - 60px);
    background-color: rgba(196, 0, 0, 0);
    padding: 0 calc(5vw + 40px);
    width: 100vw;
}
</style>