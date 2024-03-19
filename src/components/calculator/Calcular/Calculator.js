import Wrapper from "../Wrapper/Wrapper";
import Screen from "../Screen/Screen";
import ButtonBox from "../ButtonBox/ButtonBox";
import Button from "../Button/Button";
import { btnValues } from "../../../utils/calculator/btnValue/btnValue";
import { useState } from "react";
import removeSpaces from "../../../utils/calculator/removeSpaces/removeSpaces";
import {
  calculateResDefault,
  handleDeleteLastNumber,
  handleNum,
  performMathOperation,
  updateResult,
} from "../../../utils/calculator/logic/functionLogic";

const Calculator = () => {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  // Tính toán biểu thức hiển thị trên màn hình
  const calculateDisplayValue = () => {
    return `${calc.res ? calc.res : ""} ${calc.sign ? calc.sign : ""} ${
      calc.num ? calc.num : ""
    }`;
  };

  // Xử lý khi người dùng nhấn vào số
  const handleNumClick = (value) => {
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num: handleNum(calc.num, value),
        res: calculateResDefault(calc),
      });
    }
  };

  // Xử lý khi người dùng nhấn vào dấu toán học
  const handleSignClick = (value) => {
    setCalc({
      ...calc,
      sign: value,
      res: updateResult(calc),
      num: 0,
    });
  };

  // Xử lý khi người dùng nhấn vào nút '='
  const handleEqualsClick = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res: performMathOperation(calc),
        sign: "",
        num: 0,
      });
    }
  };

  // Xử lý khi người dùng nhấn vào nút 'C' (reset)
  const handleResetClick = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  // Xử lý khi người dùng nhấn vào nút 'Backspace' (xóa ký tự cuối cùng)
  const handleDeleteLastNumberClick = () => {
    setCalc(handleDeleteLastNumber(calc));
  };

  // Xử lý sự kiện click của mỗi nút
  const handleButtonClick = (btn) => {
    switch (btn) {
      case "C":
        handleResetClick();
        break;
      case "÷":
      case "X":
      case "-":
      case "+":
        handleSignClick(btn);
        break;
      case "<=":
        handleDeleteLastNumberClick();
        break;
      case "=":
        handleEqualsClick();
        break;
      default:
        handleNumClick(btn);
        break;
    }
  };

  return (
    <Wrapper>
      {/* Màn hình hiển thị */}
      <Screen value={calculateDisplayValue()} />

      {/* Hộp chứa nút */}
      <ButtonBox>
        {/* Tạo nút cho mỗi giá trị */}
        {btnValues.flat().map((btn, i) => (
          <Button
            key={i}
            className={btn === "=" ? "equals" : ""}
            value={btn}
            // Xử lý sự kiện click cho mỗi nút
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
