<template>
    <div class="header">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'headerBar'
    }
</script>

<style>
.header{
    display: flex;
    position: sticky;
    align-items: left;
    padding: 10px;
    background-color: white;
    left: 0;
    top: 0;
    width: 99%;
    height: 60px;
    z-index: 10;
    flex-direction: row;
    font-size: 1rem;
    border-radius: 1px solid var(--border);
    
}
</style>