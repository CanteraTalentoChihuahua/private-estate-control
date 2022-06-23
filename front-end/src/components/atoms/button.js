import "./button.css";
import { Link } from "react-router-dom";

function Button(handleClick) {
  return (
    <div class="field">
      <button type="submit" className="button" onClick={handleClick}>
        <Link>Login</Link>
      </button>
    </div>
  );
}
export default Button;
