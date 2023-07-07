import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setResults([]);
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/search?q=${encodeURIComponent(query)}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Aconteceu um erro: ", error);
      setError(true);
      setTimeout(() => {
        setError(false);
      } , 2000);
    }
    setLoading(false);
  };

  return (
    <Container>
      <div className="title">
        <h1>Lucas Bitencourt</h1>
        <h3>Atak Sistemas - Teste para desenvolvimento</h3>
      </div>
      <Form onSubmit={handleSearch}>
        <Form.Group className="mb-3">
          <Form.Label>Digite abaixo sua busca:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite sua busca"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button className="search" variant="success" type="submit">
            Pesquisar
          </Button>
          <Button
            variant="danger"
            type="reset"
            onClick={() => (setQuery(""), setResults([]))}
          >
            Limpar
          </Button>
        </Form.Group>
      </Form>
      {loading && <h2>Carregando...</h2>}
      {error && <h2>Erro ao carregar os dados</h2>}
      <div>
        {results.map((result, index) => (
          <Card style={{ margin: "1% 0" }} key={index}>
            <Card.Body>
              <Card.Text>{result.title}</Card.Text>
              <Card.Link
                href={result.link}
                target="_blank"
                rel="noreferrer"
              >{`[${result.link}]`}</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default App;
