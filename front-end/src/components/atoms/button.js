import './button.css';
import { Link } from 'react-router-dom';

function Button()
{
    return(
        <div class="field">
            <button class="button">
                <Link to="/dashboard">
                    Login
                </Link> 
            </button>
        </div>
    );
}
export default Button;  