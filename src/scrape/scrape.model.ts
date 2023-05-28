import { Model } from 'objection';

import knex from '../platforms/config/knex';

Model.knex(knex);


class ScrapeModel extends Model{
    id?: string;
    image?: string;
    code?: string;
    name?: string;
    Price?: string;
    'Market Cap'?: string;
    '24H'?: string;
    'updated_date'?:string;
    'created_date'?:string;
    
    static get tableName() {
        return 'crypto';
    }
};

export class WatchListModel extends Model{
    id?: string;
    code?: string;
    min_price?: string;
    max_price?: string;
    created_date?: string;
    static get tableName() {
        return 'watch_lists';
    }
};

export default ScrapeModel;
