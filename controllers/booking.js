const { Booking } = require('../models/index');

module.exports = {
  index: (req, res) => {
    Booking.find({}).then(bookings => {
      res.json(bookings);
    });
  },
  show: (req, res) => {
    Booking.findOne({ _id: req.params.id }).then(booking => {
      res.json(booking);
    });
  },
  create: (req, res) => {
    Booking.create(req.body).then(booking => res.json(booking));
  },
  update: (req, res) => {
    Booking.findOne({ _id: req.params.id }).then(booking => {
      const { date, skillTime, address, hostId, guestId } = req.body;
      booking.date = date;
      booking.skillTime = skillTime;
      booking.address = address;
      booking.hostId = hostId;
      booking.guestId = guestId;

      booking.save((err, booking) => {
        res.json(booking);
      });
    });
  },
  delete: (req, res) => {
    Booking.findByIdAndRemove({ _id: req.params.id }).then(booking => {
      res.json(booking);
    });
  },
};
