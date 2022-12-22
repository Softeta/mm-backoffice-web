import PencilIcon from "Assets/Icons/pencil.svg";
import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";

import { TJobCalibrateCompanyRequest } from "API/Types/Jobs/jobCalibrateCompany";
import { TJobCompanyResponse } from "API/Types/Jobs/Common/jobCompanyResponse";
import CompanyInfo from "Templates/Jobs/CompanyInfo";
import { useEffect, useState } from "react";
import {
  TCompanyInfoState,
  TCompanyInfoUpdate,
} from "Templates/Jobs/CompanyInfo/CompanyInfo";
import {
  contentStateToHtml,
  EditorState,
  htmlToContentState,
} from "Components/UI/organisms/RichTextInput";

interface IJobCompanyCallibration {
  /** company information individual for the job */
  jobCompany: TJobCompanyResponse;
  disabled?: boolean;
  hideAddNewContact?: boolean;
  onSubmit: (data: TJobCalibrateCompanyRequest) => void;
}

const jobCompanyToCompanyInfoState = (company: TJobCompanyResponse) => ({
  descriptionEditorState: EditorState.createWithContent(
    htmlToContentState(company.description ?? "")
  ),
  address: company.address,
  contactPersons: company.contactPersons,
});

const JobCompanyCallibration = ({
  jobCompany,
  disabled = false,
  hideAddNewContact,
  onSubmit,
}: IJobCompanyCallibration) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [companyInfoState, setCompanyInfoState] = useState<TCompanyInfoState>(
    jobCompanyToCompanyInfoState({ ...jobCompany })
  );

  useEffect(() => {
    setCompanyInfoState(jobCompanyToCompanyInfoState({ ...jobCompany }));
  }, [jobCompany]);

  const handleChange = (company: TCompanyInfoUpdate) => {
    setCompanyInfoState((prev) => ({ ...prev, ...company }));
  };

  const handleApplyChanges = () => {
    setEditMode(false);
    onSubmit({
      id: jobCompany.id,
      description: contentStateToHtml(companyInfoState.descriptionEditorState),
      address: companyInfoState.address,
      contactPersons: companyInfoState.contactPersons || [],
    });
  };

  return (
    <>
      <div className="flex flex-col grow min-h-0">
        <CompanyInfo
          companyId={jobCompany.id}
          descriptionEditorState={companyInfoState.descriptionEditorState}
          address={companyInfoState.address}
          contactPersons={companyInfoState.contactPersons}
          readOnly={!editMode}
          hideAddNewContact={hideAddNewContact}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between items-center p-4 border-t border-alto mt-auto">
        {editMode ? (
          <Button
            label="Apply changes"
            variant={ButtonVariantType.Contained}
            color={ColorType.Primary}
            onClick={handleApplyChanges}
          />
        ) : (
          <Button
            label="Edit information"
            disabled={disabled}
            variant={ButtonVariantType.Outlined}
            startIcon={<img src={PencilIcon} alt="" />}
            color={ColorType.Info}
            onClick={() => setEditMode(true)}
          />
        )}
      </div>
    </>
  );
};

export default JobCompanyCallibration;
