<template>
  <home-page>
    <header-bar>
      <h1 class="text-3xl font-semibold ml-3 mt-1">STREAMS</h1>
 <!--    <p>Community Forum jk lang 2</p>   -->
    </header-bar>

    <div class="feedback">
      <!-- Feedback form -->
      <div class="post-section">
        <textarea
          v-model="feedbackText"
          class="discussion-box"
          placeholder="What are your thoughts?"
          rows="1"
        ></textarea>
        <button
          class="post-button"
          @click="submitFeedback"
          :disabled="isSubmitting"
        >
          Post
        </button>
      </div>

      <!-- Display feedbacks -->
      <div class="feedback-list">
        <div v-for="feedback in feedbacks" :key="feedback.id" class="feedback-item">
          <!-- Feedback header with profile picture, name, and timestamp -->
          <div class="main_feedback_cont">
            <div class="profile_picture"
              :style="{ backgroundColor: getRoleColor(feedback.role) }"
            ></div>
            <div class="feedback_focus">
              <div class="feedback-header">
                <div class="feedback-header-left">
                  <p class="feedback-name">{{ feedback.role || 'guest' }}</p>
                </div>
                <div class="feedback-header-right">
                  <p class="feedback-timestamp">{{ formatTimestamp(feedback.timestamp) }}</p>
                </div>
              </div>

              <!-- Feedback content -->
              <div class="feedback-content">
                <p>{{ feedback.text }}</p>
              </div>
            </div>
          </div>
          <!-- Toggle comments button -->
          <button class="toggle-comments-button" @click="toggleComments(feedback)">
            {{ feedback.showComments ? 'Hide Comments' : 'Show Comments' }}
          </button>

          <!-- Collapsible comments section -->
          <div v-if="feedback.showComments" class="comments-section">
            <!-- Comment form -->
            <div class="comment-form">
              <textarea
                v-model="feedback.newCommentText"
                class="comment-input"
                placeholder="Add a comment..."
                rows="1"
              ></textarea>
              <button
                class="comment-button"
                @click="submitComment(feedback)"
              >
                Post
              </button>
            </div>

            <!-- Display existing comments -->
            
              <div class="comments-list">
                <div v-for="(comment, idx) in feedback.comments.sort((a, b) => b.timestamp - a.timestamp)" :key="idx" class="comment-item">
                  <div class="main_feedback_cont">
                    <div class="comment-avatar" :style="{ backgroundColor: getRoleColor(comment.username) }"></div>
                    <div class="main_comment">
                      <div class="comment-header">
                        <p class="comment-username">{{ comment.username }}</p>
                        <p class="comment-timestamp">{{ formatTimestamp(comment.timestamp) }}</p>
                      </div>
                      <p class="comment-text">{{ comment.text }}</p>
                      
                    </div>
                  </div><!--<hr class="comment-divider"/>-->
                </div>
              </div>
          </div>
        </div>
      </div>

        
    </div>

    <div class="side_content">

    </div>
  </home-page>
</template>

<script>
import { ref, push, onValue, query, orderByChild, startAt } from 'firebase/database';
import othersPageView from './othersPageView.vue';
import header from './../../components/header_component.vue';
import { database } from './../../main';
import store from './../../store/index';

