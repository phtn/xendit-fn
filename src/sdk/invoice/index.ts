import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { handleAxiosError, validateInput } from "../../utils/errors";
import type {
  CreateInvoice,
  InvoiceResource,
  GetInvoice,
  ListInvoices,
  ListInvoicesResponse,
  UpdateInvoiceParams,
  ExpireInvoice,
} from "./schema";
import {
  CreateInvoiceSchema,
  GetInvoiceSchema,
  ListInvoicesSchema,
  UpdateInvoiceParamsSchema,
  ExpireInvoiceSchema,
} from "./schema";

export const createInvoice = async (
  params: CreateInvoice,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<InvoiceResource> => {
  try {
    const validatedParams = validateInput(
      CreateInvoiceSchema,
      params,
      "invoice params"
    );
    const response = await axiosInstance.post<InvoiceResource>(
      config?.url ?? "/v2/invoices",
      validatedParams,
      config
    );
    return response.data as InvoiceResource;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as any);
    }
    throw error;
  }
};

export const getInvoice = async (
  params: GetInvoice,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<InvoiceResource> => {
  try {
    const validatedParams = validateInput(
      GetInvoiceSchema,
      params,
      "get invoice params"
    );
    const response = await axiosInstance.get<InvoiceResource>(
      config?.url ?? `/v2/invoices/${validatedParams.invoice_id}`,
      config
    );
    return response.data as InvoiceResource;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as any);
    }
    throw error;
  }
};

export const listInvoices = async (
  params?: ListInvoices,
  axiosInstance?: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<ListInvoicesResponse> => {
  try {
    const validatedParams = params
      ? validateInput(ListInvoicesSchema, params, "list invoices params")
      : {};

    const queryParams = new URLSearchParams();

    if (validatedParams.statuses) {
      validatedParams.statuses.forEach((status) =>
        queryParams.append("statuses[]", status)
      );
    }
    if (validatedParams.limit) {
      queryParams.append("limit", validatedParams.limit.toString());
    }
    if (validatedParams.created_after) {
      queryParams.append("created_after", validatedParams.created_after);
    }
    if (validatedParams.created_before) {
      queryParams.append("created_before", validatedParams.created_before);
    }
    if (validatedParams.paid_after) {
      queryParams.append("paid_after", validatedParams.paid_after);
    }
    if (validatedParams.paid_before) {
      queryParams.append("paid_before", validatedParams.paid_before);
    }
    if (validatedParams.expired_after) {
      queryParams.append("expired_after", validatedParams.expired_after);
    }
    if (validatedParams.expired_before) {
      queryParams.append("expired_before", validatedParams.expired_before);
    }
    if (validatedParams.last_invoice) {
      queryParams.append("last_invoice", validatedParams.last_invoice);
    }
    if (validatedParams.client_types) {
      validatedParams.client_types.forEach((type) =>
        queryParams.append("client_types[]", type)
      );
    }
    if (validatedParams.payment_channels) {
      validatedParams.payment_channels.forEach((channel) =>
        queryParams.append("payment_channels[]", channel)
      );
    }
    if (validatedParams.on_demand_link) {
      queryParams.append("on_demand_link", validatedParams.on_demand_link);
    }
    if (validatedParams.recurring_payment_id) {
      queryParams.append(
        "recurring_payment_id",
        validatedParams.recurring_payment_id
      );
    }

    const queryString = queryParams.toString();
    const url = queryString ? `/v2/invoices?${queryString}` : "/v2/invoices";

    const response = await axiosInstance!.get<ListInvoicesResponse>(
      config?.url ?? url,
      config
    );
    return response.data as ListInvoicesResponse;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as any);
    }
    throw error;
  }
};

export const updateInvoice = async (
  params: UpdateInvoiceParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<InvoiceResource> => {
  try {
    const validatedParams = validateInput(
      UpdateInvoiceParamsSchema,
      params,
      "update invoice params"
    );
    const response = await axiosInstance.patch<InvoiceResource>(
      config?.url ?? `/v2/invoices/${validatedParams.invoice_id}`,
      validatedParams.payload,
      config
    );
    return response.data as InvoiceResource;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as any);
    }
    throw error;
  }
};

export const expireInvoice = async (
  params: ExpireInvoice,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<InvoiceResource> => {
  try {
    const validatedParams = validateInput(
      ExpireInvoiceSchema,
      params,
      "expire invoice params"
    );
    const response = await axiosInstance.post<InvoiceResource>(
      config?.url ?? `/invoices/${validatedParams.invoice_id}/expire`,
      {},
      config
    );
    return response.data as InvoiceResource;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as any);
    }
    throw error;
  }
};
