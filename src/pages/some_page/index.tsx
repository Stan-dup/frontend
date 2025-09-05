import { useParams } from "react-router-dom";

const SomePage = () => {
  const id = useParams().id;
  return <div>awesome! {id}</div>;
};

export default SomePage;