export default {
  components: {
    'home-page': othersPageView,
    'header-bar': header,
  },
  data() {
    return {
      feedbackText: '',
      isSubmitting: false,
      feedbacks: [],
      role: store.state.role, // Retrieve the user's role from the store
    };
  },
  methods: {
    async submitFeedback() {
      if (!this.feedbackText.trim()) {
        alert('Feedback cannot be empty.');
        return;
      }

      this.isSubmitting = true;

      try {
        const feedbackRef = ref(database, 'feedbacks');
        const newFeedbackRef = await push(feedbackRef, {
          text: this.feedbackText,
          timestamp: Date.now(),
          role: this.role,
        });

        // Create a new feedback object
        const newFeedback = {
          id: newFeedbackRef.key,
          text: this.feedbackText,
          timestamp: Date.now(),
          role: this.role,
          comments: [],
          newCommentText: '',
          showComments: false, // Initialize showComments as false
        };

        // Add the new feedback to the beginning of the feedbacks array
        // Only add if it does not already exist in the array
        if (!this.feedbacks.find(f => f.id === newFeedback.id)) {
          this.feedbacks.unshift(newFeedback);
        }

        this.feedbackText = '';
        alert('Feedback submitted successfully!');
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
      }

      this.isSubmitting = false;
    },
    async submitComment(feedback) {
      // Ensure comment text is not empty
      if (!feedback.newCommentText.trim()) {
          alert('Comment cannot be empty.');
          return;
      }

      // Validate the feedback ID
      if (!feedback || !feedback.id) {
          console.error('Invalid feedback ID. Cannot submit comment.');
          alert('Cannot submit comment due to invalid feedback ID.');
          return;
      }

      try {
          // Reference to the specific feedback's comments in the database
          const commentsRef = ref(database, `feedbacks/${feedback.id}/comments`);

          // Get the current user's role from the store
          const currentUserRole = store.state.role || 'guest';

          // Push the new comment to the database
          await push(commentsRef, {
              text: feedback.newCommentText,
              username: currentUserRole, // Use the current user's role as the username
              timestamp: Date.now(),
          });

          // Reset the newCommentText after successful submission
          feedback.newCommentText = '';

      } catch (error) {
          console.error('Error submitting comment:', error);
          alert('Failed to submit comment. Please try again.');
      }
    },
    toggleComments(feedback) {
      // Toggle the value of showComments for the given feedback
      feedback.showComments = !feedback.showComments;
    },
    formatTimestamp(timestamp) {
      // Convert timestamp to a human-readable format
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
    getRoleColor(role) {
      // Determine the profile picture color based on the user's role
      switch (role) {
        case null:
          return '#0000FF'; // Blue for guest
        case 'admin':
          return '#808080'; // Gray for admin
        case 'employee':
          return '#000000'; // Black for employee
        case 'event admin':
          return '#FFFF00'; // Yellow for event admin
        default:
          return '#CCCCCC'; // Default gray for unknown roles
      }
    },
  },
  mounted() {
    // Calculate the timestamp 30 days ago from the current date and time
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

    // Create a query to fetch feedbacks with a timestamp greater than or equal to 30 days ago
    const feedbackRef = ref(database, 'feedbacks');
    const recentFeedbackQuery = query(
        feedbackRef,
        orderByChild('timestamp'),
        startAt(thirtyDaysAgo)
    );

    // Fetch the recent feedbacks from the database
    onValue(recentFeedbackQuery, (snapshot) => {
        const feedbackData = snapshot.val();
        if (feedbackData) {
            // Convert the feedback data to an array and sort it from latest to oldest
            const feedbackArray = Object.values(feedbackData).map((feedback, index) => {
                // Assigning the feedback ID (key) to each feedback object
                feedback.id = Object.keys(feedbackData)[index];
                return feedback;
            }).sort((a, b) => b.timestamp - a.timestamp);

            // Only update the feedbacks array if there is new data
            if (JSON.stringify(this.feedbacks) !== JSON.stringify(feedbackArray)) {
                this.feedbacks = feedbackArray;

                // Initialize comments and other state for each feedback
                this.feedbacks.forEach(feedback => {
                    feedback.comments = [];
                    feedback.newCommentText = '';
                    feedback.showComments = false;

                    // Add a listener for the comments of each feedback post
                    const commentsRef = ref(database, `feedbacks/${feedback.id}/comments`);
                    onValue(commentsRef, (commentsSnapshot) => {
                        const commentsData = commentsSnapshot.val();
                        if (commentsData) {
                            feedback.comments = Object.values(commentsData).sort((a, b) => b.timestamp - a.timestamp);
                        } else {
                            feedback.comments = [];
                        }
                    });
                });
            }
        }
    });
  },
};
</script>


<style scoped>
.side_content{
}
/* Feedback styles */
.feedback {
  max-width: 900px;
  margin: 0 180px;
  border-left: 1px solid #e0e0e080;
  border-right: 1px solid #e0e0e080;
  padding-bottom: 60px;
}
@media screen and (max-width: 900px) { 
  .feedback{
    margin: 0;
  }
}

.post-section {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  padding-top: 20px;
}

.discussion-box {
  width: auto;
  min-height: 20px;
  resize: none;
  overflow-y: hidden;
  font-size: 1.1rem;
  padding: 10px;
  background-color: rgba(78, 99, 111, 0.2);
  border: 1.5px solid #042334;
  color: #0e5e7b;
  margin-bottom: 10px;
  border-radius: 25px;
}

.post-button {
  background-color: var(--navy);
  color: white;
  border: none;
  border-radius: 18px;
  font-size: 16px;
  width: 100px;
  height: 30px;
}

.post-button:hover,
.post-button:disabled {
  background-color: rgba(29, 147, 190, 0.7);
  color: white;
}

.feedback-list {
  margin-top: 20px;
  
}

.feedback-item {
  /*background-color: var(--navy);*/
  border: 1px solid #e0e0e080;
  margin: 0 auto;
  padding: 10px;
  /*box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out;*/
}
/*
.feedback-item:hover {
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
}*/

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px 10px 10px;
  color: var(--navy);
  border-radius: 10px 10px 0 0;
  /*border-bottom: 1px solid #ccc;*/

}

.feedback-header-left {
  display: flex;
  align-items: center;
}
.main_feedback_cont{
  display: flex;
  width: 100%;
}
.profile_picture {
  width: 44px;
  height: 40px;
  border-radius: 50%;
  margin: 10px 5px 0 10px;
  border: 2px solid var(--navy);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.feedback_focus{
  width: 100%;
}

.feedback-name {
  font-weight: bold;
  font-size: 1rem;
  margin: 0;
}

.feedback-header-right {
  font-size: 0.9rem;
  text-align: right;
}

.feedback-content {
  padding: 10px 10px 30px 10px;
  color: var(--navy);
  text-align: left;
  font-size: 1.5rem;
}
.toggle-comments-button{
  font-size: 0.8rem;
}
/* Comments section styles */
.comments-section {
  margin-top: 10px;
  border-top: 1px solid var(--navy);
  padding: 10px;
}

.comment-form {
  display: flex;
  gap: 10px;
}

.comment-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 25px;
  min-height: 20px;
  resize: none;
  overflow-y: hidden;
  margin: 10px auto;
}

.comment-button {
  background-color: var(--navy);
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  height: 40px;
  border: none;
  margin: 10px auto;
}
.comment-button:hover{
  background-color: rgba(29, 147, 190, 0.7);
}

.comments-list {
  margin-top: 10px;
}
.main_comment{
  width: 100%;
}
.comment-item {
  padding: 8px;
  margin-bottom: 8px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  color: var(--navy);
}

.comment-avatar {
  width: 34px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--navy);
  margin-top: 6px;
}

.comment-username {
  font-weight: bold;
  color: #0e5e7b;
}

.comment-timestamp {
  color: #888;
  font-size: 0.85rem;
}

.comment-text {
  padding: 10px;
  color: var(--navy);
  text-align: left;
  font-size: 1.1rem;
}

.comment-divider {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin-top: 8px;
}

/* gawa ni yvan
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
    }*/
</style>