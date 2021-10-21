import { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ra, setRa] = useState(0);

  const [newNome, setNewNome] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRa, setNewRa] = useState(0);

  const [listaAlunos, setListaAlunos] = useState([]);

  const addAluno = () => {
    Axios.post("http://localhost:3001/create", {
      nome: nome,
      email: email,
      ra: ra,
    }).then(() => {
      setListaAlunos([
        ...listaAlunos,
        {
          nome: nome,
          email: email,
          ra: ra,
        },
      ]);
    });
  };

  const getAlunos = () => {
    Axios.get("http://localhost:3001/alunos", {}).then((response) => {
      setListaAlunos(response.data);
    });
  };

  const updateAluno = (id) => {
    Axios.put("http://localhost:3001/update", {
      nome: newNome,
      email: newEmail,
      ra: newRa,
      id: id
    }).then((response) => {
      setListaAlunos(listaAlunos.map((val) => {
        return val.id === id ? {id: val.id, nome: newNome, email: newEmail, ra: newRa} : val
      }))
    });
  }

  const deleteAluno = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setListaAlunos(
        listaAlunos.filter((val) => {
          return val.id != id 
      }))
    })
  }

  return (
    <div className="App">
      <header>
        <img src="https://upload.wikimedia.org/wikipedia/pt/thumb/b/b2/UNICAMP_logo.svg/1200px-UNICAMP_logo.svg.png" alt="logo"/>
        <div className="titulo">
          <h1>SI202A - Alunos</h1>
        </div>
      </header>
      <div className="info">
        <label>Nome:</label>
        <input
          type="text"
          onChange={(event) => {
            setNome(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>RA:</label>
        <input
          type="number"
          onChange={(event) => {
            setRa(event.target.value);
          }}
        />

        <button onClick={addAluno}>Adicionar aluno</button>
      </div>
      <div className="showAlunos">
        <button onClick={getAlunos}>Mostrar Alunos</button>
        {listaAlunos.map((val, key) => {
          return (
            <div className="aluno">
              <div className="lista">
                <span>Nome: {val.nome}</span>
                <span>Email: {val.email}</span>
                <span>RA: {val.ra}</span>
              </div>
              {""}
              <div className="update">
                <input
                  type="text"
                  required
                  onChange={(event) => {
                    setNewNome(event.target.value);
                  }}
                />
                <input
                  type="text"
                  required
                  onChange={(event) => {
                    setNewEmail(event.target.value);
                  }}
                />
                <input
                  type="number"
                  required
                  onChange={(event) => {
                    setNewRa(event.target.value);
                  }}
                />
                <button onClick={() => {updateAluno(val.id)}}><span>Atualizar</span></button>
                <button onClick={() => {deleteAluno(val.id)}}><span>Apagar</span></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
