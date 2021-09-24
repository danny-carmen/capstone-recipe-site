import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimes,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

export default class AddDirections extends Component {
  constructor() {
    super();

    this.state = {
      newDirection: "",
    };

    this.handleAddDirection = this.handleAddDirection.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleAddDirection() {
    if (this.state.newDirection !== "") {
      let newIngredientIndex = this.props.directions.length;
      let newDirection = {
        idx: newIngredientIndex,
        direction: this.state.newDirection,
      };
      this.props.addDirectionList([...this.props.directions, newDirection]);
      this.setState({
        newDirection: "",
      });
    }
  }

  deleteDirection(idx) {
    let updatedDirections = [...this.props.directions];
    updatedDirections.splice(idx, 1);

    updatedDirections = this.updateDirectionIndices(updatedDirections);
    this.props.addDirectionList(updatedDirections);
  }

  updateDirectionIndices(directionArray) {
    const updatedDirectionIndices = directionArray.map(
      (directionObject, idx) => {
        directionObject.idx = idx;
        return directionObject;
      }
    );

    return updatedDirectionIndices;
  }

  changeDirectionPosition(idx, moveUp) {
    let updatedDirections = [...this.props.directions];

    if (moveUp && idx > 0) {
      const directionToMoveUp = updatedDirections.splice(idx, 1)[0];
      updatedDirections.splice(idx - 1, 0, directionToMoveUp);
    } else if (!moveUp && idx <= updatedDirections.length) {
      const directionToMoveDown = updatedDirections.splice(idx, 1)[0];
      updatedDirections.splice(idx + 1, 0, directionToMoveDown);
    }

    updatedDirections = this.updateDirectionIndices(updatedDirections);
    this.props.addDirectionList(updatedDirections);
  }

  render() {
    const directions = this.props.directions.map((direction, idx) => {
      return (
        <div key={idx} className="direction-list__direction">
          <button
            className="remove-direction"
            onClick={() => {
              this.deleteDirection(idx);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="up-down-buttons">
            <button
              onClick={() => {
                this.changeDirectionPosition(idx, true);
              }}
            >
              <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
            </button>
            <button
              onClick={() => {
                this.changeDirectionPosition(idx, false);
              }}
            >
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            </button>
          </div>
          {direction.idx + 1}. {direction.direction}
        </div>
      );
    });
    return (
      <div className="directions">
        <div className="title">DIRECTIONS</div>
        <div className="direction-list">{directions}</div>
        <div>
          <div className="add-direction-input">
            <label onClick={this.handleAddDirection} for="newDirection">
              ADD STEP
            </label>
            <input
              id="add-direction-input"
              name="newDirection"
              type="text"
              autoComplete="off"
              placeholder="Add step here..."
              value={this.state.newDirection}
              onChange={this.handleChange}
            />{" "}
          </div>
        </div>
      </div>
    );
  }
}
