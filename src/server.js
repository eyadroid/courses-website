// dependencies
const query = require('./db/db-connection');
const express = require("express");
const { random } = require('faker');

// the app
const app = express();

// settings
app.set('view engine', 'ejs');

const port = Number(process.env.PORT || 3331);

app.get("/", function(req, res) {
    let name = req.query.name;
    let age = req.query.age;
    res.send("hi " + name + " your age is:" + age);
});

app.get("/home", async function(req, res)  {
    let data = {
        categories: [],
        mostViewedCourses: [],
        randomCategories: []
    };

    try {
        // categories
        let mianCategories = await query("SELECT * FROM `categories` WHERE parent_id IS NULL", []);
        for(let mianCategory of mianCategories) {
            mianCategory.subCategories = await query("SELECT * FROM `categories` WHERE parent_id=?", [
                mianCategory.id
            ])
        }
        data.categories = mianCategories;


        // mostViewedCourses
        data.mostViewedCourses = await query("SELECT *, `views` FROM `courses` ORDER BY `views` DESC LIMIT 5");
        
        // random categories
        let randomCategories = await query("SELECT * FROM `categories` WHERE parent_id IS NOT NULL ORDER BY RAND() LIMIT 2");
        for (let category of randomCategories) {
            category.courses = await query("SELECT *, `views` FROM `courses` WHERE category_id=? ORDER BY `views` DESC LIMIT 5", [
                category.id
            ]);
        }
        data.randomCategories = randomCategories;

        res.send(data);
    }

    catch(e) {
        console.log(e);
        res.send("We have a problem righ now");
    }

});

app.get("/search", async function(req, res) {
    let text = req.query.text;
    text = "%"+text+"%";
    try {
        let results = await query(
            'SELECT *, (SELECT name FROM categories WHERE categories.id=courses.category_id) as category_name FROM `courses` WHERE (`title` LIKE ? OR `description` LIKE ? OR (SELECT name FROM categories WHERE categories.id=courses.category_id) LIKE ? OR (SELECT name FROM categories WHERE categories.id=(SELECT parent_id FROM categories WHERE categories.id=courses.category_id)) LIKE ?)', [
            text,
            text,
            text,
            text,
        ]);
        res.send(results);
    } catch(e) {
        res.send(e)
    }
});

app.get('/category', async function (req, res) {
    try {

        let data = {
            subCategories: [],
            courses: []
        };
        let category_id = req.query.category_id;
        if (category_id == null) res.send("Category ID is required");

        let categoryQuery = await query("SELECT * FROM `categories` WHERE id=?", [category_id]);
        if (categoryQuery.length < 1) res.send("category not found");
        let category = categoryQuery[0];
    
        let isMainCategory = category.parent_id == null;
    
        if (isMainCategory) {
            data.subCategories = await query("SELECT * FROM `categories` WHERE parent_id=?", [
                category.id
            ]);
        }
    
        data.courses = await query(
            isMainCategory ? 
            "SELECT * FROM `courses` WHERE (SELECT id FROM categories WHERE categories.id=(SELECT parent_id FROM categories WHERE categories.id=courses.category_id)) = ?"
            :
            "SELECT * FROM `courses` WHERE category_id=?",
            [
                category.id
            ]
        );
    
        res.send(data);
    }
    catch(e) {
        res.send(e);
    }
});

app.get("/course", async function(req, res) {
    try {
        let data = {
            course: {},
            videos: []
        };
        
        let course_id = req.query.course_id;
        if (course_id == null) res.send("course ID is required");
    
    
        let courseQuery = await query("SELECT * FROM `courses` WHERE id=?", [course_id]);
        if (courseQuery.length < 1) res.send("course not found");
        let course = courseQuery[0];
    
        data.videos = await query("SELECT * FROM `course_videos` WHERE course_id=?", [
            course.id
        ]);
    
        res.send(data);
    }
    catch(e) {
        res.send(e);
    }
});



app.get("/template", async function(req, res) {
    let name = req.query.name;
    let age = req.query.age;
    res.render("test", {
        name,
        age
    });
});


// app listen
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;