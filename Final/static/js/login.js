class register extends React.Component {
	sendRegisterRequest(){
		let formData = new FormData(document.getElementById('register-form'));
		fetch('/api/register',{
			method: 'POST',
			body: formData
		})
		.then(result => result.text())
		.then(
			(result) =>{
				if (result == 'ok'){
					this.props.onRegister();
				} else {
					alert('Username already exists.');
				}
			},
			(error) => {
				alert('General register error');
			};
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
				<button id="login-button" onClick={ (evt) => {
					evt.preventDefault();
					//Need to finish button
					
			</form>





class login extends React.Component {
	sendLoginRequest(){
		let formData = new FormData(document.getElementById('login-form'));
		fetch('/api/login',{
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

	render() {
		return (
			<form id="login-form">
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
				<button id="login-button" onClick={(evt) => {
					evt.preventDefault();
					this.sendLoginRequest();
				}}>Login</button>
			</form>
