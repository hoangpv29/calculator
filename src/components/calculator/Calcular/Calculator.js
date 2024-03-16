import Wrapper from "../Wrapper/Wrapper";
import Screen from "../Screen/Screen";
import ButtonBox from "../ButtonBox/ButtonBox";
import Button from "../Button/Button";
import { btnValues } from "../../../utils/calculator/btnValue/btnValue";
import { useCalculatorLogic } from "../../../utils/calculator/logic/functionLogic";
const Calculator = () => {
  const { calc, handleButtonClick } = useCalculatorLogic();

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
