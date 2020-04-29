import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response =>{
      setRepositories(response.data);
    });
  }, [repositories]);

  async function handleAddRepository() {
    const repositorie = {
      title: `New Repositorie ${Date.now()}`,
      url: 'https://github.com/ivensgustavo/SistemaGestaoEspacoOtica',
      techs: ['ReactJS', 'React Native', 'Node.js']
    }

    const response = await api.post('repositories', repositorie);
    
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) =>{
            return (
              <li key = {repositorie.id}>
                {repositorie.title}
                <button onClick={() => handleRemoveRepository(repositorie.id)}>
                  Remover
                </button>
              </li>
            );
          })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
