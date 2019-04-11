const { User } = require('../models');

User.remove({}).then(_ => {
  User.insertMany([
    {
      username: 'cat123',
      email: 'cat@cat.com',
      password: 'cat',
      formType: 1,
      bio: 'I am a cat',
      listings: [
        {
          address: '123 high st',
          availability: true,
          imgUrls: [
            'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MTkvb3JpZ2luYWwvY3V0ZS1raXR0ZW4uanBn',
            'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MTkvb3JpZ2luYWwvY3V0ZS1raXR0ZW4uanBn',
          ],

          notes: 'I like to do cat things',
        },
      ],
      skills: [
        { name: 'web development' },
        { name: 'guitar' },
        { name: 'cooking' },
      ],
    },
    {
      username: 'dog345',
      email: 'dog@dog.com',
      password: 'dog',
      formType: 0,
      bio: 'I am a dog',
      listings: [
        {
          address: '345 gay st',
          availability: false,
          imgUrls: [
            'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MTkvb3JpZ2luYWwvY3V0ZS1raXR0ZW4uanBn',
          ],
          notes: 'I like to do dog stuff',
        },
      ],
      skills: [],
      image: String,
    },
    {
      username: 'frog678',
      email: 'frog@frog.com',
      password: 'frog',
      formType: 1,
      bio: 'I am a frog',
      listings: [],
      skills: [
        { name: 'beekeeping' },
        { name: 'rockclimbing' },
        { name: 'mathematics' },
        { name: 'cooking' },
      ],
      image: String,
    },
  ]).then(user => {
    console.log(user);
    process.exit();
  });
});
