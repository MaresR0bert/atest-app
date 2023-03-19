const responseCreator = (res: any, statusCode: number, jsonBody: Object): any => {

    return res.status(statusCode).json(jsonBody);
}

export default responseCreator;