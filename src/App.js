import React from "react";

function RepoList(props) {
  const { repos = [] } = props;

  if (repos.length === 0) return <p>No results</p>;
  return (
    <div>
      <h2>Repos</h2>
      <div>
        {repos.map(x => {
          return (
            <div key={x.id} style={{ margin: 8, border: "1px solid" }}>
              <div>Name: {x.full_name}</div>
              <div>Description: {x.description}</div>
              <div>Stars: {x.stargazers_count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
RepoList.displayName = "RepoList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, loading: false, repos: [], username: "" };
  }
  handleClick = async () => {
    const { username } = this.state;
    this.setState({ loading: true });
    const url = `https://api.github.com/users/${username}/starred`;
    const response = await fetch(url);
    const repos = await response.json();
    this.setState({ repos, loading: false });
  };
  handleChange = e => {
    const { value } = e.target;
    this.setState({ username: value });
  };
  renderRepos = () => {
    const { state } = this;
    const { repos = [] } = state;
    return <RepoList repos={repos} />;
  };
  render() {
    const { state } = this;
    const { loading, error } = state;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
      <div>
        <input
          type="text"
          placeholder="username"
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.handleClick}>
          Fetch GitHub User
        </button>
        {this.renderRepos()}
      </div>
    );
  }
}

export default App;
