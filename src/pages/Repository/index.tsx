import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft as Icon } from 'react-icons/fi'

import { Header, RepositoryInfo } from './styles';
import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {

  const { params } = useRouteMatch<RepositoryParams>();

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/dashboard">
          <Icon size={16} />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img src="https://avatars0.githubusercontent.com/u/55443604?s=460&v=4" alt="Gabriel"/>
          <div>
            <strong>gabrielSilvaN/buscaCEP</strong>
            <p>Descrição</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1808</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>48</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>67</strong>
            <span>Issues</span>
          </li>
        </ul>
      </RepositoryInfo>
    </>
  )
}

export default Repository;
