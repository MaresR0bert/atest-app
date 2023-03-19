const logger = {
    info: (message: any) => {
        console.log("INFO: " + message);
    },
    error: (message: any) => {
        console.log("ERROR: " + message);
    },
    warn: (message: any) => {
        console.log("WARN: " + message);
    }
}

export default logger