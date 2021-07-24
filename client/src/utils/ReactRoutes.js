import Landing from "../pages/landing";
import NewUserType from "../pages/newUserType";
import NewUserCreds from "../pages/newUserCreds";
import NewCharacter from "../pages/newCharacter";
import Login from "../pages/login";
import ForgotPassword from "../pages/forgotPassword";
import NewBazaar from "../pages/newBazaar";
import UserHome from "../pages/userHome";
import Logout from "../pages/logout";
import About from "../pages/about";

const routes = {
  "/": () => <Landing />,
  "/login": () => <Login />,
  "/forgotpassword": () => <ForgotPassword />,
  "/logout": () => <Logout />,
  "/about": () => <About />,
  "/newusertype": () => <NewUserType />,
  "/newusercreds/player/:bazaarcode": ({ bazaarcode }) => (
    <NewUserCreds type={"player"} bazaarCode={bazaarcode} />
  ),
  "/newusercreds/gm": () => <NewUserCreds />,
  "/newcharacter": () => <NewCharacter />,
  "/newcharacter/:bazaar": ({ bazaar }) => <NewCharacter bazaarCode={bazaar} />,
  "/newbazaar": () => <NewBazaar />,
  "/userhome": () => <UserHome />,
  "/userhome/bazaar/:joinCode": (joinCode) => <UserHome bazaar={joinCode} />,
  "/userhome/character/:id": (id) => <UserHome character={id} />,
};

export default routes;
