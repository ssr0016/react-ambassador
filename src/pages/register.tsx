import React, {Component, SyntheticEvent} from 'react';

class Register extends Component {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  passwordConfirm = '';

  submit = (e: SyntheticEvent) => {
    e.preventDefault();

    

  }


  render() {
    return (
        <main className="form-signin w-100 m-auto">
          <form onSubmit={this.submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <div className="form-floating">
              <input  className="form-control"  placeholder="Full Name"
                onChange={e => this.firstName = e.target.value}
              />
              <label>First Name</label>
            </div>

            <div className="form-floating">
              <input  className="form-control"  placeholder="Last Name"
                onChange={e => this.lastName = e.target.value}
              />
              <label>Last Name</label>
            </div>

            <div className="form-floating">
              <input type="email" className="form-control"  placeholder="name@example.com"
                   onChange={e => this.email = e.target.value}
              />
              <label>Email address</label>
            </div>

            <div className="form-floating">
              <input type="password" className="form-control" placeholder="Password"
                   onChange={e => this.password = e.target.value}
              />
              <label>Password</label>
            </div>

            <div className="form-floating">
              <input type="password" className="form-control" placeholder="Password Confirm"
                    onChange={e => this.passwordConfirm = e.target.value}
              />
              <label>Password Confirm</label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
          </form>
        </main>
    );
  }
}

export default Register;