const Order    = require('../models/orderModel');
const config   = require('../config');
const mongoose = require("../lib/database");
const async    = require('async');


let query = async () => {
    let remove = await Order.remove({});

    let create = await async.parallel([
                        function(callback){
                            let order = new Order({
                                name: {
                                    firstName : 'Олежа',
                                    secondName: 'Чеботарев',
                                    patronymic: 'Рукавишникович'
                                },
                                date  : '2020-10-24',
                                phone : '+7 (924) 109 83-57',
                                bundle: 'Подарок из России',
                                number: 1,
                            });

                            order.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, order);
                            });
                        },
                        function(callback){
                            let order = new Order({
                                name: {
                                    firstName : 'Олежа',
                                    secondName: 'Чеботарев',
                                    patronymic: 'Рукавишникович'
                                },
                                phone : '+7 (924) 109 83-57',
                                date  : '2020-10-24',
                                bundle: 'Подарок из России',
                                number: 2,
                            });
 
                            order.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, order);
                            });
                        },
                        function(callback){
                            let order = new Order({
                                name: {
                                    firstName : 'Олежа',
                                    secondName: 'Чеботарев',
                                    patronymic: 'Рукавишникович'
                                },
                                phone : '+7 (924) 109 83-57',
                                date  : '2020-10-24',
                                bundle: 'Подарок из России',
                                number: 3,
                            });
                            order.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, order);
                            });
                        },
                        function(callback){
                            let order = new Order({
                                name: {
                                    firstName : 'Олежа',
                                    secondName: 'Чеботарев',
                                    patronymic: 'Рукавишникович'
                                },
                                phone : '+7 (924) 109 83-57',
                                date  : '2020-10-24',
                                bundle: 'Подарок из России',
                                number: 4,
                            });

                            order.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, order);
                            });
                        },
                        function(callback){
                            let order = new Order({
                                name: {
                                    firstName : 'Олежа',
                                    secondName: 'Чеботарев',
                                    patronymic: 'Рукавишникович'
                                },
                                phone : '+7 (924) 109 83-57',
                                date  : '2020-10-24',
                                bundle: 'Подарок из России',
                                number: 5,
                            });

                            order.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, order);
                            });
                        },
                        function(callback){
                            let order = new Order({
                                name: {
                                    firstName : 'Олежа',
                                    secondName: 'Чеботарев',
                                    patronymic: 'Рукавишникович'
                                },
                                phone : '+7 (924) 109 83-57',
                                date  : '2020-10-24',
                                bundle: 'Подарок из России',
                                number: 6,
                            });

                            order.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, order);
                            });
                        },
                        function(callback){
                            let order = new Order({
                                name: {
                                    firstName : 'Олежа',
                                    secondName: 'Чеботарев',
                                    patronymic: 'Рукавишникович'
                                },
                                phone : '+7 (924) 109 83-57',
                                date  : '2020-10-24',
                                bundle: 'Подарок из России',
                                number: 7,
                            });

                            order.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, order);
                            });
                        },
                        function(callback){
                            let order = new Order({
                                name: {
                                    firstName : 'Олежа',
                                    secondName: 'Чеботарев',
                                    patronymic: 'Рукавишникович'
                                },
                                phone : '+7 (924) 109 83-57',
                                date  : '2020-10-24',
                                bundle: 'Подарок из России',
                                number: 8,
                            });

                            order.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, order);
                            });
                        },
                        function(callback){
                            let order = new Order({
                                name: {
                                    firstName : 'Олежа',
                                    secondName: 'Чеботарев',
                                    patronymic: 'Рукавишникович'
                                },
                                phone : '+7 (924) 109 83-57',
                                date  : '2020-10-24',
                                bundle: 'Подарок из России',
                                number: 9,
                            });

                            order.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, order);
                            });
                        },
                        function(callback){
                            let order = new Order({
                                name: {
                                    firstName : 'Олежа',
                                    secondName: 'Чеботарев',
                                    patronymic: 'Рукавишникович'
                                },
                                phone : '+7 (924) 109 83-57',
                                date  : '2020-10-24',
                                bundle: 'Подарок из России',
                                number: 10,
                            });

                            order.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, order);
                            });
                        },
                        function(callback){
                            let order = new Order({
                                name: {
                                    firstName : 'Олежа',
                                    secondName: 'Чеботарев',
                                    patronymic: 'Рукавишникович'
                                },
                                phone : '+7 (924) 109 83-57',
                                date  : '2020-10-24',
                                bundle: 'Подарок из России',
                                number: 11,
                            });

                            order.save(function(err){
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                callback(err, order);
                            });
                        },
                    ],
                    function(err, result){
                        console.log(result);
                    });
}

query();
