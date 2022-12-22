import { TIndustry } from "API/Types/industries";
import { TPagedResponse } from "API/Types/pagedResponse";
import { rest } from "msw";

const industriesHandler = rest.get(
  `${process.env.REACT_APP_BACKOFFICE_API}/api/v1/industries`,
  (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<TPagedResponse<TIndustry>>({
        count: 72,
        currentPage: 1,
        pageSize: 100,
        data: [
          { id: "C9062C18-DA5D-4D1A-9517-EC36ADACA3FD", code: "Accounting" },
          {
            id: "072C63CC-AA17-40BC-9113-00DDF65668CA",
            code: "Advertising/Public Relations",
          },
          { id: "0FB3E039-4901-4B47-991F-57ED669AD2ED", code: "Agriculture" },
          { id: "448E3193-22B5-4F3F-8C12-5A9FBC73A60F", code: "Air Transport" },
          {
            id: "4493F4F3-A797-4204-A512-E149C0F75A5B",
            code: "Alternative Energy Production & Services",
          },
          {
            id: "1B946F6B-2A91-434E-9C9A-09F79513FAF0",
            code: "Architectural Services",
          },
          { id: "67984AD8-15D4-467E-9B00-BFC5A62709E1", code: "Automotive" },
          { id: "557F6031-EAE8-4DF8-9C4D-F145CDEF155B", code: "Banking" },
          {
            id: "0BC1CCA2-03C7-4DAE-AFF2-BB6EDA7B0648",
            code: "Bars & Restaurants",
          },
          { id: "A3383893-E740-4C88-BDA0-0B8719E85D69", code: "Betting" },
          { id: "D45275A2-7132-471A-A47B-F96DBC313CB8", code: "Biotech" },
          {
            id: "B6465D73-802A-4FB7-A859-1AD963A0C603",
            code: "Broadcasting, Radio/TV",
          },
          {
            id: "22D1C0A1-FC86-4913-AB53-9E14323E321F",
            code: "Building Materials & Equipment",
          },
          {
            id: "19ABF924-3B18-43DA-89F8-955BA1240F5B",
            code: "Business Services",
          },
          {
            id: "2B21DC8E-039D-4A65-866C-403AD3C2490B",
            code: "Chemical Manufacturing",
          },
          {
            id: "D14B3A67-0E33-47AE-8BF4-71D7DE7F4B8D",
            code: "Clothing Manufacturing",
          },
          {
            id: "11BB28FA-8F09-4E23-AA8B-B1B79EA09A19",
            code: "Computer Software",
          },
          {
            id: "6F11E34A-EBC8-4D55-9A07-F14552E57ABB",
            code: "Computer Hardware",
          },
          {
            id: "03F457ED-BF30-4ACD-A4F3-4DD613CD39CF",
            code: "Construction Services",
          },
          { id: "4442F323-F639-4E55-8A73-4274BF3EB1A4", code: "Consulting" },
          { id: "2B462D67-C623-4FE3-9B75-88326B61C486", code: "Dairy" },
          { id: "2607B23B-559E-49C3-A017-52DA6C122143", code: "Defense" },
          { id: "72BC8F24-ADE7-468D-93F6-695A526FF492", code: "Design" },
          { id: "C8660E94-E9CA-4FC4-96AA-4F31289AEAED", code: "Education" },
          {
            id: "B015BCBA-3094-490D-A65E-D71F5FE8F0EB",
            code: "Electronics Manufacturing & Equipment",
          },
          {
            id: "E456B4D1-39C9-47AD-983C-760F399D14BE",
            code: "Energy & Natural Resources",
          },
          { id: "518445C2-6D86-447B-A85A-671936A86F56", code: "Entertainment" },
          {
            id: "6709B3C7-AFB3-4572-9AB6-97F6BC451FCA",
            code: "Environmental Services",
          },
          { id: "595B9FD6-6D90-407C-A32E-FF1F57B531F7", code: "Farming" },
          { id: "98EE2426-B9F1-4C96-B688-88C2F878F124", code: "Finance" },
          { id: "7B864540-6CE5-40FD-9B38-64AF890FCF7D", code: "Fintech" },
          {
            id: "F3B7AA2D-51E1-4001-809B-BB2FA74BCE08",
            code: "Food & Beverage",
          },
          { id: "53FC39DE-4A03-430B-BB8E-BFEA1904D677", code: "Furniture" },
          { id: "F066C58B-EA1D-4B86-A913-B91AA28ED86C", code: "Healthcare" },
          { id: "7E33DDEB-1413-41B3-BA3C-938507C817FD", code: "Hospitality" },
          { id: "9C03AE71-3217-45B2-AA30-8BD929DE06AA", code: "Human Rights" },
          { id: "39d0ff6e-18b2-4d4f-b6f0-73522bff0699", code: "Insurance" },
          {
            id: "d300d21f-67bf-484c-8b72-8c51c31f0e02",
            code: "Internet Publishing",
          },
          { id: "2b5af375-6518-466a-ad66-09384331495d", code: "IT services" },
          {
            id: "92332711-0815-4801-9692-8cf986f62f6e",
            code: "IT Services and IT Consulting",
          },
          { id: "14d7a8db-860e-485e-b6dc-a902df0fa39b", code: "Law" },
          {
            id: "1cb86fbb-6f74-4a79-a343-3765ce77091f",
            code: "Leisure, Travel & Tourism",
          },
          { id: "de98efd2-788b-494f-a4c1-efee3c1bdfa5", code: "Marketing" },
          { id: "16264175-c80c-498a-92f1-450f99bd0a42", code: "Manufacturing" },
          {
            id: "f2fd4d54-870b-4004-9cc4-85672096cc35",
            code: "Marine Transport",
          },
          {
            id: "5366c304-8f2a-4dd7-a2fb-17a24b7e6329",
            code: "Media Production",
          },
          {
            id: "43160a82-3b35-44d2-ad44-72914c13e546",
            code: "Medical Equipment Manufacturing",
          },
          { id: "c3811798-8f61-42a9-a89c-47c57920f932", code: "Mining" },
          {
            id: "2d78f2fb-a235-4e2e-a84e-38d39d1de5cb",
            code: "Music Production",
          },
          {
            id: "68240c22-6700-4c23-8ee8-36b879462d23",
            code: "Non-profits, Foundations & Philanthropists",
          },
          { id: "5c87442e-9da4-447c-b423-1157b61150df", code: "Oil & Gas" },
          { id: "41ee47b7-9d78-4ccc-93dc-423c2c47bc19", code: "Other" },
          {
            id: "283576fb-9a39-4862-b536-2d93d5f1215a",
            code: "Pharmaceuticals / Health Products",
          },
          {
            id: "fd67b81c-59ba-41d7-9ce8-d3f081e55786",
            code: "Phone Companies",
          },
          {
            id: "ffb78878-20d7-4559-9340-877daf08f58b",
            code: "Physicians & Other Health Professionals",
          },
          {
            id: "d896e7b0-5454-4f15-b980-d9d71035a745",
            code: "Power Utilities",
          },
          {
            id: "3df62bc9-d996-4c22-941d-06650dd19b7c",
            code: "Private Equity & Investment Firms",
          },
          { id: "62a372f0-d0eb-44aa-b8ca-0c1bb1c4dc96", code: "Public Sector" },
          {
            id: "aa928f5f-9b4d-4dca-bfcb-493b289f1caa",
            code: "Publishing & Printing",
          },
          {
            id: "cccba3b2-0040-48cb-9a64-8e314f8589ae",
            code: "Radio/TV Stations",
          },
          { id: "ad3ce907-babb-419a-b47b-cc912e5ea89a", code: "Real Estate" },
          { id: "1ec94fb6-7634-4868-a860-722a076a3755", code: "Restaurants" },
          { id: "2de8ce26-e0d0-4334-8cc6-91cb438de8d9", code: "Retail" },
          {
            id: "3b1d6892-03c7-4e17-8de9-040661b12358",
            code: "Retail Apparel and Fashion",
          },
          { id: "6b428889-4b24-411d-b54b-616435fe0989", code: "SaaS" },
          { id: "8d3aec1f-b29c-46c7-93bc-60e7ed7470fc", code: "Sports" },
          {
            id: "3ba42583-1f34-4330-ab98-09b4c2e0ea39",
            code: "Telecom Services & Equipment",
          },
          { id: "49f5283b-6288-4910-b61b-87e51ab5d88c", code: "Tobacco" },
          {
            id: "18c362ba-7d69-4f3b-96e5-afdfe2bc74a0",
            code: "Transportation",
          },
          { id: "fe45584a-1d73-4447-bb4b-e767c7139379", code: "TV Production" },
          { id: "90fbc5a7-1715-4d3a-977a-0823dd38ef1a", code: "Union" },
          {
            id: "9ac4d76e-45ff-494d-837d-32ae01f8b648",
            code: "Venture Capital",
          },
          {
            id: "bebaa3bc-89f4-4648-9340-811e7a4bd2e9",
            code: "Waste Management",
          },
        ],
      })
    )
);

export default industriesHandler;
