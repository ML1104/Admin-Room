<template>
        <tr>
            <td>{{ article.id }}</td>
            <td>{{ article.title }}</td>
            <td>{{ article.category }}</td>
            <td>{{ article.author }}</td>
            <td>
                <button @click="$emit('delete', article.id)">DELETE</button>
            </td>
        </tr>
</template>

<script>
export default {
    name: "Article",
    props: {
        article: { required: true }
    }
}
</script>

<style>

</style>


