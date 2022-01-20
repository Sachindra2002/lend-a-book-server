const { request, response } = require("express");
const {
  sequelize,
  User,
  Subscription,
  Book,
  Movie,
  Reservation,
  Book_Reservation,
} = require("../models");

exports.getAllBookReservations = async (request, response) => {
  try {
    const book_reservations = await Reservation.findAll();
    return response.status(200).json({ book_reservations });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

exports.setReservationStatus = async (request, response) => {
  const id = request.params.id;
  const status = request.body.status;

  try {
    const reservation = await Reservation.findByPk(id);

    //If reservation is not found
    if (!reservation)
      return response.status(400).json({ error: "Reservation not found" });

    //If invalid status
    if (status !== "pending" && status !== "collected" && status !== "returned")
      response.status(400).json({ error: "Invalid status" });

    reservation.status = status;
    reservation.save();

    return response
      .status(200)
      .json({ message: "Successfully changed status" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
};

exports.saveOrder = async (request, response) => {
  //Find user from database
  const user = await User.findByPk(request.user.email);

  var today = new Date(request.body.reservationDate);

  var nextweek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 9
  );

  const newReservation = {
    reservationDate: request.body.reservationDate,
    returnDate: nextweek.toLocaleDateString(),
    status: "pending",
    charges: request.body.charges,
    email: user.email,
  };

  // Create and save the order
  const savedOrder = await Reservation.create(newReservation);

  //Loop through all the items in req.products
  request.body.books.cartItems.forEach(async (element) => {
    //Search for the product with the given ID and make sure it exists. If it doesn't, respond with status 400
    const book = await Book.findByPk(element.isbn);
    if (!book) {
      return res.status(400);
    }

    //Create a dictionary with which to create the Book_Reservation
    const po = {
      reservationID: savedOrder.id,
      isbn: element.isbn,
    };

    //Create and save Book_Reservation
    const savedBookReservation = await Book_Reservation.create(
      po
      // {w: 1},
      // {returning: true}
    );

    //If everything goes well, respond with the order
    return response.status(200).json(savedBookReservation);
  });
};
