import React from 'react';
import Item from "./item";

const ListSection = (props) => {
    return (
        <div className="card">
            <div className="card-header" id={props.type + "head"}>
                <h2 className="mb-0 text-center">
                    <button className="btn" type="button" data-toggle="collapse" data-target={"#" + props.type + "body"} aria-expanded="true" aria-controls={props.type + "body"}>
                        {props.type}
                    </button>
                </h2>
            </div>
            <div id={props.type + "body"} className={props.expanded} aria-labelledby={props.type + "head"} data-parent="#itemMenu">
                <div className="card-body">
                    {
                        props.items.map((item) =>
                            <Item
                                key={item._id}
                                item={item}
                                action={props.action}
                                button={props.button}
                            />
                        )
                    }
                </div>
            </div>
        </div>


    );
};

export default ListSection;