import express,  { Request, Response } from 'express';

import scrapeRoutes from '../scrape/scrape.route';

const router = express.Router();

router.route('/').get( (req: Request, res: Response) => {
    res.send('OK');
});

router.use('/scrape', scrapeRoutes);
// router.route('/db').get(())

export default router;