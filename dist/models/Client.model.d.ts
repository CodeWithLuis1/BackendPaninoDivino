import { Model } from 'sequelize-typescript';
declare class Client extends Model {
    id_client: number;
    client_name: string;
}
export default Client;
