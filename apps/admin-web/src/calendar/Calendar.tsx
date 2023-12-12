import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const Calendar: FC<Props> = (props) => {
  const nav = useNavigate();
  return (
    <>
      <p>Example</p>
      <button onClick={() => nav("/")}>Home</button>
    </>
  );
};

export default Calendar;
