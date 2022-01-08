import React from "react";
import styles from "./App.module.css";
import { fetchData } from "./api";
import { Cards, Chart, CountryPicker } from "./components";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleCountryChange = (country) => {
    console.log(country);
    // fetch the data
    // set the state
  };

  render() {
    const { data } = this.state;

    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart />
      </div>
    );
  }
}

export default App;
