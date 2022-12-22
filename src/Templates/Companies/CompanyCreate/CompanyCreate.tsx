import { useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";
import TopBar from "Components/UI/molecules/TopBar";
import Button from "Components/UI/atoms/Button";
import { Tab, Tabs } from "Components/UI/atoms/Tabs";
import ModalLoader from "Components/UI/molecules/ModalLoader";
import {
  TCompanyCreateForm,
  TCompanyCreateRequest,
} from "API/Types/Companies/companyCreate";
import { useSetRecoilState } from "recoil";
import snackbarState from "Components/UI/molecules/Snackbar/snackbarState";
import { AlertColor } from "@mui/material";
import { useForm } from "react-hook-form";
import { createCompany } from "API/Calls/companies";
import { CompanyCreateForm } from "../CompanyForms";
import CompanyHeader from "../CompanyHeader";
import { ICompanyHeader } from "../CompanyHeader/CompanyHeader";

const validationSchema = yup.object({
  person: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
  }),
});

interface IProps {
  onClose: () => void;
}

enum TabSections {
  Info,
}

export const CompanyCreate = ({ onClose }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isValidCompany, setIsValidCompany] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<TabSections>(0);
  const [isLogoLoading, setIsLogoLoading] = useState<boolean>(false);
  const [isContactPersonPictureLoading, setIsContactPersonPictureLoading] =
    useState<boolean>(false);
  const [isPhoneError, setIsPhoneError] = useState<boolean>(false);

  const form = useForm<TCompanyCreateForm>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const setSnackbar = useSetRecoilState(snackbarState);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleFormSubmit = async () => {
    await form.trigger();
    if (!form.formState.isValid) return;
    if (isPhoneError) return;
    if (!isValidCompany) {
      showSnackbar("Company details is required", "error");
      return;
    }
    setLoading(true);
    try {
      const request = { ...form.getValues() } as TCompanyCreateRequest;
      await createCompany(request);
      onClose();
    } catch {
      setLoading(false);
    }
  };

  const handleContactPersonPictureUpload = (cacheId?: string) => {
    form.setValue("person.picture.cacheId", cacheId);
  };

  const formData = form.watch();

  const headerProps: ICompanyHeader = useMemo(
    () => ({
      logoUri: formData.attachedLogoUrl,
      name: formData.name,
      registrationNumber: formData.registrationNumber,
      industries: formData.industries?.map((x) => x.code),
      websiteUrl: formData.websiteUrl,
      linkedInUrl: formData.linkedInUrl,
      glassdoorUrl: formData.glassdoorUrl,
    }),
    [formData]
  );

  const infoOpen = selectedTab === TabSections.Info;

  return (
    <div className="flex flex-col h-full">
      <TopBar onClose={onClose}>
        <CompanyHeader {...headerProps} />
      </TopBar>
      <div className="flex bg-grey-light/25 border-b border-alto pl-1">
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Company info" />
        </Tabs>
      </div>
      <div className="my-8 px-6 overflow-y-auto overflow-x-visible">
        <div className={`grid grid-cols-1 ${infoOpen ? "" : "hidden"}`}>
          <CompanyCreateForm
            form={form}
            onCompanyValidate={setIsValidCompany}
            onLogoLoading={setIsLogoLoading}
            onContactPersonPictureLoading={setIsContactPersonPictureLoading}
            onContactPersonPictureUpload={handleContactPersonPictureUpload}
            onPhoneError={setIsPhoneError}
          />
        </div>
      </div>
      <div className="h-16 flex justify-between items-center p-4 border-t border-alto mt-auto">
        <ModalLoader open={loading} />
        <Button
          label="Create a company"
          type="submit"
          disabled={isLogoLoading || isContactPersonPictureLoading}
          onClick={handleFormSubmit}
        />
      </div>
      <DevTool control={form.control} />
    </div>
  );
};

export default CompanyCreate;
