<template>
    <div class="header">
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
    background-color: rgb(255, 255, 255);/*rgb(222, 236, 255);*/
    left: 0;
    top: 0;
    width: auto;
    height: 60px;
    z-index: 1;
    flex-direction: row;
    border-radius: 1px solid var(--border);
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