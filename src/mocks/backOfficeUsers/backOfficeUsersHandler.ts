import { TBackOfficeUsers } from "API/Types/backOfficeUsers";
import { rest } from "msw";

const backOfficeUsersHandler = rest.get(
  `${process.env.REACT_APP_BACKOFFICE_API}/api/v1/users`,
  (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<TBackOfficeUsers>({
        users: [
          {
            id: "62e2eda7-737c-498e-82bc-0f82f312834a",
            firstName: "Paulius",
            lastName: "Papaurėlis",
            email: "paulius.papaurelis@softeta.com",
            pictureUri:
              "https://www.lciacademy.com/wp-content/uploads/2017/09/default-avatar.png",
          },
          {
            id: "df31cc0d-117a-4122-83d7-b81856e4af5c",
            firstName: "Kasparas",
            lastName: "Gecas",
            email: "kasparas.gecas@softeta.com",
            pictureUri:
              "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg",
          },
          {
            id: "e59ebf2e-b438-41e7-ae28-9b02b3a9c78d",
            firstName: "Ieva",
            lastName: "Paulavičiūtė",
            email: "ieva.paulaviciute@softeta.com",
            pictureUri:
              "https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231712/thesomeday123171200008.jpg",
          },
          {
            id: "ea29be77-af71-4d10-be94-7450efee8709",
            firstName: "Marcin",
            lastName: "Skowronek",
            email: "marcin.skowronek@softeta.com",
            pictureUri:
              "https://www.lciacademy.com/wp-content/uploads/2017/09/default-avatar.png",
          },
        ],
      })
    )
);

export default backOfficeUsersHandler;
