const Comment  = require('../models/CommentModel');
const config   = require('../config');
const mongoose = require("../lib/database");
const async    = require('async');


let query = async () => {
    let remove = await Comment.remove({});

    let create = await async.parallel([
                        function(callback){
                            let comment = new Comment({
                                name: {
                                    firstName: 'Олежа',
                                    lastName : 'Чеботарев',
                                },
                                img     : 'holod.jpg',
                                bundle  : 'Подарок из России',
                                number  : 1,
                                type    : 'rus',
                                isActive: true, 
                                text    : 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32'
                            });

                            comment.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, comment);
                            });
                        },
                        function(callback){
                            let comment = new Comment({
                                name: {
                                    firstName : 'Олежа',
                                    lastName  : 'Чеботарев',
                                },
                                img     : 'holod1.jpg',
                                bundle  : 'Подарок из России',
                                number  : 2,
                                type    : 'rus',
                                isActive: true, 
                                text    : 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32'
                            });
 
                            comment.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, comment);
                            });
                        },
                        function(callback){
                            let comment = new Comment({
                                name: {
                                    firstName : 'Олежа',
                                    lastName  : 'Чеботарев',
                                },
                                img     : 'holod2.jpg',
                                bundle  : 'Подарок из России',
                                number  : 3,
                                type    : 'rus',
                               isActive: true,
                                text    : 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32'
                            });

                            comment.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, comment);
                            });
                        },
                        function(callback){
                            let comment = new Comment({
                                name: {
                                    firstName : 'Олежа',
                                    lastName  : 'Чеботарев',
                                },
                                img     : 'holod3.jpg',
                                bundle  : 'Подарок из России',
                                number  : 4,
                                type    : 'rus',
                                isActive: true,
                                text    : 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32'
                            });

                            comment.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, comment);
                            });
                        },
                        function(callback){
                            let comment = new Comment({
                                name: {
                                    firstName : 'Олежа',
                                    lastName  : 'Чеботарев',
                                },
                                img     : 'holod4.jpg',
                                bundle  : 'Подарок из России',
                                number  : 5,
                                type    : 'rus',
                                isActive: true,
                                text    : 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32'
                            });

                            comment.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, comment);
                            });
                        },
                        function(callback){
                            let comment = new Comment({
                                name: {
                                    firstName : 'Олежа',
                                    lastName  : 'Чеботарев',
                                },
                                img     : 'holod5.jpg',
                                bundle  : 'Подарок из России',
                                number  : 6,
                                type    : 'rus',
                                isActive: true,
                                text    : 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32'
                            });

                            comment.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, comment);
                            });
                        },
                        function(callback){
                            let comment = new Comment({
                                name: {
                                    firstName : 'Олежа',
                                    lastName  : 'Чеботарев',
                                },
                                img     : 'holod6.jpg',
                                bundle  : 'Подарок из России',
                                number  : 7,
                                type    : 'rus',
                                isActive: true,
                                text    : 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32'
                            });
                            comment.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, comment);
                            });
                        },
                        function(callback){
                            let comment = new Comment({
                                name: {
                                    firstName : 'Олежа',
                                    lastName  : 'Чеботарев',
                                },
                                img     : 'holod7.jpg',
                                bundle  : 'Подарок из России',
                                number  : 8,
                                type    : 'rus',
                                isActive: true,
                                text    : 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32'
                            });

                            comment.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, comment);
                            });
                        },
                        function(callback){
                            let comment = new Comment({
                                name: {
                                    firstName : 'Олежа',
                                    lastName  : 'Чеботарев',
                                },
                                img     : 'holod8.jpg',
                                bundle  : 'Подарок из России',
                                number  : 9,
                                type    : 'rus',
                                isActive: true,
                                text    : 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32'
                            });

                            comment.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, comment);
                            });
                        },
                        function(callback){
                            let comment = new Comment({
                                name: {
                                    firstName : 'Олежа',
                                    lastName  : 'Чеботарев',
                                },
                                img     : 'holod9.jpg',
                                bundle  : 'Подарок из России',
                                number  : 10,
                                type    : 'rus',
                                isActive: true, 
                                text    : 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32'
                            });

                            comment.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, comment);
                            });
                        },
                        function(callback){
                            let comment = new Comment({
                                name: {
                                    firstName : 'Олежа',
                                    lastName  : 'Чеботарев',
                                },
                                img     : 'holod10.jpg',
                                bundle  : 'Подарок из России',
                                number  : 11,
                                type    : 'rus',
                                isActive: true, 
                                text    : 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32'
                            });

                            comment.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, comment);
                            });
                        },
                    ],
                    
                    function(err, result){
                        console.log(result);
                    });
}

query();
