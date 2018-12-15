import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import Loading from './Loading'

function SelectLanguage({ onClick, selectedLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      { languages.map((lang) => {
        return (
          <li
            key={lang}
            onClick={() => onClick(lang)}
            style={lang === selectedLanguage ? { color: '#d0021b'} : null }>
              {lang}
          </li>
        )
      }
      )}
    </ul>
  )
}

function RepoGrid ({ repos }) {
  return (
    <ul className='popular-list'>
      {repos.map((repo, index) => {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img className='avatar' src={repo.owner.avatar_url} alt={'Avatar for ' + repo.owner.login}/>
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>
                {repo.stargazers_count} stars
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
}

class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: null
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage = (lang) => {
    this.setState(() => ({
        selectedLanguage: lang,
        repos: null,
      })
    )

    fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(() => ({ repos }))
      })
  }

  render() {
    const { selectedLanguage, repos } = this.state
    return (
      <div>
      <SelectLanguage
        onClick={this.updateLanguage}
        selectedLanguage={selectedLanguage}
      />
      {!repos
          ? <Loading/>
        : <RepoGrid repos={repos} />
      }
      </div>
    )
  }
}

export default Popular
