import Wrapper from "../Wrapper/Wrapper";
import Screen from "../Screen/Screen";
import ButtonBox from "../ButtonBox/ButtonBox";
import Button from "../Button/Button";
import { btnValues } from "../../utils/btnValue/btnValue";
import { useCalculatorLogic } from "../../utils/logic/functionLogic";
const Calculator = () => {
  const {
    calc,
    numClickHandler,
    commaClickHandler,
    signClickHandler,
    equalsClickHandler,
    invertClickHandler,
    percentClickHandler,
    resetClickHandler,
    deleteLastNumberHandler,
  } = useCalculatorLogic();

  return (
    <Wrapper>
      {/* <Screen value={`${calc.num ? : } ${calc.sign ? : } ${calc.res ? : }`} /> */}
      <Screen
        value={`${calc.res ? calc.res : ""} ${calc.sign ? calc.sign : ""} ${
          calc.num ? calc.num : ""
        }`}
      />

      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "÷"
                  ? signClickHandler
                  : btn === "X"
                  ? signClickHandler
                  : btn === "-"
                  ? signClickHandler
                  : btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : btn === "<="
                  ? deleteLastNumberHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default Calculator;
