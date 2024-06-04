const createTodo = async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: 'success', data: null })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'somthing went wrong', data: null })
    }
}

module.exports = {
    createTodo
}