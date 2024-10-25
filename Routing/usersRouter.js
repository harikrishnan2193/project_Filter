const express = require('express')
const router = new express.Router()
// const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const usersController = require('../Controllers/usersController')

//register 
router.post('/register',usersController.register)

//login
router.post('/login',usersController.login)

// Display all projects
router.get('/manageProject', usersController.getAllProjects)

// Add new project
router.post('/projects',usersController.addProject)

// Route for updating a project
router.put('/projects/:id', usersController.updateProject);

// Delete a project
router.delete('/projects/:id', usersController.deleteProject);

module.exports = router