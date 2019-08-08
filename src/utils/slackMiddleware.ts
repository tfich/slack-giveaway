export function checkSlackRequest(req: any, res: any, next: any): any {
    if (req.body.ssl_check) {
        return res.sendStatus(200)
    } else {
        return next()
    }
}
