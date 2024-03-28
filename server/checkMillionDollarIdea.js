const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    if (numWeeks && weeklyRevenue) {
        if (numWeeks * weeklyRevenue >= 1000000) {
            next();
        } else {
            res.status(400).send("Not a valid million dollar idea. Please try again.")
        }
    }  else {
        res.status(400).send("Not a valid million dollar idea. Please try again.")
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
