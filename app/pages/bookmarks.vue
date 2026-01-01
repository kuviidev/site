<script lang="ts" setup>
    // not using an array of objects because this is easier to write
    const links: string[][] = [
        ['https://nekotomori.com/', 'buy high quality cat ears and other cute accessories!!'],
        ['https://www.privex.io/', 'interesting private server host'],
        ['https://kyun.host/', 'cute, private and cheap and based server host'],
        ['https://buyvm.net/', 'affordable server host'],
        ['https://www.keybr.com/', 'touch typing practice platform'],
        ['https://jmp.chat/', 'private xmpp based virtual phone number provider (accepts btc)'],
        ['https://silent.link/', 'esim provider where you can buy mobile data with xmr'],
        ['https://owncloud.com/', 'nextcloud alternative'],
        ['https://nyaa.si/', 'anime torrent site'],
        ['https://squid.wtf/', 'music download site (rips from tidal)'],
        ['https://vim.trorr.com/', 'vim cheatsheet'],
    ];
</script>

<template>
    <!-- TODO: sort shit based on category e.g tech -->
    <div class="h-[100vh] flex flex-col gap-2">
        <h1>= bookmarks</h1>
        <div>
            <h2>== unsorted</h2>
            <table class="w-full">
                <thead>
                    <tr>
                        <th>link</th>
                        <th>description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="value in links">
                        <td><a :href="value[0]">{{ value[0] }}</a></td>
                        <td>{{ value[1] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
