// Importing necessary dependencies and components
import "./App.css";
import Button from "./components/Button";
import { useState, useEffect } from "react";
import { Themes } from "./components/Themes";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// Defining the main App component
function App() {
  // State variables
  const [currentThemeIndex, setCurrentThemeIndex] = useState(() => {
    const savedIndex = localStorage.getItem("currentThemeIndex");
    return savedIndex ? parseInt(savedIndex) : 0;
  });
  const [Input, setInput] = useState("");
  const [UpperInput, setUpperInput] = useState("");
  const [Operation, setOperation] = useState("");
  const [FinalResult, setFinalResult] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Spring animation configuration
  const spring = {
    type: "spring",
    stiffness: 600,
    damping: 25,
  };

  // CSS class names for buttons based on the current theme
  const NumberClassName = `${
    Themes[currentThemeIndex].KeyBackground
  } transition text-3xl sm:w-4/5 sm:h-3/4 w-full h-full text-center ${
    Themes[currentThemeIndex].KeyShadow
  } rounded-xl flex justify-center items-center ${
    currentThemeIndex === 0
      ? Themes[currentThemeIndex].SecondaryText
      : Themes[currentThemeIndex].MainText
  } ${Themes[currentThemeIndex].HoverKey}`;

  const DeleteClassName = `${Themes[currentThemeIndex].OperatorKeyBackground} transition text-3xl sm:w-4/5 sm:h-3/4 w-full h-full text-center ${Themes[currentThemeIndex].OperatorKeyShadow} rounded-xl flex justify-center items-center text-white`;
  const EqualClassName = `col-span-2 ${Themes[currentThemeIndex].EqualKeyBackground} transition text-3xl sm:w-4/5 sm:h-3/4 w-full h-full text-center ${Themes[currentThemeIndex].EqualKeyShadow} rounded-xl flex justify-center items-center ${Themes[currentThemeIndex].MainText}`;

  // Function to handle theme change
  const handleThemeChange = () => {
    setCurrentThemeIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % Themes.length;
      localStorage.setItem("currentThemeIndex", nextIndex.toString());
      return nextIndex;
    });
  };

  // Function to handle number input
  const handleInput = (Number: string) => {
    setInput((prev) => {
      if (Input === "") {
        return Number;
      }
      if (prev === "0") {
        if (Number === "0") {
          return prev;
        } else if (Number === ".") {
          return prev + Number;
        } else {
          return Number;
        }
      }
      if (prev.includes(".") && Number === ".") {
        return prev;
      }
      return prev + Number;
    });
  };

  // Function to handle operation input
  const handleOperation = (operation: string) => {
    if (Input === "") {
      if (operation === "-") {
        setInput(Input + operation);
      }
      return;
    } else if (Input === "-") {
      return;
    } else if (UpperInput !== "") {
      const result = handleResult();
      Animate("#screen");
      setUpperInput(result + " " + operation);
      setInput("");
      setOperation(operation);
      return;
    }
    Animate("#screen");
    setUpperInput(Input + " " + operation);
    setOperation(operation);
    setInput("");
  };

  const Animate = (element: string) => {
    gsap.fromTo(
      element,
      {
        y: "75%",
        opacity: 0.3,
        duration: 0.2,
        fontSize: 48,
      },
      { y: 0, opacity: 0.6, duration: 0.2, fontSize: 30 }
    );
  };

  // Function to handle delete button click
  const handleDel = (Option: string) => {
    if (Option === "Del") {
      setInput(Input.slice(0, -1));
    } else if (Option === "Reset") {
      setInput("");
      setUpperInput("");
    }
  };

  // Functions for handling long press on delete button
  let Timeout: number;
  const onMouseDown = () => {
    Timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setInput((prevInput) => prevInput.slice(0, -1));
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
      }, 1000);
    }, 750);

    return () => {
      Timeout;
    };
  };
  const onMouseUp = () => {
    clearTimeout(Timeout);
  };

  // Function to handle calculation and display the result
  const handleResult = () => {
    let Result;
    if (Input === "") {
      return;
    }
    if (UpperInput === "") {
      return;
    }
    switch (Operation) {
      case "+":
        Result = parseFloat(Input) + parseFloat(UpperInput);
        setInput(Result.toString());
        setFinalResult(Result.toString());
        setUpperInput("");
        setOperation("");
        break;
      case "-":
        Result = parseFloat(UpperInput) - parseFloat(Input);
        setInput(Result.toString());
        setFinalResult(Result.toString());
        setUpperInput("");
        setOperation("");
        break;
      case "x":
        Result = parseFloat(Input) * parseFloat(UpperInput);
        setInput(Result.toString());
        setFinalResult(Result.toString());
        setUpperInput("");
        setOperation("");
        break;
      case "/":
        if (parseFloat(Input) === 0) {
          setShowModal(true);
          Result = "Wax Nta 3antiiz 9asem 3la 0 🤓☝️";
          setInput("");
          setFinalResult("Wax Nta 3antiiz 9asem 3la 0 🤓☝️");
          setUpperInput("");
          setOperation("");
        } else {
          Result = parseFloat(UpperInput) / parseFloat(Input);
          setInput(Result.toString());
          setFinalResult(Result.toString());
          setUpperInput("");
          setOperation("");
        }
    }
    return Result;
  };

  // Update document title based on the final result
  useEffect(() => {
    if (FinalResult === "") {
      document.title = "Calculator";
    } else if (FinalResult !== "") {
      document.title = `Your Result is: ${FinalResult}`;
      setTimeout(() => {
        document.title = "Calculator";
      }, 5000);
    }
  }, [FinalResult]);

  // Render the calculator UI
  return (
    <>
      <div
        className={`w-full h-full flex justify-center items-center ${Themes[currentThemeIndex].Background} ${Themes[currentThemeIndex].MainText} transition relative`}
      >
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full h-full absolute flex justify-center items-center bg-black/50`}
            >
              <motion.div
                initial={{ x: 1000, rotate: 360 }}
                animate={{ x: 0, rotate: 0 }}
                transition={{ duration: 3 }}
                className={`h-3/4 w-2/4 flex justify-center items-center gap-10 flex-col rounded-3xl ${Themes[currentThemeIndex].KeyPadBackground}`}
              >
                <h2 className="sm:text-7xl text-3xl font-extrabold text-center">
                  Wax Nta 3antiiz 9asem 3la 0 🤓☝️
                </h2>
                <button
                  className={`${Themes[currentThemeIndex].EqualKeyBackground} transition text-3xl w-32 h-20 text-center ${Themes[currentThemeIndex].EqualKeyShadow} rounded-xl flex justify-center items-center ${Themes[currentThemeIndex].MainText}`}
                  onClick={() => setShowModal((prev) => !prev)}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`w-full sm:max-w-xl sm:w-3/5 h-full ${Themes[currentThemeIndex].Background} rounded-xl flex flex-col gap-5 p-6 transition`}
        >
          <div className="w-full flex justify-between items-center">
            <h3 className="text-3xl font-bold ">calc</h3>
            <div className="flex gap-5 justify-center items-end ">
              <h2 className="text-xs font-medium uppercase">Theme</h2>
              <div className="flex flex-col gap-1">
                <div className="flex gap-4 text-TextWhite">
                  <h4>1</h4>
                  <h4>2</h4>
                  <h4>3</h4>
                </div>
                <motion.div
                  layout
                  transition={{ duration: 0.5 }}
                  onClick={handleThemeChange}
                  className={`w-full h-ful bg-ScreenBackground1 p-1 rounded-full flex
                  ${
                    currentThemeIndex === 0
                      ? "justify-start"
                      : currentThemeIndex === 1
                      ? "justify-center"
                      : currentThemeIndex === 2
                      ? "justify-end"
                      : ""
                  }
                  items-center cursor-pointer`}
                >
                  <motion.div
                    className={`w-4 h-4 rounded-full ${Themes[currentThemeIndex].EqualKeyBackground}`}
                    layout
                    transition={spring}
                  >
                    {" "}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col gap-1 w-full rounded-lg ${Themes[currentThemeIndex].ScreenBackground} transition h-2/6 p-2 font-bold`}
          >
            <motion.div
              id="screen"
              className={`break-all translate-y-3/4 w-full h-full text-display flex justify-end items-center opacity-30`}
            >
              {UpperInput}
            </motion.div>
            <motion.div
              className={`break-all flex-wrap-reverse w-full h-full text-display flex justify-end items-center`}
            >
              {Input}
            </motion.div>
          </div>
          <div
            className={`font-bold ${Themes[currentThemeIndex].KeyPadBackground} transition rounded-xl p-4 grid grid-cols-4 gap-5 w-full h-full justify-items-center items-center`}
          >
            <Button
              onClick={() => handleInput("7")}
              ClassName={NumberClassName}
            >
              7
            </Button>
            <Button
              onClick={() => handleInput("8")}
              ClassName={NumberClassName}
            >
              8
            </Button>
            <Button
              onClick={() => handleInput("9")}
              ClassName={NumberClassName}
            >
              9
            </Button>
            <Button
              onClick={() => handleDel("Del")}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              ClassName={DeleteClassName}
            >
              Del
            </Button>
            <Button
              onClick={() => handleInput("4")}
              ClassName={NumberClassName}
            >
              4
            </Button>
            <Button
              onClick={() => handleInput("5")}
              ClassName={NumberClassName}
            >
              5
            </Button>
            <Button
              onClick={() => handleInput("6")}
              ClassName={NumberClassName}
            >
              6
            </Button>
            <Button
              onClick={() => handleOperation("+")}
              ClassName={NumberClassName}
            >
              +
            </Button>
            <Button
              onClick={() => handleInput("1")}
              ClassName={NumberClassName}
            >
              1
            </Button>
            <Button
              onClick={() => handleInput("2")}
              ClassName={NumberClassName}
            >
              2
            </Button>
            <Button
              onClick={() => handleInput("3")}
              ClassName={NumberClassName}
            >
              3
            </Button>
            <Button
              onClick={() => handleOperation("-")}
              ClassName={NumberClassName}
            >
              -
            </Button>
            <Button
              onClick={() => handleInput(".")}
              ClassName={NumberClassName}
            >
              .
            </Button>
            <Button
              onClick={() => handleInput("0")}
              ClassName={NumberClassName}
            >
              0
            </Button>
            <Button
              onClick={() => handleOperation("/")}
              ClassName={NumberClassName}
            >
              /
            </Button>
            <Button
              onClick={() => handleOperation("x")}
              ClassName={NumberClassName}
            >
              x
            </Button>
            <Button
              onClick={() => handleDel("Reset")}
              ClassName={`${DeleteClassName} col-span-2`}
            >
              Reset
            </Button>
            <Button onClick={handleResult} ClassName={EqualClassName}>
              =
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
