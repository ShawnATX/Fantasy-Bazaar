import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const NewBazaarSettings = (props) => {
  const { formObject, setFormObject, setPageState, saveNewBazaar } = props;

  const handleInputChange = (event) => {
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
  };

  const fixStockDependencies = () => {
      setFormObject({
        ...formObject,
        limitedInventoryQuantity: false,
        stockSoldItems: false
      })  
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fixStockDependencies();
    saveNewBazaar(formObject);
  };
  const handleGoBack = () => {
    setPageState(1);
  };
  const nextPage = () => {
    setPageState(3);
  };

  return (
    <Row className='mt-4 text-center'>
      <Col
        className='text-center'
        xs={{ span: 8, offset: 2 }}
        sm={{ span: 6, offset: 3 }}
        md={{ span: 6, offset: 3 }}
        lg={{ span: 4, offset: 4 }}
      >
        <h4 className='mb-3'>Require Approval For:</h4>
        <div className='form-check form-switch mx-2 my-2'>
          <input
            className='form-check-input'
            type='checkbox'
            id='requireNewCharacterApproval'
            name='requireNewCharacterApproval'
            checked={formObject.requireNewCharacterApproval}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id='tooltip-newCharacterApproval'>
                Require your approval for a new character's entered starting
                gold and items.
              </Tooltip>
            }
          >
            <label
              className='form-check-label bazaar-form-check-label'
              htmlFor='requireNewCharacterApproval'
              id='newCharacter'
            >
              New Character Gold & Inventory
            </label>
          </OverlayTrigger>
        </div>
        <div className='form-check form-switch mx-2 my-2'>
          <input
            className='form-check-input'
            type='checkbox'
            id='requireCustomItemApproval'
            name='requireCustomItemApproval'
            checked={formObject.requireCustomItemApproval}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id='tooltip-customItem'>
                Require your approval for any custom items that players add
              </Tooltip>
            }
          >
            <label
              className='form-check-label bazaar-form-check-label'
              htmlFor='requireCustomItemApproval'
              id='customItem'
            >
              Custom Item Addition*
            </label>
          </OverlayTrigger>
        </div>
        {/* <div className='form-check form-switch mx-2 my-2'>
          <input
            className='form-check-input'
            type='checkbox'
            id='requireWalletAdditionApproval'
            name='requireWalletAdditionApproval'
            checked={formObject.requireWalletAdditionApproval}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id='tooltip-walletAddition'>
                Require your approval for any gold added to character wallets,
                such as loot or payments from in-game
              </Tooltip>
            }
          >
            <label
              className='form-check-label bazaar-form-check-label'
              htmlFor='requireWalletAdditionApproval'
              id='walletAdditions'
            >
              Wallet Additions*
            </label>
          </OverlayTrigger>
        </div> */}
        <div className='form-check form-switch mx-2 my-2'>
          <input
            className='form-check-input'
            type='checkbox'
            id='requireWalletChangeApproval'
            name='requireWalletChangeApproval'
            checked={formObject.requireWalletChangeApproval}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id='tooltip-walletChanges'>
                Require your approval for any gold added to or removed from
                character wallets
              </Tooltip>
            }
          >
            <label
              className='form-check-label bazaar-form-check-label'
              htmlFor='requireWalletChangeApproval'
              id='walletChanges'
            >
              All Wallet Changes
            </label>
          </OverlayTrigger>
        </div>
        <div className='form-check form-switch mx-2 my-2'>
          <input
            className='form-check-input'
            type='checkbox'
            id='requireSaleApproval'
            name='requireSaleApproval'
            checked={formObject.requireSaleApproval}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id='tooltip-itemSales'>
                Require your approval for items sold to your bazaar by
                characters
              </Tooltip>
            }
          >
            <label
              className='form-check-label bazaar-form-check-label'
              htmlFor='requireSaleApproval'
              id='itemSale'
            >
              Item Sales
            </label>
          </OverlayTrigger>
        </div>
        <div className='form-check form-switch mx-2 my-2'>
          <input
            className='form-check-input'
            type='checkbox'
            id='requirePurchaseApproval'
            name='requirePurchaseApproval'
            checked={formObject.requirePurchaseApproval}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id='tooltip-itemPurchases'>
                Require your approval for items purchased from your bazaar by
                characters
              </Tooltip>
            }
          >
            <label
              className='form-check-label bazaar-form-check-label'
              htmlFor='requirePurchaseApproval'
            >
              Item Purchases
            </label>
          </OverlayTrigger>
        </div>
        <h4 className='mt-4 mb-3'>General Settings:</h4>
        <div className='form-check form-switch mx-2 my-2'>
          <input
            className='form-check-input'
            type='checkbox'
            id='limitedInventoryItems'
            name='limitedInventoryItems'
            checked={formObject.limitedInventoryItems}
            onChange={handleInputChange}
          />
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip id='tooltip-limitedInventoryItems'>
                Set limits on available inventory items in your
                bazaar
              </Tooltip>
            }
          >
            <label
              className='form-check-label bazaar-form-check-label'
              htmlFor='limitedInventoryItems'
            >
              Set Stock Limits
            </label>
          </OverlayTrigger>
        </div>
      

        {formObject.limitedInventoryItems ? (
          <>
            <div className='form-check form-switch mx-2 my-2'>
            <input
              className='form-check-input'
              type='checkbox'
              id='Items'
              name='limitedInventoryQuantity'
              checked={formObject.limitedInventoryQuantity}
              onChange={handleInputChange}
            />
            <OverlayTrigger
              placement={"right"}
              overlay={
                <Tooltip id='tooltip-limitedInventoryQuantity'>
                  Set limits on available inventory amounts in your bazaar
                </Tooltip>
              }
            >
              <label
                className='form-check-label bazaar-form-check-label'
                htmlFor='itemPurchases'
                id='stockLimits'
              >
                Set Stock Quantity Limits*
              </label>
            </OverlayTrigger>
          </div>
          <div className='form-check form-switch mx-2 my-2'>
            <input
              className='form-check-input'
              type='checkbox'
              id='stockSoldItems'
              name='stockSoldItems'
              checked={formObject.stockSoldItems}
              onChange={handleInputChange}
            />
            <OverlayTrigger
              placement={"right"}
              overlay={
                <Tooltip id='tooltip-stockSoldItems'>
                  Add items sold by characters to your stock
                </Tooltip>
              }
            >
              <label
                className='form-check-label bazaar-form-check-label'
                htmlFor='stockLimits'
                id='stockLimits'
              >
                Stock Sold Items*
              </label>
            </OverlayTrigger>
          </div>
          </>
        ) : (
          <>
          <div className='form-check form-switch mx-2 my-2'>
            <input
              disabled
              className='form-check-input'
              type='checkbox'
              id='Items'
              name='limitedInventoryQuantity'
              checked={false}
              onChange={handleInputChange}
            />
            <OverlayTrigger
              placement={"right"}
              overlay={
                <Tooltip id='tooltip-limitedInventoryQuantity'>
                  Set limits on available inventory amounts in your bazaar
                </Tooltip>
              }
            >
              <label
                className='form-check-label bazaar-form-check-label'
                htmlFor='itemPurchases'
                id='stockLimits'
              >
                Set Stock Quantity Limits*
              </label>
            </OverlayTrigger>
          </div>
          <div className='form-check form-switch mx-2 my-2'>
            <input
              disabled
              className='form-check-input'
              type='checkbox'
              id='stockSoldItems'
              name='stockSoldItems'
              checked={false}
              onChange={handleInputChange}
            />
            <OverlayTrigger
              placement={"right"}
              overlay={
                <Tooltip id='tooltip-stockSoldItems'>
                  Add items sold by characters to your stock
                </Tooltip>
              }
            >
              <label
                className='form-check-label bazaar-form-check-label'
                htmlFor='stockLimits'
                id='stockLimits'
              >
                Stock Sold Items*
              </label>
            </OverlayTrigger>
          </div>
          </>
        )}

        <Row className='sticky-footer mt-3'>
          <Col className='text-center'>
            <Button
              variant='secondary'
              type='submit'
              className='text-center btn-small'
              onClick={handleGoBack}
            >
              Go Back
            </Button>
            {formObject.limitedInventoryItems ? (
              <Button
                variant='secondary'
                className='text-center btn-small'
                onClick={nextPage}
              >
                Select Items
              </Button>
            ) : (
              <Button
                variant='secondary'
                type='submit'
                className='text-center btn-small'
                onClick={handleFormSubmit}
              >
                Finish!
              </Button>
            )}
          </Col>
        </Row>
      </Col>
      <p>* This setting will be functional in a future release version </p>
    </Row>
  );
};

export default NewBazaarSettings;
