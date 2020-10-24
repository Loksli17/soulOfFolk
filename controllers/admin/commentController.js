

exports.actionIndex = async (req, res) => {
    res.render('admin/comment/index.hbs',{
       layout: 'layouts/admin', 
    });
}