import React from "react";
import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <div className="no-match-wrapper">
      <h2>Hmm...., we couldn't find that page</h2>
      <Link to="/">Return to Tastable homepage</Link>
    </div>
  );
}
