export type CsvMapping = {
    fullName: string
    email: string
}

export type NormalizedRow = {
    fullName: string;
    email: string;
};

export type CsvSummary = {
    totalRows: number,
    validRows: number,
    invalidRows: number,
    duplicateRows: number,
    createdContacts: number,
    alreadyInGroup: number,
    addedToGroup: number
}