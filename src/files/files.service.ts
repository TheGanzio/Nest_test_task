import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  async writeToFile(log): Promise<string> {
    try {
      const fileName = 'alerts.log';
      const filePath = path.resolve(__dirname, '..', fileName);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      console.log(filePath);
      console.log(fileName);
      fs.appendFile(path.join(filePath, fileName), `${log}\n`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      return fileName;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: 'Writing file error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
