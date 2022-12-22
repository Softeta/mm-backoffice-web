export type TShareJobViaEmailRequest = {
  receiverEmail: string;
};

export type TShareJobViaEmailResponse = {
  data: TShareJobViaEmail;
};

export type TShareJobViaLinkResponse = {
  data: TShareJobViaLink;
};

export type TShareJobViaEmail = {
  date: Date;
};

export type TShareJobViaLink = {
  key: string;
  date: Date;
};
