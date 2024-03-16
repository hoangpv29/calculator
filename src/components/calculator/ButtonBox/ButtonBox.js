import "./buttonBox.css";
/**
 * ButtonBox component
 *
 * @param {Object} props - The props object
 * @param {React.ReactNode} props.children - The child elements to be placed inside the button box
 * @returns {JSX.Element} - JSX for the ButtonBox component
 */
const ButtonBox = ({ children }) => {
  return <div className="buttonBox">{children}</div>;
};

export default ButtonBox;
