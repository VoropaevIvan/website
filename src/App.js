import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Tasks } from "./components/Tasks";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import MainLayout from "./layouts/MainLayout";
import Editor from "./components/Editor";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index={true} element={<Home />}></Route>
            <Route path="bank" element={<Tasks />}></Route>
            <Route path="editor" element={<Editor />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
