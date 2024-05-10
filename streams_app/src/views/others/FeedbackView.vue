<template>
    <home-page>
        <div class="feed">
            <div class="feedback">
                <h1>FEEDBACK</h1>
            </div>
            <div class="displayed-post">
            <div class="post-section">
                <textarea class="discussion-box" ref="post-textarea" rows="1" placeholder="What are your thoughts?"></textarea>
                <button class="post-button" type="submit">Post</button>
            </div>
            </div>
        </div>
    </home-page>
</template>

<script>
import othersPageView from './othersPageView.vue';

export default {
    components: {
        'home-page': othersPageView,
    },
    data(){

    },
    mounted(){
      
    }
}
</script>

<style scoped>
    .feedback h1{
        color: #0E5E7B;
        font-weight: bold;
        font-size: 35px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        align-items: flex-start;
        margin-right: 50vw; 
        margin-top: 25px;       
    }

    .post-section{
        display: flex;
        flex-direction: column;
        height: auto;
        width: 60%;
        padding: 0;
        margin: 25px auto;
    }

    .discussion-box{
        width: auto;
        min-height: 20px;
        resize: none;
        overflow-y: hidden;
        font-size: 1.1rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 10px;
        background-color: rgba(78, 99, 111, 0.2);
        border: 1.5px solid #042334;
        color: #0E5E7B;
        margin-left: 40px;
        border-radius: 25px;
        cursor: pointer;

    }

    .discussion-box:hover{
        background-color: rgba(78, 99, 111, 0.3);
        color: #042334;
    }

    .post-button{
        background-color: rgba(14, 94, 123, 0.5);
        color: #042334;
        border: none;
        border-radius: 18px;
        font-size: 16px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        cursor: pointer;
        -webkit-border-radius: 17px;
        -moz-border-radius: 17px;
        -ms-border-radius: 17px;
        -o-border-radius: 17px;
        align-self: center;
        width: 100px;
        height: 30px;
        margin-top: 10px;
        margin-left: auto;
    }

    .post-button:hover,
    .post-button.active{
        background-color: rgba(14, 94, 123, 0.7);
        color: #042334;
    }
</style>