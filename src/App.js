import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TareasTable from './TareasTable';
import CreateTable from './CreateTable';
import EditTable from './EditTable';
import ViewDetails from './ViewDetails';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TareasTable/>}></Route>
      <Route path="/Tareas/create" element={<CreateTable/>}></Route>
      <Route path="/Tareas/edit/:id" element={<EditTable/>}></Route>
      <Route path="/Tareas/:id" element={<ViewDetails/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
