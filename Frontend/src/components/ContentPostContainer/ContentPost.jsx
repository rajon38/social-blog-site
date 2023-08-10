




// const ContentPost = () => {
//     const userDetails = useSelector((state)=>state.user);
//   let user = userDetails?.user;
//   console.log(user);
//   let id = user?.other?._id;
//   const [file , setFile] = useState(null);
//   const [file2 , setFile2] = useState(null);
//   const [title , setTile] = useState('');
//   const [imagePre , setImagePre] = useState(null);
//   const [VideoPre , setVideoPre] = useState(null);
//   const accessToken = user.accessToken;
//   console.log(file?.name)

//   const handlePost = (e)=>{
//     e.preventDefault();
//     if(file !== null){
//     const fileName = new Date().getTime() + file?.name;
//     const storage = getStorage(app);
//     const StorageRef = ref(storage , fileName);
    
//     const uploadTask = uploadBytesResumable(StorageRef, file);
//     uploadTask.on('state_changed', 
//   (snapshot) => {
//     // Observe state change events such as progress, pause, and resume
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // Handle unsuccessful uploads
//   }, 
//   () => {
//     // Handle successful uploads on complete
//     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       fetch(`http://139.144.12.15:80/api/post/user/post` , {method:"POST" , headers:{'Content-Type':"application/JSON", token : accessToken} , body:JSON.stringify({title:title , image:downloadURL , video:''})}).then((data)=>{
//         alert("Your Post was upload successfully");
//         window.location.reload(true)
//       })
//     });
//   }
// );}else if(file2 !== null){
//     const fileName = new Date().getTime() + file2?.name;
//     const storage = getStorage(app);
//     const StorageRef = ref(storage , fileName);
    
//     const uploadTask = uploadBytesResumable(StorageRef, file2);
//     uploadTask.on('state_changed', 
//   (snapshot) => {
//     // Observe state change events such as progress, pause, and resume
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // Handle unsuccessful uploads
//   }, 
//   () => {
//     // Handle successful uploads on complete
//     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       fetch(`http://139.144.12.15:80/api/post/user/post` , {method:"POST" , headers:{'Content-Type':"application/JSON", token : accessToken} , body:JSON.stringify({title:title , video:downloadURL , image:''})}).then((data)=>{
//         alert("Your Post was upload successfully");
//         window.location.reload(true)
//       })
//     });
//   }
// );
// }else{
//   fetch(`http://139.144.12.15:80/api/post/user/post` , {method:"POST" , headers:{'Content-Type':"application/JSON", token : accessToken} , body:JSON.stringify({title:title , video:'' , image:''})}).then((data)=>{
//     alert("Your Post was upload successfully");
//     window.location.reload(true)
//   })
// }


//   }


//     return (
//         <div>
//       <div className='ContentUploadContainer'>
//         <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
//           <img src={`${user?.other?.profile}`} className="profileimage" alt="" />
//           <input type="text" className='contentWritingpart' placeholder='Write your real thought.....' onChange={(e)=>setTile(e.target.value)} />
//         </div>
//         <div style={{marginLeft: '10px' }}>
//           {imagePre !== null ? <img src={imagePre} style={{width:"410px" , height:'250px' , objectFit:"cover" , borderRadius:'10px'}} alt="" /> : VideoPre !== null ? <video className="PostImages" width="500" height="500" controls >
//            <source src={VideoPre} type="video/mp4"/>
//           </video> : ''
//           }
//           <div style={{display:'flex' , justifyContent:'space-between'}}>
//           <div>
//             <label htmlFor='file'>
//               <img src={`${imageIcon}`} className="icons" alt="" />
//               <input type="file" name="file" id="file" style={{display:"none"}} onChange={(e)=>[setFile(e.target.files[0]) , setImagePre(URL.createObjectURL(e.target.files[0]))]} />
//             </label>
//             <img src={`${emojiIcon}`} className="icons" alt="" />
//             <label htmlFor='file2'>
//               <img src={`${VideoIcon}`} className="icons" alt="" />
//               <input type="file" name="file2" id="file2" style={{display:"none"}} onChange={(e)=>[setFile2(e.target.files[0]) , setVideoPre(URL.createObjectURL(e.target.files[0]))]} />
//             </label>
//           </div>         
//             <button style={{height:"30px" ,marginRight:"12px",marginTop:"40px", paddingLeft:"20px" , paddingRight:"20px" , paddingTop:6 , paddingBottom:6 , border:"none" , backgroundColor:"black" , color:"white" , borderRadius:"5px" , cursor:"pointer"}} onClick={handlePost}>Post</button>
//           </div>
//         </div>
//       </div>

      
//     </div>
//     );
// };

// export default ContentPost;

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


