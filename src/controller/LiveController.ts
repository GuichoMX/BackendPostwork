import { ApolloError } from "apollo-server-errors";
// import { sequelize } from "../db";
import Live from "../db/model/Live";

export class LiveController{
    async getLives(){
        return await Live.findAll()
    }

    async getLive(liveId: string){
        return await Live.findOne({
            where: { liveId }
        })
    }

    async saveLive(liveId: number, title: string, author: string, category: string){
        return await Live.create({liveId, title, author, category})
    }

    async updateLive(liveId: number ,title: string, author: string, category: string){
        const live = await Live.findOne({
            where: { liveId } // es una notación corta de where: { asin: asin }
        })
        // si existe procedemos a actualizar
        if (live) {
            await Live.update({ title, author, category }, {
                where: { liveId } // es una notación corta de where: { asin: asin }
            })
            // regresamos el libro reciéntemente actualizado
            return await Live.findOne({ where: { liveId } })
        }
        // en caso contrario, lanzamos mensaje y código de error
        else {
            throw new ApolloError('Live not found', 'ERR003')
        }
        
    }
}