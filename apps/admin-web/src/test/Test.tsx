import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { increment } from "./test.slice";

function Test() {
  const count = useAppSelector((state) => state.test.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>count is {count}</button>
        <p>
          Edit <code>src/Test.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Test;
