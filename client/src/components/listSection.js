import React from "react";
import Item from "./item";

const ListSection = (props) => {
  const { type, items } = props;
  //create a whitespace-free version to use in element ids and names
  const strippedType = type.replace(/\s+/g, "");
  let subtypeArr = [];

  const buildSubtypeList = () => {
    subtypeArr = Array.from(new Set(items.map((item) => item.subtype)));
    subtypeArr = subtypeArr.map((subtype) => ({
      subtype: subtype,
      strippedSubtype: subtype.replace(/\s+/g, ""),
    }));
  };

  const getItems = (subtype) => {
    return items.filter((item) => item.subtype === subtype);
  };

  return (
    <div className="card">
      <div className="card-header p-1" id={strippedType + "head"}>
        <h1 className="mb-0 text-center">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#" + strippedType + "body"}
            aria-expanded="true"
            aria-controls={strippedType + "body"}
          >
            {type}
          </button>
        </h1>
      </div>
      <div
        id={strippedType + "body"}
        className={"accordion-collapse " + props.expanded}
        aria-labelledby={strippedType + "head"}
        data-parent="#itemMenu"
      >
        {buildSubtypeList()}
        {subtypeArr.map((subtypeObject) => (
          <div className="card" key={subtypeObject.strippedSubtype}>
            <div
              className="card-header p-1"
              id={subtypeObject.strippedSubtype + "head"}
            >
              <h3 className="mb-0 text-center">
                <button
                  className="accordion-button subtype-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#" + subtypeObject.strippedSubtype + "body"}
                  aria-expanded="true"
                  aria-controls={subtypeObject.strippedSubtype + "body"}
                >
                  {subtypeObject.subtype}
                </button>
              </h3>
            </div>
            <div
              id={subtypeObject.strippedSubtype + "body"}
              className={"accordion-collapse " + props.expanded}
              aria-labelledby={subtypeObject.strippedSubtype + "head"}
              data-parent="#itemMenu"
            >
              <div className="card-body">
                {getItems(subtypeObject.subtype).map((item) => (
                  <Item
                    key={item._id}
                    item={item}
                    action={props.action}
                    button={props.button}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSection;
