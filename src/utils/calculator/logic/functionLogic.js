import removeSpaces from "../removeSpaces/removeSpaces";
import toLocaleString from "../toLocaleString/toLocaleString";

/**
 * Thực hiện việc xử lý khi người dùng nhấn vào số hoặc dấu chấm
 * @param {number|string} calc - Giá trị hiện tại của dòng tính toán
 * @param {string} value - Giá trị của nút được nhấn
 * @returns {string} - Giá trị mới của dòng tính toán sau khi nhấn
 */
export function handleNum(calc, value) {
  let result;

  switch (true) {
    case calc === 0 && value === "0":
      result = "0";
      break;
    case removeSpaces(calc) % 1 === 0:
      result = toLocaleString(Number(removeSpaces(calc + value)));
      break;
    default:
      result = toLocaleString(calc + value);
      break;
  }

  return result;
}

/**
 * Xác định giá trị mặc định của kết quả dựa trên giá trị của dòng tính toán
 * @param {object} calc - Đối tượng dòng tính toán
 * @returns {number} - Giá trị kết quả mặc định
 */
export function calculateResDefault(calc) {
  return !calc.sign ? 0 : calc.res;
}

/**
 * Cập nhật giá trị kết quả dựa trên dấu hiện tại của dòng tính toán
 * @param {object} calc - Đối tượng dòng tính toán
 * @returns {number} - Giá trị kết quả được cập nhật
 */
export function updateResult(calc) {
  return calc.sign === "" ? calc.num : calc.res;
}

/**
 * Thực hiện phép tính số học dựa trên dòng tính toán hiện tại
 * @param {object} calc - Đối tượng dòng tính toán
 * @returns {string|number} - Kết quả phép tính hoặc thông báo lỗi nếu có
 */
export function performMathOperation(calc) {
  const math = (a, b, sign) => {
    switch (sign) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "X":
        return a * b;
      case "÷":
        return a / b;
      default:
        throw new Error("Invalid operation sign");
    }
  };

  if (calc.num === "0" && calc.sign === "÷") {
    return "Can't divide with 0";
  } else {
    return toLocaleString(
      math(
        Number(removeSpaces(calc.res)),
        Number(removeSpaces(calc.num)),
        calc.sign
      )
    );
  }
}

/**
 * Xử lý việc xóa ký tự cuối cùng của dòng tính toán
 * @param {object} calc - Đối tượng dòng tính toán
 * @returns {object} - Đối tượng dòng tính toán mới sau khi xóa
 */
export function handleDeleteLastNumber(calc) {
  if (calc.num.length > 1) {
    const truncatedNum = calc.num.slice(0, -1);
    return {
      ...calc,
      num: truncatedNum,
    };
  } else if (calc.num.length === 1) {
    return {
      ...calc,
      num: 0,
    };
  }
  return calc;
}
