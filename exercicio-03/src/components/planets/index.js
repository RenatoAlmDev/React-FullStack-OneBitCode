import React, { Fragment } from "react";
import Planet from "./planet";

async function getPlanets() {
  let response = await fetch("http://localhost:3000/api/planets.json");
  let data = await response.json();
  return data;
}

class Planets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
    };
  }

  componentDidMount() {
    getPlanets().then((data) => {
      this.setState((state) => ({
        planets: data["planets"],
      }));
    });
  }

  _removeLast = () => {
    let new_planets = [...this.state.planets];
    new_planets.pop();
    this.setState((state) => ({
      planets: new_planets,
    }));
  };
  get removeLast() {
    return this._removeLast;
  }
  set removeLast(value) {
    this._removeLast = value;
  }

  duplicateLast = () => {
    let last_planet = this.state.planets[this.state.planets.length - 1];
    this.setState((state) => ({
      planets: [...this.state.planets, last_planet],
    }));
  };

  render() {
    return (
      <Fragment>
        <h3>Planet List</h3>
        <button onClick={this.removeLast}>Remover Último Planeta</button>
        <button onClick={this.duplicateLast}>Duplicar Último Planeta</button>
        <hr />
        {this.state.planets.map((planet, index) => (
          <Planet
            id={planet.id}
            name={planet.name}
            text={planet.text}
            img_url={planet.img_url}
            link={planet.link}
            key={index}
          />
        ))}
        <hr />
      </Fragment>
    );
  }
}

export default Planets;
