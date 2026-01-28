import { z } from "zod";
export declare const PayoutStatusSchema: z.ZodUnion<[z.ZodLiteral<"ACCEPTED">, z.ZodLiteral<"PENDING">, z.ZodLiteral<"PROCESSING">, z.ZodLiteral<"COMPLETED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"CANCELLED">, z.ZodLiteral<"REVERSED">]>;
export type PayoutStatus = z.infer<typeof PayoutStatusSchema>;
export declare const PayoutChannelCodeSchema: z.ZodUnion<[z.ZodLiteral<"BANK">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CASH">]>;
export type PayoutChannelCode = z.infer<typeof PayoutChannelCodeSchema>;
export declare const BankAccountSchema: z.ZodObject<{
    account_holder_name: z.ZodString;
    account_number: z.ZodString;
    bank_code: z.ZodString;
    account_type: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    account_number: string;
    account_holder_name: string;
    bank_code: string;
    account_type?: string | undefined;
}, {
    account_number: string;
    account_holder_name: string;
    bank_code: string;
    account_type?: string | undefined;
}>;
export type BankAccount = z.infer<typeof BankAccountSchema>;
export declare const EwalletAccountSchema: z.ZodObject<{
    account_holder_name: z.ZodString;
    account_number: z.ZodString;
    ewallet_type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    account_number: string;
    account_holder_name: string;
    ewallet_type: string;
}, {
    account_number: string;
    account_holder_name: string;
    ewallet_type: string;
}>;
export type EwalletAccount = z.infer<typeof EwalletAccountSchema>;
export declare const PayoutMethodSchema: z.ZodDiscriminatedUnion<"channel_code", [z.ZodObject<{
    channel_code: z.ZodLiteral<"BANK">;
    bank_account: z.ZodObject<{
        account_holder_name: z.ZodString;
        account_number: z.ZodString;
        bank_code: z.ZodString;
        account_type: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        account_number: string;
        account_holder_name: string;
        bank_code: string;
        account_type?: string | undefined;
    }, {
        account_number: string;
        account_holder_name: string;
        bank_code: string;
        account_type?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    channel_code: "BANK";
    bank_account: {
        account_number: string;
        account_holder_name: string;
        bank_code: string;
        account_type?: string | undefined;
    };
}, {
    channel_code: "BANK";
    bank_account: {
        account_number: string;
        account_holder_name: string;
        bank_code: string;
        account_type?: string | undefined;
    };
}>, z.ZodObject<{
    channel_code: z.ZodLiteral<"EWALLET">;
    ewallet: z.ZodObject<{
        account_holder_name: z.ZodString;
        account_number: z.ZodString;
        ewallet_type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        account_number: string;
        account_holder_name: string;
        ewallet_type: string;
    }, {
        account_number: string;
        account_holder_name: string;
        ewallet_type: string;
    }>;
}, "strip", z.ZodTypeAny, {
    channel_code: "EWALLET";
    ewallet: {
        account_number: string;
        account_holder_name: string;
        ewallet_type: string;
    };
}, {
    channel_code: "EWALLET";
    ewallet: {
        account_number: string;
        account_holder_name: string;
        ewallet_type: string;
    };
}>, z.ZodObject<{
    channel_code: z.ZodLiteral<"CASH">;
    cash: z.ZodObject<{
        account_holder_name: z.ZodString;
        account_number: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        account_number: string;
        account_holder_name: string;
    }, {
        account_number: string;
        account_holder_name: string;
    }>;
}, "strip", z.ZodTypeAny, {
    channel_code: "CASH";
    cash: {
        account_number: string;
        account_holder_name: string;
    };
}, {
    channel_code: "CASH";
    cash: {
        account_number: string;
        account_holder_name: string;
    };
}>]>;
export type PayoutMethod = z.infer<typeof PayoutMethodSchema>;
export declare const CreatePayoutSchema: z.ZodObject<{
    reference_id: z.ZodString;
    channel_code: z.ZodUnion<[z.ZodLiteral<"BANK">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CASH">]>;
    channel_properties: z.ZodDiscriminatedUnion<"channel_code", [z.ZodObject<{
        channel_code: z.ZodLiteral<"BANK">;
        bank_account: z.ZodObject<{
            account_holder_name: z.ZodString;
            account_number: z.ZodString;
            bank_code: z.ZodString;
            account_type: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            account_number: string;
            account_holder_name: string;
            bank_code: string;
            account_type?: string | undefined;
        }, {
            account_number: string;
            account_holder_name: string;
            bank_code: string;
            account_type?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        channel_code: "BANK";
        bank_account: {
            account_number: string;
            account_holder_name: string;
            bank_code: string;
            account_type?: string | undefined;
        };
    }, {
        channel_code: "BANK";
        bank_account: {
            account_number: string;
            account_holder_name: string;
            bank_code: string;
            account_type?: string | undefined;
        };
    }>, z.ZodObject<{
        channel_code: z.ZodLiteral<"EWALLET">;
        ewallet: z.ZodObject<{
            account_holder_name: z.ZodString;
            account_number: z.ZodString;
            ewallet_type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            account_number: string;
            account_holder_name: string;
            ewallet_type: string;
        }, {
            account_number: string;
            account_holder_name: string;
            ewallet_type: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        channel_code: "EWALLET";
        ewallet: {
            account_number: string;
            account_holder_name: string;
            ewallet_type: string;
        };
    }, {
        channel_code: "EWALLET";
        ewallet: {
            account_number: string;
            account_holder_name: string;
            ewallet_type: string;
        };
    }>, z.ZodObject<{
        channel_code: z.ZodLiteral<"CASH">;
        cash: z.ZodObject<{
            account_holder_name: z.ZodString;
            account_number: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            account_number: string;
            account_holder_name: string;
        }, {
            account_number: string;
            account_holder_name: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        channel_code: "CASH";
        cash: {
            account_number: string;
            account_holder_name: string;
        };
    }, {
        channel_code: "CASH";
        cash: {
            account_number: string;
            account_holder_name: string;
        };
    }>]>;
    amount: z.ZodNumber;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
    description: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    receipt_notification: z.ZodOptional<z.ZodObject<{
        email_to: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        email_cc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        email_bcc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        email_to?: string[] | undefined;
        email_cc?: string[] | undefined;
        email_bcc?: string[] | undefined;
    }, {
        email_to?: string[] | undefined;
        email_cc?: string[] | undefined;
        email_bcc?: string[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    channel_code: "EWALLET" | "BANK" | "CASH";
    channel_properties: {
        channel_code: "BANK";
        bank_account: {
            account_number: string;
            account_holder_name: string;
            bank_code: string;
            account_type?: string | undefined;
        };
    } | {
        channel_code: "EWALLET";
        ewallet: {
            account_number: string;
            account_holder_name: string;
            ewallet_type: string;
        };
    } | {
        channel_code: "CASH";
        cash: {
            account_number: string;
            account_holder_name: string;
        };
    };
    amount: number;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    receipt_notification?: {
        email_to?: string[] | undefined;
        email_cc?: string[] | undefined;
        email_bcc?: string[] | undefined;
    } | undefined;
}, {
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    channel_code: "EWALLET" | "BANK" | "CASH";
    channel_properties: {
        channel_code: "BANK";
        bank_account: {
            account_number: string;
            account_holder_name: string;
            bank_code: string;
            account_type?: string | undefined;
        };
    } | {
        channel_code: "EWALLET";
        ewallet: {
            account_number: string;
            account_holder_name: string;
            ewallet_type: string;
        };
    } | {
        channel_code: "CASH";
        cash: {
            account_number: string;
            account_holder_name: string;
        };
    };
    amount: number;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    receipt_notification?: {
        email_to?: string[] | undefined;
        email_cc?: string[] | undefined;
        email_bcc?: string[] | undefined;
    } | undefined;
}>;
export type CreatePayout = z.infer<typeof CreatePayoutSchema>;
export declare const PayoutResourceSchema: z.ZodObject<{
    id: z.ZodString;
    reference_id: z.ZodString;
    channel_code: z.ZodUnion<[z.ZodLiteral<"BANK">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CASH">]>;
    channel_properties: z.ZodDiscriminatedUnion<"channel_code", [z.ZodObject<{
        channel_code: z.ZodLiteral<"BANK">;
        bank_account: z.ZodObject<{
            account_holder_name: z.ZodString;
            account_number: z.ZodString;
            bank_code: z.ZodString;
            account_type: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            account_number: string;
            account_holder_name: string;
            bank_code: string;
            account_type?: string | undefined;
        }, {
            account_number: string;
            account_holder_name: string;
            bank_code: string;
            account_type?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        channel_code: "BANK";
        bank_account: {
            account_number: string;
            account_holder_name: string;
            bank_code: string;
            account_type?: string | undefined;
        };
    }, {
        channel_code: "BANK";
        bank_account: {
            account_number: string;
            account_holder_name: string;
            bank_code: string;
            account_type?: string | undefined;
        };
    }>, z.ZodObject<{
        channel_code: z.ZodLiteral<"EWALLET">;
        ewallet: z.ZodObject<{
            account_holder_name: z.ZodString;
            account_number: z.ZodString;
            ewallet_type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            account_number: string;
            account_holder_name: string;
            ewallet_type: string;
        }, {
            account_number: string;
            account_holder_name: string;
            ewallet_type: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        channel_code: "EWALLET";
        ewallet: {
            account_number: string;
            account_holder_name: string;
            ewallet_type: string;
        };
    }, {
        channel_code: "EWALLET";
        ewallet: {
            account_number: string;
            account_holder_name: string;
            ewallet_type: string;
        };
    }>, z.ZodObject<{
        channel_code: z.ZodLiteral<"CASH">;
        cash: z.ZodObject<{
            account_holder_name: z.ZodString;
            account_number: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            account_number: string;
            account_holder_name: string;
        }, {
            account_number: string;
            account_holder_name: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        channel_code: "CASH";
        cash: {
            account_number: string;
            account_holder_name: string;
        };
    }, {
        channel_code: "CASH";
        cash: {
            account_number: string;
            account_holder_name: string;
        };
    }>]>;
    amount: z.ZodNumber;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
    status: z.ZodUnion<[z.ZodLiteral<"ACCEPTED">, z.ZodLiteral<"PENDING">, z.ZodLiteral<"PROCESSING">, z.ZodLiteral<"COMPLETED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"CANCELLED">, z.ZodLiteral<"REVERSED">]>;
    description: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    created: z.ZodString;
    updated: z.ZodString;
    failure_reason: z.ZodOptional<z.ZodString>;
    estimated_arrival_time: z.ZodOptional<z.ZodString>;
    receipt_notification: z.ZodOptional<z.ZodObject<{
        email_to: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        email_cc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        email_bcc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        email_to?: string[] | undefined;
        email_cc?: string[] | undefined;
        email_bcc?: string[] | undefined;
    }, {
        email_to?: string[] | undefined;
        email_cc?: string[] | undefined;
        email_bcc?: string[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "PENDING" | "FAILED" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REVERSED";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    id: string;
    created: string;
    updated: string;
    channel_code: "EWALLET" | "BANK" | "CASH";
    channel_properties: {
        channel_code: "BANK";
        bank_account: {
            account_number: string;
            account_holder_name: string;
            bank_code: string;
            account_type?: string | undefined;
        };
    } | {
        channel_code: "EWALLET";
        ewallet: {
            account_number: string;
            account_holder_name: string;
            ewallet_type: string;
        };
    } | {
        channel_code: "CASH";
        cash: {
            account_number: string;
            account_holder_name: string;
        };
    };
    amount: number;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    failure_reason?: string | undefined;
    receipt_notification?: {
        email_to?: string[] | undefined;
        email_cc?: string[] | undefined;
        email_bcc?: string[] | undefined;
    } | undefined;
    estimated_arrival_time?: string | undefined;
}, {
    status: "PENDING" | "FAILED" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REVERSED";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    id: string;
    created: string;
    updated: string;
    channel_code: "EWALLET" | "BANK" | "CASH";
    channel_properties: {
        channel_code: "BANK";
        bank_account: {
            account_number: string;
            account_holder_name: string;
            bank_code: string;
            account_type?: string | undefined;
        };
    } | {
        channel_code: "EWALLET";
        ewallet: {
            account_number: string;
            account_holder_name: string;
            ewallet_type: string;
        };
    } | {
        channel_code: "CASH";
        cash: {
            account_number: string;
            account_holder_name: string;
        };
    };
    amount: number;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    failure_reason?: string | undefined;
    receipt_notification?: {
        email_to?: string[] | undefined;
        email_cc?: string[] | undefined;
        email_bcc?: string[] | undefined;
    } | undefined;
    estimated_arrival_time?: string | undefined;
}>;
export type PayoutResource = z.infer<typeof PayoutResourceSchema>;
export declare const GetPayoutSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type GetPayout = z.infer<typeof GetPayoutSchema>;
export declare const ListPayoutsSchema: z.ZodObject<{
    reference_id: z.ZodOptional<z.ZodString>;
    channel_code: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"BANK">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CASH">]>, "many">>;
    status: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"ACCEPTED">, z.ZodLiteral<"PENDING">, z.ZodLiteral<"PROCESSING">, z.ZodLiteral<"COMPLETED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"CANCELLED">, z.ZodLiteral<"REVERSED">]>, "many">>;
    limit: z.ZodOptional<z.ZodNumber>;
    after_id: z.ZodOptional<z.ZodString>;
    before_id: z.ZodOptional<z.ZodString>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: ("PENDING" | "FAILED" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REVERSED")[] | undefined;
    reference_id?: string | undefined;
    channel_code?: ("EWALLET" | "BANK" | "CASH")[] | undefined;
    after_id?: string | undefined;
    before_id?: string | undefined;
    limit?: number | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
}, {
    status?: ("PENDING" | "FAILED" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REVERSED")[] | undefined;
    reference_id?: string | undefined;
    channel_code?: ("EWALLET" | "BANK" | "CASH")[] | undefined;
    after_id?: string | undefined;
    before_id?: string | undefined;
    limit?: number | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
}>;
export type ListPayouts = z.infer<typeof ListPayoutsSchema>;
export declare const ListPayoutsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        reference_id: z.ZodString;
        channel_code: z.ZodUnion<[z.ZodLiteral<"BANK">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CASH">]>;
        channel_properties: z.ZodDiscriminatedUnion<"channel_code", [z.ZodObject<{
            channel_code: z.ZodLiteral<"BANK">;
            bank_account: z.ZodObject<{
                account_holder_name: z.ZodString;
                account_number: z.ZodString;
                bank_code: z.ZodString;
                account_type: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_number: string;
                account_holder_name: string;
                bank_code: string;
                account_type?: string | undefined;
            }, {
                account_number: string;
                account_holder_name: string;
                bank_code: string;
                account_type?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            channel_code: "BANK";
            bank_account: {
                account_number: string;
                account_holder_name: string;
                bank_code: string;
                account_type?: string | undefined;
            };
        }, {
            channel_code: "BANK";
            bank_account: {
                account_number: string;
                account_holder_name: string;
                bank_code: string;
                account_type?: string | undefined;
            };
        }>, z.ZodObject<{
            channel_code: z.ZodLiteral<"EWALLET">;
            ewallet: z.ZodObject<{
                account_holder_name: z.ZodString;
                account_number: z.ZodString;
                ewallet_type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                account_number: string;
                account_holder_name: string;
                ewallet_type: string;
            }, {
                account_number: string;
                account_holder_name: string;
                ewallet_type: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            channel_code: "EWALLET";
            ewallet: {
                account_number: string;
                account_holder_name: string;
                ewallet_type: string;
            };
        }, {
            channel_code: "EWALLET";
            ewallet: {
                account_number: string;
                account_holder_name: string;
                ewallet_type: string;
            };
        }>, z.ZodObject<{
            channel_code: z.ZodLiteral<"CASH">;
            cash: z.ZodObject<{
                account_holder_name: z.ZodString;
                account_number: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                account_number: string;
                account_holder_name: string;
            }, {
                account_number: string;
                account_holder_name: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            channel_code: "CASH";
            cash: {
                account_number: string;
                account_holder_name: string;
            };
        }, {
            channel_code: "CASH";
            cash: {
                account_number: string;
                account_holder_name: string;
            };
        }>]>;
        amount: z.ZodNumber;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
        status: z.ZodUnion<[z.ZodLiteral<"ACCEPTED">, z.ZodLiteral<"PENDING">, z.ZodLiteral<"PROCESSING">, z.ZodLiteral<"COMPLETED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"CANCELLED">, z.ZodLiteral<"REVERSED">]>;
        description: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        created: z.ZodString;
        updated: z.ZodString;
        failure_reason: z.ZodOptional<z.ZodString>;
        estimated_arrival_time: z.ZodOptional<z.ZodString>;
        receipt_notification: z.ZodOptional<z.ZodObject<{
            email_to: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            email_cc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            email_bcc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            email_to?: string[] | undefined;
            email_cc?: string[] | undefined;
            email_bcc?: string[] | undefined;
        }, {
            email_to?: string[] | undefined;
            email_cc?: string[] | undefined;
            email_bcc?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        status: "PENDING" | "FAILED" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REVERSED";
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        id: string;
        created: string;
        updated: string;
        channel_code: "EWALLET" | "BANK" | "CASH";
        channel_properties: {
            channel_code: "BANK";
            bank_account: {
                account_number: string;
                account_holder_name: string;
                bank_code: string;
                account_type?: string | undefined;
            };
        } | {
            channel_code: "EWALLET";
            ewallet: {
                account_number: string;
                account_holder_name: string;
                ewallet_type: string;
            };
        } | {
            channel_code: "CASH";
            cash: {
                account_number: string;
                account_holder_name: string;
            };
        };
        amount: number;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        failure_reason?: string | undefined;
        receipt_notification?: {
            email_to?: string[] | undefined;
            email_cc?: string[] | undefined;
            email_bcc?: string[] | undefined;
        } | undefined;
        estimated_arrival_time?: string | undefined;
    }, {
        status: "PENDING" | "FAILED" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REVERSED";
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        id: string;
        created: string;
        updated: string;
        channel_code: "EWALLET" | "BANK" | "CASH";
        channel_properties: {
            channel_code: "BANK";
            bank_account: {
                account_number: string;
                account_holder_name: string;
                bank_code: string;
                account_type?: string | undefined;
            };
        } | {
            channel_code: "EWALLET";
            ewallet: {
                account_number: string;
                account_holder_name: string;
                ewallet_type: string;
            };
        } | {
            channel_code: "CASH";
            cash: {
                account_number: string;
                account_holder_name: string;
            };
        };
        amount: number;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        failure_reason?: string | undefined;
        receipt_notification?: {
            email_to?: string[] | undefined;
            email_cc?: string[] | undefined;
            email_bcc?: string[] | undefined;
        } | undefined;
        estimated_arrival_time?: string | undefined;
    }>, "many">;
    has_more: z.ZodBoolean;
    links: z.ZodOptional<z.ZodArray<z.ZodObject<{
        href: z.ZodString;
        rel: z.ZodString;
        method: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        method: string;
        href: string;
        rel: string;
    }, {
        method: string;
        href: string;
        rel: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "PENDING" | "FAILED" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REVERSED";
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        id: string;
        created: string;
        updated: string;
        channel_code: "EWALLET" | "BANK" | "CASH";
        channel_properties: {
            channel_code: "BANK";
            bank_account: {
                account_number: string;
                account_holder_name: string;
                bank_code: string;
                account_type?: string | undefined;
            };
        } | {
            channel_code: "EWALLET";
            ewallet: {
                account_number: string;
                account_holder_name: string;
                ewallet_type: string;
            };
        } | {
            channel_code: "CASH";
            cash: {
                account_number: string;
                account_holder_name: string;
            };
        };
        amount: number;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        failure_reason?: string | undefined;
        receipt_notification?: {
            email_to?: string[] | undefined;
            email_cc?: string[] | undefined;
            email_bcc?: string[] | undefined;
        } | undefined;
        estimated_arrival_time?: string | undefined;
    }[];
    has_more: boolean;
    links?: {
        method: string;
        href: string;
        rel: string;
    }[] | undefined;
}, {
    data: {
        status: "PENDING" | "FAILED" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REVERSED";
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        id: string;
        created: string;
        updated: string;
        channel_code: "EWALLET" | "BANK" | "CASH";
        channel_properties: {
            channel_code: "BANK";
            bank_account: {
                account_number: string;
                account_holder_name: string;
                bank_code: string;
                account_type?: string | undefined;
            };
        } | {
            channel_code: "EWALLET";
            ewallet: {
                account_number: string;
                account_holder_name: string;
                ewallet_type: string;
            };
        } | {
            channel_code: "CASH";
            cash: {
                account_number: string;
                account_holder_name: string;
            };
        };
        amount: number;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        failure_reason?: string | undefined;
        receipt_notification?: {
            email_to?: string[] | undefined;
            email_cc?: string[] | undefined;
            email_bcc?: string[] | undefined;
        } | undefined;
        estimated_arrival_time?: string | undefined;
    }[];
    has_more: boolean;
    links?: {
        method: string;
        href: string;
        rel: string;
    }[] | undefined;
}>;
export type ListPayoutsResponse = z.infer<typeof ListPayoutsResponseSchema>;
export declare const CancelPayoutSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type CancelPayout = z.infer<typeof CancelPayoutSchema>;
//# sourceMappingURL=schema.d.ts.map