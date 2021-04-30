class Register extends React.Component {


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

    render() {
        return (
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
        );
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
            view: 'users'
        });
    }

    render() {
        let component = <Login onLogin={ () => this.onLogin() } />;
        if (this.state.view == 'users') {
            component = <Avengers />;
        }

        return (
            <div className="app">
                {component}
            </div>
        );
    }
}


ReactDOM.render(<Login_App />, document.getElementByID('login'));
