import { Textfit } from "react-textfit";
import "./screen.css";
/**
 * Screen component
 * @param {Object} props - The props object
 * @param {string} props.value - The value to be displayed on the screen
 * @returns {JSX.Element} - JSX for the Screen component
 */
const Screen = ({ value }) => {
  return (
    <Textfit className="screen" mode="single" max={70}>
      {value}
    </Textfit>
  );
};

export default Screen;
