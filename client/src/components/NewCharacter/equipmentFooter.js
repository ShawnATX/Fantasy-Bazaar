import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

function EquipmentFooter(props) {
  const { items } = props;

  return (
    <div className="dropup">
      <Button
        variant="secondary"
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Items <Badge variant="secondary">{items.length}</Badge>
      </Button>
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
