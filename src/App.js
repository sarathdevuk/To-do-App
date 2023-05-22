import "./App.css";
import { useEffect, useRef, useState } from "react";
import {RiDeleteBin7Fill} from 'react-icons/ri'


function App() {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() !== "") {
      setToDos( [...toDos, { id: Date.now(), text: input, status: false }]);
      localStorage.setItem(
        "input",
        JSON.stringify([
          ...toDos,
          { text: input, id: Date.now(), status: false },
        ])
      );
      setInput("");
    }
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
    if (localStorage.getItem("input")) {
      //key from handlesum
      setToDos(JSON.parse(localStorage.getItem("input")));
    }
    // todoInputRef.current.style.color="red"
  }, []);

  function deleteTodo(id) {
    let newTodo = toDos.filter((items) => {
      return items.id != id;
    });
    setToDos(newTodo);
    localStorage.setItem("input", JSON.stringify([...newTodo]));
  }

  return (
    <div className="app">
      <div className="border">
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>
        <div className="subHeading">
          <br />
          <h3>Dreams don't work unless you do...! </h3>
        </div>
        <div className="input">
          <input
            value={input}
            ref={inputRef}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="🖊️ Add item..."
          />
          <i onClick={addTodo} className="fas fa-plus"></i>
        </div>
        <div className="todos">
          {toDos.map((obj) => {
            return (
              <div className={ obj.status ? "cross"  :"todo"}>
                <div className={ obj.status ? "left-cross" : "left"}>
                  <input
                    onChange={(e) => {
                      console.log(e.target.value);
                      setToDos(
                        toDos.filter((obj2) => {
                          if (obj2.id === obj.id) {
                            obj2.status = e.target.checked;
                  
                          }
                          localStorage.setItem('input', JSON.stringify(toDos));
                          return obj2;
                        })
                      );
                    }}
                    value={obj.status}
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <p>{obj.text}</p>
                </div>
                <div className="right">
                  <RiDeleteBin7Fill
                    onClick={() => deleteTodo(obj.id)}
                    className="fas fa-times"
                  ></RiDeleteBin7Fill>
                </div>
              </div>
            );
          })}

        
        </div>
      </div>
    </div>
  );
}

export default App;
