import { useCompany } from "API/Calls/companies";
import Modal from "Components/UI/atoms/Modal";
import ModalLoader from "Components/UI/molecules/ModalLoader";
import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "Routes/routes";
import CompanyEdit from "Templates/Companies/CompanyEdit";

const CompanyEditModal = () => {
  const { companyId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const company = useCompany(companyId);

  return company?.data ? (
    <Modal
      disableEscapeKeyDown
      enableSlideAnimation
      open
      onClose={() => {
        navigate(-1);
      }}
    >
      {({ onClose }: any) => (
        <div className="w-full h-100v lg:w-[85vw]">
          <CompanyEdit company={company.data.data} onClose={onClose} />
        </div>
      )}
    </Modal>
  ) : (
    <ModalLoader open />
  );
};

export default CompanyEditModal;
