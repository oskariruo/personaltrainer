import React, {useState} from 'react';
import { Button, Row, Col, Form, Offcanvas} from 'react-bootstrap';
import Plus from 'react-bootstrap-icons/dist/icons/plus-lg';



const AddCustomer = (props) => {
    
    const [open, setOpen] = useState(false);
   
    const [customer, SetCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false);
    }

    const inputChanged = (e) => {
        SetCustomer({ ...customer, [e.target.name]: e.target.value})
    };

    return (
        <div>
            <Button variant="info" style={{ marginTop: 20, marginLeft:"20px", padding:"15px" }} onClick={handleClickOpen}>Add <Plus/></Button>

            <Offcanvas show={open} onHide={handleClose} placement='start'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Add Customer</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form open={open} onClose={handleClose}>
                            <Form.Group controlId="formFirstName">
                                <Form.Label >First name</Form.Label>
                                <Form.Control autoFocus
                                    name="firstname"
                                    value={customer.firstname}
                                    onChange={inputChanged}
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group controlId="formLastName">
                                <Form.Label >Last name</Form.Label>
                                <Form.Control
                                    name="lastname"
                                    type="text"
                                    value={customer.lastname}
                                    onChange={inputChanged}
                                />
                            </Form.Group>
                            <Form.Group controlId="formAddress">
                                <Form.Label >Address</Form.Label>
                                <Form.Control
                                    name="streetaddress"
                                    type="text"
                                    value={customer.streetaddress}
                                    onChange={inputChanged}
                                />
                            </Form.Group>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formPostCode">
                                    <Form.Label >Post Code</Form.Label>
                                    <Form.Control
                                        name="postcode"
                                        type="text"
                                        value={customer.postcode}
                                        onChange={inputChanged}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        name="city"
                                        type="text"
                                        value={customer.city}
                                        onChange={inputChanged}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="text"
                                        value={customer.email}
                                        onChange={inputChanged}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formPhone">
                                    <Form.Label >Phone</Form.Label>
                                    <Form.Control
                                        name="phone"
                                        type="text"
                                        value={customer.phone}
                                        onChange={inputChanged}
                                    />
                                </Form.Group>
                            </Row>
                            <Button type="submit" variant="success"style={{fontWeight: '700', fontSize: '18px', marginTop: '10px', padding: '15px', borderRadius: '5px', width: '140px' }} onClick={handleSave}>
                                Submit
                            </Button>
                            <Button variant="danger" style={{fontWeight: '700', fontSize: '18px', marginTop: '10px', padding: '15px', borderRadius: '5px', width: '140px', marginLeft: '20px' }} onClick={handleClose}>Cancel</Button>
                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        
    )
}

export default AddCustomer;