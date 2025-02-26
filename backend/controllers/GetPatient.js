const User = require("../models/Patient");

module.exports.getUser = async (req, res) => {
    const { id } = req.query;

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    try {
        const user = await User.findById(id);

        if (user) {
            const formattedUser = {
                ...user.toObject(),
                dateOfBirth: formatDate(user.dateOfBirth),
            };

            res.json(formattedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching User:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
