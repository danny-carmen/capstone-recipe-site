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
    if (this.props.data.length > 0) {
      this.scrollRef.current.addEventListener("scroll", this.listenScrollEvent);
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.scrollRef.current);
    if (
      prevProps.currentSearch !== this.props.currentSearch &&
      this.scrollRef.current
    ) {
      this.scrollRef.current.scrollTop = 0;
    }
    if (this.props.data.length > 0) {
      this.scrollRef.current.addEventListener("scroll", this.listenScrollEvent);
    }
  }

  componentWillUnmount() {
    if (this.props.data.length > 0) {
      this.scrollRef.current.removeEventListener(
        "scroll",
        this.listenScrollEvent
      );
    }
  }

  render() {
    const boardItems = this.props.data.map((boardItem) => {
      return <RecipeCard key={boardItem._id} boardItem={boardItem} />;
    });

    return (
      <div className="recipe-board-wrapper">
        <div className="spacer-search-bar"></div>

        {this.props.data.length > 0 ? (
          <div ref={this.scrollRef} className="recipe-board-grid">
            <div className="recipe-board">{boardItems}</div>
            <div className="spacer50"></div>
          </div>
        ) : this.props.isSearch ? (
          <div className="none-found-wrapper">
            <div>
              No recipes meeting that search were found. Please try another
              search
            </div>
          </div>
        ) : (
          <div ref={this.scrollRef} className="recipe-board-grid">
            <div className="recipe-board">{boardItems}</div>
            <div className="spacer50"></div>
          </div>
        )}
      </div>
    );
  }
}
