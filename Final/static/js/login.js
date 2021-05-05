class Login extends React.Component {
	sendLoginRequest() {
		let formData = new FormData(document.getElementById('login-form'));
		fetch('/api/login', {
			method: 'POST',
			body: formData
		})
		.then(result => result.text())
		.then(
			(result) =>{
				if (result == 'ok'){
					this.props.onLogin();
				} else {
					alert('Incorrect username/password.');
				}
			},
			(error) => {
				alert('General login error');
			};
		);
	}

	sendToRegister(){
		this.props.onRegister();
		});

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
				<button id="register-button" onClick={(evt) => {
					evt.preventDefault();
<<<<<<< HEAD
					this.sendToRegister();
=======
					console.log("register was clicked");
>>>>>>> 7484a862475f097b2a7d84d91204087eed88cf33
				}}>Register</button>
			</form>
		);
	}
}

class Register extends React.Component {
	sendRegisterRequest() {
		let formData = new FormData(document.getElementById('register-form'));
		fetch('/api/register', {
			method: 'POST',
			body: formData
		})
		.then(result => result.text())
		.then(
			(result) =>{
				if (result == 'ok') {
					this.props.onLogin();
				} else {
					alert('Username already exists.');
				}
			},
			(error) => {
				alert('General register error');
			}
		);
	}

	render() {
		return (
			<form id="register-form">
				<input 
				 type="text"
				 name= "username"
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
				
				<button id="login-button" onClick={(evt) => {
					evt.preventDefualt();			
					this.props.onLogin();		
				}}>Login</button>
			</form>

		);			
	}
}

class Home extends React.component {
	render() {
		return (<p> HOME PAGE FOUND BABY! </p>);
	}
}

class App extends React.Component {
	constructor(props){
		super(props);
<<<<<<< HEAD
		this.setstate = {
			view: 'login'
=======
		this.state = {
			view: 'register'
>>>>>>> 7484a862475f097b2a7d84d91204087eed88cf33
		};
	}
	onLogin(){
		this.setState({
			view: 'login'
		});

	}
	onRegister(){
		this.setState({
			view: 'home'
		});
	}
	render(){
<<<<<<< HEAD
		let component = <Login onRegister={ () => this.onRegister() } />


		let component = <Login onLogin={ () => this.onLogin() } />;
		if (this.state.view == 'register'){
			component = <Register />
=======
		let component = <Register onLogin={ () => this.onLogin() } />;
		if (this.state.view == 'login'){	
			component = <Login onRegister={ () => this.onRegister() } />
>>>>>>> 7484a862475f097b2a7d84d91204087eed88cf33
		}
		if (this.state.view == 'home'){
			component = <Home />;
		}

		return(
			<div className="app">
				{component}
			</div>

		);
	}
}

ReactDOM.render(<App />, document.querySelector('#login'));
