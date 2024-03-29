import React, { useState, useEffect } from 'react';
import Container from './Container';
import { API } from 'aws-amplify';
import { List } from 'antd';
import checkUser from './checkUser';

const Main = () => {
  const [state, setState] = useState({products: [], loading: true});
  const [user, updateUser] = useState({});

  let didCancel = false;
  
  useEffect(() => {
    getProducts();
    checkUser(updateUser);
    return () => didCancel = true;
  }, []);

  const getProducts = async() => {
    const data = await API.get('ecommerceapi', '/products');
    console.log('data: ', data);
    if (didCancel) return;
    setState({
      products: data.data.Items, loading: false
    })
  }

  const deleteItem = async(id) => {
    try {
      const products = state.products.filter(p => p.id !== id);
      //everything except the to be deleted object; opptomistic
      setState({ ...state, products });

      await API.del('ecommerceapi', '/products', { body: { id } }) // id is short for id: id
      console.log('successfully deleted item');
    } 
    catch (err) {
      console.error('error: ', err);
      //future idea: it would make sense to udpate the product from the ui on the backend
    }
  }

  //JSX
  return (
    <Container>
      <List
        itemLayout="horizontal"
        dataSource={state.products}
        loading={state.loading}
        renderItem={item => (
          
          <List.Item
            actions={user.isAuthorized ?
              [<p onClick={() => deleteItem(item.id)}
              key={item.id}>delete</p>] : null}
          >
            
            <List.Item.Meta
              title={item.name}
              description={item.price}
            />
          </List.Item>
        )}
      />
    </Container>
  )
}

export default Main;