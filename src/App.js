import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Button, Form, InputGroup, Modal, ModalTitle,  Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 



function App() {


  const [data, setData] = useState([]);
  const [RowData, SetRowData] = useState([])

//define here local state that store the form Data
   const [id,setId] = useState("");
   const [name, setName] = useState("")
   const [category, setCategory] = useState("")
   const [description, setDescription] = useState("")
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

//search filter
  const [search, setSearch] = useState('');

//getting all products 
  const getProductData = async () => {
  const url = 'https://product-fhqo.onrender.com/products ';
    try {
      const datas = await axios.get(url);
      setData(datas.data.products);
      console.log(datas.data.products);
    } 
    catch (error) {
      console.log(error);
    }
  }

// console.log(ViewShow, RowData)

//creating new product 
  const handleSubmit = (e) => {
    try{
        e.preventDefault();

        const url = 'https://product-fhqo.onrender.com/products ';
        const credentials = { 
                            'product_name':name , 
                            'category_name': category, 'description':description,
                            'status':status,};
        
        const headers = { 'Content-Type': 'application/json' };
        axios.post(url, credentials,headers).then((response) => {
        console.log(response.status);
        console.log(response.data);
        });
    }catch(error){
        console.log(error);
    }
    
  }


  useEffect(() => {
    getProductData();
  }, [])
  
  return (
    <div className="App">
      <h1> REACT TABLE CRUD </h1>
      <div className='row'>
                <div className='container'>
                    <Form>
                    <InputGroup className='my-3'>

                        {/* onChange for search */}
                        <Form.Control
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search products by name and category'
                        />
                    </InputGroup>
                    </Form>
                    <Table striped bordered responsive>
                            <thead >
                                <tr>
                                    <th> Product ID </th>
                                    <th> Product Name</th>
                                    <th> Category</th>
                                    <th> Description</th>
                                    <th> Status </th>
                                    <th> Date </th>
                                </tr>
                            </thead>
                            {/* </Table>
                            <Table bordered > */}
                            <tbody>
                            {data
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                    ? item
                                    : item.product_name.toLowerCase().includes(search) || item.category_name.toLowerCase().includes(search);
                                }).map((item) =>
                                    <tr key={item.id}>
                                        <td> {item.id} </td>
                                        <td>{item.product_name}</td>
                                        <td>{item.category_name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.status}</td>
                                        <td>{String(item.created_at).substr(0 ,10)}</td>
                                        <td>
                                            <Button size='sm' style={{backgroundColor: "rgba(46,48,146,255)"}} onClick={() => { handleViewShow(SetRowData(item)) }}>View</Button>|
                                            <Button size='sm' style={{backgroundColor: "rgba(46,48,146,255)"}} >Edit</Button>|
                                            <Button size='sm' style={{backgroundColor: "rgba(46,48,146,255)"}}>Delete</Button>|
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                
                        <div className="text-center" >
                            <Button className="btn btn-primary btn-lg" style={{backgroundColor: "rgba(46,48,146,255)"}} size="md" onClick={() => { handlePostShow() }} >
                                <i className='fa fa-plu'></i>
                                Add New Product
                            </Button>
                        </div>
                </div>
                
            {/* View Modal */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                    style={{marginLeft: "200px"}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View Product Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                          <div className='form-group mt-3'>
                            Product ID: 
                                <input type="text" className='form-control' value={RowData.id} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.product_name} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.category_name} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.description} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.status} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.created_at} readOnly />
                            </div>
                            
                            {
                                // Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' >Delete Product</Button>
                                // )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

             {/* Modal for submit data to database */}
             <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                    style={{marginLeft: "200px"}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} placeholder="Please enter Product Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setCategory(e.target.value)} placeholder="Please enter Category" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setDescription(e.target.value)} placeholder="Please enter Description" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setStatus(e.target.value)} placeholder="Please enter product status" />
                            </div>
                            
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmit}>Add Product</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
    </div>
  );
}

export default App;
