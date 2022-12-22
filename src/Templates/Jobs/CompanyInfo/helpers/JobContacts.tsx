import { JobContactPerson } from "Components/UI/organisms/ContactPerson";
import { useMemo } from "react";
import { TJobCompanyContactPersonResponse } from "API/Types/Jobs/Common/jobCompanyContactPersonResponse";
import { TCompanyContactPerson } from "API/Types/Companies/common/companyContactPerson";
import ContactSelection from "Templates/CompanyContacts/ContactSelection";

interface IJobContacts {
  companyId: string;
  jobContacts: TJobCompanyContactPersonResponse[];
  readOnly: boolean;
  hideAddNew?: boolean;
  onChange: (contacts: TJobCompanyContactPersonResponse[]) => void;
}

const JobContacts = ({
  companyId,
  jobContacts,
  readOnly,
  hideAddNew,
  onChange,
}: IJobContacts) => {
  const jobContactsList = useMemo(() => {
    const index = jobContacts?.findIndex((p) => p.isMainContact);

    if (!index || index === -1) return jobContacts;

    const contacts = [...jobContacts];
    return [...contacts.splice(index, 1), ...contacts];
  }, [jobContacts]);

  const handleContactSelect = (contact: TCompanyContactPerson) => {
    if (!contact) return;

    const newJobContact: TJobCompanyContactPersonResponse = {
      id: contact.id,
      firstName: contact.firstName ?? "",
      lastName: contact.lastName ?? "",
      email: contact.email ?? "",
      position: {
        id: contact.position?.id ?? "",
        code: contact.position?.code ?? "",
      },
      phoneNumber: contact.phone?.phoneNumber,
      picture: contact.picture,
      isMainContact: false,
    };

    onChange([...jobContacts, newJobContact]);
  };

  const handleContactDelete = (id: string) => {
    onChange(jobContacts.filter((person) => person.id !== id));
  };

  const handleMakeContactMain = (id: string) => {
    onChange(
      jobContacts.map((person) => {
        if (person.isMainContact) return { ...person, isMainContact: false };
        if (person.id === id) return { ...person, isMainContact: true };
        return person;
      })
    );
  };

  return (
    <div className="p-6 pt-8 min-h-[200px] grow">
      <div className="flex">
        <div className="font-semibold mb-4 pt-1.5">Contact persons</div>
        {!readOnly && !hideAddNew && (
          <ContactSelection
            companyId={companyId}
            hiddenContacts={jobContacts}
            onContactSelect={handleContactSelect}
          />
        )}
      </div>
      <div className="text-xs text-grey-middle h-4 mb-2">Main contact</div>
      <div className="grid grid-cols-3 text-xs gap-4">
        {jobContactsList.map((contact) => (
          <div key={contact.id} className="">
            <JobContactPerson
              onDelete={handleContactDelete}
              onMakeContactMain={handleMakeContactMain}
              person={contact}
              readonly={readOnly}
              className="contact-person-card-hover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobContacts;
