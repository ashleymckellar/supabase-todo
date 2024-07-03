/* eslint-disable react/prop-types */
import { Card, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from './supabaseClient';

const ToDoCard = (props) => {
    const todo = props.todo;
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(todo.name);
    const [description, setDescription] = useState(todo.description);
    // console.log(editing)

    async function updateToDo() {
        try {
            const { data, error } = await supabase
                .from('todos')
                .update({
                    name: name,
                    description: description,
                })
                // eslint-disable-next-line react/prop-types
                .eq('id', todo.id);
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    async function deleteToDo() {
        try {
            const { data, error } = await supabase
                .from('todos')
                .delete({
                    name: name,
                    description: description,
                })
                // eslint-disable-next-line react/prop-types
                .eq('id', todo.id);
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                {!editing ? (
                    <>
                        <Card.Title>{todo.name}</Card.Title>
                        <Card.Text>{todo.description}</Card.Text>
                        <Button variant="danger" onClick={() => deleteToDo()}>
                            Delete To Do
                        </Button>
                        <br></br>
                        <br></br>
                        <Button
                            variant="secondary"
                            onClick={() => setEditing(true)}
                        >
                            Edit To Do
                        </Button>
                    </>
                ) : (
                    <>
                        <h4>Editing To Do</h4>
                        <Button size="sm" onClick={() => setEditing(false)}>
                            Go Back
                        </Button>
                        <br></br>
                        <Form.Label>To Do Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            defaultValue={todo.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Label>To Do Description</Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            defaultValue={todo.description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br></br>
                        <Button onClick={() => updateToDo()}>
                            Update To Do in Supabase DB
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default ToDoCard;
