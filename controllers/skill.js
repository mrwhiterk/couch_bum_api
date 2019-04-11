const { Skill } = require('../models/index');

module.exports = {
  index: (req, res) => {
    Skill.find({}).then(skills => {
      res.json(skills);
    });
  },
  show: (req, res) => {
    Skill.findOne({ _id: req.params.id }).then(skill => {
      res.json(skill);
    });
  },
  create: (req, res) => {
    Skill.create(req.body).then(skill => res.json(skill));
  },
  update: (req, res) => {
    Skill.findOne({ _id: req.params.id }).then(skill => {
      const { name } = req.body;
      skill.name = name;

      skill.save((err, skill) => {
        res.json(skill);
      });
    });
  },
  delete: (req, res) => {
    Skill.findByIdAndRemove({ _id: req.params.id }).then(skill => {
      res.json(skill);
    });
  },
};
