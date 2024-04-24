<template>
    <div class="header border-b-2 border-gray-400 bg-gray-50">
        <div class="block">

        </div>
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
    left: 0;
    top: 0;
    width: auto;
    height: 60px;
    z-index: 1;
    flex-direction: row;
    color: rgb(1, 27, 51);
}

@media screen and (max-width: 766px){
    .header{
        width: auto;
        height: 70px;
        font-size: 0.8rem;
    }
    .block{
        width: 50px;
    }
}
</style>