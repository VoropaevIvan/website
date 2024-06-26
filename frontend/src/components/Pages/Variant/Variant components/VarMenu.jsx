import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./VarMenu.css";
import { textConfirmFinishVariant } from "../../constants";

function VarMenu({ saveVariantOnServer }) {
  const location = useLocation();
  const navigate = useNavigate();

  const varName = location.pathname.split("/").reverse()[0];
  return (
    <>
      <NavLink to="/" end>
        На главную
      </NavLink>
      <p
        className="finishvar"
        onClick={async () => {
          const isConfirmFinish = window.confirm(textConfirmFinishVariant);
          if (isConfirmFinish) {
            // Save on server or redux
            await saveVariantOnServer();
          }

          navigate("/results/" + varName, { relative: "path" });
        }}
      >
        Завершить вариант
      </p>
    </>
  );
}

export default VarMenu;
