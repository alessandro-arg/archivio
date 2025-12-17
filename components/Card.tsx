import { Models } from "node-appwrite";

const Card = ({ file }: { file: Models.Row }) => {
  return <div>{file.name}</div>;
};

export default Card;
