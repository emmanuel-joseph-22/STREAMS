<template>
    <div class="loader_page">
        <div class="loader">
            <span style="--i:1;"></span>
            <span style="--i:2;"></span>
            <span style="--i:3;"></span>
            <span style="--i:4;"></span>
            <span style="--i:5;"></span>
            <span style="--i:6;"></span>
        </div>
        <svg>
            <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10"
                />
                <feColorMatrix values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -10
                "/>
            </filter>
        </svg>
    </div>
</template>

<style scoped>
.loader_page{
    display: flex;
    justify-content: center;
    align-items: 100vh;
    min-height: 100vh;
    min-width: 100vw;
    background-color: #FFFFFF;
    z-index: 40;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
}
svg{
    width: 0;
    height: 0;
}
.loader{
    text-align: center;
    position: relative;
    margin-bottom: 40px;
    width: 110px;
    height: 110px;
    filter: url(#gooey);
}
.loader span{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    animation: animate 3s ease-in-out infinite;
    animation-delay: calc(0.2s * var(--i));
}
.loader span::before{
    content: "";
    position: absolute;
    top: 0;
    left: calc(50% - 20px);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0 0 10px #03a9f4;
    background: linear-gradient(#fce4ec, #03a9f4);
}
@keyframes animate{
    0%
    {
        transform: rotate(0deg);
    }
    50%,100%
    {
        transform: rotate(360deg);
    }
}
</style>