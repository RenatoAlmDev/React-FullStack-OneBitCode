import React from "react";
import DescriptionWithLink from "../../shared/description_with_link";
import GrayImg from "../../shared/gray_img";

async function getSatellites(id) {
  let response = await fetch(`http://localhost3000/api/${id}.json`);
  let data = await response.json();
  return data;
}

class Planet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      satellites: [],
    };
  }

  componentDidMount() {
    getSatellites(this.props.id).then((data) => {
      this.setState((state) => ({
        satellites: data["satellites"],
      }));
    });
  }

  render() {
    let title;
    if (this.props.title_with_underline) {
      title = (
        <h4>
          <u>{this.props.name}</u>
        </h4>
      );
    } else {
      title = <h4>{this.name}</h4>;
    }

    return (
      <div>
        {title}
        <DescriptionWithLink text={this.props.text} link={this.link} />
        <GrayImg img_url={this.props.img_url} gray={this.gray} />
        <h4>Satélites:</h4>
        <ul>
          {this.state.satellites.map((satellite, index) => {
            <li key={index}>{satellite.name}</li>;
          })}
        </ul>

        <hr />
      </div>
    );
  }
}

export default Planet;
