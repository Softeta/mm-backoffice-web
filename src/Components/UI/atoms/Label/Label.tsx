interface ILabel {
  text: String;
  className: string;
}

const Label = ({ text, className }: ILabel) => (
  <div className={`pb-2 text-grey-light ${className ?? ""}`}>{text}</div>
);

export default Label;
