import TestLog from "../schemas/testLogSchema";
import {responseFactory} from "../util/exportUtil";

const getTestLogs = async (req: any, res: any) => {
    const testLogs = await TestLog.find({owner: res.locals.userId});

    return responseFactory(res, 200,  testLogs);
}

export default {getTestLogs}