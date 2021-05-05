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
            <div>
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
                    <button id="register-button" onClick={(evt) => {
                        evt.preventDefault();
                        this.sendRegisterRequest();
                    }}>Register</button>
                </form>
                <p>Already have an account? 
                    <a href="#" onClick={(evt) => {
                        evt.preventDefault();
                        this.goToLogin();
                    }}>Login</a>
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
            <div>
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
                    <button id="login-button" onClick={(evt) => {
                        evt.preventDefault();
                        this.sendLoginRequest();
                    }}>Login</button>
                </form>
                <p>Need an account?  
                    <a href="#" onClick={(evt) => {
                            evt.preventDefault();
                            this.goToRegister();
                    }}>Register</a>
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
        setInterval(this.updateHpcs, 30000);
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
        fetch('/api/reserve/', {
            method: 'POST',
            body: formData
        })
        .then(result => result.text())
        .then(
            (result) => {
                if (result == 'ok') { 
                    alert('Hpc reserved.');
                } else {
                    alert('Hpc has already been reserved.');
                }
            },
            (error) => {
                alert('Error. Could not reserve hpc.');
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
                    <ul>
                        {this.state.hpcs.map(hpc => (
                        <li key={hpc.id}>
                            <p>hpc{hpc.id}</p>
                            <p>status: {hpc.status}</p>
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
            component = <Hpcs />;
        }
        return (
            <div className="app">
                {component}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#content'));
