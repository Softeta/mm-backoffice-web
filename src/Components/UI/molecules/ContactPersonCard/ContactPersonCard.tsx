import { TContactPerson } from "Components/Types/TContactPerson";
import Avatar from "Components/UI/atoms/Avatar";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";

interface IProps {
  person: TContactPerson;
  className?: string;
}

const ContactPersonCard = ({ person, className }: IProps) => (
  <div
    className={`w-full contact-person-card flex gap-2 rounded-lg p-2 mb-0.5 break-all ${
      className ?? ""
    }`}
  >
    {person.picture?.uri && (
      <Avatar imageURL={person.picture.uri} size={AvatarSizeType.Large} />
    )}
    <div className="text-xs font-semibold text-grey-dark self-center">
      <div className="mb-1 flex">
        <div>
          {person.firstName} {person.lastName}
        </div>
        {person.position?.code && (
          <div className="ml-1 text-grey-middle">- {person.position?.code}</div>
        )}
      </div>
      <div className="text-grey-middle">{person.email}</div>
    </div>
  </div>
);
export default ContactPersonCard;
