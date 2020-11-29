const e = require("express");
const express = require("express");
const db = require("./db");
const dbtemp = require("./db");


queriesRouter = express.Router();




// Account get 
queriesRouter.get('/account', (req, res, next) => {
  let username = req.query.username;
  let password = req.query.password;
  let accountid = req.query.accountid;
  let values = []
  let sql = 'select username, id, accountactive from account_info '
  if ((password != null) && (username != null)) {
    sql += 'where username = ?'
    sql += 'and userpassword = ?'
    values.push(username);
    values.push(password);
  } else if ((accountid != null)) {
    sql += 'where id = ?'
    values.push(accountid);
  }
  db.all(sql, values, (err, rows) => {
    if (err) {
      res.status(500).json({ "error": err.message });
    } else {
      res.status(200).json({ accounts: rows });
    }
  });
});


//account post  
queriesRouter.post('/account', (req, res, next) => {
  let username = req.body.username;
  let userpassword = req.body.userpassword;
  let accountactive = false;



  var sql = "INSERT INTO account_info(username, userpassword, accountactive) "
  sql += "VALUES(?,?,?) "

  if ((userpassword != null) && (username != null)) {
    db.run(sql, [username, userpassword, accountactive], (err) => {
      if (err) {
        res.status(500).json({ "error": err.message });
      } else {
        res.status(201).send("Account Created");
      }
    });
  } else {
    res.status(500).send("account creation failed")
  }
});

//account put 

queriesRouter.put('/account/activate', (req, res, next) => {
  let accountid = req.body.accountid;


  var sql = 'Update account_info set accountactive = true '
  sql += 'where id = ?'

  if ((accountid != null)) {
    db.run(sql, [accountid], (err) => {
      if (err) {
        res.status(500).json({ "error": err.message });
      } else {
        res.status(201).send("Account updated");
      }
    });
  } else {
    res.status(500).send("account update failed")
  }

});


//account delete 

queriesRouter.delete('/account', (req, res, next) => {
  let accountid = req.query.accountid;

  sql = 'DELETE FROM account_info '
  sql += 'where id = ?'

  console.log(accountid);

  db.run(sql, accountid, (err) => {

    if (err) {
      return console.error(err.message);
    }
    res.status(500).send(`Row(s) deleted ${this.changes}`);

  });

});


// user get
queriesRouter.get('/user', (req, res, next) => {
  let accountid = req.query.accountid;

  let sql = 'select userid as accountid, fname, lname, phone, email, linkedin, github, twitter from user_info '
  sql += 'where userid = ?'

  db.get(sql, accountid, (err, rows) => {
    if (err) {
      res.status(500).json({ "error": err.message });
    } else {
      res.status(200).json(rows);
    }
  });

});


//user post 
queriesRouter.post('/user', (req, res, next) => {
  let accountid = req.query.accountid;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let phone = req.body.phone;
  let email = req.body.email;
  let linkedin = req.body.linkedin;
  let github = req.body.github;
  let twitter = req.body.twitter;

  var sql1 = 'delete from user_info '
  sql1 += 'where userid = ?'

  var sql2 = 'INSERT INTO user_info(userid,fname,lname, phone, email, linkedin, github, twitter) VALUES (?,?,?,?,?,?,?,?)'
  let values = [accountid, fname, lname, phone, email, linkedin, github, twitter];

  db.run(sql1, accountid, (err) => {
    if (err) {
      res.status(500).json({ "error": err.message });
    } else {
      db.run(sql2, values, (err) => {
        if (err) {
          res.status(500).json({ "error": err.message });
        } else {
          res.status(204).send("record updated")
        }
      });
    }
  })


});


