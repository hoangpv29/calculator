import "./wrapper.css";
/**
 * Wrapper component
 *
 * @param {Object} props - The props object
 * @param {React.ReactNode} props.children - The child elements to be wrapped
 * @returns {JSX.Element} - JSX for the Wrapper component
 */
const Wrapper = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;
