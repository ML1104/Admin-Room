<template>
    <div class="adding">
        <form action="" @submit="addArticle">
            <label for="title">Title:</label>
            <input required v-model="title" type="text" name="title">
            <label for="category">Category:</label>
            <input required v-model="category" type="text" name="category">
            <label for="author">Author:</label>
            <input required v-model="author" type="text" name="author">
            <button>Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Add',
    data() {
        return {
            title: "",
            category: "",
            author: ""
        }
    },
    methods: {
        addArticle() {
            let data = {
                title: this.title,
                category: this.category,
                author: this.author
            }
            this.$emit('addNew', data);
            // this.$router.push({ path: '/'});
        }
    }
}
</script>

<style>

</style>


