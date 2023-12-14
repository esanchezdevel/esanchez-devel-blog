const usersService = require('../services/users-service');

const adminController = {
    admin: async (req, res) => {
        console.log(`Admin page`);
        try {
            if (req.session.loggedin) {
                console.log(`User is already logged in.`);
                res.render('admin-index', {});
            } else {
                console.log(`User is not logged in`);
                res.render('admin-login');
            }
        } catch (error) {
            console.error('Error rendering the view: ', error);
            res.status(500).send('Internal Server Error');
        }
    },

    login: async (req, res) => {
        console.log(`Accessing to Admin login page`);

        const { username, password } = req.body;
    
        try {
            const userValidated = await usersService.validateUser(username, password);
    
            if (userValidated) {
                console.log(`user is validated: ${userValidated}`)
                req.session.loggedin = true;
                req.session.username = username;
            } else {
                console.log(`user is not validated: ${userValidated}`)
            }
            res.redirect('/admin');
        } catch (error) {
            console.error('Error rendering the view: ', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = adminController;