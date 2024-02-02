import LeftMenu from "./Variant components/LeftMenu";
import TaskTextForVariant from "./Variant components/TaskTextForVariant";
import VarMenu from "./Variant components/VarMenu";
import "./Variant.css";

const Variant = () => {
  return (
    <div className="container">
      <div className="varHeader">
        <VarMenu />
      </div>
      <div className="varNavigate">
        <LeftMenu />
      </div>
      <div className="varTask">
        <div className="varTaskText enable">
          <TaskTextForVariant />
        </div>
      </div>
      <div className="varAnswer">ОТВЕТ</div>
    </div>
  );
};

export default Variant;
