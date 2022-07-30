"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let FilesService = class FilesService {
    async writeToFile(log) {
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
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({ message: 'Writing file error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map