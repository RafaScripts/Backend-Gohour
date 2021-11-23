//class controller files avatar
class FileController {
    async store(req, res) {
        return res.json(req.file);
    }
}

export default new FileController();