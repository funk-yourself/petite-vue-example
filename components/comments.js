import { api } from '../utils/api'

export function Comments({ comments, itemId, itemType, showEmojiPicker, currentUserId }) {
  return {
    comments,
    itemId,
    itemType,
    showEmojiPicker,
    currentUserId,
    text: '',

    mounted() {
      this.$refs.emojiPicker.addEventListener('emoji-click', event => {
        this.text += event.detail.unicode;
      });
    },

    async submit() {
      const json = { comment: { item_id: this.itemId, item_type: this.itemType, message: this.text } };
      const { comment } = await api.post('/comments', { json }).json();
      this.text = '';
      this.comments.push(comment);
    },

    async toggleLike(comment) {
      const existingLike = this.findExistingLike(comment);
      if (existingLike) {
        await api.delete(`/likes/${existingLike.id}`)
        comment.likes.splice(comment.likes.indexOf(existingLike), 1)
      } else {
        const json = { item_id: comment.id, item_type: 'Comment' }
        const { like } = await api.post('/likes', { json }).json()
        comment.likes.push(like)
      }
    },

    showLikes(comment) {
      comment.showLikes = true
    },

    findExistingLike(comment) {
      return comment.likes.find(like => like.user_id === this.currentUserId)
    },

    hideLikes(comment) {
      setTimeout(_ => comment.showLikes = false, 500)
    }
  }
}
