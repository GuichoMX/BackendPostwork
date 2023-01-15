"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveController = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
// import { sequelize } from "../db";
const Live_1 = __importDefault(require("../db/model/Live"));
class LiveController {
    async getLives() {
        return await Live_1.default.findAll();
    }
    async getLive(liveId) {
        return await Live_1.default.findOne({
            where: { liveId }
        });
    }
    async saveLive(liveId, title, author, category) {
        return await Live_1.default.create({ liveId, title, author, category });
    }
    async updateLive(liveId, title, author, category) {
        const live = await Live_1.default.findOne({
            where: { liveId } // es una notación corta de where: { asin: asin }
        });
        // si existe procedemos a actualizar
        if (live) {
            await Live_1.default.update({ title, author, category }, {
                where: { liveId } // es una notación corta de where: { asin: asin }
            });
            // regresamos el libro reciéntemente actualizado
            return await Live_1.default.findOne({ where: { liveId } });
        }
        // en caso contrario, lanzamos mensaje y código de error
        else {
            throw new apollo_server_errors_1.ApolloError('Live not found', 'ERR003');
        }
    }
}
exports.LiveController = LiveController;
