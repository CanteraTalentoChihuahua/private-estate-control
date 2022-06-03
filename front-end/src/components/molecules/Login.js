//import { Link } from "react-router-dom";
import Button from "../atoms/button";
import './Login.css';

function Login(){
  return(
    <section class="hero is-primary is-fullheight is-link">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-4-widescreen">
          <h1 class="title is-2">Welcome</h1>
            <form action="" class="box">
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" required/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                  <input type="password" placeholder="*******" class="input" required/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="checkbox">
                  <input type="checkbox"/>
                  Remember me
                </label>
              </div>
              <div class="password">
                <label for="" class="checkbox forgotPassword">
                  Forgot Password?
                </label>
              </div>
              <Button/>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default Login;
