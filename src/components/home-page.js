import React, { Component } from "react";
import axios from "axios";
import RecipeBoard from "./recipe-board";
import SearchBar from "./search-bar";

export default class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      isSearch: false,
      isLoading: false,
      scrollPosition: 0,
      boardItems: [],
      totalItems: 0,
      currentSearch: "",
    };

    this.updateBoardFromSearch = this.updateBoardForSearch.bind(this);
    this.updateBoardForAllRecipes = this.updateBoardForAllRecipes.bind(this);
    this.updateBoardForSearch = this.updateBoardForSearch.bind(this);
    this.scrollToLoad = this.scrollToLoad.bind(this);
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    axios
      .get("http://localhost:5000/recipes/", {
        params: {
          setNumber: this.state.scrollPosition,
        },
      })
      .then((res) => {
        this.setState({
          boardItems: res.data.recipeArray,
          totalItems: res.data.totalRecipeCount,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateBoardForSearch(searchQuery) {
    this.setState({
      isSearch: true,
      isLoading: true,
      scrollPosition: 0,
      totalItems: 0,
      currentSearch: searchQuery,
    });
    console.log("http://localhost:5000/recipes/search=" + searchQuery);
    axios
      .get("http://localhost:5000/recipes/search=" + searchQuery, {
        params: {
          setNumber: 0,
        },
      })
      .then((res) => {
        this.setState({
          boardItems: res.data.recipeArray,
          totalItems: res.data.totalRecipeCount,
          isLoading: false,
        });
        console.log(res.data.recipeArray);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  updateBoardForAllRecipes() {
    this.setState({
      isLoading: true,
      isSearch: false,
      scrollPosition: 0,
      totalItems: 0,
      currentSearch: "",
      boardItems: [],
    });

    axios
      .get("http://localhost:5000/recipes/", {
        params: {
          setNumber: 0,
        },
      })
      .then((res) => {
        this.setState({
          boardItems: res.data.recipeArray,
          totalItems: res.data.totalRecipeCount,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadMoreRecipesFromSearch() {
    console.log("Loading Search recipes - ALl");
    if (
      !this.state.isLoading &&
      this.state.boardItems.length < this.state.totalItems
    ) {
      this.setState({ isLoading: true });
      axios
        .get(
          "http://localhost:5000/recipes/search=" + this.state.currentSearch,
          {
            params: {
              setNumber: this.state.scrollPosition + 1,
            },
          }
        )
        .then((res) => {
          this.setState({
            boardItems: this.state.boardItems.concat(res.data.recipeArray),
            scrollPosition: this.state.scrollPosition + 1,
            isLoading: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  loadMoreRecipesFromAll() {
    console.log("Loading All Recipes - Scroll");
    if (
      !this.state.isLoading &&
      this.state.boardItems.length < this.state.totalItems
    ) {
      this.setState({ isLoading: true });
      axios
        .get("http://localhost:5000/recipes/", {
          params: {
            setNumber: this.state.scrollPosition + 1,
          },
        })
        .then((res) => {
          this.setState({
            boardItems: this.state.boardItems.concat(res.data.recipeArray),
            scrollPosition: this.state.scrollPosition + 1,
            isLoading: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  scrollToLoad(query) {
    if (this.state.isSearch) {
      this.loadMoreRecipesFromSearch(query);
    } else {
      this.loadMoreRecipesFromAll();
    }
  }

  render() {
    return (
      <div className="relative">
        <SearchBar
          isSearch={this.state.isSearch}
          updateBoardFromSearch={this.updateBoardForSearch}
          updateBoardForAllRecipes={this.updateBoardForAllRecipes}
        />
        <RecipeBoard
          data={this.state.boardItems}
          scrollToLoad={this.scrollToLoad}
          isLoading={this.state.isLoading}
          isSearch={this.state.isSearch}
          currentSearch={this.state.currentSearch}
        />
      </div>
    );
  }
}
