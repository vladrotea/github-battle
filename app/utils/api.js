import axios from 'axios'

async function getProfile (username) {
  const profile = await axios.get(`https://api.github.com/users/${username}`)

  return profile.data
}

function getRepos (username) {
    return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
}

function getStarCount (repos) {
    return repos.data.reduce((count, repo) => (
        count + repo.stargazers_count), 0)
}

function calculateScore({ followers }, repos) {
  return (followers * 3) + getStarCount(repos)
}

function handleError(error) {
  console.warn(error)
  return null;
}

async function getUserData(player) {
  const [ profile, repos ] = await Promise.all([
    getProfile(player),
    getRepos(player),
  ])
  return {
    profile,
    score: calculateScore(profile, repos),
  }
}

function sortPlayers (players) {
    return players.sort((a,b) => b.score - a.score)
}

export async function battle(players) {
  const results = await Promise.all(players.map(getUserData))
    .catch(handleError)
  return results === null
    ? results
    : sortPlayers(results)
}
export async function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  const repos = await axios.get(encodedURI)
    .catch(handleError)

  return repos.data.items
}