//tags
queriesRouter.get('/usertags', (req, res, next) => {
  let accountid = req.query.accountid;
  let tagtype = req.query.tagtype;

  var sql = "select * from user_tags"
  sql += " where userid = ?"
  sql += " and tag_type = ?"

  db.all(sql, [accountid, tagtype], (err, rows) => {
    if (err) {
      res.status(500).json({ "error": err.message });
    } else {
      let temp = rows
      if (tagtype === "class") {
        temp = { "classes": rows }
      } else if (tagtype === "skill") {
        temp = { "skills": rows }
      } else {
        temp = { "orgs": rows }
      }

      res.status(200).json(temp);
    }
  });

});


queriesRouter.post('/usertags', (req, res, next) => {
  let accountid = req.query.accountid;
  let tagtype = req.query.tagtype;
  let tags = req.body;

  //create insert statement
  var sql = "INSERT INTO user_tags(userid,tag_type,tag_name,"
  var values = " VALUES (?,?,?"

  if (tagtype != 'skill') {
    sql += " tag_description,"
    values += ",?"
  }

  sql += " tag_show)"
  values += ",?)"
  sql += values



  tags.forEach(({ tag_name, tag_description, tag_show }, i) => {
    //console.log(accountid,tagtype,tag_name,tag_description,tag_show);
    db.run(sql, [accountid, tagtype, tag_name, tag_description, tag_show])
  })



  res.status(204).send();

})



queriesRouter.delete('/usertags', (req, res, next) => {
  let accountid = req.query.accountid;
  let tagtype = req.query.tagtype;
  let tags = req.body;

  tags.forEach(({ tag_name }, i) => {
    //console.log(accountid,tagtype,tag_name,tag_description,tag_show);
    db.run("delete from user_tags where userid = ? and tag_type = ? and tag_name = ?", [accountid, tagtype, tag_name])
  })

  res.status(204).send();

})



///test
queriesRouter.get('/profile', (req, res, next) => {
  let accountid = req.query.accountid;
  //tag set up
  var sql = "select tag_name,tag_description,tag_show from user_tags"
  sql += " where userid = ?"
  sql += " and tag_type = ?"
  //user setup
  let sql2 = 'select userid as accountid, fname, lname, phone, email, linkedin, github, twitter from user_info '
  sql2 += 'where userid = ?'

  //temp results veriables
  let tempinfo = {}

  db.get(sql2, accountid, (err, rows) => {
    if (err) {
      res.status(500).json({ "error": err.message });
    } else {
      tempinfo = rows
      //now run tag
      db.all(sql, [accountid, "class"], (err, rows) => {
        if (err) {
          res.status(500).json({ "error": err.message });
        } else {
          tempinfo["classes"] = rows;
          //skill
          db.all(sql, [accountid, "skill"], (err, rows) => {
            if (err) {
              res.status(500).json({ "error": err.message });
            } else {
              tempinfo["skills"] = rows;
              //org
              db.all(sql, [accountid, "org"], (err, rows) => {
                if (err) {
                  res.status(500).json({ "error": err.message });
                } else {
                  tempinfo["orgs"] = rows;
                  console.log(tempinfo);
                  res.status(200).json(tempinfo);

                }
              })
              //end org

            }
          })
          //end skill

        }
      })
    }
  });  
});



  //search
  queriesRouter.post('/searchprofiles', (req,res,next)=>{
    //get veriables
    let searchName = req.query.searchName
    let values = req.body.values

    //set search based on if we are searching names or tags
    
    if(searchName === 'true'){
       sql = "select userid from user_info where fname in (" + values.map(function(){return '?'}).join(',') +") or lname in (" + values.map(function(){return '?'}).join(',') + ")"
      
    }else{
       sql = "select userid from USER_TAGS where tag_name in (" + values.map(function(){return '?'}).join(',') + ")"
     
    }

    //begin find match users
    db.all(sql,values,(err,rows)=>{
      if(err){
        res.status(500).json({"error": err.message});
      }else{
          let userResults = rows
          let userValues = [];
          userResults.forEach(({userid},i)=>{
            userValues.push(userid);
          })
          res.status(200).json(userValues)
      }
    });
    //end of find matching users


  });

//export
module.exports = queriesRouter;