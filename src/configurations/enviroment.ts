import * as config from 'config';

export const screenShotPath: string = config.get('exportFilePath');
export const capabilities: string[] = config.get('capabilities');
