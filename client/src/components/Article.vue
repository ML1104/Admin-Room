<template>
        <tr>
            <td>{{ article.title }}</td>
            <td>{{ article.category }}</td>
            <td>{{ article.author }}</td>
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


