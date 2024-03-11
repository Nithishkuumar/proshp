import React from 'react'
import {  Badge, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import {FaShoppingCart,FaUser } from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../Slices/userSlice'
import { toast } from 'react-toastify'
import { logOut } from '../Slices/authSlice'
import Searchbox from '../screen/Searchbox'

const Header = () => {
  const {cartItems} = useSelector((state)=>state.cart);
  const {userInfo} = useSelector((state)=>state.auth);

  const navigate =useNavigate();
  const dispatch = useDispatch();

  const [logoutcall] = useLogoutMutation();


  const logoutHandler = async()=>{
    try {
      await logoutcall().unwrap();
      dispatch(logOut())
      toast.success("logout successfully")
      navigate("/")

    } catch (error) {
      console.log(error)
      
    }

     
  }

  return (
    <header>
    <Navbar className='header' data-bs-theme="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand >Proshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Searchbox/>
            <LinkContainer to='/cart'>
            <Nav.Link><FaShoppingCart/> Cart
            {
              cartItems.length>0&&(
                <Badge pill bg='success' style={{marginLeft:"5px"}}>
                    {Number(cartItems.reduce((a,c)=>a+c.qty,0))}
                </Badge>
              )
            }</Nav.Link>
            </LinkContainer>
            {userInfo?(
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to="/profile">
                  <NavDropdown.Item >
                     Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  logout
                </NavDropdown.Item>
              </NavDropdown>
            ):(
            <LinkContainer to='/login'>
            <Nav.Link ><FaUser/> SignIn</Nav.Link>
            </LinkContainer>)}

            {userInfo && userInfo.isAdmin?(
              <NavDropdown title="Admin" id = "username">
                <LinkContainer to="/admin/productslist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/userslist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderslist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            ):(
              <Navigate to="/"></Navigate>
            )}
            
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </header>
  )
}

export default Header

