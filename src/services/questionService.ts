import logger from "../util/logger";
import responseFactory from "../util/responseFactory";

const addQuestion = async (req: any, res: any) => {
    logger.info("Question added!")
    return responseFactory(res, 200, {});
}

export default {addQuestion}