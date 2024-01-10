import {Router} from  'express'
import { userAuth } from '../controllers/userAuth'

const router = Router()


router.post('/', userAuth)


export default router