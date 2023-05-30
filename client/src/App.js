import { Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';

import { Header } from './components';
import { AddPost, FullPost, Home, Login,Registration } from './pages';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Registration /> } />
          <Route path='/login' element={<Login />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/add-post' element={<AddPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
