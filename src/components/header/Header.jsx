import './header.css';

const Header = () => {
  return (
    <div className="headerSection">
      <div className="headerContainer">
        <div className="headerLogo">
            <img src="/img/logo.png" alt="book pooja" />
        </div>
        <div className="headerRight">
            <p>Don’t have a account?</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
