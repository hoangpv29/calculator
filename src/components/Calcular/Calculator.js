import Wrapper from "../Wrapper/Wrapper";
import Screen from "../Screen/Screen";
import ButtonBox from "../ButtonBox/ButtonBox";
import Button from "../Button/Button";
import toLocaleString from "../../utils/toLocaleString/toLocaleString";
import removeSpaces from "../../utils/removeSpaces/removeSpaces";
import { useState } from "react";
import { btnValues } from "../../utils/btnValue/btnValue";

const Calculator = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  /**
   * Hàm xử lý khi người dùng click vào một số hoặc dấu chấm.
   * Hàm này cập nhật giá trị hiện tại của `calc.num` dựa trên giá trị được click và kiểm tra số lượng ký tự đã nhập.
   * @param {object} e - Sự kiện click.
   */
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

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

  /**
   * Hàm xử lý khi người dùng click vào nút dấu phẩy (comma).
   * Hàm này cập nhật giá trị hiện tại của `calc.num` để thêm dấu phẩy vào số.
   * @param {object} e - Sự kiện click.
   */
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  /**
   * Hàm xử lý khi người dùng click vào một dấu toán.
   * Hàm này cập nhật dấu toán hiện tại và kết quả tính toán (nếu có) trước khi thực hiện phép tính mới.
   * @param {object} e - Sự kiện click.
   */
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  /**
   * Hàm xử lý khi người dùng click vào nút bằng (=).
   * Hàm này thực hiện phép tính và cập nhật kết quả vào `calc.res`.
   */
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

  /**
   * Hàm xử lý khi người dùng click vào nút đảo dấu (+/-).
   * Hàm này đảo dấu của số hiện tại hoặc kết quả tính toán hiện tại.
   */
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  /**
   * Hàm xử lý khi người dùng click vào nút phần trăm (%).
   * Hàm này tính phần trăm của số hiện tại hoặc kết quả tính toán hiện tại.
   */
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  /**
   * Hàm xử lý khi người dùng click vào nút reset (C).
   * Hàm này đặt lại tất cả giá trị về trạng thái ban đầu.
   */
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  /**
   * Hàm xử lý khi người dùng click vào nút xóa ký tự cuối cùng (<=).
   * Hàm này xóa ký tự cuối cùng khỏi số hiện tại.
   */
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
