// var mysql      = require('mysql');
// var faker      = require('faker');
// var pool = mysql.createPool({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'ramadan_courses'
// });
 
 
// pool.query('SELECT * FROM `categories` WHERE parent_id IS NOT NULL', function (error, categories, fields) {
//   if (error) throw error;

//   for (let i=0;i<categories.length;i++) {
//     for(let c=0;c<Math.floor(Math.random() * 15) + 3;c++) {
//         pool.query('INSERT INTO `courses` SET ?', {
//             title: faker.name.title(),
//             description: faker.lorem.paragraphs(3),
//             duration_hours: Math.floor(Math.random() * 24) + 10,  
//             views: Math.floor(Math.random() * 1000) + 0,  
//             category_id: categories[i].id
//         }, function (error, results, fields) {
//             if (error) throw error;
//             console.log(results.insertId);
//             for(let j=0;j<Math.floor(Math.random() * 30) + 10;j++) {
//                 pool.query('INSERT INTO `course_videos` SET ?', {
//                     title: faker.name.title(),
//                     thumbnail: "test.png",
//                     description: faker.lorem.paragraphs(3),
//                     duration_seconds: Math.floor(Math.random() * 24) + 10,  
//                     course_id: results.insertId
//                 }, function (error2, results2, fields){
//                     if (error2) throw error2;
//                 });

//             }
//           });

//     }
//   }
// });
