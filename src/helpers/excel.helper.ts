import { Workbook } from 'exceljs';
import path from 'path';

export class Excel {
    workbook: Workbook;
    directoryPath?: string;
    fileName: string;
    filePath: string;
    sheetName?: string;
    constructor() {
        this.workbook = new Workbook();
    }

    withFile(fileName: string): void {
        this.fileName = fileName;
        this.filePath = path.join('src', 'data', this.fileName);
    }

    withSheetName(sheetName: string): void {
        this.sheetName = sheetName;
    }

    async getSheetNames(): Promise<string[]> {
        try {
            await this.workbook.xlsx.readFile(this.filePath);
            return this.workbook.worksheets.map(({ name }) => name);
        } catch (err) {
            throw Error(err.toString());
        }
    }

    async readAllDataExceptHeader<T extends Record<string, any>>(): Promise<T[]> {
        try {
            const workbook = new Workbook();
            await workbook.xlsx.readFile(this.filePath);
            const worksheet = workbook.getWorksheet(this.sheetName);
            const data: T[] = [];
            const headerRow = worksheet.getRow(1);
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) return;
                const rowData: Record<string, any> = {};
                row.eachCell((cell, colNumber) => {
                    const header = headerRow.getCell(colNumber).value;
                    if (typeof header === 'string' || typeof header === 'number') {
                        rowData[String(header)] =
                            typeof cell.value === 'object' && cell.value !== null ? String(cell.value) : cell.value;
                    }
                });
                data.push(rowData as T);
            });
            return data;
        } catch (err) {
            throw new Error((err as Error).toString());
        }
    }
}
