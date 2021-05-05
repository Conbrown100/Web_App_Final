class Boxes extends React.Component {
}





class TimeTables extends React.Component {

	constructor() {
		super();
	
	this.state = {
		showDropDown: false,
	};

	this.showDropDown = this.showDropDown.bind(this);
	this.closeDropDown = this.closeDropDown.bind(this);
}

	showDropDown(evt) {
		evt.preventDeafault();

		this.setState({ showDropDown: true }, () => { document.addEventListener('click', this.showDropDown); });
}

	closeDropDown(){
		this.setState({ showDropDown: false }, () => document.addEventListener('click', this.showDropDown); });
}

	render() {
		return (
			<div>
			   <button onClick={this.showDropDown}>
				Reserve Time
			   </button>

			   {
				this.state.showDropDown
				   ?(
					<div className='dropdown'>
					   <button> 2 hours </button>
					   <button> 4 hours </button>
					   <button> 8 hours </button>
					   <button> 12 hours </button>
					   <button> 24 hours </button>
					</div>
				    ):
				   (
				     null
				    )
				    }
		</div>
	);
	}
