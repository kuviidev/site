<template>
    <div class="flex flex-col gap-2">
        <h1>= tech</h1>
        <p>computers are a main part of my life. i've been messing around with them since around age 3 and have larped as a programmer since age 7. obviously at that age i had 0 clues about how to write actual code, but the whole thing seemed so cool to me that i started dreaming of becoming a computer wizard.</p>
        <!--
        <p>computers are amazing. it's really an almost unlimited virtual canvas where you're free to do anything you want.</p>
        -->

        <h2>== programming</h2>
        <p>it's probably not even that i love programming itself. it's just that it's the most versatile tool for making stuff, which i love.</p>
        <p>i'm self-taught btw, been doing it since early 2020 ^-^</p>

        <h3>=== languages</h3>
        <div></div>
        <table>
            <thead>
                <tr>
                    <th>lang</th>
                    <th>my personal connection to it</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>typescript</td>
                    <td>probably my favorite language. it's stupid but comfy.</td>
                </tr>
                <tr>
                    <td>rust</td>
                    <td>my go-to language for native stuff. i love the ecosystem & tooling.</td>
                </tr>
                <tr>
                    <td>java</td>
                    <td>first language i've ever used. eh.</td>
                </tr>
                <tr>
                    <td>c#</td>
                    <td>had to use it for about 3 years in school. it's interesting but i never had the urge to use it outside school.</td>
                </tr>
                <tr>
                    <td>c</td>
                    <td>had to use it in uni. juicy, tickles my autism.</td>
                </tr>
                <tr>
                    <td>python</td>
                    <td>i don't like it.</td>
                </tr>
                <tr>
                    <td>ruby</td>
                    <td>chocy wants me to learn it but hoenstly i've never used it :p</td>
                </tr>
            </tbody>
        </table>
        <!-- prolly should be a blog post
        <p>our very first family computer was a random store-bought dual-core "beast" with windows 7 on it. it was not super high-end and i had to share it with everyone in the family. it was enough for playing flash games though!</p>
        <p>my first ever computer that i owned was </p>
        -->

        <h2>== hardware and sysadmin stuff</h2>
        <p>tbh i'm more of a software guy. the only reason i made this category in the first place is because i wanted to flex my thinkpad collection :3</p>

        <h3>=== thinkpad collection</h3>
        <img src="/assets/thinkpads.jpg" alt="">
        <p>took this pic in july of 2025, since then my collection has expanded by another 701c, so now i have 2 :3</p>

        <h3>=== the "sysadmin stuff"</h3>
        <p>obviously i have basic knowledge about docker and kubernetes and vpns and other dumb shit.. i selfhost, so it's kinda mandatory :p</p>
    </div>
</template>

<style lang="scss" scoped>
    table {
        @apply border-gray border-2 border-solid border-spacing-sm;

        thead {
            @apply bg-zinc-700 text-zinc-400;
        }
    }
</style>
