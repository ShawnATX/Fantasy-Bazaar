import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

function EquipmentFooter(props) {
  const { API, items } = props;

  return (
    <div className="dropup">
      <button
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Items
      </button>
      <ul className="dropdown-menu dropdown-menu-dark">
        <li className="dropdown-item">Item 1</li>
        <li className="dropdown-item">Item 2</li>
      </ul>
    </div>
  );
}

export default EquipmentFooter;
