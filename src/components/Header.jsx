import LoggedHeader from './header_components/LoggedHeader';
import NotLoggedHeader from "./header_components/NotLoggedHeader";

const Header = () => {
    

    let token = sessionStorage.getItem("accessToken");

    if(token !== null) {
      return <LoggedHeader />
    } else {
      return <NotLoggedHeader />
    }

}

export default Header;