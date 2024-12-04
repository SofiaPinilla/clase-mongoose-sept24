const Order = require('../models/Order.js');
const User = require('../models/User.js');

const OrderController = {
    async create(req, res) {
    try {
      const order = await Order.create({
        ...req.body,
        status: "pending",
        deliveryDate: new Date().setDate(new Date().getDate() + 2),
        userId: req.user._id,
      });//creamos el pedido
      //actualizamos el usuario y le añadimos el id del pedido
      await User.findByIdAndUpdate(req.user._id,
        {$push:{orderIds: order._id }},
        {new:true}
      )
      res.status(201).send(order);
    } catch (error) {
      console.error(error);
    }
  },
  async update(req, res) {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params._id,
        { ...req.body, userId: req.user._id },
        {
          new: true,
        }
      );
      res.send({ message: "order successfully updated", order });
    } catch (error) {
      console.error(error);
    }
  },

}

module.exports = OrderController;
