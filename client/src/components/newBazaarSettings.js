import React from "react";
import { Row, Col } from "reactstrap";

const NewBazaarSettings = (props) => {
  const { formObject, setFormObject, setPageState, saveNewBazaar } = props;

  function handleInputChange(event) {
    let newFormObj = Object.fromEntries(
      Object.entries(formObject).map(([key, value]) => {
        if (key === `${event.target.name}`) {
          return [key, !value];
        }
        return [key, value];
      })
    );
    setFormObject({
      ...newFormObj,
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    saveNewBazaar(formObject);
  }

  return (
    <Row className="my-1">
      <Col
        className="text-center"
        sm="12"
        md={{ size: 6, offset: 3 }}
        lg={{ size: 8, offset: 2 }}
      >
        Require Approval For:
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="requireCustomItemApproval"
            name="requireCustomItemApproval"
            checked={formObject.requireCustomItemApproval}
            onChange={handleInputChange}
          />
          <label
            className="form-check-label"
            htmlFor="requireCustomItemApproval"
          >
            Custom Item Addition
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="requireWalletAdditionApproval"
            name="requireWalletAdditionApproval"
            checked={formObject.requireWalletAdditionApproval}
            onChange={handleInputChange}
          />
          <label
            className="form-check-label"
            htmlFor="requireWalletAdditionApproval"
          >
            Wallet Additions
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input form-control"
            type="checkbox"
            id="requireWalletChangeApproval"
            name="requireWalletChangeApproval"
            checked={formObject.requireWalletChangeApproval}
            onChange={handleInputChange}
          />
          <label
            className="form-check-label"
            htmlFor="requireWalletChangeApproval"
          >
            All Wallet Changes
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input form-control"
            type="checkbox"
            id="requireSaleApproval"
            name="requireSaleApproval"
            checked={formObject.requireSaleApproval}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="requireSaleApproval">
            Item Sales
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input form-control"
            type="checkbox"
            id="requirePurchaseApproval"
            name="requirePurchaseApproval"
            checked={formObject.requirePurchaseApproval}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="requirePurchaseApproval">
            Item Purchases
          </label>
        </div>
        General Settings:
        <div className="form-check form-switch">
          <input
            className="form-check-input form-control"
            type="checkbox"
            id="limitedInventory"
            name="limitedInventory"
            checked={formObject.limitedInventory}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="itemPurchases">
            Set Stock Limits
          </label>
        </div>
        <Row className="sticky-footer mt-3">
          <Col className="text-center">
            <button
              type="submit"
              className="text-center btn-small"
              onClick={handleFormSubmit}
            >
              Finish!
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NewBazaarSettings;
