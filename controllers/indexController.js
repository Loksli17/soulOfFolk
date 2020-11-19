const
    Comment = require('./../models/CommentModel'),
    Order   = require('./../models/OrderModel');


exports.actionIndex = async (req, res) => {

    let comments = [];

    comments = await Comment.find({isActive: true}).sort({number: -1}).exec();

    console.log("piska ",comments);

    res.render('client/index', {
        comments: comments,
        csrf    : res.locals._csrfToken,
    });
}


exports.actionCreateOrder = async (req, res) => {

    const
        POST = req.body;

    let
        order     = {},
        lastOrder = {},
        orderForm = JSON.parse(POST.order);

    if(orderForm == undefined){
        res.status(500).send({message: 'Данные с формы не были получены'});
    }

    lastOrder = await Order.findOne().limit(1).sort({number: -1});

    order = new Order({
        name: {
            lastName  : orderForm.lastName,
            firstName : orderForm.firstName,
            patronymic: orderForm.patronymic,
        },
        number    : lastOrder.number + 1,
        viewStatus: true,
        phone     : orderForm.phone,
        bundle    : orderForm.bundle,
        date      : new Date(),
        cost      : orderForm.cost,
    });

    try{
        await order.save({runValidators: true});
        res.status('200').send({message: `Заказ на имя ${orderForm.firstName} ${orderForm.lastName} успешно оформлен`});
        return;
    }catch(err){
        console.log(err);
        res.status(500).send({message: 'Ошибка сервера'});
        return;
    }

}
