import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setResults([]);
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/search?q=${encodeURIComponent(query)}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Aconteceu um erro: ", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Lucas Bitencourt</h1>
      <h3>Atak Sistemas - Teste para desenvolvimento</h3>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Pesquisar</button>
      </form>
      {loading && <h2>Carregando...</h2>}
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <h3>{result.title}</h3>
            <a href={result.link} target="_blank" rel="noreferrer">{`[${result.link}]`}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
