import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import InputGroup from "react-bootstrap/InputGroup";

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
    <Row className="mt-4 text-center">
      <Col
        className="text-center"
        xs={{ span: 8, offset: 2 }}
        sm={{ span: 6, offset: 3 }}
        md={{ span: 6, offset: 3 }}
        lg={{ span: 4, offset: 4 }}
      >
        <h4 className="mb-3">Require Approval For:</h4>
        <div className="form-check form-switch mx-2 my-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="requireNewCharacterApproval"
            name="requireNewCharacterApproval"
            checked={formObject.requireNewCharacterApproval}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id="tooltip-newCharacterApproval">
                Require your approval for a new character's entered starting
                gold and items.
              </Tooltip>
            }
          >
            <label
              className="form-check-label bazaar-form-check-label"
              htmlFor="requireNewCharacterApproval"
              id="newCharacter"
            >
              New Character Gold & Inventory
            </label>
          </OverlayTrigger>
        </div>
        <div className="form-check form-switch mx-2 my-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="requireCustomItemApproval"
            name="requireCustomItemApproval"
            checked={formObject.requireCustomItemApproval}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id="tooltip-customItem">
                Require your approval for any custom items that players add
              </Tooltip>
            }
          >
            <label
              className="form-check-label bazaar-form-check-label"
              htmlFor="requireCustomItemApproval"
              id="customItem"
            >
              Custom Item Addition
            </label>
          </OverlayTrigger>
        </div>
        <div className="form-check form-switch mx-2 my-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="requireWalletAdditionApproval"
            name="requireWalletAdditionApproval"
            checked={formObject.requireWalletAdditionApproval}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id="tooltip-walletAddition">
                Require your approval for any gold added to character wallets,
                such as loot or payments from in-game
              </Tooltip>
            }
          >
            <label
              className="form-check-label bazaar-form-check-label"
              htmlFor="requireWalletAdditionApproval"
              id="walletAdditions"
            >
              Wallet Additions
            </label>
          </OverlayTrigger>
        </div>
        <div className="form-check form-switch mx-2 my-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="requireWalletChangeApproval"
            name="requireWalletChangeApproval"
            checked={formObject.requireWalletChangeApproval}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id="tooltip-walletChanges">
                Require your approval for any gold added to or removed from
                character wallets
              </Tooltip>
            }
          >
            <label
              className="form-check-label bazaar-form-check-label"
              htmlFor="requireWalletChangeApproval"
              id="walletChanges"
            >
              All Wallet Changes
            </label>
          </OverlayTrigger>
        </div>
        <div className="form-check form-switch mx-2 my-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="requireSaleApproval"
            name="requireSaleApproval"
            checked={formObject.requireSaleApproval}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id="tooltip-itemSales">
                Require your approval for items sold to your bazaar by
                characters
              </Tooltip>
            }
          >
            <label
              className="form-check-label bazaar-form-check-label"
              htmlFor="requireSaleApproval"
              id="itemSale"
            >
              Item Sales
            </label>
          </OverlayTrigger>
        </div>
        <div className="form-check form-switch mx-2 my-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="requirePurchaseApproval"
            name="requirePurchaseApproval"
            checked={formObject.requirePurchaseApproval}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id="tooltip-itemPurchases">
                Require your approval for items purchased from your bazaar by
                characters
              </Tooltip>
            }
          >
            <label
              className="form-check-label bazaar-form-check-label"
              htmlFor="requirePurchaseApproval"
              id="itemPurchase"
            >
              Item Purchases
            </label>
          </OverlayTrigger>
        </div>
        <h4 className="mt-4 mb-3">General Settings:</h4>
        <div className="form-check form-switch mx-2 my-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="limitedInventory"
            name="limitedInventory"
            checked={formObject.limitedInventory}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id="tooltip-limitedInventory">
                Set limits on available inventory items and amounts in your
                bazaar
              </Tooltip>
            }
          >
            <label
              className="form-check-label bazaar-form-check-label"
              htmlFor="itemPurchases"
              id="stockLimits"
            >
              Set Stock Limits
            </label>
          </OverlayTrigger>
        </div>
        <Row className="sticky-footer mt-3">
          <Col className="text-center">
            <Button
              variant="secondary"
              type="submit"
              className="text-center btn-small"
              onClick={handleFormSubmit}
            >
              Finish!
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NewBazaarSettings;
