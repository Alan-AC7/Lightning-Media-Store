import React from "react";
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      alias: "",
    };
  }

  componentDidMount() {
    const getInfo = async () => {
      const response = await fetch('/getinfo');
      const { alias } = await response.json();
      this.setState({
        alias
      });
    };
    getInfo();
  }

  render() {
    return (
      <p>{ this.state.alias }</p>
    );
  }
}

export default App;