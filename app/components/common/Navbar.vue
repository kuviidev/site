<template>
    <nav class="flex items-center gap-2 bord p-4">
        <RouterLink to="/">home</RouterLink>
        <p>-</p>
        <RouterLink to="/about">about_me</RouterLink>
        <p>-</p>
        <RouterLink to="/blog" class="bg-striped">blog</RouterLink>
        <p>-</p>
        <RouterLink to="/projects">projects</RouterLink>
        <p>-</p>
        <RouterLink to="/bookmarks" class="bg-striped">bookmarks</RouterLink>
        <div class="ml-auto">
            <!-- todo: add or not -->
            <audio controls loop hidden>
                <source src="/prob_-_come_to_me.mp3" type="audio/mpeg">
            </audio>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    a {
        @apply flex items-center py-2 px-4 bg-zinc-700 text-gray hover:scale-105 active:scale-95;
    }

    audio {
        @apply h-4;
    }
</style>