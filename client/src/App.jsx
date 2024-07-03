import { useState, useEffect } from 'react';
import {
    Navbar,
    Container,
    Nav,
    Form,
    Row,
    Col,
    Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDoCard from './ToDoCard';
import { supabase } from './supabaseClient';
// import './App.css'

//create ui (navbar, form to add todos, todos card)
//set up supabase, create a table for our todos
// implement crud logic for todos

function App() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([])

    console.log(name);
    console.log(description);

    useEffect(() => {
        getToDos();
    }, []);

    async function getToDos() {
        try {
            const { data, error } = await supabase
                .from('todos')
                .select('*')
                .limit(10);
                if (error) throw error;
                if (data != null){
                  setTodos(data)
                }
        } catch (error) {
            alert(error.message);
        }
    }

    async function createToDo() {
      try {
        const { data, error } = await supabase
          .from('todos')
          .insert({
            name: name,
            description: description
          })
          .single()
          if (error) throw error;
          window.location.reload()
      }
      catch (error) {
        alert(error.message)
      }
    }
console.log(todos)
    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand>
                        Time to Quit Procrastinating - An Awesome To-Do App
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <h3>Create To Do for Supabase Database</h3>
                        <Form.Label>To Do Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Label>To Do Description</Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br></br>
                        <Button onClick={() => createToDo()}>Create To Do in Supabase DB</Button>
                    </Col>
                </Row>
                <hr></hr>
                <h3>Current Todos</h3>
                <Row xs={1} lg={3} className="g-4">
                   {todos.map((todo) => (
                    // eslint-disable-next-line react/jsx-key
                    <Col>
                      <ToDoCard todo={todo} key={todo.id}/>
                    </Col>
                   ))}
                </Row>
            </Container>
        </>
    );
}

export default App;
