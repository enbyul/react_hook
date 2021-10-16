import "./styles.css";
import { useState } from "react";

const useInput = (init, vali) => {
  //useInput의 아규먼트는 (a, b)
  //a : value, 변수 지정안하고 useInput.value해보면 value값이 나옴. string
  //b : type function / boolen 반환할떄 사용함.
                        //3. 받아온 function => vali
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    const {
      target: { value }
    } = e;
    // const value = e.target.value;
    let willUpdate = true;
    if (typeof vali === "function") {
      //function이 아니라 다른 타입이 들어오면 에러난다는데..
      //maxLen을 useInput의 function type인 vali에 집어넣음
      //근데 maxLen가 function이 아니면 에러남
      //검증해주면 실행이 안되니 에러안남, 그냥 작동을 안할뿐 ~
      willUpdate = vali(value);
                    //4. vali function에 아규먼트 value값 전송
                    //7. willUpdate = false
    }
    if (willUpdate) {
        //8. false라서 업데이트 안함
      setValue(value);
    }
    // console.log(typeof vali);
  };
  return { value, onChange };
};

const App = () => {
  const maxLen = (value) => value.length <= 10;
                            //1. 조건식 function으로 생성
                            //5. 전달받은 value값으로 조건식 실행. => 조건식 false 되면
  const name = useInput("Mr.", maxLen);
                            //2. useInput function에 만든 function(maxLen)넣음
  //console.log(value);
  const [item, setItem] = useState(1);
  const incItem = () => setItem(item + 1);
  const deItem = () => setItem(item - 1);
  return (
    <div className="App">
      <h1>Hello{item}</h1>
      <button onClick={incItem}>incItem</button>
      <button onClick={deItem}>deItem</button>
      <input placeholder="Name" {...name} />
    </div>
  );
};

export default App;
