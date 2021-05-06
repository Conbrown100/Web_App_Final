class Register extends React.Component {
    sendRegisterRequest() {
        let formData = new FormData(document.getElementById('register-form'));
        fetch('/api/register/', {
            method: 'POST',
            body: formData
        })
        .then(result => result.text())
        .then(
            (result) => {
                if (result == 'ok') {
                    this.props.loginView();
                } else {
                    alert('Username is already taken.');
                }
            },
            (error) => {
                alert('General register error');
            }
        );
    }

    goToLogin(){
      this.props.loginView();
    }

    render() {
        return (
            <div className="form-container"> 
                <h2>Register</h2>
                <form id="register-form">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username" />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password" />
                    <br />
                    <button id="register-button"
                            className="btn btn-primary"
                            onClick={(evt) => {
                                evt.preventDefault();
                                this.sendRegisterRequest();
                            }}>
                            Register
                    </button>
                </form>
                <p>Already have an account? 
                    <a href="#" 
                        onClick={(evt) => {
                           evt.preventDefault();
                           this.goToLogin();
                        }}>
                        Login
                    </a>
                </p>
            </div>

        );
    }
}

class Login extends React.Component {
    sendLoginRequest() {
        let formData = new FormData(document.getElementById('login-form'));
        fetch('/api/login/', {
            method: 'POST',
            body: formData
        })
        .then(result => result.text())
        .then(
            (result) => {
                if (result == 'ok') {
                    this.props.onLogin();
                } else {
                    alert('Bad username/password combo.');
                }
            },
            (error) => {
                alert('General login error');
            }
        );
    }

    goToRegister(){
        this.props.registerView();
    }

    render() {
        return (
            <div className="form-container">
                <h2>Login</h2>
                <form id="login-form">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username" />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password" />
                    <br />
                    <button id="login-button" 
                            className="btn btn-primary" 
                            onClick={(evt) => {
                                evt.preventDefault();
                                this.sendLoginRequest();
                            }}>
                            Login
                    </button>
                </form>
                <p>Need an account?  
                    <a href="#" 
                       onClick={(evt) => {
                           evt.preventDefault();
                           this.goToRegister();
                       }}>
                       Register
                    </a>
                </p>
            </div>
        );
    }
}

class Hpcs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hpcs: [],
            isLoaded: false,
            error: null 
        };
        this.updateHpcs = this.updateHpcs.bind(this);
        this.intervalId = 0;
    }

    componentDidMount() {
        fetch('/api/hpcs/')
        .then(result => result.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    hpcs: result
                });                
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            }
        );
        this.intervalId = setInterval(this.updateHpcs, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    logout(){
        fetch('/api/logout/')
        .then(result => result.text())
        .then(
            (result) => {
                this.props.loginView();
            },
            (error) => { 
                this.props.loginView();
            }
        );
    }


    updateHpcs(){
        console.log("update");
        fetch('/api/hpcs/')
        .then(result => result.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    hpcs: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            }
        );
    }

    reserveHpc(id, length){
        const formData = new FormData();
        formData.append("id", id);
        formData.append("length", length);
        fetch('/api/hpc/reserve/', {
            method: 'POST',
            body: formData
        })
        .then(result => result.text())
        .then(
            (result) => {
                if (result == 'ok') { 
                    alert('Hpc reserved.');
                    this.updateHpcs();
                } else {
                    alert('Hpc has already been reserved.');
                    this.updateHpcs(); 
                }
            },
            (error) => {
                alert('Error. Could not reserve hpc.');
            }
        );

    }

    cancelReservation(id){
        const formData = new FormData();
        formData.append("id", id);
        fetch('/api/hpc/cancel/', {
            method: 'POST',
            body: formData
        })
        .then(result => result.text())
        .then(
            (result) => {
                if (result == 'ok') {
                    alert('Reservation cancelled.');
                    this.updateHpcs(); 
                } else {
                    alert('Not yours to cancel.');
                    this.updateHpcs(); 
                }
            },
            (error) => {
                alert('Error. Could not cancel reservation.');
            }
        );

    }

    render() {
        if (this.state.error) {
            return <div>Error! Could not fetch data on hpcs!</div>
        } else if (!this.state.isLoaded) {
            return <div>Waiting for page to load...</div>
        } else {
            return (
                <div className="hpcs">
                    <h1>Status of hpcs</h1>
                    <ul id="hpc-list">
                        <button type="button"
                                className="btn-logout btn btn-success"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    this.logout();
                                }}
                                >Logout
                        </button>

                        {this.state.hpcs.map(hpc => (
                        <li key={hpc.id} className="hpc-container">
                            <h3>hpc{hpc.id}</h3>
                            <h5>status: {hpc.status}</h5>
                            <h5>owner: {hpc.owner}</h5>
                            <div className="dropdown">
                                <button 
                                    className="btn btn-primary dropdown-toggle" 
                                    type="button" 
                                    data-toggle="dropdown">
                                    Reserve
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item"
                                           onClick={(evt) => {
                                               evt.preventDefault();
                                               this.reserveHpc(hpc.id, 2);
                                           }}
                                           href="#">2 hrs</a>
                                    </li>
                                    <li><a className="dropdown-item" 
                                           onClick={(evt) => {
                                               evt.preventDefault();
                                               this.reserveHpc(hpc.id, 4);
                                           }}
                                           href="#">4 hrs</a>
                                    </li>
                                    <li><a className="dropdown-item"
                                           onClick={(evt) => {
                                               evt.preventDefault();
                                               this.reserveHpc(hpc.id, 12);
                                           }}

                                           href="#">
                                           12 hrs</a>
                                    </li>
                                    <li><a className="dropdown-item" 
                                           onClick={(evt) => {
                                               evt.preventDefault();
                                               this.reserveHpc(hpc.id, 24);
                                           }}
                                           href="#">
                                           24 hrs</a>
                                    </li>
                                </ul>
                            </div>
                            <button type="button"
                                    className="cancel-res btn btn-secondary" 
                                    onClick={(evt) => {
                                      evt.preventDefault();
                                      this.cancelReservation(hpc.id);
                                    }}
                                    >Cancel Reservation
                            </button>
                        </li>
                        ))}
                    </ul>
                </div>
            );
        }

    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'login'
        };
    }

    onLogin() {
        this.setState({
            view: 'hpcs'
        });
    }

    registerView() {
        this.setState({
            view: 'register'
        });
    }

    loginView() {
        this.setState({
            view: 'login'
        });
    }

    render() {
        let component = <Login onLogin={ () => this.onLogin() }
                               registerView={ () => this.registerView() } />;
        if (this.state.view == 'register') {
            component = <Register loginView={ () => this.loginView() } />;
        }
        if (this.state.view == 'hpcs') {
            component = <Hpcs loginView={ () => this.loginView() } />;
        }
        return (
            <div className="app">
                {component}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#content'));
