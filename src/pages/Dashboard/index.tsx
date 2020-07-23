import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight as Icon } from 'react-icons/fi';

import { Title, Form, Repositories, Error } from './styles';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';


interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {

  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@Github Explorer:repositories');

    if(storagedRepositories) {
      return JSON.parse(storagedRepositories);
    } else {
      return [];
    }
  });

  useEffect(()=> {
    localStorage.setItem('@Github Explorer:repositories', JSON.stringify(repositories));
  }, [repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {

    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`/repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);

      /**
       * isso funciona para limpar o formulário porque o value do input é o próprio estado do
       * novo repositório (newRepo)
       * Deve-se isso especialmente pela propriedade de two-way data-bind do react
       */
      setNewRepo('');
      setInputError('');
    } catch ( err ) {
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>

      <img src={logoImg} alt="Github Explorer" />

      <Title>Explore repositórios no Github</Title>

      <Form
        hasError={!!inputError}
        onSubmit={e => handleAddRepository(e)}
      >
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          type="text"
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      { inputError && <Error>{inputError}</Error> }

      <Repositories>
        {repositories.map(repository => (
          <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <Icon size={20} />
          </Link>
        ))}
      </Repositories>

    </>
  );
}

export default Dashboard;
