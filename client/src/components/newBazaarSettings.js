import React from "react";
import { Row, Col, UncontrolledTooltip } from "reactstrap";

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
            id="customItem"
          >
            Custom Item Addition
          </label>
          <UncontrolledTooltip placement="right" target="customItem">
            Require your approval for any custom items that players add
          </UncontrolledTooltip>
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
            id="walletAdditions"
          >
            Wallet Additions
          </label>
          <UncontrolledTooltip placement="right" target="walletAdditions">
            Require your approval for any gold added to character wallets, such
            as loot or payments from in-game
          </UncontrolledTooltip>
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
            id="walletChanges"
          >
            All Wallet Changes
          </label>
          <UncontrolledTooltip placement="right" target="walletChanges">
            Require your approval for any gold added to or removed from
            character wallets
          </UncontrolledTooltip>
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
          <label
            className="form-check-label"
            htmlFor="requireSaleApproval"
            id="itemSale"
          >
            Item Sales
          </label>
          <UncontrolledTooltip placement="right" target="itemSale">
            Require your approval for items sold to your bazaar by characters
          </UncontrolledTooltip>
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
          <label
            className="form-check-label"
            htmlFor="requirePurchaseApproval"
            id="itemPurchase"
          >
            Item Purchases
          </label>
          <UncontrolledTooltip placement="right" target="itemPurchase">
            Require your approval for items purchased from your bazaar by
            characters
          </UncontrolledTooltip>
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
          <label
            className="form-check-label"
            htmlFor="itemPurchases"
            id="stockLimits"
          >
            Set Stock Limits
          </label>
          <UncontrolledTooltip placement="right" target="stockLimits">
            Set limits on available inventory items and amounts in your bazaar
          </UncontrolledTooltip>
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
