import { Router, Request, Response } from 'express';
import { FeedRouter } from './feed/routes/feed.router';

const router: Router = Router();

router.use('/feed', FeedRouter);

router.get('/', async (req: Request, res: Response) => {    
    console.log("Hello Travis CI")
    console.log("Hello Travis CI")
    res.send(`V0`);
});

export const IndexRouter: Router = router;