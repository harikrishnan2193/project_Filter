const User = require('../Models/usersModel')
const Project = require('../Models/projectModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


//register function
exports.register = async (req, res) => {
    console.log('Inside controller register function');

    const { username, email, password } = req.body

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            req.flash('error', 'Account already exists.');
            return res.redirect('/register');
        }
        else {
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user in the database
            const newUser = await User.create({
                username,
                email,
                user_password: hashedPassword
            })
        }

        req.flash('success', 'Registration successful! You can now log in.');
        return res.redirect('/login');

    } catch (error) {
        console.error('Error during user registration:', error);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/register');
    }
}

//login function
exports.login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        req.flash('error', 'Please fill out all fields.');
        return res.redirect('/login');
    }

    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            req.flash('error', 'Invalid email or password.')
            return res.redirect('/login')
        }
        else {
            const passwordMatch = await bcrypt.compare(password, user.user_password)

            if (!passwordMatch) {
                req.flash('error', 'Invalid email or password.');
                return res.redirect('/login');
            }
            else {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

                // Store userId in session
                req.session.userId = user.id
                req.flash('success', 'Login successful!')
                return res.render('landingPage', {
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    } || null,
                    token: token || null
                })
            }
        }

    } catch (error) {
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/login');
    }
}


//get allProject
exports.getAllProjects = async (req, res) => {
    console.log('inside getAllProject Controller');

    const userId = req.session.userId
    console.log(userId);


    if (!userId) {
        return res.status(401).send('User not authenticated , Please login again');
    }

    try {
        const projects = await Project.findAll({
            where: { userId: userId }
        });

        res.render('myProject', { projects });
    } catch (error) {
        console.error('Error fetching projects:', error.message);
        res.status(500).send('Server Error');
    }
}

// Add a new project
exports.addProject = async (req, res) => {
    console.log('Inside addProject Controller');

    const { title, description } = req.body;
    const userId = req.session ? req.session.userId : null;
    
    if (!userId) {
        return res.status(401).send('Unauthorized');
    }

    try {
        // Add the project with userId
        const newProject = await Project.create({
            title,
            description,
            userId 
        });

        res.redirect('/manageProject');
    } catch (err) {
        // console.error(err);
        res.status(500).send('Server Error');
    }
}

// Update an existing project
exports.updateProject = async (req, res) => {
    const { title, description, status } = req.body;
    console.log('Received status:', status);
   
    const projectId = req.params.id;
    try {
        const project = await Project.findByPk(projectId);

        if (!project) {
            return res.status(404).send('Project not found');
        }

        const userId = req.session.userId;
        if (project.userId !== userId) {
            return res.status(403).send('Unauthorized access to this project');
        }

        //Update the project details
        project.title = title;
        project.description = description;
        project.project_status = status; 

        await project.save();

        res.redirect('/manageProject');
    } catch (err) {
        console.error('Error updating project:', err.message);
        res.status(500).send('Server Error');
    }
}

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        await Project.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/manageProject');
    } catch (err) {
        res.status(500).send('Server Error');
    }
};


