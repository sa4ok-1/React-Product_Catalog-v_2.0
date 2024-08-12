import CryptoJS from "crypto-js";

export const publicKey = "sandbox_i43648813533";
export const privateKey = "sandbox_wXFGdy5y3KldhPYPktmjMEifiHCo8z59eCsEeUQ4";

export const generateSignature = (data: string, privateKey: string) => {
  const strToSign = privateKey + data + privateKey;
  return CryptoJS.SHA1(strToSign).toString(CryptoJS.enc.Base64);
};

export type Params = {
  action?: string;
  amount: number;
  currency?: string;
  description?: string;
  order_id?: string;
  version: number;
  server_url?: string;
  public_key: string;
  language: string;
  result_url: string;
};

export const createParams = (params: Partial<Params>): Params => {
  if (!params.public_key) throw new Error("public_key is required");

  let numericVersion: number;
  if (typeof params.version === "string") {
    numericVersion = Number(params.version);
  } else if (typeof params.version === "number") {
    numericVersion = params.version;
  } else {
    throw new Error(
      "version must be a number or a string that can be converted to a number"
    );
  }

  let numericAmount: number;
  if (typeof params.amount === "string") {
    numericAmount = Number(params.amount);
  } else if (typeof params.amount === "number") {
    numericAmount = params.amount;
  } else {
    throw new Error(
      "amount must be a number or a string that can be converted to a number"
    );
  }

  const stringParams: (keyof Params)[] = [
    "action",
    "currency",
    "description",
    "language",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newParams = { ...params } as any;

  for (const param of stringParams) {
    if (params[param] && typeof params[param] !== "string") {
      newParams[param] = String(newParams[param]);
    } else if (!params[param] && param !== "language") {
      throw new Error(`${param} is null or not provided`);
    }
  }

  if (params.language && !["ru", "uk", "en"].includes(params.language)) {
    params.language = "uk";
  }

  const defaultParams: Params = {
    public_key: publicKey,
    version: numericVersion,
    amount: numericAmount,
    language: params.language || "uk",
    result_url: ""
  };

  return { ...defaultParams, ...params } as Params;
};

export const createForm = (params: Params) => {
  params = createParams(params);
  const data = btoa(JSON.stringify(params));
  const signature = generateSignature(data, privateKey);

  return `
    <form id="liqpay-form" method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">
        <input type="hidden" name="data" value="${data}" />
        <input type="hidden" name="signature" value="${signature}" />
        <input type="submit" value="Pay" style="height: 100%" />
    </form>
  `;
};
