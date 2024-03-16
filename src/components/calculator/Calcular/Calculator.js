import Wrapper from "../Wrapper/Wrapper";
import Screen from "../Screen/Screen";
import ButtonBox from "../ButtonBox/ButtonBox";
import Button from "../Button/Button";
import { btnValues } from "../../../utils/calculator/btnValue/btnValue";
import { useState } from "react";
import toLocaleString from "../../../utils/calculator/toLocaleString/toLocaleString";
import removeSpaces from "../../../utils/calculator/removeSpaces/removeSpaces";
const Calculator = () => {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    // e.preventDefault();
    const value = e;
    // .target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const signClickHandler = (e) => {
    const value = e;

    setCalc({
      ...calc,
      sign: value,
      res: calc.sign === "" ? calc.num : calc.res, // Only update result if there's no previous sign
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "÷"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };
  const deleteLastNumberHandler = () => {
    if (calc.num.length > 1) {
      const truncatedNum = calc.num.slice(0, -1);
      setCalc({
        ...calc,
        num: truncatedNum,
      });
    } else if (calc.num.length === 1) {
      setCalc({
        ...calc,
        num: 0,
      });
    }
  };
  const handleButtonClick = (btn) => {
    switch (btn) {
      case "C":
        resetClickHandler();
        break;
      case "÷":
      case "X":
      case "-":
      case "+":
        signClickHandler(btn);
        break;
      case "<=":
        deleteLastNumberHandler(btn);
        break;
      case "=": // Handle equals separately to avoid updating result on other operations
        equalsClickHandler();
        break;
      default:
        numClickHandler(btn);
        break;
    }
  };

  return (
    <Wrapper>
      {/* <Screen value={`${calc.num ? : } ${calc.sign ? : } ${calc.res ? : }`} /> */}
      <Screen
        value={`${calc.res ? calc.res : ""} ${calc.sign ? calc.sign : ""} ${
          calc.num ? calc.num : ""
        }`}
      />

      <ButtonBox>
        {btnValues.flat().map((btn, i) => (
          <Button
            key={i}
            className={btn === "=" ? "equals" : ""}
            value={btn}
            onClick={() => {
              handleButtonClick(btn);
            }}
          />
        ))}
      </ButtonBox>
    </Wrapper>
  );
};

export default Calculator;
