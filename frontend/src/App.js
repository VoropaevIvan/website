import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Tasks } from "./components/Bank/Tasks";
import NotFound from "./components/Pages/NotFound";
import Home from "./components/Pages/Home";
import MainLayout from "./layouts/MainLayout";
import TinyEditor from "./components/Utils/TinyEditor";
import AddTask from "./components/Pages/AddTask/AddTask";
import { Test } from "./components/Pages/Test";
import Variant from "./components/Variant/Variant";
import VariantResults from "./components/Variant/VariantResults";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index={true} element={<Home />}></Route>
            <Route path="bank" element={<Tasks />}></Route>
            <Route path="editor" element={<TinyEditor />}></Route>
            <Route path="addtask" element={<AddTask />}></Route>
            <Route path="addtask/:id" element={<AddTask />}></Route>
            <Route path="test" element={<Test />}></Route>
            <Route path="edit-task/:id" element={<AddTask />}></Route>
            <Route path="variant" element={<Variant />}></Route>
            <Route path="results" element={<VariantResults />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
