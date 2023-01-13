import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Button, Form, FormLabel, InputGroup, Modal,  Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {

  const [data, setData] = useState([]);
  const [RowData, SetRowData] = useState([])

//define here local state that store the form Data
   const [id,setId] = useState("");
   const [name, setName] = useState("")
   const [category, setCategory] = useState("")
   const [description, setDescription] = useState("")
   const [createdBy, setCreatedBy] = useState("")
   const [status, setStatus] = useState("")
   const [date] = useState(new Date());

   
//for view data model
  const [ViewShow, SetViewShow] = useState(false)
  const handleViewShow = () => { SetViewShow(true) }
  const hanldeViewClose = () => { SetViewShow(false) }

//for add new data model
  const [ViewPost, SetPostShow] = useState(false)
  const handlePostShow = () => { SetPostShow(true) }
  const hanldePostClose = () => { SetPostShow(false) }

//For edit data model
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const hanldeEditClose = () => { SetEditShow(false) }

//search filter
  const [search, setSearch] = useState('');

//for delete product
const [Delete,setDelete] = useState(false)

//getting all products 
  const getProductData = async () => {
  const url = 'https://product-fhqo.onrender.com/products ';
    try {
      const datas = await axios.get(url);
      setData(datas.data);
    //   console.log(datas.data);
    } 
    catch (error) {
      console.log(error);
    }
  }

function refreshPage(){ 
    window.location.reload(); 
  }
// console.log(ViewShow, RowData)

//creating new product 

  const handleSubmit = async () => {
    try{
        const url = 'https://product-fhqo.onrender.com/products ';
        const credentials = { 
                            'product_name': name , 
                            'category_name':category,
                            'description':description,
                            'created_by': createdBy,
                            'status':status};
        // const config = { 'Content-Type': 'application/json' };
        const datas = await axios.post(url, credentials);
        setData(datas.data);
        SetPostShow(false);
        refreshPage();
        // console.log(datas.data);
    }
    catch(error){
        alert( "Please fill every filled to submit");
        console.error("Error!!!")
    }
  }

  // edit product 
  const handleEdit = async (e) => {
    try{
    e.preventDefault();
    const url = `https://product-fhqo.onrender.com/products/${id}`;
    const credentials = { 
                        'product_name': name , 
                        'category_name':category,
                        'description':description,
                        'created_by': createdBy,
                        'status':status};
    
    const datas = await axios.put(url, credentials);
        console.log(datas.data);
        setData(datas.data);
        SetEditShow(false);
        refreshPage();
    }
    catch(error) {
         alert( "Please fill every filled to submit");
        console.error("Error!!!")
    }
}

//handle Delete Function 
const handleDelete = async () => {
    try {
    const url = `https://product-fhqo.onrender.com/products/${id}`

    const datas = await axios.delete(url);
    setData(datas.data);
    SetViewShow(false);
    refreshPage();
    }
    catch(error) {
        console.error(error)
    }
}

  useEffect(() => {
    getProductData();
  }, [])
  
  return (
    <div className="App">
      <h1> REACT TABLE CRUD </h1>
      <div className='row'>
            <div className="text-center" >
                    <Button className="btn-primary btn-sm" style={{backgroundColor: "rgba(46,48,146,255)"}} size="md"  onClick={() => { handlePostShow() }} >
                        Add New Product
                    </Button>
            </div>
            <div className='container'> 
                <Table bordered responsive >
                    <thead >
                        <tr>
                            <th> Product Name</th>
                            <th> Category</th>
                            <th> Description</th>
                            <th> Created By</th>
                            <th> Status </th>
                            <th>
                                <Form className='search-field'>
                                <InputGroup className='search'>
                                    <Form.Control
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder='Search products by name or category'
                                    />
                                </InputGroup>
                                </Form> 
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    { data.products && 
                        data.products?.filter((item) => {
                            return search.toLowerCase() === ''
                            ? item
                            : item.product_name.toLowerCase().includes(search) || item.category_name.toLowerCase().includes(search);

                        }).map((item) =>
                            <tr key={item.id}>

                                <td>{item.product_name}</td>
                                <td>{item.category_name}</td>
                                <td>{item.description}</td>
                                <td>{item.created_by}</td>
                                <td>{item.status}</td>
                                
                                <td className='button-groups'>
                                    <Button size='sm' className='but' style={{backgroundColor: "rgba(46,48,146,255)"}} onClick={()=> {handleEditShow(SetRowData(item),setId(item.id))}}> Edit </Button>
                                    <Button size='sm' className='but' style={{backgroundColor: "rgba(46,48,146,255)"}} onClick={() => {handleViewShow(SetRowData(item),setId(item.id), setDelete(true))}}>Delete</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
                
            {/* View Modal */}
            <div className='model-box-view'>
                <Modal centered className='md-3'
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title> Product Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form >
                            <FormLabel className='mt'> Product Name </FormLabel>
                            <InputGroup >
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    value={RowData.id} readOnly
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Product Name </FormLabel>
                            <InputGroup >
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    value={RowData.product_name} readOnly
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Category </FormLabel>
                            <InputGroup>
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    value={RowData.category_name} readOnly
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Description </FormLabel>
                            <InputGroup>
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    value={RowData.description} readOnly
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Created By </FormLabel>
                            <InputGroup >
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    value={RowData.created_by} readOnly
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Stock Status </FormLabel>
                            <InputGroup >
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    value={RowData.status} readOnly
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Created At </FormLabel>
                            <InputGroup >
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    value={RowData.created_at} readOnly
                                />
                            </InputGroup>

                        </Form>    
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Product</Button>
                                )
                            }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

             {/* Modal for submit data to database */} 
             <div className='model-box-view'>
                <Modal centered
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormLabel className='mt'> Product Name </FormLabel>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="Please enter Product Name"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter product name
                                </Form.Control.Feedback>
                            </InputGroup>

                            <FormLabel className='mt-3'> Category </FormLabel>
                            <InputGroup >
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setCategory(e.target.value)} 
                                    placeholder="Please enter Product Name"
                                    required
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Description </FormLabel>
                            <InputGroup>
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)} 
                                    placeholder="Please enter Product Name"
                                    required
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Created By </FormLabel>
                            <InputGroup >
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setCreatedBy(e.target.value)} 
                                    placeholder="Please enter Product Name"
                                    required
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Stock Status </FormLabel>
                            <InputGroup >
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setStatus(e.target.value)} 
                                    placeholder="Please enter Product Name"
                                    required
                                />
                            </InputGroup>

                        </Form> 
                        <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmit}>Add Product</Button>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

             {/* Modal for Edit product record */}
             <div className='model-box-view'>
                <Modal centered
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form>
                            <FormLabel className=''> Product Name </FormLabel>
                            <InputGroup>
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value) } 
                                    placeholder="Please enter Product Name"
                                    defaultValue={RowData.product_name}
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Category </FormLabel>
                            <InputGroup >
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setCategory(e.target.value)} 
                                    placeholder="Please enter Product Name"
                                    defaultValue={RowData.category_name}
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Description </FormLabel>
                            <InputGroup>
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)} 
                                    placeholder="Please enter Product Name"
                                    defaultValue={RowData.description}
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Created By </FormLabel>
                            <InputGroup >
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setCreatedBy(e.target.value)} 
                                    placeholder="Please enter Product Name"
                                    defaultValue={RowData.created_by}
                                />
                            </InputGroup>

                            <FormLabel className='mt-3'> Stock Status </FormLabel>
                            <InputGroup >
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => setStatus(e.target.value)} 
                                    placeholder="Please enter Product Name"
                                    defaultValue={RowData.status}
                                />
                            </InputGroup>

                        </Form> 
                        <Button type='submit' className='btn btn-success mt-4' onClick={handleEdit}>Edit Product</Button>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
                </div>
            </div>
    // </div>
  );
}

export default App;
