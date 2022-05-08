import React, {useState} from 'react';

import Form from 'react-bootstrap/Form'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Gear from 'react-bootstrap-icons/dist/icons/gear-fill';
//function for editing customer details
function EditCustomer(props) {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    })

    const handleOpen = () => {
        setOpen(true);
    
        setCustomer({
            firstname: props.row.data.firstname,
            lastname: props.row.data.lastname,
            streetaddress: props.row.data.streetaddress,
            postcode: props.row.data.postcode,
            city: props.row.data.city,
            email: props.row.data.email,
            phone: props.row.data.phone
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    
    const inputChanged = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    };

    const handleSave = () => {
        console.log(props.row.data)
        props.editCustomer(props.row.data.links[0].href, customer)
        handleClose();
    }

    return (
        <div>
            <Button onClick={handleOpen} style={{ height: '10', width: '60px', paddingTop: '5px', alignItems: 'right', outline: 'none', marginTop: '10px' }}><Gear/></Button>
            <Offcanvas
                show={open}
                onHide={handleClose}
                placement='start'
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Edit a customer </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form open={open} onClose={handleClose}>
                        <Row>
                            <Form.Group as={Col} controlId="formGridFirstName">
                                <Form.Label>First name: </Form.Label>
                                <Form.Control
                                    name="firstname"
                                    as="input"
                                    placeholder="First name"
                                    value={customer.firstname}
                                    onChange={inputChanged}
                                    type="text"
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last name: </Form.Label>
                                <Form.Control
                                    name="lastname"
                                    placeholder="Last name"
                                    defaultValue={customer.lastname}
                                    onChange={inputChanged}
                                    type="text"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="formGridAddress">
                            <Form.Label>Address:</Form.Label>
                            <Form.Control
                                name="streetaddress"
                                placeholder="1234 Main St"
                                defaultValue={customer.streetaddress}
                                onChange={inputChanged}
                                type="text"
                            />
                        </Form.Group>

                        <Row>
                            <Form.Group as={Col} controlId="formGridPostCode">
                                <Form.Label>Postcode:</Form.Label>
                                <Form.Control
                                    name="postcode"
                                    defaultValue={customer.postcode}
                                    onChange={inputChanged}
                                    type="text"
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City:</Form.Label>
                                <Form.Control
                                    name="city"
                                    defaultValue={customer.city}
                                    onChange={inputChanged}
                                    type="text"
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    defaultValue={customer.email}
                                    onChange={inputChanged}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Phone:</Form.Label>
                                <Form.Control
                                    name="phone"
                                    defaultValue={customer.phone}
                                    onChange={inputChanged}
                                    type="text"
                                />
                            </Form.Group>
                        </Row>

                        <Button variant="success" onClick={handleSave} style={{fontWeight: '600', fontSize: '20px', marginTop: '10px', padding: '10px', width: '120px' }}>
                            Save
                        </Button>

                        <Button variant="danger" onClick={handleClose} style={{fontWeight: '600', fontSize: '20px', marginTop: '10px', padding: '10px', width: '120px', marginLeft: '20px' }}>
                            Cancel
                        </Button>

                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default EditCustomer;