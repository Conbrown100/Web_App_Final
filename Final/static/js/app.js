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

class Avengers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avengers: [],
            isLoaded: false,
            error: null 
        };
    }

    componentDidMount() {
        fetch('/api/avengers/')
        .then(result => result.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    avengers: result
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

    render() {
        if (this.state.error) {
            return <div>Error! Avengers must have gotten snapped by Thanos!</div>
        } else if (!this.state.isLoaded) {
            return <div>Waiting for Avengers to assemble...</div>
        } else {
            return (
                <div className="avengers">
                    <h1>Avengers Assembled!</h1>
                    <ul>
                        {this.state.avengers.map(hero => (
                        <li key={hero}>
                            {hero}
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
            view: 'avengers'
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
        if (this.state.view == 'avengers') {
            component = <Avengers />;
        }
        return (
            <div className="app">
                {component}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#content'));
