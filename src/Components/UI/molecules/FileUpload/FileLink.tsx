interface IProps {
  uri?: string;
  name?: string;
}

const FileLink = ({ uri, name }: IProps) =>
  uri ? (
    <a href={uri} target="_blank" rel="noreferrer">
      {name}
    </a>
  ) : (
    <div>{name}</div>
  );

export default FileLink;
