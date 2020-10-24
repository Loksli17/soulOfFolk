

exports.actionIndex = async (req, res) => {
    res.render('admin/order/index.hbs',{
       layout: 'layouts/admin', 
    });
}