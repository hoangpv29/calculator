import "./button.css";
/**
 * Button component
 *
 * @param {Object} props - The props object
 * @param {string} props.className - The CSS class name for styling the button
 * @param {string} props.value - The text value displayed on the button
 * @param {function} props.onClick - The function called when the button is clicked
 * @returns {JSX.Element} - JSX for the Button component
 */
const Button = ({ className, value, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
