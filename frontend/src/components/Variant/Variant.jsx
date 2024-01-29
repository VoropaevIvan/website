import TaskTextForVariant from "./Variant components/TaskTextForVariant";
import VarMenu from "./Variant components/VarMenu";
import "./Variant.css";

const Variant = () => {
  return (
    <div className="wrapper">
      <div className="variant">
        <div className="varHeader">
          <VarMenu />
        </div>
        <div className="varCentre">
          <div className="varNavigate">1</div>
          <div className="varTask">
            <div className="varTaskText enable">
              <TaskTextForVariant />
            </div>
            <div className="varAnswer">ОТВЕТ</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variant;
