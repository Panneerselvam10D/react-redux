
import Col from 'react-bootstrap/esm/Col';
import './App.css';
import AddTask from './Components/AddTask';
import NavBar from './Components/NavBar';
import Container from 'react-bootstrap/Container';
import Row from'react-bootstrap/Row';
import TableList from './Components/TableList';

function App() {
  return (
    <div>
        <Container>
        <NavBar />
        <Row className='justify-content-md-center'>
          <Col lg="6">
          <AddTask />
          <TableList />
          </Col>
          </Row>
        </Container> 
    </div>
  );
}

export default App;
