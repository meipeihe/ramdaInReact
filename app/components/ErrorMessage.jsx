import React from "react";

export default class ErrorMessage extends React.Component {
  constructor(props){
    super(props);
    this.during = this.props.during || 3;
    this.state = {
      showMessage: false
    };
  }

  getStyle(){
    return this.state.showMessage?
    {
        visibility: 'visible',
        opacity: '1' 
    } : {
        visibility: 'hidden',
        opacity:  '0'
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.message){
      this.setState({
        showMessage: true
      });
      setTimeout(() => {
        this.setState({
          showMessage: false
        });
      }, this.during* 1000);
    }
  }

  render() {
    return (
      <div className="errormessage-wrapper">
        <p style={this.getStyle.bind(this)()}>{this.props.message}</p>
      </div>
    );
  }
}
