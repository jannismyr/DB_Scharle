<template>

<div class="fileInputContainer">
    <div class="fileInput">
        <input type="file" @change="uploadImage" accept="image/*">
    </div>
</div>

</template>


<script>
export default {
    name: "addBilder",
    data() {
        return{}
    }
}
</script>