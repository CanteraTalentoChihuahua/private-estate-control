import { Link } from "react-router-dom";

function NewUser(){
  return(
    <section class="hero is-primary is-fullheight is-link">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-4-widescreen">
          <h1 class="title is-2">New User</h1>
            <form action="" class="box">
            <div class="field">
                <label for="" class="label">Name</label>
                <div class="control has-icons-left">
                  <input type="text" placeholder="Bob" class="input" required/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Lastname</label>
                <div class="control has-icons-left">
                  <input type="text" placeholder="Smith" class="input" required/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Phone number</label>
                <div class="control has-icons-left">
                  <input type="text" placeholder="6141234567" class="input" required/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-mobile"></i>
                  </span>
                </div>
              </div>
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
                  <Link class="button is-success" to="/login">
                  New user
                  </Link>                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default NewUser;