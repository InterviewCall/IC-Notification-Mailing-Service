import { CsvMapping } from './csv.type';

export type GroupIdRequestParams = {
    groupId: string;
};

export type CreateContactsRequestBody = {
    mapping: CsvMapping;
};