import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function AddWorkout(props) {
    const [training, setWorkout] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: ''
    })

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setWorkout({ ...training, customer: props.row.data.links[1].href })
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const inputChanged = (event) => {
        setWorkout({ ...training, [event.target.name]: event.target.value })
    }

    const handleSave = () => {
        props.addWorkout(training, props.row.data.customer)
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleShow} variant="secondary" style={{ height: '10', width: '120px', backgroundColor: 'gray', paddingTop: '5px', alignItems: 'right', outline: 'none', marginTop: '10px' }}>
                Add Workout
            </Button>

            <Modal
                show={show}
                onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Workout</Modal.Title>
                    </Modal.Header>
                <Modal.Body>
                    <Form open={show} onClose={handleClose}>
                        <Row>
                            <Form.Group as={Col} controlId="formGridDate">
                                <Form.Label>Date:</Form.Label>
                                <Form.Control
                                    name="date"
                                    as="input"
                                    placeholder="Date"
                                    value={training.date}
                                    onChange={inputChanged}
                                    type="datetime-local"
                                />
                            </Form.Group>

                            <Form.Group controlId="formGridDuration">
                                <Form.Label>Duration:</Form.Label>
                                <Form.Control
                                    name="duration"
                                    placeholder="min"
                                    defaultValue={training.duration}
                                    onChange={inputChanged}
                                    type="number"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group as={Col} controlId="formGridActivity">
                            <Form.Label>Activity:</Form.Label>
                            <Form.Control
                                name="activity"
                                placeholder="Activity"
                                defaultValue={training.activity}
                                onChange={inputChanged}
                                type="text"
                            />
                        </Form.Group>

                        <Button variant="success" onClick={handleSave} style={{fontWeight: '700', fontSize: '20px', marginTop: '15px', padding: '15px', width: '140px' }}>
                            Save
                        </Button>
                        
                        <Button variant="danger" onClick={handleClose} style={{fontWeight: '700', fontSize: '20px', marginTop: '15px', padding: '15px', width: '140px', marginLeft: '20px' }}>
                            Cancel
                        </Button>
                        {'  '}

                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddWorkout