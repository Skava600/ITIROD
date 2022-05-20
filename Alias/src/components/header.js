export const Header = ({ changeTheme, sharedProps }) => {
  return (
    <>
      <div className="header-counter">
        <i className="fas fa-hourglass hi"></i>
        <h2 id="h2-time"></h2>
      </div>
      <button
        id="button-header"
        className="button-header"
        onClick={changeTheme}
      >
        <i className="fab fa-phoenix-framework"></i>
        <span>Alias</span>
      </button>
      <div className="header-counter">
        <i className="fas fa-star"></i>
        <h2 id="h2-points">{sharedProps.roundData.scoreNum}</h2>
      </div>
    </>
  );
};
