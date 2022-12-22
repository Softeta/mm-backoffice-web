import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import { useState } from "react";
import PencilIcon from "Assets/Icons/pencil.svg";
import BinIcon from "Assets/Icons/bin.svg";
import ContactPersonCard from "Components/UI/molecules/ContactPersonCard";
import { TContactPerson } from "Components/Types/TContactPerson";

interface IProps {
  person: TContactPerson;
  className?: string;
  onDelete: (id: string) => void;
  readonly?: boolean;
  onEdit: (id: string) => void;
}

const ContactPerson = ({
  className,
  onDelete,
  onEdit,
  person,
  readonly = false,
}: IProps) => {
  const [displayEdit, setDisplayEdit] = useState("hidden");

  return (
    <div
      className="relative"
      onMouseEnter={() => setDisplayEdit("")}
      onMouseLeave={() => setDisplayEdit("hidden")}
    >
      <ContactPersonCard
        person={person}
        className={`${{ className }} pr-[15%]`}
      />
      {!readonly && !person.isMainContact && (
        <div className="absolute top-3.5 right-3.5 w-full h-full flex justify-end">
          <Button
            className={`min-w-0 h-min p-0 mr-2 ${displayEdit}`}
            variant={ButtonVariantType.Text}
            color={ColorType.Info}
            onClick={() => onEdit(person.id)}
            startIcon={
              <img className="relative left-1" src={PencilIcon} alt="" />
            }
          />
          <Button
            className="min-w-0 h-min p-0"
            variant={ButtonVariantType.Text}
            color={ColorType.Info}
            onClick={() => onDelete(person.id)}
            startIcon={<img className="relative left-1" src={BinIcon} alt="" />}
          />
        </div>
      )}
    </div>
  );
};

export default ContactPerson;
