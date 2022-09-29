import { StatusCodes } from "http-status-codes";
import connection from "../database.js";

async function getGames(req, res) {
    const {name} = req.query;
    try {
        let games;
        if(name){
            games = await connection.query('SELECT * FROM games WHERE name LIKE $1',[`${name}%`]);
        }
        if(!name){
            games = await connection.query('SELECT * FROM games');
        }
        if (games.rows.length < 1) {
            return res.status(StatusCodes.NOT_FOUND).send('Games table is empty');
        }
        return res.status(StatusCodes.ACCEPTED).send(games.rows);
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { getGames }