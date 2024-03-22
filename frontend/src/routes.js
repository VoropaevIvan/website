import { Tasks } from "./components/Bank/Tasks";
import AddTask from "./components/Pages/AddTask/AddTask";
import CreateVariant from "./components/Pages/CreateVariant/CreateVariant";
import NotFound from "./components/Pages/NotFound";
import { Test } from "./components/Pages/Test";
import Variants from "./components/Pages/Variants/Variants";
import TinyEditor from "./components/Utils/TinyEditor";
import Variant from "./components/Variant/Variant";
import VariantResults from "./components/Variant/VariantResults";

export const publicRoutes = [
  { path: "bank", Component: Tasks, index: true },
  { path: "editor", Component: TinyEditor },
  { path: "test", Component: Test },
  { path: "variants", Component: Variants },
  { path: "variant/:id", Component: Variant },
  { path: "results", Component: VariantResults },
  { path: "variant/:id", Component: Variant },
  { path: "*", Component: NotFound },
];

export const adminRoutes = [
  { path: "addtask", Component: AddTask },
  { path: "addtask/:id", Component: AddTask },
  { path: "edit-task/:id", Component: AddTask },
  { path: "edit-variant/:id", Component: CreateVariant },
];
