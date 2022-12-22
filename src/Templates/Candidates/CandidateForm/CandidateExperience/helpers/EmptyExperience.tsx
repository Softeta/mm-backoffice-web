import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import AddIcon from "Assets/Icons/add.svg";
import ColorType from "Components/Enums/colorType";

interface IProps {
  category: string;
  buttonLabel: string;
  onClick: () => void;
}

const EmptyExperience = ({ category, buttonLabel, onClick }: IProps) => {
  const label = `You haven't added any ${category} yet`;
  return (
    <div className="bg-grey-light bg-opacity-25 pt-6 pb-5 mb-6 text-center rounded">
      <h6 className="font-semibold pb-4">{label}</h6>
      <Button
        variant={ButtonVariantType.Outlined}
        label={buttonLabel}
        className="text-xs"
        color={ColorType.Info}
        onClick={onClick}
        startIcon={<img src={AddIcon} alt="" />}
      />
    </div>
  );
};

export default EmptyExperience;
