import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, ButtonActions } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: null,
  };

  //recuperar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  //Salvar os dados no localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = event => {
    this.setState({ newRepo: event.target.value, error: null });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, error: false });

    try {
      const { newRepo, repositories } = this.state;

      if (newRepo === '') throw 'Você precisa indicar um repositório';

      const repoExists = repositories.find(repo => repo.name === newRepo);

      if (repoExists) throw 'Repositório já existe!';

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDelete = repoItem => {
    const storedRepo = JSON.parse(localStorage.getItem('repositories'));
    const repoList = storedRepo.filter(repo => repo.name !== repoItem);

    localStorage.setItem('repositories', JSON.stringify(repoList));

    this.componentDidMount();
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton Loading={loading}>
            {loading ? <FaSpinner size={14} /> : <FaPlus size={14} />}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>

              <ButtonActions>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
                <button
                  type="button"
                  onClick={() => this.handleDelete(repository.name)}
                >
                  remover
                </button>
              </ButtonActions>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
