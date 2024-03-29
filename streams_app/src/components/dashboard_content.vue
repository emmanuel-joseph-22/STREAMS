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
    width: auto;
}
</style>