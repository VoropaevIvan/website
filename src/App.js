import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Tasks } from "./components/Bank/Tasks";
import NotFound from "./components/Pages/NotFound";
import Home from "./components/Pages/Home";
import MainLayout from "./layouts/MainLayout";
import TinyEditor from "./components/Utils/TinyEditor";
import AddTask from "./components/Pages/AddTask";
import { Test } from "./components/Pages/Test";
import EditTask from "./components/Pages/EditTask";

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
            <Route path="test" element={<Test />}></Route>
            <Route path="edit-task" element={<EditTask />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
