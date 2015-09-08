//index.js page
//@author: Sivaraman
//@description: This is the app.js page is responsible for verifying the login credentials of the user 
//and redirecting them to the required page.
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  var isSession=req.session.user;
  if(typeof isSession==='undefined')
  {  
    res.render('index',{tagline:''});
  }
  else
  {
     if(req.session.role=='customer')
     {
        res.render('answers',{ username:req.session.user }); 
     } 
     else
     {
        res.redirect('/admin');
     }
  }
});

router.post('/',function(req, res) {

 var userName=req.body.username;
 var password=req.body.password;
  

 var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'medida',
    database : 'project1'
  });


var queryString = 'SELECT * FROM login where user = ? AND password = ?';
 
connection.query(queryString,[userName,password],function(err, rows) {
    if (err) throw err;

    if(rows.length > 0)
    {
        req.session.user=userName;
    	if(rows[0].role=="customer")
    	{   req.session.role="customer";
    		res.render('answers',{ username:req.session.user});
    	}
    	else
    	{
            req.session.role="admin";
    		res.redirect('/admin');

    	}
    }
    else
    {
    	var authenticationFail='Incorrect password or username. Try again.';
    	res.render('index', { tagline: authenticationFail });
    }
});
if(userName==''||password=='')
{
	var authenticationFail='Incorrect password/username';
    res.render('index', { tagline: authenticationFail });
}

});

module.exports = router;
