import React, { Component } from "react";

import lasagna from "../images/lasagna.jpg";

import RecipeBoard from "./recipe-board";
import SearchBar from "./search-bar";

export default class HomePage extends Component {
  constructor() {
    super();

    const boardItemsObject = [
      {
        id: 1,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 43,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 2,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 3,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 4,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 5,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 6,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 7,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 8,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 9,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 10,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 11,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 12,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 13,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 14,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 15,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 16,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 17,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 18,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
      {
        id: 19,
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image: lasagna,
        rating: "4",
      },
    ];
    this.state = {
      boardItems: boardItemsObject,
    };
  }

  render() {
    return (
      <div className="relative">
        <SearchBar />
        <RecipeBoard data={this.state.boardItems} />
      </div>
    );
  }
}
