<script lang="ts" setup>
</script>

<template>
    <div class="h-[100vh] flex flex-col gap-2">
        <div class="flex flex-col gap-2">
            <h1>= projects</h1>
            <p>this page showcases the projects that i've worked on! they are mostly programming related :3</p>
            <h2>== personal</h2>
            <div class="projects grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <!-- TODO: make this into a component later -->
                <div class="project">
                    <img src="/projects/home.png" alt="">
                    <div class="flex flex-col gap-2 p-4">
                        <span class="text-purple">kuvii.me</span>
                        <p class="text-justify">this is my own very cute personal webpage, the one you're currently visiting!!</p>
                        <hr>
                        <a href="https://kuvii.me/">
                            project
                        </a>
                        <a href="https://github.com/kuviidev/site">
                            repo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .project {
        @apply border-2 border-solid border-gray;

        img {
            @apply w-full border-b-2 border-b-solid border-b-gray;
        }

        a {
            @apply py-2 px-4 text-center bg-zinc-700 text-zinc-400 hover:bg-zinc-600 active:scale-95;
        }
    }
</style>