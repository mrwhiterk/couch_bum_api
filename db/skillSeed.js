const { Skill } = require('../models');

Skill.remove({}).then(_ => {
  Skill.insertMany([
    { name: 'cooking' },
    { name: 'tae kwan doe' },
    { name: 'programming' },
    { name: 'fishing' },
    { name: 'boxing' },
    { name: 'singing' },
    { name: 'piano' },
    { name: 'wood working' },
  ]).then(skills => {
    console.log(skills);
    process.exit();
  });
});
