export async function getUpdatedAt(github: { user: string, repo: string }) {
    const data = await fetch(`https://api.github.com/repos/${github.user}/${github.repo}/commits/main`);
    const json = await data.json();

    return new Date(json['commit']['committer']['date']);
}