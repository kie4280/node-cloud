export const enum DnsDomainStates {
  AwaitingPayment,
  AwaitingAuthorizationCode,
  AwaitingIPSTAGChange,
  Complete,
  Cancelled,
  Expired,
  TransferPending,
  TransferFailed,
  RedemptionPeriod,
  Provisioning,
}

export const enum RedirectTypes {
  UF = "UF",
  PF = "PF",
}

export enum DynuExceptions {
  Application = "Application Exception",
  Argument = "Argument Exception",
  Authentication = "Authentication Exception",
  Authorization = "Authorization Exception",
  IO = "IO Exception",
  Not_Implemented = "Not Implemented",
  Parse = "Parse Exception",
  Quota = "Quota Exception",
  Timeout = "Timeout Exception",
  Request = "Request Exception",
  Server = "Server Exception",
  Validation = "Validation Exception",
}

export type apiException = {
  statusCode: number;
  type: DynuExceptions;
  message: string;
};
export type DNS_domain = {
  id: number;
  name: string;
  unicodeName: string;
  token: string;
  state: DnsDomainStates;
  group: string;
  ipv4Address: string;
  ipv6Address: string;
  ttl: number;

  ipv4: boolean;
  ipv6: boolean;
  ipv4WildcardAlias: boolean;
  ipv6WildcardAlias: boolean;
  allowZoneTransfer: boolean;
  dnssec: boolean;
  createdOn: string;
  updatedOn: string;
};

export type DNS_response = {
  statusCode: number;
  exception?: apiException;
  domains?: Array<DNS_domain>;
};

export type DNS_webredirect = {
  id: number;
  domainId: number;
  domainName: string;
  nodeName: string;
  hostname: string;
  redirectType: RedirectTypes;
  state: boolean;
  updatedOn: string;
  url?: string;
  host?: string;
  port?: number;
  useDynamicIPv4Address: boolean;
  useDynamicIPv6Address: boolean;
  cloak: boolean;
  includeQueryString: boolean;
  title: string;
  metaKeywords: string;
  metaDescription: string;
};

export type webredirect_response = {
  statusCode: number;
  exception?: apiException;
  webRedirects: Array<DNS_webredirect>;
};
