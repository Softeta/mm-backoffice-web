import { TCompanyBrief } from "API/Types/Companies/companyBriefGet";

interface ICompanyRow {
  company: TCompanyBrief;
  onRowClick?: (companyId: string) => void;
}

const CompanyRow = ({ company, onRowClick }: ICompanyRow) => (
  <tr
    key={company.id}
    onClick={() => (onRowClick ? onRowClick(company.id) : null)}
  >
    <td className="w-1/4">
      <div className="flex items-center text-sm relative">
        <div className="w-12 mr-2 shrink-0">
          {company.logo?.uri && (
            <img src={company.logo.uri} alt={company.name} />
          )}
        </div>
        <span>{company.name}</span>
      </div>
    </td>
    <td>
      {company.industries &&
        company.industries.map((industry) => (
          <div key={industry.id}>{industry.code}</div>
        ))}
    </td>
    <td>{company.address?.location}</td>
  </tr>
);

export default CompanyRow;
