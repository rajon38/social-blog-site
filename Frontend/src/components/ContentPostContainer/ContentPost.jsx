import "./contentpost.css"
import {ErrorToast, IsEmpty} from "../../helper/FormHelper";


import { useState , useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {CreateNewBlog} from "../../APIRequest/blogAPI";

function ContentPost() {
    let titleRef,authorRef,descriptionRef,imageRef,dateRef=useRef();

    const CreateNew = () => {
        let title=titleRef.value;
        let author=authorRef.value;
        let description=descriptionRef.value;
        let image=imageRef.value;
        let date=dateRef.value;
        if(IsEmpty(title)){
            ErrorToast("Title Required")
        }
        else if(IsEmpty(author)){
            ErrorToast("Author Required")
        }
        else if(IsEmpty(description)){
            ErrorToast("Description Required")
        }
        else if(IsEmpty(image)){
            ErrorToast("Image Required")
        }
        else if(IsEmpty(date)){
            ErrorToast("Date Required")
        }
        else {
            CreateNewBlog(title,author,description,date,image).then((res)=>{
                if(res===true){
                    handleClose()
                }
            })
        }
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="success" onClick={handleShow} style={{marginTop:"10px", width: '-moz-available'}}>
                Create A New Blog
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >Create A New Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                ref={(input)=>titleRef=input}
                                type="text"
                                placeholder="Title Here"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                ref={(input)=>authorRef=input}
                                type="text"
                                placeholder="Author Name"

                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control ref={(input)=>descriptionRef=input} as="textarea" rows={3} type="text" placeholder="Write your Description" />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control ref={(input)=>imageRef=input} type="file" />
                        </Form.Group>
                        <Form.Group controlId="formDate" className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control ref={(input)=>dateRef=input} type="date" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={CreateNew}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ContentPost;

