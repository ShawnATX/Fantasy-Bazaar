import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, Col, Row } from 'reactstrap';
import { useAlert } from 'react-alert';
import API from "../utils/API";
import Inventory from '../components/inventory';
import StoreFront from '../components/storeFront';
import PlayerMain from '../components/playerMain';




const PlayerHome = () => {
    const { authenticationState } = useContext(UserContext);
    const [userObject, setUserObject] = useState({});
    const [pageState, setPageState] = useState("Home");
    // let spendMoney = false;
    const history = useHistory();
    const alert = useAlert();


    useEffect(() => {
        if (!authenticationState.isAuthenticated) {
            history.push("/login");
        };
        setUserObject(authenticationState.user);
    }, [authenticationState]);

    function sellItem(item) {
        console.log(item._id, userObject);
        let newItems = authenticationState.user.items;
        let newWallet = authenticationState.user.wallet;
        for (var i = 0; i < authenticationState.user.items.length; i++) {
            if (authenticationState.user.items[i] === item._id) {
                newItems.splice(i, 1);
                newWallet = newWallet + item.value;
                i = authenticationState.user.items.length;
            }
        }
        console.log(newItems);
        API.userSale({ items: newItems, wallet: newWallet })
            .then((res) => {
                setUserObject({ userName: res.data.userName, characterName: res.data.characterName, characterImage: res.data.characterImage, type: res.data.type, wallet: res.data.wallet, items: res.data.items, bazaars: res.data.bazaars });
                authenticationState.userHasAuthenticated(true, ({ userName: res.data.userName, characterName: res.data.characterName, characterImage: res.data.characterImage, type: res.data.type, wallet: res.data.wallet, items: res.data.items, bazaars: res.data.bazaars }));
            });
    };

    function purchaseItem(item) {
        if (item.value > userObject.wallet) {
            alert.show("Looks like that is a bit too expensive...")
        }
        else {
            API.userPurchase(({ wallet: (userObject.wallet - item.value), items: [item._id] }))
                .then((res) => {

                    setUserObject({ userName: res.data.userName, characterName: res.data.characterName, characterImage: res.data.characterImage, type: res.data.type, wallet: res.data.wallet, items: res.data.items, bazaars: res.data.bazaars });
                    authenticationState.userHasAuthenticated(true, ({ userName: res.data.userName, characterName: res.data.characterName, characterImage: res.data.characterImage, type: res.data.type, wallet: res.data.wallet, items: res.data.items, bazaars: res.data.bazaars }));
                }
                )
                .catch((err) => console.log(err));
        }
    };

    const handleLogout = () => {
        API.logoutUser()
            .then((res) => {
                if (res.status === 200) {
                    authenticationState.userHasAuthenticated({ isAuthenticated: false, user: {} });
                    history.push("/");
                }
                else {
                    alert.show("Weird logout error happening...")
                }
            });
    }

    function renderPage() {
        if (pageState === "Home") {
            return <PlayerMain setPageState={setPageState} />;
        } else if (pageState === "Inventory") {
            return <Inventory setPageState={setPageState} items={userObject.items} sell={sellItem} />;
        } else if (pageState === "Store") {
            return <StoreFront setPageState={setPageState} purchase={purchaseItem}/>;
        } else {
            return <PlayerMain setPageState={"Home"} />;
        }
    };


    return (
        <Container>
            <Row className="border p-1  mb-3 text-center sticky-top playerHeader">
                <Col className="border text-center p-0 mx-2 mh-75">
                    <Row className="mx-0">
                        <Col sm="8" md={{ size: 6, offset: 3 }}>
                            <img src={userObject.characterImage} alt="Character Image" className="img-fluid mw-50" />
                        </Col>
                    </Row>
                    {userObject.characterName}
                </Col>
                <Col className="border text-center p-0 mx-2">
                    <Row className="mx-0 mt-2">
                        <Col className="justify-center mt-5">
                            {userObject.wallet}
                            {/* <Animate
                                animate="false"
                                change="bounce"
                                durationChange={1200}
                                component="span"
                                // animateChangeIf={(spendMoney)}
                            > */}
                            <img className="img-fluid w-25 ml-1 mb-1" src="./gold-coin-icon.png" alt="gold coins" />
                            {/* </Animate> */}
                        </Col>
                    </Row>
                </Col>
            </Row>
            {renderPage()}
            <Row className="sticky-footer mt-3">
                <Col className="text-center">
                    <button
                        className="text-center btn-small"
                        onClick={() => handleLogout()}>
                        Logout
                    </button>
                </Col>
            </Row>
        </Container>
    );
}

export default PlayerHome;
