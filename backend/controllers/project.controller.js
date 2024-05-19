var Project = require('../models/project.model');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function(req, res) {
        return res.status(200).send({
            message: "Soy la home"
        });
    },
    test: function(req, res) {
        return res.status(200).send({
            message: "Soy el método o acción test del controlador de project"
        });
    },
    //Guardar un proyecto
    saveProject: function(req, res) {
        var project = new Project();
    
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;
    
        project.save()
            .then(projectStored => {
                if (!projectStored) {
                    return res.status(404).send({ message: "No se ha podido guardar el proyecto." });
                }
                return res.status(200).send({ project: projectStored });
            })
            .catch(err => {
                if (projectId == null) {
                    return res.status(404).send({ message: "El proyecto no existe." });
                }
                return res.status(500).send({ message: "Error al guardar el documento." });
            });
    }, 
    //Obtener un proyecto por su id
    getProject: function(req, res) {
        var projectId = req.params.id;
    
        if (projectId == null) {
            return res.status(404).send({ message: "El proyecto no existe." });
        }
    
        Project.findById(projectId)
            .then(project => {
                if (!project) {
                    return res.status(404).send({ message: "El proyecto no existe." });
                }
                return res.status(200).send({ project });
            })
            .catch(err => {
                return res.status(500).send({ message: "Error al devolver los datos." });
            });
    },
    //Obtener todos los proyectos
    getAllProjects: function(req, res) {
        Project.find({}).sort('year').exec()
            .then(projects => {
                if (!projects || projects.length === 0) {
                    return res.status(404).send({ message: "No hay proyectos para mostrar." });
                }
                return res.status(200).send({ projects });
            })
            .catch(err => {
                if (projects == null) {
                    return res.status(404).send({ message: "No hay proyectos para mostrar." });
                }
                return res.status(500).send({ message: "Error al devolver los datos." });
            });
    }, 
    //Actualizar un proyecto por su id
    updateProjectById: function (req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate (projectId, update, {new:true})
            .then(projectUpdated => {
                if (!projectUpdated) {
                    return res.status(404).send({ message: "No existe el proyecto para actualizar." });
                }
                return res.status(200).send({ project: projectUpdated });
            })
            .catch(err => {
                if (projectId == null) {
                    return res.status(404).send({ message: "No existe el proyecto para actualizar." });
                }
                return res.status(500).send({ message: "Error al actualizar." });
            });
    },
    //Eliminar un proyecto por su id
    deleteProjectById: function(req, res) {
        var projectId = req.params.id;
    
        Project.findByIdAndDelete(projectId)
            .then(projectDeleted => {
                if (!projectDeleted) {
                    return res.status(404).send({ message: "No existe el proyecto para eliminar." });
                }
                return res.status(200).send({ project: projectDeleted, message: "Proyecto eliminado."});
            })
            .catch(err => {
                if (projectId == null) {
                    return res.status(404).send({ message: "No existe el proyecto para eliminar." });
                }
                return res.status(500).send({ message: "Error al eliminar." });
            });
    }, 
    //Subir una imagen a un proyecto
    uploadImage: function(req, res) {
        var projectId = req.params.id;
        var fileName = "Imagen no subida...";
    
        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('/');
            var fileName = fileSplit[fileSplit.length - 1]; 
            var extSplit = fileName.split('.');
            var fileExt = extSplit[1];

            if (fileExt !== 'png' && fileExt !== 'jpg' && fileExt !== 'jpeg' && fileExt !== 'gif') {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: "La extensión del archivo no es válida." });
                });
            }else{
                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true })
                .then(projectUpdated => {
                    if (!projectUpdated) {
                        return res.status(404).send({ message: "El proyecto no existe y no se ha asignado la imagen" });
                    }
                    return res.status(200).send({ project: projectUpdated });
                })
                .catch(err => {
                    return res.status(500).send({ message: "La imagen no se ha subido." });
                });
            } 
        } else {
            return res.status(200).send({ message: fileName });
        }
    },
    //Obtener una imagen de un proyecto
        getImageFile: function(req, res) {
            var file = req.params.image;
            var path_file = './uploads/' + file;

            fs.exists(path_file, (exists) => {
                if (exists) {
                    return res.sendFile(path.resolve(path_file));
                }else{
                    return res.status(200).send({ message: "La imagen no existe." });
                }   
            });
            
        }
    }
    module.exports = controller;

