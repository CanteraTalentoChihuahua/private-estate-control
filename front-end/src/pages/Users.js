import { Link } from "react-router-dom";



function Users(){
  return(
    <section class="hero is-primary is-fullheight is-link">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-4-widescreen">
          <h1 class="title is-2">New User</h1>
            <table class="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Active</th>
                    </tr>
                </thead>
            </table> 
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default Users;