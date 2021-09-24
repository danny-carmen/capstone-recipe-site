import React, { Component, useRef } from "react";
import RecipeCard from "./recipe-card";

export default class RecipeBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardItems: [],
    };
    this.scrollRef = React.createRef();
    this.listenScrollEvent = this.listenScrollEvent.bind(this);
  }

  listenScrollEvent(e) {
    if (
      e.target.scrollTop >=
      e.target.scrollHeight - e.target.offsetHeight * 2
    ) {
      this.props.scrollToLoad();
    }
  }

  componentDidMount() {
    this.scrollRef.current.addEventListener("scroll", this.listenScrollEvent);
  }

  componentWillUnmount() {
    this.scrollRef.current.removeEventListener(
      "scroll",
      this.listenScrollEvent
    );
  }

  render() {
    const boardItems = this.props.data.map((boardItem) => {
      console.log();
      return <RecipeCard key={boardItem.id} boardItem={boardItem} />;
    });

    return (
      <div className="recipe-board-wrapper">
        <div className="spacer-search-bar"></div>
        <div ref={this.scrollRef} className="recipe-board-grid">
          <div className="recipe-board">{boardItems}</div>
          <div className="spacer50"></div>
        </div>
      </div>
    );
  }
}
