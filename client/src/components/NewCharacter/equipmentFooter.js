import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function EquipmentFooter(props) {
  const { items } = props;

  return (
    <div>
      <DropdownButton
        drop='up'
        variant='secondary'
        title={items.length + ` Items`}
      >
        {items.map((item) => (
          <Dropdown.Item key={item.id}>
            {item.name} - {item.value}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
}

export default EquipmentFooter;
