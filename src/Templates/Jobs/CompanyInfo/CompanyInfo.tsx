import RichTextInput, {
  EditorState,
} from "Components/UI/organisms/RichTextInput";
import AddressSingleSelect from "Components/Select/AddressSelect/AddressSingleSelect";
import FormControl from "@mui/material/FormControl";
import { TJobCompanyContactPersonResponse } from "API/Types/Jobs/Common/jobCompanyContactPersonResponse";
import { TAddress } from "API/Types/address";
import JobContacts from "./helpers/JobContacts";

interface ICompanyInfo {
  companyId: string;
  descriptionEditorState: EditorState;
  address?: TAddress;
  contactPersons: TJobCompanyContactPersonResponse[];
  readOnly?: boolean;
  hideAddNewContact?: boolean;
  onChange: (companyInfo: TCompanyInfoUpdate) => void;
}

export type TCompanyInfoUpdate = {
  descriptionEditorState?: EditorState;
  address?: TAddress;
  contactPersons?: TJobCompanyContactPersonResponse[];
};

export type TCompanyInfoState = Required<TCompanyInfoUpdate>;

const CompanyInfo = ({
  companyId,
  descriptionEditorState,
  address,
  contactPersons,
  readOnly = true,
  hideAddNewContact,
  onChange,
}: ICompanyInfo) => {
  const handleDescriptionChange = (value: EditorState) => {
    onChange({ descriptionEditorState: value });
  };

  const handleContactsChange = (value: TJobCompanyContactPersonResponse[]) => {
    onChange({ contactPersons: value });
  };

  return (
    <div className="flex flex-col grow min-h-0">
      <div className="flex flex-row grow justify-between border-b border-alto min-h-0">
        <div className="grow border-r border-alto  py-6 pt-8 overflow-hidden flex flex-col">
          <div className="font-semibold px-6 mb-4">About company</div>
          <RichTextInput
            editorState={descriptionEditorState}
            readOnly={readOnly}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="p-6 pt-8">
          <div className="font-semibold mb-4">Workplace location</div>
          <div className="text-xs w-80">
            {!readOnly ? (
              <FormControl fullWidth>
                <AddressSingleSelect
                  selectedValue={address?.addressLine ?? ""}
                  onItemSelect={(value) => onChange({ address: value })}
                  label="Address"
                />
              </FormControl>
            ) : (
              `${address?.addressLine ?? ""}`
            )}
          </div>
        </div>
      </div>
      <JobContacts
        companyId={companyId}
        jobContacts={contactPersons}
        readOnly={readOnly}
        hideAddNew={hideAddNewContact}
        onChange={handleContactsChange}
      />
    </div>
  );
};

export default CompanyInfo;
