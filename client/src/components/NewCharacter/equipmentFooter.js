import React from "react";
import { Badge } from "reactstrap";

function EquipmentFooter(props) {
  const { items } = props;

  return (
    <div className="dropup">
      <button
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Items <Badge color="secondary">{items.length}</Badge>
      </button>
      <ul className="dropdown-menu dropdown-menu-dark">
        {items.map((item) => (
          <li className="dropdown-item" key={item.id}>
            {item.name} - {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EquipmentFooter;
